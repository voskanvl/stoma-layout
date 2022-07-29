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
                center: [53.231495, 45.011605],
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
                    [53.2306, 45.011605],
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
            stomaYM.behaviors.disable("drag");
            stomaYM.behaviors.enable("multiTouch");
        }
    } catch (error) {
        console.warn("ошибка в Yandex map", error);
    }
}
