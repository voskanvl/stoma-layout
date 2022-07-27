import Splide from "@splidejs/splide";

// if (document.readyState === "loading") {
//     start();
// } else {
//     document.addEventListener("DOMContentLoaded", start);
// }

//--- YM ---
ymaps.ready(init);
function init() {
    // Создание карты.
    const stomaYM = new ymaps.Map("map", {
        // Координаты центра карты.
        // Порядок по умолчанию: «широта, долгота».
        // Чтобы не определять координаты центра карты вручную,
        // воспользуйтесь инструментом Определение координат.
        center: [53.231595, 45.014605],
        // Уровень масштабирования. Допустимые значения:
        // от 0 (весь мир) до 19.
        zoom: 17,
    });
    new ymaps.GeoObject(
        {
            // Описание геометрии.
            geometry: {
                type: "Point",
                coordinates: [53.230595, 45.011605],
            },
            // Свойства.
            properties: {
                // Контент метки.
                iconContent: "Стом-А",
                hintContent: '"Стом-А"стоматололгия ',
            },
        },
        {
            // Опции.
            // Иконка метки будет растягиваться под размер ее содержимого.
            preset: "islands#blackStretchyIcon",
            // Метку можно перемещать.
            draggable: false,
        },
    );
    stomaYM.geoObjects.add(
        new ymaps.Placemark(
            [53.230595, 45.012605],
            {
                balloonContent: "цвет <strong>красный</strong>",
                iconCaption: "Стом-А",
            },
            {
                preset: "islands#redDotIcon",
            },
        ),
    );
    stomaYM.behaviors.disable("scrollZoom");
}

window.onload = start;
// window.onresize = () => {
//     stomaYM.getGlobalPixelCenter([53.230595, 45.011605]);
// };

function start() {
    console.log("start");

    new Splide("#splideReview", {
        type: "loop",
        gap: "3vw",
        fixedWidth: "clamp(370px,48vw, 603px)",
        arrowPath: " ",
    }).mount();
    new Splide("#splideTiser", {
        perPage: 1,
        rewind: false,
        arrowPath: " ",
    }).mount();
    new Splide("#splideServicesSlider", {
        type: "loop",
        gap: "0px",
        fixedHeight: "100px",
        arrowPath: " ",
    }).mount();

    //--- toggle menu ---
    const menuOn = document.querySelector(".header__openmenu");
    const menuOff = document.querySelector(".menu__close-svg");
    const menuContainer = document.querySelector(".menu__container");
    menuOn.onclick = () => (menuContainer.style = "display:block");
    menuOff.onclick = () => (menuContainer.style = "display:none");
    //--- toggle modal ---
    const buttons = document.querySelectorAll(".modalable");
    const modal = document.querySelector(".modal__container");
    const close = document.querySelector(".modal__close");
    buttons.forEach(button =>
        button.addEventListener("click", () => modal.removeAttribute("hidden")),
    );
    close.addEventListener("click", () =>
        modal.setAttribute("hidden", "hidden"),
    );
}
