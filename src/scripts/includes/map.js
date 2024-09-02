import ymapsTouchScroll from 'ymaps-touch-scroll';

export function initializeMap() {
    const map = document.getElementById('map');

    if ($('#map').length) {
        let map;
        ymaps.ready(init);

        function init() {
            map = new ymaps.Map('map', {
                center: [54.072572095894145,41.55122501864023],
                zoom: 5.5,
                controls: []
            });

            $.each(points, function(index, point) {
                let placemark = new ymaps.Placemark(
                    point.coordinates,
                    {
                        balloonContentBody: `<div class="contacts__inner-location">
                                  <h3 class="location-title">${point.title}</h3>
                                  <div class="location-contacts">
                                    <div class="location-phone">
                                      <span>${point.phone}</span>
                                    </div>
                                    <div class="location-clock">
                                      <span>${point.clock}</span>
                                    </div>
                                    <div class="location-email">
                                      <span>${point.email}</span>
                                    </div>
                                    <div class="location-address">
                                      <span>${point.address}</span>
                                    </div>
                                    </div><a class="location-more" href="contacts-detail.html">
                                      <span class="link link--mint">Подробнее</span>
                                      <svg width="25" height="24" viewBox="0 0 25 24" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M14.5 5L21.5 12M21.5 12L14.5 19M21.5 12L3.5 12" stroke="white" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></path>
    </svg></a>
                                    </div>`
                    },
                    {
                        iconLayout: 'default#image',
                        iconImageHref: '/assets/images/Map.svg',
                        iconImageSize: [40, 40],
                        // balloonOffset: [-75, -25],
                        // hideIconOnBalloonOpen: false,
                    }
                );

                map.geoObjects.add(placemark);
            });

            ymapsTouchScroll(map, {preventScroll: true, preventTouch: true});
        }
    }
}
