function initMap() { /*async*/ 
    const directionsService = new google.maps.importLibrary(); /*await*/ /*"routes"*/
    const directionsRenderer = new google.maps.DirectionsRenderer();
    const origin = { lat: 34.9862398, lng: 135.7569057 };
    
    /*Gets map*/
    const map = new google.maps.Map(document.getElementById("map"), {
      center: origin,
      zoom: 15,
    });
    
    /*PLACES MARKERS*/
    const KyotoStation = new google.maps.Marker({
        position: { lat: 34.9861821, lng: 135.7570678 },
        map,
        title: "Kyoto Station",
      });

    const Tokiwacho = new google.maps.Marker({
        position: { lat: 34.9916608, lng: 135.7575092 },
        map,
        title: "Tokiwacho",
    });

    const Aquarium = new google.maps.Marker({
        position: { lat: 34.9873555, lng: 135.7461619 },
        map,
        title: "Kyoto Aquarium",
    });

    const MaruyamaPark = new google.maps.Marker({
        position: { lat: 35.0000173, lng: 135.7722135 },
        map,
        title: "Maruyama Park",
    });

    /*FOOD MARKERS*/
    const PancakeIsu = new google.maps.Marker({
      position: { lat: 34.9875094, lng: 135.7575774 },
      map,
      title: "Pancake Room",
    });

    const CoffeeNoen = new google.maps.Marker({
      position: { lat: 35.0032821, lng: 135.7739591 },
      map,
      title: "Pancake Room",
    });

    /*SIMPLE CLICK EVENTS*/
    /*ZOOM IN THEN OUT*/
    map.addListener("center_changed", () => {
      // 3 seconds after the center of the map has changed, pan back to the
      // marker.
      window.setTimeout(() => {
        map.panTo(marker.getPosition());
      }, 3000);
    });
    marker.addListener("click", () => {
      map.setZoom(8);
      map.setCenter(marker.getPosition());
    });

    new ClickEventHandler(map, origin);
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