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
    const stomaGeoObject = new ymaps.GeoObject(
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
        fixedWidth: "clamp(370px,48vw, 603px",
        arrowPath: " ",
    }).mount();
    new Splide("#splideTiser", {
        perPage: 1,
        rewind: false,
    }).mount();
}
