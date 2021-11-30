# Отложенные действия - setTimeout, setInterval

Таймеры в работе нужны достаточно часто. Обновление погоды для городского портала, курса валют для информера, времени на домашнем сайте это типичные вещи, которые понятны и новичку. Через таймер мы можем управлять повторным запросом к базе, если с перового раза доступа не было. Удобная вещь и в JavaScript есть два метода, которые помогают работать с таймерами. 

Сразу поправлюсь, что это не JS-Core, a Web API, но эти методы (обычно) работают в любой JS среде, как в браузере, так и на бэкенде.   

## setTimeout 

И так у нас есть функция, которая выводит на экран сообщение дважды. Один раз заглавными буквами, второй раз красным, как ошибку(в браузерной среде).

````JavaScript
function toPrint(message) {
    console.log(message.toUpperCase());
    console.error(message.toUpperCase());
}
````

Мы можем запустить эту функцию с задержкой в две секунды. Для этого мы воспользуемся методом **setTimeout()**. В этот метод мы передаём функцию, задержку и возможные аргументы для функции, которые мы хотим передать. 

````JavaScript
setTimeout(toPrint, 1000, "андрей");
````
- toPrint - это наша функция
- 1000 - это одна секунда в миллисекундах
- "андрей" - это аргумент, который надо передать в функцию toPrint()

Конечно же мы можем сразу написать функцию в setTimeout. Например, так:

````JavaScript
setTimeout(function() {
    console.log("андрей".toUpperCase());
    console.error("андрей".toUpperCase());
}, 1000);
````

Или используя стрелочную функцию:

````JavaScript
setTimeout(() => {
    console.log("андрей".toUpperCase());
    console.error("андрей".toUpperCase());
}, 1000);
````

Давайте посмотрим, что мы можем сделать на практике.

````HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <script defer src="script.js"></script>
    <style>
        .absolute {
            position: absolute;
            right: 1rem;
            bottom: 3rem;
            width: 30vw;
            height: 20vh;
            font-size: 2rem;
        }
    </style>
    <title>Document</title>
</head>
<body>
    </section>
    <section class="absolute">
</body>
</html>
````
И к нему вот такой скрипт:

````JavaScript
let absolute = document.querySelector(".absolute");
setTimeout(() => {
    absolute.innerHTML = "Вы на сайте уже несколько секунд, а ещё ничего не купили." + "<br>" + "Чем я могу вам помочь?";
}, 2000);
````

Примерно вот так и появляются эти модальные окна на сайтах магазина. Особо сложной логики там обычно нет. Выставляется 20-60 секунд и для этого используется обычный **setTimeout**. 

## setInterval - актуальная дата и время на сайте

Давайте закрепим и реализуем дату и время на сайте. Создадим html-файл и подготовим две секции для нашего контента.

````HTML
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <script defer src="script.js"></script>
    <style>
        body {
            display: flex;
            align-items: center;
            justify-content: center;
            color: tomato;
            font-weight: 900;
            font-size: 3rem;
        }
        .message {
            width: 30vw;
            height: 30vh;
            border: 1px solid tomato;
            margin: 2rem;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
        }
    </style>
    <title>Document</title>
</head>
<body>
    <section class="message">
        <section class="time" id="time"></section>
        <section class="sec" id="sec"></section>
    </section>
</body>
</html>
````
 
К этому файлу добавим script.js.
В ней есть две функции приведения даты в тот формат, который нам требуется, один раз число, месяц, год; а в другом случае часы, минуты, секунды.

И функция обновления даты, которую мы вызываем через **setInterval**. 

````JavaScript
let dateSection = document.querySelector(".time");
let secSection = document.querySelector(".sec");
let absolute = document.querySelector(".absolute");

updateTime();
setInterval(updateTime, 1000);

function updateTime() {
    let myDate = new Date();
    let message = getEuropeDate(myDate);
    dateSection.innerHTML = message;
    secSection.innerHTML = getTime(myDate);
}

function getEuropeDate(date) {
    return date.getDate() + "." +
        (date.getMonth() + 1) + "." +
        date.getFullYear();
}

function getTime(date) {
    return date.getHours() + ":" +
        date.getMinutes() + ":" +
        date.getSeconds();
}
````

## clearInterval

Возможно, пользователь или бизнес логика приложения захочет удалить таймер со страницы. Например, остановить время в в виртуальных часах для шахмат. 

Давайте напишем простейший таймер:

````JavaScript
let count = 10;

const timerID = setInterval(function() {
    console.log(count--);
    if (count === 0) {
        console.log("stop");
        clearInterval(timerID);
    }
}, 1000);
````
Прошу отметить, что останавливаем мы таймер указывая переменную timerID, в которой сохранена функция setInterval. clearInterval(timerID) удаляет таймер и останавливает обратный отсчёт. 

## clearTimeout

clearTimeout работает по такому же принципу, как и его родственник clearInterval. Мы должны передать ссылку на таймер, что бы его удалить из памяти. Пример:

````JavaScript
const timer = setTimeout(() => {
    console.log("тест с задержкой");
}, 2000);

clearTimeout(timer);
console.log("конец работы скрипта");
````

## requestAnimationFrame() и cancelAnimationFrame()

Для работы с отрисовкой в браузерах и нашей анимацией есть более новый и в некоторых случаях более рекомендуемый метод - requestAnimationFrame(). Если хотите, то можете этот метод считать болеее современной версией setInterval. Метод, который удаляет таймер requestAnimationFrame - cancelAnimationFrame().

Технический вызов происходит абсолютно так же как и с интервалом. Детали спрятаны в отрисовке:
1. Если вкладка неактивна, то requestAnimationFrame() останавливает свою работу и браузер бережёт свои силы и ресурсы. 
2. Отрисовка происходит 60 раз в секунду или совпадает с частотой обновления экрана. 
3. requestAnimationFrame именно браузерная отрисовка экрана. В node.js мы получим "requestAnimationFrame is not defined"

То есть, методы requestAnimationFrame и setInterval очень схожи, но все же имеют собственные недостатки и достоинства.

## Таймер как экземпляр класса

Я написал класс Timer для подсказки к домашнему заданию. Класс не является темой урока, по этому приведу просто код без пояснений.

````JavaScript
class Timer {
    id;
    started;
    remaining;
    running;
    callback;
    constructor(callback, timeout) {
        this.remaining = timeout;
        this.callback = callback;
    }
    start = () => {
        this.running = true;
        this.started = new Date();
        this.id = setTimeout(this.callback, this.remaining);
    }
    pause = () => {
        this.running = false;
        clearTimeout(this.id);
        this.remaining -= new Date() - this.started;
    }
    getTimeLeft = () => {
        if (this.running) {
            this.pause();
            this.start();
        }
        return this.remaining;
    }
    getStateRunning = () => {
        return this.running;
    }
}

let myTimer = new Timer(() => {
    console.log("Hello");
}, 1000);

myTimer.start();

console.log(myTimer.getTimeLeft());
````

## Event Loop 

Асинхронное программирование и Event Loop любимые темы на собеседованиях. Так как JS является синхронным языком, то достаточно важно понимать, как происходят отложенные события. 

Все методы выполняются по очереди. В порядке запуска. Вызываются методы в стэке вызова (Call Stack), если JS встречает асинхронный метод, например setTimeout, то содержимое передаётся в очередь исполнения (QUEUE). Это значит, что  вконец очереди. То есть, если у нас изначально было 10 методов, и третий метод оказался асинхронным, то его выполнение будет не раньше чем выполнятся 10-ый метод. 

Подробнее об очереди и стэке вызова в дополнительных ссылках. 

## Дополнительные ссылки

1. [Объединённый асинхронный JavaScript: Таймауты и интервалы](https://developer.mozilla.org/ru/docs/Learn/JavaScript/Asynchronous/Timeouts_and_intervals)
2. [window.requestAnimationFrame](https://developer.mozilla.org/ru/docs/Web/API/window/requestAnimationFrame)
3. [JavaScript Visualized: Event Loop](https://dev.to/lydiahallie/javascript-visualized-event-loop-3dif)

## Домашнее задание

1. Что выдаст консоль?
   ````JavaScript
   let count = 0;
   setTimeout(() => console.log(count), 1000); // ?
   for (let i = 0; i < 100; i++) {
       count++;
   }
   ````
2. Что произойдёт? Объясните почему так вышло.
   ````JavaScript
   for (var i = 0; i < 4; i += 1) {
       setTimeout(() => console.log(i), 0);
   }
   ````
3. Что произойдёт? Объясните почему так вышло.
   ````JavaScript
   for (let i = 0; i < 4; i += 1) {
       setTimeout(() => console.log(i), 0);
   }
   ````   
4. В каком порядке сработают распечатки? Объясните почему так вышло.
   ````JavaScript
   function printing() {
     console.log(1);
     setTimeout(function () {
       console.log(2);
     }, 1000);
     setTimeout(function () {
       console.log(3);
     }, 0);
     console.log(4);
   // если не учили промисы, то можете закомментировать строчку
     Promise.resolve().then(() => console.log(5)); 
   }
   printing();
   ````
5. Сделайте таймер, с кнопкой, с обратным отсчётом.
6. Сделайте на странице HTML 16 квадратов - 4*4. Поменяйте у одного произвольного квадрата цвет каждые пол-секунды. Подсказка для гридов:
    ````css
       body {
       display: grid;
       grid-template-columns: repeat(4, 20vw);
       grid-template-rows: repeat(4, 20vh);
       gap: 1rem;
       }
    ````
   {{< figure src="/img/res/fe-exe/webapi/grid.png" title="задача с settimeout" alt="задача с settimeout" >}} 
7. Реализуйте электронные часы для шахматистов. 
8. Нарисуйте квадратик в большом квадрате, который:
   - при нажатии кнопки старт медленно переезжает из верхнего левого угла квадрата в нижний правый. Используете setInterval
   - отключите кнопку старт после нажатия и активируйте кнопку стоп
   - квадратик должен ездить туда сюда пока не нажмут стоп.
   - перепишете setInterval на requestAnimationFrame() 
9. Используя requestAnimationFrame нарисуйте моргающий элемент в правом верхнем углу экрана. Появление-исчезание, частота - раз в секунду. 
