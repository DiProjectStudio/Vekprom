import ymapsTouchScroll from 'ymaps-touch-scroll';

const map = document.getElementById('map');

if (map) {
    function addYaMaps() {
        var myMap;
        ymaps.ready(init);

        let myPlacemark;

        function init() {
            (myMap = new ymaps.Map('map', {
                center: [55.730502, 37.644782],
                zoom: 16,
                controls: []
            })),
                (myPlacemark = new ymaps.Placemark(
                    [55.730502, 37.644782],
                    {},
                    {
                        preset: 'islands#redIcon'
                    }
                ));
            myMap.geoObjects.add(myPlacemark);
            ymapsTouchScroll(myMap, { preventScroll: true, preventTouch: true });
        }
    }

    addYaMaps();
}
