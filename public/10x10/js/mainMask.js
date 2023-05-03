/**
 * Created by aa.senaev on 03.11.2014.
 */
define(['mCube', 'data'], function (MCube, d) {

    /**
     * класс для маски(слепок текущего состояния с возможностью создать пошагово один ход игры)
     * класс передается коллекция кубиков, а также кубик, с которого начинается анимация.
     * во время создания экземпляра класса коздаётся массив м-кубиков( экземпляков класса МКубе),
     * затем пожагово - обращение к каждому м-кубику, методом oneStep, в котором автоматически меняются
     * параметры состояния и создаётся объект из последовательности шагов для построения анимации
     */
    function MainMask(o) {
        var cubes,
            startCubes,
            mainMask,
            undefined;

        mainMask = this;
        cubes = o.cubes;
        startCubes = o.startCubes;

        this.moveMap = o.moveMap;

        //основной массив со значениями
        //сюда будут попадать м-кубики, учавствующие в анимации
        this.arr = [];
        //создаем маску, берем значения из коллекции кубес
        this.initialize = function () {
            var startMCubeX,
                startMCubeY;


            //создаем массив из всех кубиков, которые есть на доске
            cubes._mainEach(function (cube) {
                mainMask.arr.push(new MCube({
                    x: cube.x,
                    y: cube.y,
                    color: cube.color,
                    direction: cube.direction,
                    extra: cube.extra,
                    mainMask: mainMask,
                    cube: cube
                }));
            });
            //добавляем в маску кубик, с которого начинаем анимацию
            var startMCubes = [];
            for(var key in startCubes) {
                var startMCube;
                var startCube = startCubes[key];

                if (startCube.field === "top" || startCube.field === "bottom") {
                    startMCubeX = startCube.x;
                    if(startCube.field === "top") {
                        startMCubeY = (startCubes.length - key) - 1;
                    }
                    else{
                        startMCubeY = (d.cubesWidth - startCubes.length) + parseInt(key);
                    }
                }
                else {
                    if(startCube.field === "left") {
                        startMCubeX = (startCubes.length - key) - 1;
                    }
                    else{
                        startMCubeX = (d.cubesWidth - startCubes.length) + parseInt(key);
                    }
                    startMCubeY = startCube.y;
                }
                //console.log(startMCubeX, startMCubeY);
                startMCube = new MCube({
                    x: startMCubeX,
                    y: startMCubeY,
                    color: startCube.color,
                    direction: startCube.direction,
                    extra: startCube.extra,
                    mainMask: mainMask,
                    cube: startCube
                });
                this.arr.push(startMCube);
                startMCubes.push(startMCube);
            }

            //добавим шаги анимации для выплывающих из боковой линии кубиков
            for(var step in startMCubes) {
                for (var key in this.arr) {
                    if(startMCubes.indexOf(this.arr[key]) === -1){
                        this.arr[key].steps.push({do: null});
                    }
                    else{
                        this.arr[key].steps.push({do: "s" + this.arr[key].direction.charAt(0)});
                    }
                }
            }
        };
        //вызываем инициализацию
        this.initialize();
        //один ход для всех кубиков на доске
        this.step = function () {
            //индикатор конца движений, если что-то происходит во время шага анимации -
            //вызываем следующий шаг, если нет, то либо заканчиваем ход если нету смежных одинаковых кубиков,
            //либо вызываем подрыв эких кубиков и вызываем следующий шаг анимации
            var somethingHappend;

            somethingHappend = false;
            for (var key in this.arr) {
                var oneStep;
                oneStep = this.arr[key].oneStep();
                if (oneStep.do !== null) {
                    somethingHappend = true;
                }
            }

            //проверяем, произошло что-то или нет в конце каждого хода
            if (somethingHappend) {
                this.step();
            }
            else {
                //ищем, появились ли у нас в результате хода смежные кубики
                //и если появились - делаем ещё один шаг хода, если нет - заканчиваем ход
                var adjacentCubes = this.searchAdjacentCubes();
                if (adjacentCubes.length) {
                    //console.log(adjacentCubes);
                    //если такие группы кубиков имеются, подрываем их и запускаем
                    //еще один шаг хода, при этом обновляем массив м-кубиков
                    //сюда попадут все кубики, которые будут взорваны
                    for (var key in adjacentCubes) {
                        var group = adjacentCubes[key];
                        //console.log(group);
                        for (var key in this.arr) {
                            if (group.indexOf(this.arr[key]) === -1) {
                                this.arr[key].steps.push({do: null});
                            }
                            else {
                                //console.log("add boom in:",this.arr[key]);
                                this.arr[key].steps.push({do: "boom"});
                                //взорвавшимся м-кубикам присваиваем координаты -1 -1,
                                //чтобы в дальнейшей анимации они не учавствовали
                                this.arr[key].x = -1;
                                this.arr[key].y = -1;
                            }
                        }
                    }
                    //продолжаем ход
                    this.step();
                }
                else {
                    //заканчиваем ход
                }
            }
        };
        this.searchAdjacentCubes = function () {
            var arr = this.arr,
                byColorPrev = {},
                byColor = {};

            //создаем объект с массивами м-кубиков по цветам
            for (var key in arr) {
                //неободимо сбрасывать каждый раз иначе может возникнуть ситтуация:
                //кубики летели, соприкоснулись, создалась группа, взорвались другие
                //кубики, один из кубиков полетел дальше, нашел кубик того же цвета
                //и добавил его в группу, в итоге образовалась группа из трех кубиков,
                //которые по факту не вместе
                arr[key].inGroup = null;

                var mCube = arr[key];
                //если такого значения в объекте еще нет - сздаем его
                if (byColorPrev[mCube.color] === undefined) {
                    byColorPrev[mCube.color] = [];
                }
                //добавляем в этот массив все кубики, которые есть на доске
                if (mCube.x > -1 && mCube.x < d.cubesWidth && mCube.y > -1 && mCube.y < d.cubesWidth) {
                    byColorPrev[mCube.color].push(mCube);
                }
            }
            //если количество кубиков определенного цвета на доске меньшь двух,
            //исключаем эту группу кубиков из обработки
            for (var key in byColorPrev) {
                if (byColorPrev[key].length > 2) {
                    byColor[key] = byColorPrev[key];
                }
            }

            //ищем группы смежных кубиков и помещаем их в массив groups
            var groups = [];
            for (var key in byColor) {
                groups = groups.concat(this.searchAdjacentCubesByColor(byColor[key]));
            }
            return groups;
        };

        //функция поиска смежных в массиве по цветам
        this.searchAdjacentCubesByColor = function (arr) {
            var group;
            for (var key = 0; key < arr.length - 1; key++) {
                //текущий кубик
                var current = arr[key];
                for (var key1 = key + 1; key1 < arr.length; key1++) {
                    //кубик, который проверяем на смежность текущену кубику
                    var compare = arr[key1];
                    //если кубики смежные
                    if (Math.abs(current.x - compare.x) + Math.abs(current.y - compare.y) === 1) {
                        var group;
                        //если текущий кубик не принадлежик групппе
                        if (current.inGroup === null) {
                            //и кубик, с которым сравниваем не принадлежит группе
                            if (compare.inGroup === null) {
                                //создаём группу
                                group = [current, compare];
                            }
                            //а если кубик, с которым сравниваем, принадлежит группе
                            else {
                                //закидываем текущий кубик в группу кубика, с которым сравниваем
                                group = compare.inGroup;
                                compare.inGroup.push(current);
                            }
                        }
                        //если же текущий кубик принадлежит группе
                        else {
                            //а кубик, с которым савниваем принадлежит
                            if (compare.inGroup === null) {
                                //закидываем кубик, с которым сравниваем, в группу текущего
                                group = current.inGroup;
                                current.inGroup.push(compare);
                            }
                            else {
                                //иначе закидываем все кубики и группы сравниваемого в группу текущего
                                group = current.inGroup;
                                if (current.inGroup !== compare.inGroup) {
                                    for (var key2 in compare.inGroup) {
                                        if(current.inGroup.indexOf(compare.inGroup[key]) === -1) {
                                            group.push(compare.inGroup[key2]);
                                        }
                                    }
                                }
                            }
                        }
                        //пробегаем в цикле по измененной или созданной группе
                        //и меняем значене принадлежности к группе кубиков на измененную группу
                        for (var key2 in group) {
                            group[key2].inGroup = group;
                        }
                    }
                }

            }

            //теперь, когда группы созданы, выбираем из кубиков все
            //существующие неповторяющиеся группы
            var groups = [];
            for (var key in arr) {
                group = arr[key].inGroup;
                //добавляем ненулевые, уникальные, имеющие не менее трёх кубиков группы
                if (group !== null && group.length > 2 && groups.indexOf(group) === -1) {
                    groups.push(group);
                }
            }

            return groups;
        };

        this.step();
    }

    //поскольку маска - несортированный масив, получаем куб методом перебора
    MainMask.prototype._get = function (o) {
        var arr;
        arr = this.arr;
        for (var key in arr) {
            if (arr[key].x === o.x && arr[key].y === o.y) {
                return arr[key];
            }
        }
        return null;
    };

    return MainMask;
});

