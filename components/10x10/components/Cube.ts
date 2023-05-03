// import $ from 'jquery';

// import { CUBES_DATA, type CubeColor } from '../const/CUBES_DATA';
// import type { CubeDirection } from '../types/CubeDirection';

// import type { TenOnTen } from './TenOnTen';

// export type CubeDisappearance = 'cool' | undefined;
// export type CubeField = CubeDirection | 'main';

// export class Cube {
//     private readonly x: number;

//     private readonly y: number;

//     private disapperance: CubeDisappearance;

//     private readonly rand: number;

//     private readonly field: CubeField;

//     private readonly app: TenOnTen;

//     private readonly extra: unknown;

//     private direction: CubeDirection | null | undefined;

//     private color: CubeColor;

//     private readonly $el: JQuery;

//     constructor(o: {
//         x: number;
//         y: number;
//         disapperance: CubeDisappearance;
//         field: CubeField;
//         app: TenOnTen;
//         direction: CubeDirection | undefined;
//         color: CubeColor | undefined;
//     }) {
//         let visibleModeClasses;

//         this.x = o.x;
//         this.y = o.y;

//         if (o.disapperance !== undefined) {
//             this.disapperance = o.disapperance;
//         }

//         this.rand = CUBES_DATA.f.rand(0, 1000000);

//         this.field = o.field;
//         // указатель на игру, к которой кубик привязан
//         this.app = o.app;
//         // понадобится дополнительно для дополнительных функций кубика
//         this.extra = {};
//         // направнение движения
//         if (o.direction === undefined) {
//             this.direction = ((field: CubeField): CubeDirection | null => {
//                 if (field === 'top') {
//                     return 'bottom';
//                 } else if (field === 'bottom') {
//                     return 'top';
//                 } else if (field === 'left') {
//                     return 'right';
//                 } else if (field === 'right') {
//                     return 'left';
//                 }

//                 return null;
//             })(this.field);
//         } else {
//             this.direction = o.direction;
//         }
//         // задаем цвет кубика
//         if (o.color === undefined) {
//             this.color = CUBES_DATA.colors[CUBES_DATA.f.rand(0, CUBES_DATA.f.level.colorsCount(this.app.level) - 1)]!;
//         } else {
//             this.color = o.color;
//         }

//         // проверка на то, что данный кубик в боковом поле дальше третьего и не должен быть отображен
//         if (this.field !== 'main') {
//             if (this._inFieldIsVisible()) {
//                 visibleModeClasses = ' ';
//             } else {
//                 visibleModeClasses = ' cubeHidden';
//             }
//         } else {
//             visibleModeClasses = ' ';
//         }

//         let directionClass = '';
//         if (this.field === 'main' && this.direction !== null) {
//             directionClass = `d${this.direction}`;
//         }

//         // указатель на DOM-элемент кубика с прослушиванием событий
//         this.$el = $('<div class="cube"></div>')
//             .addClass(`${this.color} f${this.field}${visibleModeClasses}${directionClass}`)
//             .hover(
//                 (e) => {
//                     e.preventDefault();

//                     if (this.field === 'main') {

//                     } else {
//                     // cube.findFirstInLine().$el.addClass("firstInHoverLine");
//                         const allToFirstInLine = this.findAllInLineCanGoToMain();
//                         if (typeof allToFirstInLine !== 'string') {
//                             for (const key in allToFirstInLine) {
//                                 allToFirstInLine[key].$el.addClass('firstInHoverLine');
//                             }
//                         }
//                     }
//                 },
//                 (e) => {
//                     e.preventDefault();

//                     if (this.field === 'main') {

//                     } else {
//                     // cube.findFirstInLine().$el.removeClass("firstInHoverLine");
//                         const allToFirstInLine = this.findAllInLineCanGoToMain();
//                         if (typeof allToFirstInLine !== 'string') {
//                             for (const key in allToFirstInLine) {
//                                 allToFirstInLine[key].$el.removeClass('firstInHoverLine');
//                             }
//                         }
//                     }
//                 },
//             )
//             .click((e) => {
//                 // не даем продолжить выполнение событий
//                 e.preventDefault();
//                 // и снимаем курсор с элемента
//                 this.$el.trigger('mouseout');

//                 // если стоит блокировка событий приложения - не даём пользователю ничего сделать
//                 if (this.app.blockApp) {
//                     return;
//                 }

//                 // если щелчек произошол по главному полю - ничего не делаем
//                 if (this.field === 'main') {

//                 }
//                 // если по боковому
//                 else {
//                     // ищем первые кубики в одной линии бокового поля с кубиком, по  которому щелкнули,
//                     // которые могут выйти из поля
//                     const startCubes = this.findAllInLineCanGoToMain();
//                     // если пришел не массив - выполняем анимацию
//                     if (typeof startCubes === 'string') {
//                         const scale = (this.field === 'left' || this.field === 'right') ? [0.8, 1.2] : [1.2, 0.8];
//                         this.$el.transition({
//                             scale,
//                             duration: CUBES_DATA.animTime,
//                         }).transition({
//                             scale: 1,
//                             duration: CUBES_DATA.animTime,
//                         });
//                     }
//                     // и отправляем их в путь-дорогу
//                     else {
//                         this.app.run({ startCubes });
//                     }
//                 }
//             });

//         this.toField();
//     }

//     // отправляем созданный кубик в приложение - добавляем в коллекцию cubes и в html-контейнер
//     private toField() {
//         this.app.cubes._add(this);
//         this.toState();

//         if (this.disapperance !== undefined && this.disapperance === 'cool') {
//             this.$el.css({ scale: 0 })
//                 .appendTo(this.app.container)
//                 .transition({
//                     scale: 1,
//                     duration: d.animTime * 4,
//                 });
//             delete this.disapperance;
//         } else {
//             this.$el.appendTo(this.app.container);
//         }
//     }

//     // ищем первый кубик в одной линии бокового поля с кубиком, по  которому щелкнули
//     private findFirstInLine() {
//         const o = { field: this.field };
//         if (o.field === 'top' || o.field === 'bottom') {
//             o.x = this.x;
//             o.y = (o.field === 'top') ? 9 : 0;
//         } else {
//             o.x = (o.field === 'left') ? 9 : 0;
//             o.y = this.y;
//         }
//         return this.app.cubes._get(o);
//     }

//     // находим все кубики от этого до ближнего к майн в линии относительно этого
//     private findAllInLineCanGoToMain() {
//         let statProp = 'y';
//         let dynamicProp = 'x';
//         if (this.field === 'top' || this.field === 'bottom') {
//             statProp = 'x';
//             dynamicProp = 'y';
//         }
//         // проверяем, сколько кубиков можно достать из боковой линии
//         // по количеству свободных клеток в поле майн
//         const cellsMain = (this.field === 'top' || this.field === 'left') ? [0, 1, 2] : [9, 8, 7];
//         const cellsSide = (this.field === 'top' || this.field === 'left') ? [9, 8, 7] : [0, 1, 2];
//         let pos = { field: 'main' };
//         pos[statProp] = this[statProp];
//         let count = 0;
//         for (var key in cellsMain) {
//             pos[dynamicProp] = cellsMain[key];
//             if (this.app.cubes._get(pos) === null) {
//                 count++;
//             } else {
//                 break;
//             }
//         }

//         // проверяем, если линия пустая, ходить вообще нельзя
//         let allNullInLine = true;
//         for (var key = 0; key < d.cubesWidth; key++) {
//             pos[dynamicProp] = key;
//             if (this.app.cubes._get(pos) !== null) {
//                 allNullInLine = false;
//                 break;
//             }
//         }

//         const arr = [];
//         // если все нули в линии - возвращаем индикатор пустоты
//         if (allNullInLine) {
//             return 'empty';
//         }

//         if (count !== 0) {
//             pos = { field: this.field };
//             pos[statProp] = this[statProp];
//             for (var key = 0; key < 3 && key < count; key++) {
//                 pos[dynamicProp] = cellsSide[key];
//                 arr.push(this.app.cubes._get(pos));
//                 // если доходим до кубика, над которым курсор - заканчиваем маневр
//                 if (this.app.cubes._get(pos) === this) {
//                     break;
//                 }
//             }
//             return arr;
//         }
//         // если сразу за полем кубик - ничего не возвращаем

//         return 'block';

//     }

//     // задаем html-элементу кубика положение на доске
//     // если параметры не переданы, устанавливаем текущую позицию кубика
//     // если переданы - устанавливаем в поле кубику, в позицию х/у, переданные в параметрах
//     private toState(o) {
//         let x;
//         let y;
//         if (o === undefined) {
//             x = this.x;
//             y = this.y;
//         } else {
//             x = o.x;
//             y = o.y;
//         }
//         let left = x * d.oneWidth;
//         let top = y * d.oneWidth;
//         switch (this.field) {
//             case 'top':
//                 top -= d.oneWidth * 10;
//                 break;
//             case 'right':
//                 left += d.oneWidth * 10;
//                 break;
//             case 'bottom':
//                 top += d.oneWidth * 10;
//                 break;
//             case 'left':
//                 left -= d.oneWidth * 10;
//                 break;
//         }
//         this.$el.css({
//             left,
//             top,
//         });
//     }

//     // добавляем объект анимации на обработку через время, полученное в атрибутах
//     private addAnimate(o) {
//         let action;
//         let cube;
//         let delay;
//         let duration;

//         action = o.action;
//         delay = o.delay;
//         duration = o.duration;
//         cube = this;
//         setTimeout((o) => {
//             cube.animate(o);
//         }, delay * d.animTime, { action, duration });
//     }

//     // добавляем объект анимации на обработку через время, полученное в атрибутах
//     private remove() {
//         this.$el.remove();
//     }

//     // сама функция анимации - в зависимости от переданного значения, выполняем те или иные
//     // преобразования html-элемента кубика
//     private animate(o: {
//         action: unknown;
//         duration: number;
//     }) {
//         let dur;
//         const { action, duration } = o;
//         let sign: '-' | '+' = '-';
//         let prop: 'left' | 'top' = 'left';

//         switch (action) {
//         // движение вправо со столкновением
//             case 'srBump':
//                 slideWithBump('left', '+');
//                 break;
//                 // движение вправо со столкновением
//             case 'sbBump':
//                 slideWithBump('top', '+');
//                 break;
//                 // движение вправо со столкновением
//             case 'slBump':
//                 slideWithBump('left', '-');
//                 break;
//                 // движение вправо со столкновением
//             case 'stBump':
//                 slideWithBump('top', '-');
//                 break;
//                 // движение с последующим вливанием в поле
//             case 'toSide':
//                 if (this.field === 'top' || this.field === 'bottom') {
//                     prop = 'top';
//                     if (this.field === 'bottom') {
//                         sign = '+';
//                     }
//                 } else if (this.field === 'right') {
//                     sign = '+';
//                 }

//                 slideToSide(prop, sign);
//                 break;
//                 // передвигаем кубик в боковом поле ближе к mainField
//             case 'nearer':
//                 nearer();
//                 break;
//                 // кубик появляется третим в боковом поле
//             case 'apperanceInSide':
//                 apperance();
//                 break;
//                 // третий кубик в боковой линии пропадает
//             case 'disapperanceInSide':
//                 disapperance();
//                 break;
//                 // передвигаем кубик в боковой панели дальше от mainField
//             case 'forth':
//                 forth();
//                 break;
//                 // передвигаем кубик в боковой панели дальше от mainField
//             case 'boom':
//                 boom();
//                 break;
//                 // уменьшаем и в конце удаляем
//             case 'remove':
//                 // eslint-disable-next-line @typescript-eslint/no-unsafe-call -- ignore
//                 this.$el.transition({
//                     scale: 0,
//                     opacity: 0,
//                     duration: duration * CUBES_DATA.animTime,
//                     easing: 'out',
//                 }, () => {
//                     this.remove();
//                 });
//                 break;
//             default:
//                 // eslint-disable-next-line no-console -- ignore
//                 console.log(`Неизвестная анимация: ${String(action)}`);
//                 break;
//         }

//         function bezier(localDuration: number) {
//             const numbers: Record<string, number> = {
//                 1: 99,
//                 2: 58,
//                 3: 42,
//                 4: 34,
//                 5: 27,
//                 6: 23,
//                 7: 19,
//                 8: 15,
//                 9: 12,
//                 10: 11,
//                 11: 10,
//             };

//             return numbers[localDuration.toString()];
//         }

//         function slideWithBump(locaProp: typeof prop, loaclSign: typeof sign) {
//             dur = duration - 1;
//             const scale = (locaProp === 'left') ? [0.9, 1.1] : [1.1, 0.9];
//             const trans0: Pick<JQueryTransitOptions, 'duration' | 'easing' | 'x' | 'y'> = {
//                 duration: CUBES_DATA.animTime * dur,
//                 easing: `cubic-bezier(.${String(bezier(dur))}, 0, 1, 1)`,
//             };
//             trans0[locaProp] = `${loaclSign}=${dur * d.oneWidth}`;
//             const trans1 = {
//                 scale,
//                 duration: d.animTime / 2,
//             };
//             trans1[locaProp] = `${loaclSign === '+' ? '+' : '-'}=4`;
//             const trans2 = {
//                 scale: 1,
//                 duration: d.animTime / 2,
//             };
//             trans2[locaProp] = `${loaclSign === '+' ? '-' : '+'}=4`;
//             this.$el.transition(trans0)
//                 .transition(trans1)
//                 .transition(trans2);
//         }

//         function slideToSide(prop, sign) {
//         /*
//          * движение в боковую панель без разрывов анимации,
//          * чтобы сохранить максимальную плавность анимации, делать
//          * одним перемещением по возможности
//          * */
//             dur = duration;
//             // задаем нужный изинг
//             const easing = `cubic-bezier(.${bezier(dur)}, 0,.${100 - bezier(dur)}, 1)`;
//             const trans = {
//                 duration: d.animTime * dur,
//                 easing,
//             };
//             trans[prop] = `${sign}=${dur * d.oneWidth}`;

//             // отправляем в коллекцию команду вставки кубика в линию,
//             // чтобы остальные кубики в этой линии пододвинулись
//             setTimeout((cube) => {
//                 cube.app.cubes.animate({ action: 'inLine', cube });
//             }, d.animTime * (dur - 1), this);

//             // анимируем движение, в конце - убираем стрелку, меняем классы
//             this.$el.transition(trans, () => {
//                 const dir = d.f.reverseField(this.field);
//                 this.$el.removeClass(`d${this.field} f${dir}`)
//                     .addClass(`f${this.field}`);
//             });
//         }

//         function nearer() {
//             let prop;
//             let sign = '-';
//             const trans = { duration: d.animTime };

//             if (this.field === 'top' || this.field === 'bottom') {
//                 prop = 'top';
//                 if (this.field === 'top') {
//                     sign = '+';
//                 }
//             } else {
//                 prop = 'left';
//                 if (this.field === 'left') {
//                     sign = '+';
//                 }
//             }
//             trans[prop] = `${sign}=${duration * d.oneWidth}`;
//             this.$el.transition(trans);
//         }

//         function forth() {
//             let prop;
//             let sign = '+';
//             const trans = { duration: d.animTime };

//             if (this.field === 'top' || this.field === 'bottom') {
//                 prop = 'top';
//                 if (this.field === 'top') {
//                     sign = '-';
//                 }
//             } else {
//                 prop = 'left';
//                 if (this.field === 'left') {
//                     sign = '-';
//                 }
//             }
//             trans[prop] = `${sign}=${duration * d.oneWidth}`;
//             this.$el.transition(trans);
//         }

//         function apperance() {
//             const pos = { x: this.x, y: this.y };
//             switch (this.field) {
//                 case 'top':
//                     pos.y = d.cubesWidth - 3;
//                     break;
//                 case 'right':
//                     pos.x = 2;
//                     break;
//                 case 'bottom':
//                     pos.y = 2;
//                     break;
//                 case 'left':
//                     pos.x = d.cubesWidth - 3;
//                     break;
//             }
//             this.toState(pos);
//             this.$el.removeClass('cubeHidden')
//                 .css({ scale: 0, opacity: 0.4 })
//                 .transition({
//                     scale: 1,
//                     opacity: 1,
//                     duration: duration * d.animTime,
//                     delay: duration * d.animTime,
//                     easing: 'out',
//                 });
//         }

//         function disapperance() {
//             this.$el.transition({
//                 scale: 0,
//                 opacity: 0,
//                 duration: duration * d.animTime,
//                 easing: 'out',
//             });
//             setTimeout((cube) => {
//                 cube.$el.css({
//                     scale: 1,
//                     opacity: 1,
//                 }).addClass('cubeHidden');
//             }, duration * d.animTime, this);
//         }

//         function boom() {
//         // console.log("boom:",cube.color, cube.x, cube.y);
//             this.$el.transition({
//                 scale: 1.5,
//                 opacity: 0,
//                 duration: d.animTime,
//                 easing: 'out',
//             }, () => {
//                 this.remove();
//             });
//         }
//     }

//     // проверка, показывать кубик или нет в поле
//     private _inFieldIsVisible() {
//         let pos;
//         if (this.field === 'main') {
//             return true;
//         }
//         if (this.field === 'top' || this.field === 'bottom') {
//             pos = this.y;
//             return (this.field === 'top') ? pos > 6 : pos < 3;
//         }

//         pos = this.x;
//         return (this.field === 'left') ? pos > 6 : pos < 3;

//     }

//     // меняем параметры кубика, при этом его анимируем
//     private change(o: {
//         color: CubeColor | undefined;
//         direction: CubeDirection | undefined;
//     }) {
//         const changeParams = () => {
//             // если меняем цвет и это не тот же цвет, что сейчас
//             if (o.color !== undefined && o.color !== this.color) {
//                 const prevColor = this.color;
//                 this.color = o.color;
//                 this.$el.removeClass(prevColor)
//                     .addClass(this.color);
//             }

//             // если меняем направление и это не то же направление, что сейчас
//             if (o.direction !== undefined && o.direction !== this.direction) {
//                 const prevDirection = this.direction;
//                 this.direction = o.direction;

//                 // стили следует менять только у кубиков на главном поле, так как
//                 // слили dtop, dright, dbotom, dleft присваивают кубикам стрелки
//                 if (this.field === 'main') {
//                     this.$el.removeClass(`d${String(prevDirection)}`);
//                     this.$el.addClass(`d${String(this.direction)}`);
//                 }
//             }
//         };

//         if (this._inFieldIsVisible()) {
//             type SupportedAnimation = 'duration' | 'rotate3d' | 'rotateX' | 'rotateY';
//             let prop: SupportedAnimation;
//             // для красотенюшки задаем разную анимацию для разных полей
//             if (this.field === 'main') {
//                 prop = 'rotate3d';
//             } else if (this.field === 'top' || this.field === 'bottom') {
//                 prop = 'rotateX';
//             } else {
//                 prop = 'rotateY';
//             }

//             // анимация скрытия/открытия
//             const trans1: Pick<JQueryTransitOptions, SupportedAnimation> = { duration: CUBES_DATA.animTime * 2 };
//             const trans2: Pick<JQueryTransitOptions, SupportedAnimation> = { duration: CUBES_DATA.animTime * 2 };
//             if (this.field === 'main') {
//                 trans1[prop] = '1,1,0,90deg';
//                 trans2[prop] = '1,1,0,0deg';
//             } else {
//                 trans1[prop] = '90';
//                 trans2[prop] = '0';
//             }
//             // сама анимация с изменением состояния по ходу
//             // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access, @typescript-eslint/no-unsafe-call -- ignore
//             this.$el
//                 .transition(trans1, () => {
//                     changeParams();
//                 })
//                 .transition(trans2);
//         } else {
//             changeParams();
//         }

//     }
// }
