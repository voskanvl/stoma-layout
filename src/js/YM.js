export function YM() {
    console.log("YM started");
    try {
        ymaps.ready(init);
        function init() {
            // Создание карты.
            const stomaYM = new ymaps.Map("map", {
                // Координаты центра карты.
                // Порядок по умолчанию: «широта, долгота».
                // Чтобы не определять координаты центра карты вручную,
                // воспользуйтесь инструментом Определение координат.
                center: [53.243023, 45.014438],
                // Уровень масштабирования. Допустимые значения:
                // от 0 (весь мир) до 19.
                zoom: 17,
                draggable: false,
            });
            new ymaps.GeoObject(
                {
                    // Описание геометрии.
                    geometry: {
                        type: "Point",
                        coordinates: [53.243023, 45.013438],
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
                    [53.243023, 45.013438],
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
            stomaYM.behaviors.enable("multiTouch");
            function toggleDrag({ matches }) {
                console.log(matches);
                if (matches) {
                    stomaYM.behaviors.disable("drag");
                } else {
                    stomaYM.behaviors.enable("drag");
                }
            }
            const mmo = matchMedia("(orientation: portrait)");
            toggleDrag(mmo);
            mmo.addEventListener("change", toggleDrag);
        }
    } catch (error) {
        console.warn("ошибка в Yandex map", error);
    }
}
