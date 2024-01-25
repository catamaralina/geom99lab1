// SOURCE: https://developers.google.com/maps/documentation/javascript/examples/advanced-markers-accessibility

async function initMap() {
  // Request needed libraries.
  const { Map, InfoWindow } = await google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary(
    "marker",
  );

  // Set up Map
  const map = new Map(document.getElementById("map"), {
    zoom: 12,
    center: { lat: 34.9862398, lng: 135.7569057 },
    mapId: "4504f8b37365c3d0",
  });


  // Set LatLng and title text for the markers. 
  // Places of interest with nature
  const tourStops = [
    {
      position: { lat: 34.9299942, lng: 135.7590865},
      title: "Fushimi Minato Park",
    },
    {
      position: { lat: 35.0337984, lng: 135.7184632 },
      title: "Ryoanji",
    },
    {
      position: { lat: 34.9983422, lng: 135.771512 },
      title: "Maruyama Park",
    },
    {
      position: { lat: 35.0228405, lng: 135.8049198 },
      title: "Gozan no Okuribi",
    },
    {
      position: { lat: 35.0376503, lng: 135.7604489 },
      title: "Kamogawa Park",
    },
    {
      position: { lat: 35.021703, lng: 135.757493 },
      title: "Kyoto National Garden",
    },
    {
      position: { lat: 35.0151827, lng: 135.6712193 },
      title: "Arashiyama Park",
    },
    {
      position: { lat: 34.8928089, lng: 135.812774 },
      title: "Mt Uji",
    },
  ];

  // Create an info window to share between markers.
  const infoWindow = new InfoWindow();

  // Create the markers.
  tourStops.forEach(({ position, title }, i) => {
    const pinkPin = new PinElement({
      glyph: `${i + 1}`,
      background: '#F9AABB',
      borderColor: '#e46b85',
    });
    const marker = new AdvancedMarkerElement({
      position,
      map,
      /*Display on click*/
      title: `( ${i + 1} )  ${title}`,
      content: pinkPin.element,
    });

    // Add a click listener for each marker, and set up the info window.
    marker.addListener("click", ({ domEvent, latLng }) => {
      const { target } = domEvent;

      infoWindow.close();
      infoWindow.setContent(marker.title);
      infoWindow.open(marker.map, marker);
    });
  });
}

window.initMap = initMap; /*added*/
initMap();