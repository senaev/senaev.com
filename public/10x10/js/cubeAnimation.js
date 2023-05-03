/**
 * Created by Admin on 11.11.2014.
 */
define(['data'], function (d) {
    var cubeAnimation = function (o) {

        var action,
            duration,
            dur,
            cube;
        cube = this;
        action = o.action;
        duration = o.duration;
        switch (action) {
            //движение вправо со столкновением
            case "srBump":
                slideWithBump("left", "+");
                break;
            //движение вправо со столкновением
            case "sbBump":
                slideWithBump("top", "+");
                break;
            //движение вправо со столкновением
            case "slBump":
                slideWithBump("left", "-");
                break;
            //движение вправо со столкновением
            case "stBump":
                slideWithBump("top", "-");
                break;
            //движение с последующим вливанием в поле
            case "toSide":
                var field = cube.field;
                var sign = "-";
                var prop = "left";
                if (field === "top" || field === "bottom") {
                    prop = "top";
                    if (field === "bottom") {
                        sign = "+";
                    }
                }
                else {
                    if (field === "right") {
                        sign = "+";
                    }
                }
                slideToSide(prop, sign);
                break;
            //передвигаем кубик в боковом поле ближе к mainField
            case "nearer":
                nearer();
                break;
            //кубик появляется третим в боковом поле
            case "apperanceInSide":
                apperance();
                break;
            //третий кубик в боковой линии пропадает
            case "disapperanceInSide":
                disapperance();
                break;
                e();
                break;
            //передвигаем кубик в боковой панели дальше от mainField
            case "forth":
                forth();
                break;
            //передвигаем кубик в боковой панели дальше от mainField
            case "boom":
                boom();
                break;
            //уменьшаем и в конце удаляем
            case "remove":
                cube.$el.transition({
                    scale: 0,
                    opacity: 0,
                    duration: duration * d.animTime,
                    easing: "out"
                }, function () {
                    cube.remove();
                });
                break;
            default:
                console.log("Неизвестная анимация: " + action);
                break
        }


        function bezier(duration) {
            var o = {
                1: 99,
                2: 58,
                3: 42,
                4: 34,
                5: 27,
                6: 23,
                7: 19,
                8: 15,
                9: 12,
                10: 11,
                11: 10
            }
            return o[duration];
        }

        function slideWithBump(prop, sign) {
            dur = duration - 1;
            var scale = (prop === "left") ? [0.9, 1.1] : [1.1, 0.9];
            var trans0 = {
                duration: d.animTime * dur,
                easing: 'cubic-bezier(.' + bezier(dur) + ', 0, 1, 1)'
            };
            trans0[prop] = sign + '=' + dur * d.oneWidth;
            var trans1 = {
                scale: scale,
                duration: d.animTime / 2
            };
            trans1[prop] = (sign === "+" ? "+" : "-") + "=4";
            var trans2 = {
                scale: 1,
                duration: d.animTime / 2
            };
            trans2[prop] = (sign === "+" ? "-" : "+") + "=4";
            cube.$el.transition(trans0)
                .transition(trans1)
                .transition(trans2);
        }

        function slideToSide(prop, sign) {
            /*
             * движение в боковую панель без разрывов анимации,
             * чтобы сохранить максимальную плавность анимации, делать
             * одним перемещением по возможности
             * */
            dur = duration;
            //задаем нужный изинг
            var easing = 'cubic-bezier(.' + bezier(dur) + ', 0,.' + (100 - bezier(dur)) + ', 1)';
            var trans = {
                duration: d.animTime * dur,
                easing: easing
            };
            trans[prop] = sign + '=' + dur * d.oneWidth;

            //отправляем в коллекцию команду вставки кубика в линию,
            //чтобы остальные кубики в этой линии пододвинулись
            setTimeout(function (cube) {
                cube.app.cubes.animate({action: "inLine", cube: cube});
            }, d.animTime * (dur - 1), cube);

            //анимируем движение, в конце - убираем стрелку, меняем классы
            cube.$el.transition(trans, function () {
                var dir = d.f.reverseField(cube.field);
                cube.$el.removeClass("d" + cube.field + " f" + dir)
                    .addClass("f" + cube.field);
            });
        }

        function nearer() {
            var prop,
                sign = "-",
                trans = {duration: d.animTime};

            if (cube.field === "top" || cube.field === "bottom") {
                prop = "top";
                if (cube.field === "top") {
                    sign = "+";
                }
            }
            else {
                prop = "left";
                if (cube.field === "left") {
                    sign = "+";
                }
            }
            trans[prop] = sign + "=" + duration * d.oneWidth;
            cube.$el.transition(trans)
        }

        function forth() {
            var prop,
                sign = "+",
                trans = {duration: d.animTime};

            if (cube.field === "top" || cube.field === "bottom") {
                prop = "top";
                if (cube.field === "top") {
                    sign = "-";
                }
            }
            else {
                prop = "left";
                if (cube.field === "left") {
                    sign = "-";
                }
            }
            trans[prop] = sign + "=" + duration * d.oneWidth;
            cube.$el.transition(trans)
        }

        function apperance() {
            var pos = {x: cube.x, y: cube.y};
            switch (cube.field) {
                case "top":
                    pos.y = d.cubesWidth - 3;
                    break;
                case "right":
                    pos.x = 2;
                    break;
                case "bottom":
                    pos.y = 2;
                    break;
                case "left":
                    pos.x = d.cubesWidth - 3;
                    break;
            }
            cube.toState(pos);
            cube.$el.removeClass("cubeHidden")
                .css({scale: 0, opacity: 0.4})
                .transition({
                    scale: 1,
                    opacity: 1,
                    duration: duration * d.animTime,
                    delay: duration * d.animTime,
                    easing: "out"
                });
        }

        function disapperance() {
            cube.$el.transition({
                scale: 0,
                opacity: 0,
                duration: duration * d.animTime,
                easing: "out"
            });
            setTimeout(function (cube) {
                cube.$el.css({
                    scale: 1,
                    opacity: 1
                }).addClass("cubeHidden");
            }, duration * d.animTime, cube);
        }

        function boom() {
            //console.log("boom:",cube.color, cube.x, cube.y);
            cube.$el.transition({
                scale: 1.5,
                opacity: 0,
                duration: d.animTime,
                easing: "out"
            }, function () {
                cube.remove();
            });
        }
    };

    return cubeAnimation;
});