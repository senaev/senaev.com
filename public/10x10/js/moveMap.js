define(['data', 'mainMask'], function (d, MainMask) {
    /**
     * класс для удобной работы с абстрактным классом MainMask
     * абстрагирует функции, связанные с анимацией от этого класса
     * сочетает в себе как функцию генерации хода, так и генерации анимации
     * предаставляет удобрый интерфейс для доступа к методам построения хода
     * для основного приложения
     */
    function MoveMap() {
        var undefined;

        var moveMap = this;
        this.generate = function (o) {
            var cubes,
                mainMask;


            this.cubes = o.cubes;
            this.startCubes = o.startCubes;

            this.beyondTheSide = [];

            this.app = o.app;

            //создаем класс маски
            this.mainMask = new MainMask({
                startCubes: this.startCubes,
                cubes: this.cubes,
                moveMap: this
            });

            //генерируем из м-кубиков маски карту анимации
            this.createAnimationMap();
        };

        //строим анимацию для каждого кубика одтельно на основе steps каждого м-кубика
        this.createAnimationMap = function () {
            this.animationMap = [];
            var noEmptyActions = [];

            //массив вхождений в боковые поля, в нём хранятся м-кубики, попавшие в боковые поля
            //в последовательности,  в которой они туда попали
            this.toSideActions = [];

            //поскольку у каждого кубика одинаковое число шагов анимации, чтобы
            //узнать общую продолжительность анимации, просто берем длину шагов первого попавшегося кубика
            this.animationLength = this.mainMask.arr[0].steps.length;

            //console.log("////inMainActions:", this.mainMask.arr);

            //проходимся в цикле по всем кубикам
            for (var key in this.mainMask.arr) {
                var mCube = this.mainMask.arr[key];
                var steps = mCube.steps;
                //массив с действиями одного кубика
                var actions = [{action: null, duration: 0}];
                //пробегаемся по массиву шагов анимации
                for (var key1 = 0; key1 < steps.length; key1++) {
                    //один шаг анимации
                    var step = steps[key1];
                    //последний шаг анимации, к которому добавляем продолжительность
                    //в случае совпадения со следующим шагом
                    var lastAction = actions[actions.length - 1];
                    //если это такой же шаг, как и предидущий
                    if (step.do === lastAction.action) {
                        //иначе просто увеличиваем продолжительность предидущего
                        lastAction.duration++;
                    }
                    else {
                        //для каждого действия - по-своему, в том числе в зависимости от предидущих действий
                        switch (step.do) {
                            case "toSide":
                                lastAction.action = "toSide";
                                lastAction.duration++;
                                //для сортиравки попаданий в боковое поле
                                mCube.toSideTime = key1;
                                //заносим м-кубик в массив попадания в боковое поле
                                this.toSideActions.push(mCube);
                                break;
                            case null:
                                if (["st", "sr", "sl", "sb"].indexOf(lastAction.action) > -1) {
                                    lastAction.action = lastAction.action + "Bump";
                                    lastAction.duration++;
                                }
                                else {
                                    actions.push({action: step.do, duration: 1});
                                }
                                break;
                            default:
                                actions.push({action: step.do, duration: 1});
                                break;
                        }
                    }
                }
                if (actions.length === 1 && actions[0].action === null) {
                    actions.shift();
                }

                //console.log(actions);

                //подтягиваем задержки
                if (actions.length !== 0) {
                    //итоговый массив, в котором продолжительность анимаций
                    //и задержки выстроены, как надо
                    var nullToDelayActions = [];
                    var delay = 0;
                    for (var key1 = 0; key1 < actions.length; key1++) {
                        var action = actions[key1];
                        //выставляем задержку от начала хода
                        action.delay = delay;
                        //добавляем к задержке следующего действия текущую продолжительность
                        delay += action.duration;
                        if (action.action !== null) {
                            nullToDelayActions.push(action);
                        }
                    }
                    this.animationMap.push({
                        actions: nullToDelayActions,
                        cube: this.mainMask.arr[key].cube
                    });
                }
            }
            //сортируем попавшие в боковое поле м-кубики по времени попадания
            this.toSideActions.sort(function (a, b) {
                return a.toSideTime - b.toSideTime;
            });
        };

        //когда ход прощитан, запускаем саму анимацию
        this.animate = function () {
            var map;
            var startCubes = this.startCubes;

            //блокируем приложение от начала до конца анимации
            //минус один - потому, что в последний такт обычно анимация чисто символическая
            this.app.blockApp = true;
            setTimeout(
                function (app) {
                    app.blockApp = false;

                    //удаляем ненужные html-элементы
                    for (var key in moveMap.beyondTheSide) {
                        moveMap.beyondTheSide[key].remove();
                    }

                    //разблокируем кнопку назад, если не случился переход на новый уровень
                    //иначе - блокируем
                    if (app.end === "next_level") {
                        app.undoButton._set({
                            active: true,
                            func: app.refresh,
                            caption: "refresh"
                        });
                    }
                    else {
                        app.undoButton._set({
                            active: true,
                            func: app.undo,
                            caption: "undo"
                        });
                    }

                    if (app.end !== null) {
                        switch (app.end) {
                            case "next_level":
                                app.nextLevel();
                                break;
                            case "game_over":
                                app.endOfGame();
                                break;
                            default:
                                throw new Error("Неверное значение в app.end: ", app.end);
                                break;
                        }
                    }
                },
                this.animationLength * d.animTime - 1,
                this.app
            );

            this.cubes.animate({action: "fromLine", cube: startCubes});

            //добавляем постоянную стрелку к html-элементу кубика, с которого начинается анимация
            for (var key in startCubes) {
                startCubes[key].$el.addClass("d" + startCubes[key].direction);
            }

            //перебираем карту анимации и передаем каждому кубику объект действия,
            //состоящий из переменных: само действие, продолжительность, задержка перед выполнением,
            //далее кубик запускает таймер до выполнения и выполняет нужную анимацию
            map = this.animationMap;
            for (var key in map) {
                var cube = map[key].cube;
                var actions = map[key].actions;
                for (var key1 in actions) {
                    var action = actions[key1];
                    cube.addAnimate(action);
                }
            }
        };


        /**
         * Функции, которым могут понадобиться в дальнейшем
         */
            //создание цветовой схемы, в которой каждому цвету присваивается число
        this.generateColorSheme = function () {
            var colors = {};
            for (var key = 0; key < d.colors.length; key++) {
                colors[d.colors[key]] = key;
            }
            this.colorSheme = colors;
        };
    };
    return MoveMap;
});