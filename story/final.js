const parser = new DOMParser();
/* -----
  OWNER: https://developers.google.com/maps/documentation/javascript/examples/event-poi
----- */
async function initMap() { 
    const {Map, InfoWindow, directionsService} = await google.maps.importLibrary("routes", "maps"); 
    const {directionsRenderer} = new google.maps.DirectionsRenderer();
    const origin = { lat: 34.9862398, lng: 135.7569057 };
    const { AdvancedMarkerElement, PinElement } = await google.maps.importLibrary("marker",);
    
    /*Gets map*/
    const map = new google.maps.Map(document.getElementById("map"), {
      center: origin,
      zoom: 14,
    });
    
    /*PLACES MARKERS*/
    // const KyotoTower = new google.maps.Marker({
    //   map,
    //   position: { lat: 34.9893453, lng: 135.7566664 },
    //   title: "Kyoto Tower", /*京都タワー*/
    //   });

    // const Tokiwacho = new google.maps.Marker({
    //   map, 
    //   position: { lat: 34.991349, lng: 135.758469 },
    //   title: "Tokiwacho", /*常葉町*/
    // });

    // const Aquarium = new google.maps.Marker({
    //   map,  
    //   position: { lat: 34.9873555, lng: 135.7461619 },
    //   title: "Kyoto Aquarium", /*京都水族館*/
    // });

    // const MaruyamaPark = new google.maps.Marker({
    //   map, 
    //   position: { lat: 34.9983422, lng: 135.771512 },
    //   title: "Maruyama Park", /*円山公園*/
    // });

    // const Daimonji = new google.maps.Marker({
    //   map, 
    //   position: { lat: 35.0228405, lng: 135.8049198 },
    //   title: "Gozan no Okuribi", /*京都 五山送り火*/
    // });

    // const Kamogawa = new google.maps.Marker({
    //   map,
    //   position: { lat: 35.0376503, lng: 135.7604489 },
    //   title: "Kamogawa Park",/*鴨川公園*/
    // });

    // const NtlGarden = new google.maps.Marker({
    //   map,
    //   position: { lat: 35.021703, lng: 135.757493 },
    //   title: "Kyoto National Garden",/*京都御苑*/
    // });

    // /*SIMPLE CLICK EVENTS*/
    // /*ZOOM IN THEN OUT*/
    // map.addListener("center_changed", () => {
    //   // 3 seconds after the center of the map has changed, pan back to the
    //   // marker.
    //   window.setTimeout(() => {
    //     map.panTo(marker.getPosition());
    //   }, 3000);
    // });
    // marker.addListener("click", () => {
    //   map.setZoom(8);
    //   map.setCenter(marker.getPosition());
    // });

    // new ClickEventHandler(map, origin);
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
        title: `${i + 1}. ${title}`,
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
  
function isIconMouseEvent(e) {
    return "placeId" in e;
  }
  
  class ClickEventHandler {
    origin;
    map;
    directionsService;
    directionsRenderer;
    placesService;
    infowindow;
    infowindowContent;
    constructor(map, origin) {
      this.origin = origin;
      this.map = map;
      this.directionsService = new google.maps.DirectionsService();
      this.directionsRenderer = new google.maps.DirectionsRenderer();
      this.directionsRenderer.setMap(map);
      this.placesService = new google.maps.places.PlacesService(map);
      this.infowindow = new google.maps.InfoWindow();
      this.infowindowContent = document.getElementById("infowindow-content");
      this.infowindow.setContent(this.infowindowContent);
      // Listen for clicks on the map.
      this.map.addListener("click", this.handleClick.bind(this));
    }
    handleClick(event) {
      console.log("You clicked on: " + event.latLng);
      // If the event has a placeId, use it.
      if (isIconMouseEvent(event)) {
        console.log("You clicked on place:" + event.placeId);
        // Calling e.stop() on the event prevents the default info window from
        // showing.
        // If you call stop here when there is no placeId you will prevent some
        // other map click event handlers from receiving the event.
        event.stop();
        if (event.placeId) {
          this.calculateAndDisplayRoute(event.placeId);
          this.getPlaceInformation(event.placeId);
        }
      }
    }
    calculateAndDisplayRoute(placeId) {
      const me = this;
  
      this.directionsService
        .route({
          origin: this.origin,
          destination: { placeId: placeId },
          travelMode: google.maps.TravelMode.WALKING,
        })
        .then((response) => {
          me.directionsRenderer.setDirections(response);
        })
        .catch((e) => window.alert("Directions request failed due to " + status));
    }
    getPlaceInformation(placeId) {
      const me = this;
  
      this.placesService.getDetails({ placeId: placeId }, (place, status) => {
        if (
          status === "OK" &&
          place &&
          place.geometry &&
          place.geometry.location
        ) {
          me.infowindow.close();
          me.infowindow.setPosition(place.geometry.location);
          me.infowindowContent.children["place-icon"].src = place.icon;
          me.infowindowContent.children["place-name"].textContent = place.name;
          me.infowindowContent.children["place-id"].textContent = place.place_id;
          me.infowindowContent.children["place-address"].textContent =
            place.formatted_address;
          me.infowindow.open(me.map);
        }
      });
    }
  }
  
  window.initMap = initMap;
  initMap();