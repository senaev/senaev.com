/**
 * Created by aa.senaev on 03.11.2014.
 */
define(['data'], function(d){
    /**
     * класс для удобной работы с м-кубиком
     * м-кубик представляем из себя абстрактный объек кубика со всеми
     * необходимыми данными для построения карты хода и карты
     * анимации этого хода, м-кубики хранятся в массиве mainMask.arr
     */
    function MCube(o) {
        this.x = o.x;
        this.y = o.y;
        this.color = o.color;
        this.direction = o.direction;
        this.extra = o.extra;
        this.mainMask = o.mainMask;

        this.rand = d.f.rand(0, 1000000);
        //метка, означающая, что м-кубик вошел в группу по цветам(у него есть смежные кубики того же цвета)
        //если значение null - нету, или еще не найдено, если не null - адрес заданной группы
        this.inGroup = null;
        //массив шагов анимации для кубика, в м-кубике это просто массив, каждое значение которого -
        //действие кубика последовательно в каждый шаг анимации, может быть полностью заполнен
        //значениями null, более подробная анимация генерируется перебором этих значений в moveMap.createAnimationMap
        this.steps = [];
        this.cube = o.cube;
    }
    //один шаг для м-кубика, возвращает информацию о шаге для анимации
    MCube.prototype.oneStep = function () {
        var step;
        step = {};
        //если м-кубик взорван, он стоит на месте
        if(this.x === -1 && this.y === -1) {
            step.do = null;
        }
        else{
            //если м-кубик не имеет направления - он стоит на месте
            if (this.direction !== null) {
                //если у м-кубика имеется направление, подсчитываем, где он может оказаться
                var nextPos = {x: this.x, y: this.y};
                var prop;
                if (this.direction === "top" || this.direction === "bottom") {
                    this.direction === "top" ? nextPos.y-- : nextPos.y++;
                }
                else {
                    this.direction === "left" ? nextPos.x-- : nextPos.x++;
                }
                //если следующая позиция - одно из боковых полей - отправляем кубик туда
                if (nextPos.x < 0 || nextPos.x > 9 || nextPos.y < 0 || nextPos.y > 9) {
                    this.x = nextPos.x;
                    this.y = nextPos.y;
                    this.direction = null;
                    step.do = "toSide";
                }
                else {
                    //если нет, идет обращение к коллекции м-кубиков, чтобы узнать, свободна ли следующая клетка
                    if (this.mainMask._get(nextPos) === null) {
                        //если следующая клетка свободна, задаем значениям позиции кубика значения следующей клетки
                        this.x = nextPos.x;
                        this.y = nextPos.y;
                        step.do = "s" + this.direction.charAt(0);
                    }
                    else {
                        //если клетка занята - кубик стоит на месте
                        step.do = null;
                    }
                }
            }
            else {
                //если не имеет - стоит на мется
                step.do = null;
            }
        }
        this.steps.push(step);

        //возвращаем значение объекту mainMask, чтобы он знал, что что-то произошло
        return step;
    };

    return MCube;
});