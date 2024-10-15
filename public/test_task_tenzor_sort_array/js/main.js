var undefined;

function SortDocument(selector){
	//CHECK CONTAINER
	var sort = this;
	if(!$(selector).length){
		throw new Error("SortDocument: Element not found");
	}
	//BACKBONEJS CLASSES
	//модель для элемента массива
	var Number = Backbone.Model.extend({
		defaults: {
			val: 0,
			parent: 0,
			left: 0,
			right: 0
		},
		//инициализируем модель, создаем представления для начального и "летающего" элемента
		initialize: function(){
			this.view = new NumberView({model: this});
			this.flying = new Flying({model: this});
		},
		//создание шагов анимации для каждого элемента(сначчала создаем шаги, устанавливаем родительские связи, затем - начинаем анимацию)
		createSteps: function(o){
			var steps = [];
			var val = this.get("val");
			
			var model = sort.container.arr.at(o.label);
			searshState.apply(this, [0]);
			model.steps = steps;
			sort.container.bin.add( model );
			
			o.label++;
			o.func(o);
			//рекурсивная функция создания шагов анимации для каждого номера
			function searshState(index){
				var number = sort.container.bin.at(index);
				if(number === undefined){
					steps.push({func: this.firstToStart});
				}
				else{
					if(index == 0){
						steps.push({func: this.toNumber, number: number});
					}
					var side = val < number.get("val") ? "left" : "right";
					if(number.get(side) !== 0){
						steps.push({func: this.toNumber, number: number.get(side)});
						searshState.apply(this, [sort.container.bin.indexOf(number.get(side))]);
					}
					else{
						number.set(side, this);
						this.set("parent", number);
						steps.push({func: this.toFinish, side: side});
						sort.container.bin.push(this);
					}
				}
			}
		},
		//функции анимации
		//первый элемент помещаем на экран
		firstToStart: function(o){
			var model = o.model;
			model.view.$el.addClass("hidden unvisible");
			model.flying.show();
			model.column = new DisplayColumn({model: model});
			model.column.toDisplay();
			
			var offset = {left: 0, top: 13};
			model.flying.flyTo({
				model: model,
				offset: offset,
				end: function(model){
					var number = model.column.$el.find(".number").first();
					number.removeClass("unvisible");
					model.flying.hide();
				}
			});
			o.func({count: o.count, model: model});
		},
		//перемещение от элемента к элементу
		toNumber: function(o){
			var model = o.model;
			var number = this.number
			if(number === sort.container.arr.at(0)){
				model.view.$el.addClass("hidden unvisible");
				model.flying.show();
			}
			var offset = {left: 11, top: 11};
			model.flying.flyTo({
				model: number,
				offset: offset
			});
			o.func({count: o.count, model: o.model});
		},
		//перемещение элемента на своё место, создание для него линий и контейнера
		toFinish: function(o){
			var side = o.params.side;
			var model = o.model;
			model.side = side;
			model.column = new DisplayColumn({model: model});
			model.column.toDisplay({side: side});
			var parCount = sort.parCount(model, 0);
			var offset = {left: -1, top: -5 + (parCount * 28)};
			
			model.cteateLine({side: this.side});
			var height = 28 * (parCount + 1);
			var bigger = height > parseInt( sort.container.binView.$el.css("height") );
			if( bigger ){
				sort.container.binView.$el.css({ "height": height + "px" });
			}
			
			model.flying.flyTo({
				model: model,
				offset: offset,
				end: function(model){
					var number = model.column.$el.find(".number").first();
					number.removeClass("unvisible");
					model.flying.hide();
				}
			});
			
			o.func({count: o.count, model: o.model});
		},
		//задаем шаги анимации
		step: function(o){
			var stepNumber = this.steps.length - o.count - 1;
			setTimeout(function(o){
				o.params = o.model.steps[o.stepNumber];
				o.model.steps[o.stepNumber].func(o);
			},sort.pauseTimeout,{
				stepNumber: stepNumber,
				model: this,
				func: o.func,
				count: o.count
			})
		},
		//функция вызова для отправки элиментов в дерево
		toDisplay: function(o){
			var count = o.count;
			var next = o.func;
			//счетчик выполнен с помощью замыкания, чтобы не перегружат пространство имён
			(function(o){
				if(o.count > 0){
					o.count--;
					o.model.step({
						count: o.count,
						func: arguments.callee
					});
				}
				else{
					count++;
					next({count: count});
				}
			})({
				model: this,
				count: this.steps.length
			});
		},
		//создание линий(линии представлены с помощью масштабируемой векторной графики, не увидел смысла применять в задании другие изображения)
		cteateLine: function(o){
			var arr;
			if(o.side === "left"){
				o.side = "right";
				arr = ["0","100%","100%","0"];
			}
			else{
				o.side = "left";
				arr = ["0","0","100%","100%"];
			}
			var svg = $('<svg class="' + o.side + '"><line x1="' + arr[0] + '" y1="' + arr[1] + '" x2="' + arr[2] + '" y2="' + arr[3] + '" stroke="#666666" stroke-width="2"/></svg>');
			var number = this.column.$el.find(".number").first();
			svg.appendTo(number);
			setTimeout(function(svg){
				svg.css({width:28,height:28,top:-16,opacity:1});
			},20,svg);
			
			var side = this.side;
			var model = this;
			var models = [];
			while(model.get("parent") !== 0){
				if(side !== model.get("parent").side && model.get("parent").side !== undefined){
					side = model.get("parent").side;
					models.push(model.get("parent"));
				}
				model = model.get("parent");
			};
			for(var key in models){
				var svg = models[key].column.$el.find(".number>svg").first();
				var width = parseInt(svg.css("width")) + 28;
				svg.css({width: width});
			}
		}
	});
	//вьюха перемещающихся элементов
	var Flying = Backbone.View.extend({
		tagName: "div",
		className: "number flying ghost",
		initialize: function(){
			this.render();
			var flyBox = sort.container.$el.find(".fly-box").first();
			flyBox.append( this.$el );
		},
		render: function(){
			this.$el.html( this.model.get("val") );
		},
		show: function(){
			var offset = this.model.view.$el.offset();
			var containerOffset = sort.container.$el.offset();
			this.$el.css({
				left: offset.left - containerOffset.left,
				top: offset.top - containerOffset.top
			});
			this.$el.removeClass("ghost");
			this.model.view.$el.addClass("hidden");
		},
		hide: function(){
			this.$el.addClass("ghost");
		},
		//функция перемещения
		flyTo: function(o){
			var columnOffset = o.model.column.$el.find(".number").first().offset();
			var containerOffset = sort.container.$el.offset();
			var left = columnOffset.left - containerOffset.left;
			var top = columnOffset.top - containerOffset.top;

			this.$el.css({
				left: left - 11 + o.offset.left,
				top: top - 11 + o.offset.top
			});
			
			if(o.end !== undefined){
				setTimeout(function(o){o.end(o.model)},sort.animationTime + 50,{
					end: o.end,
					model: this.model
				});
			}
		}
	});
	//представление эемента в начальном массива
	var NumberView = Backbone.View.extend({
		tagName: "div",
		className: "number hidden",
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html( this.model.get("val") );
		},
		clear: function(){
			sort.container.arr.remove(this.model);
		},
		toPreArray: function(){
			sort.container.$(".pre-array").append( this.model.view.$el );
			setTimeout(function(number){
					number.view.$el.removeClass("hidden");
			},50,this.model);
		}
	});
	//представление для экрана дерева
	var BinView = Backbone.View.extend({
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html("");
		}
	});
	//представление для колонки дерева
	var DisplayColumn = Backbone.View.extend({
		tagName: "div",
		className: "display-column",
		initialize: function(){
			this.render();
		},
		render: function(){
			this.$el.html( '<div class="number hidden unvisible">' + this.model.get("val") + '</div>' );
		},
		//выводим колонку дерева в нужном месте, анимируем вхождения
		toDisplay: function(o){
			var position = sort.container.bin.indexOf(this.model);
			if(position == 0){
				sort.container.binView.$el.html(this.$el);
			}
			else{
				if(o.side === "left"){
					this.model.get("parent").column.$el.before(this.$el);
				}
				else{
					this.model.get("parent").column.$el.after(this.$el);
				}
			}
			
			setTimeout(function(o){
				var number = o.model.column.$el.find(".number").first();
				parCount = sort.parCount(o.model, 0);
				number.css({top: parCount * 28}).removeClass("hidden");
			},
			0,{model: this.model});
		}
	});
	//основной начальный массив
	var Arr = Backbone.Collection.extend({
		model: Number,
		initialize: function(){
			this.on({
				"add" : function(number){
					this.addOne(number);
				},
				"remove" : function(model){
					model.view.$el.addClass("hidden");
					if(model.column){
						model.column.$el.find(".number").first().addClass("hidden");
					}
					model.flying.remove();
					setTimeout(function(model){
							model.view.remove();
							if(model.column){
								model.column.remove();
							}
					},sort.animationTime,model);
				}
			});
		},
		addOne: function(number){
			number.view.toPreArray();
		},
		//генерируем массив
		generateNumbers : function(count){
			sort.countInterval(function(){sort.container.arr.add(new Number({val : _.random(-99,999)}))}, count, sort.animationTime/4);
		},
		//очищаем массив
		removeNumbers  : function(){
			sort.countInterval(function(){sort.container.arr.remove( sort.container.arr.at(0) )}, sort.container.arr.length, sort.animationTime/4);
		}
	});
	//коллекция для создания дерева(вспомогательная, нужна для построения родительских связей)
	var Bin = Backbone.Collection.extend({
		model: Number
	});
	//представления для кнопок и расширения манипуляций над ними
	var Button = Backbone.View.extend({
		events: {"click": "myDo"},
		fix: function(){
			this.$el.addClass("fixed");
		},
		unfix: function(){
			this.$el.removeClass("fixed");
		},
		myDo: function(){
			if(!this.$el.hasClass("fixed")){
				sort.container[ this.$el.parent().attr("name") ]();
			}
		},
		toButton: function(button){
			this.$el.parent().attr({name: button})
			this.$el.attr({value: button})
		}
	});
	//CREATE CONTAINER
	//основное представление, в нем же большая часть методов и объектов
	var Container = Backbone.View.extend({
		loadHtml : '<div class="header"><form name="generate"><label>count</label><input type="phone" maxlength=2><input type="button" value="generate"></form><form name="start"><input type="button" value="start"></form><form name="add"><label>number</label><input type="phone" maxlength=3><input type="button" value="add"></form></div><div class="pre-array"></div><div class="fly-box"></div><div class="display"></div></div>',
		el: selector,
		initialize: function(){
			this.arr = new Arr;
			this.bin = new Bin();
			//сделал так, чтобы можно было использовать приложение, как плагин(таблица стилей перемещается и меняется отдельно)
			this.$el.html(this.loadHtml);
			this.binView = new BinView({el: this.$el.find(".display").first()});
			//создаем представления для кнопок
			this.generateButton = new Button({el: '#container .header>form[name="generate"]>input[type="button"]'});
			this.startButton = new Button({el: '#container .header>form[name="start"]>input[type="button"]'});
			this.addButton = new Button({el: '#container .header>form[name="add"]>input[type="button"]'});
		},
		//добавляем элемент
		add: function(){
			var input = this.$('.header>form[name="add"]>input[type="phone"]');
			var val = input.val();
			var  num = parseInt( val );
			if( num === 0 || (num && num == val) ){
				if(this.arr.length < sort.maxLength){
					var number = new Number({val: num});
					this.arr.add(number);
				}
				else{
					alert("Вы можете добавить максимум " + sort.maxLength + " цифр");
					input.val("");
					return;
				}
			}
			else{
				alert("Введите корректное целое число от -99 до 999");
				input.val("");
				return;
			}
		},
		//генерируем случайный массив
		generate: function(){
			var input = this.$('.header>form[name="generate"]>input[type="phone"]');
			var val = input.val();
			var  num = parseInt( val );
			if( num > 1 || (num && num == val) ){
				if(num <= sort.maxLength){
					this.arr.removeNumbers();
					this.arr.generateNumbers(num);
				}
				else{
					alert("Вы можете добавить максимум " + sort.maxLength + " цифр");
					input.val("");
					return;
				}
			}
			else{
				alert("Введите корректное целое число от 1 до " + sort.maxLength);
				input.val("");
				return;
			}
		},
		//старт построения дерева
		start: function(){
			if(this.arr.length < 1){
				alert("Сначала сгенерируйте массив");
				return;
			}
			this.generateButton.fix()
			this.startButton.fix()
			this.addButton.fix();
			//замыкание внутри замыкания для последовательного создания шагов анимации и ее выполнения
			(function(o){
				if(o.label < o.count){
					o.callee = arguments.callee;
					sort.container.arr.at(o.label).createSteps({
						func: arguments.callee,
						label: o.label,
						count: o.count
					});
				}
				else{
					(function(o){
						if(o.count < sort.container.arr.length){
							sort.container.arr.at(o.count).toDisplay({
								func: arguments.callee,
								count: o.count
							});
						}
						else{
							sort.container.startButton.toButton("finish");
							sort.container.startButton.unfix();
							
						}
					})({
						count: 0
					});
				}
			})({
				count: sort.container.arr.length,
				label: 0
			});
		},
		//разрушаем дерево
		finish: function(){
			_.each(sort.container.arr.toArray(),function(model){
				model.column.$el.find(".number>svg").css({opacity: 0});
			},this)
			setTimeout(function(){
				sort.container.upNumbers();
				sort.container.startButton.fix();
				setTimeout(function(){
					sort.container.startButton.unfix();
					sort.container.startButton.toButton("clear");
					sort.container.binView.$el.css({ "height": "28px" });
				},sort.container.arr.length * 150 + 300);
			},500);
		},
		//очищаем рабочее пространство
		clear: function(){
			console.log("clear");
			this.arr.removeNumbers();
			
			setTimeout(function(){
				sort.container.bin.reset();
				sort.container.arr.reset();
				sort.container.generateButton.unfix();
				sort.container.addButton.unfix();
				sort.container.startButton.toButton("start");
			},this.arr.length * 100);
		},
		//разрушение дерева
		upNumbers: function(){
			sort.countInterval(function(index){
				var model = sort.container.arr.at(index);
				model.column.$el.find(".number").first().css({top: 0});
				model.view.$el.removeClass("unvisible hidden");
			},this.arr.length,150);
		}
	});
	//CREATE VARIABLES
	//вспомогательные переменные и функции
	this.animationTime = 300;
	this.pauseTimeout = 500;
	this.maxLength = 20;
	this.container = new Container;
	this.countInterval = function(func, count, interval){
		(function(o){
			o.count--;
			func(count - o.count - 1);
			if(o.count > 0){
				o.callee = arguments.callee;
				setTimeout(function(o){
					o.callee(o);
				},o.interval,o
				);
			}
		})({func:func,count:count,interval:interval});
	}
	this.parCount = function(model, count){
		if(model.get("parent") !== 0){
			count ++;
			count = arguments.callee(model.get("parent"), count);
		}
		return count;
	}
}
//SPART APPLICATION
//создаем основной экземпляр приложения
var kort = new SortDocument("#container");