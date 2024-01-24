function initMap() { /* removed async*/
  // Request needed libraries.
  /*changed await to new*/
  const { Map, InfoWindow } = new google.maps.importLibrary("maps");
  const { AdvancedMarkerElement, PinElement } = new google.maps.importLibrary(
    "marker",
  );
  const map = new Map(document.getElementById("map"), {
    zoom: 13,
    center: { lat: 34.9862398, lng: 135.7569057 },
    mapId: "4504f8b37365c3d0",
  });
  // Set LatLng and title text for the markers. The first marker (Boynton Pass)
  // receives the initial focus when tab is pressed. Use arrow keys to
  // move between markers; press tab again to cycle through the map controls.
  const tourStops = [
    {
      position: { lat: 34.9893453, lng: 135.7566664 },
      title: "Kyoto Tower",
    },
    {
      position: { lat: 34.991349, lng: 135.758469 },
      title: "Tokiwacho",
    },
    {
      position: { lat: 34.9873555, lng: 135.7461619},
      title: "Kyoto Aquarium",
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
    {
      position: { lat: 34.9671305, lng: 135.7745999 },
      title: "Fushimi Inari",
    },
  ];
  // Create an info window to share between markers.
  const infoWindow = new InfoWindow();

  // Create the markers.
  tourStops.forEach(({ position, title }, i) => {
    const pin = new PinElement({
      glyph: `${i + 1}`,
    });
    const marker = new AdvancedMarkerElement({
      position,
      map,
      title: `( ${i + 1} ) ${title}`, /*changed marker to ( 4 ) Name from 4. Name*/
      content: pin.element,
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