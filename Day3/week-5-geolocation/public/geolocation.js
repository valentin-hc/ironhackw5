var map;
var storedPositions = [];
if ("geolocation" in navigator){
  navigator.geolocation.getCurrentPosition(onLocation, onError);
}

function onLocation(position){
  var myPosition = {
    lat: position.coords.latitude,
    lng: position.coords.longitude
  };

  createMap(myPosition);
  setupAutocomplete();
}

function onError(err){
  console.log("What are you using, IE 7??", err);
}

function createMap(position){
  map = new google.maps.Map($('#map')[0], {
    center: position,
    zoom: 17
  });
  createMarker(position);
  loadPositions();
}

function createMarker(position, contentString) {
  var marker = new google.maps.Marker({
   position: position,
   map: map,
 });
  var infowindow = new google.maps.InfoWindow({
    content: contentString
  });
  marker.addListener('click', function() {
    infowindow.open(map, marker);
  });
}

function setupAutocomplete(){
  var input = $('#get-places')[0];
  var autocomplete = new google.maps.places.Autocomplete(input);
  autocomplete.addListener('place_changed', function(){
    var place = autocomplete.getPlace();
    console.log(place);
    if (place.geometry.location) {
      map.setCenter(place.geometry.location);
      map.setZoom(16);
      createMarker(place.geometry.location, place.formatted_address);
      latitude = place.geometry.location.lat();
      longitude = place.geometry.location.lng();
      saveCoords(latitude, longitude);
    } else {
      alert("The place has no location...?")
    }
  });
}

function saveCoords(latitude, longitude) {
  var pos = { lat: latitude, lng: longitude }
  storedPositions.push(pos);
  var stringifiedPosition = JSON.stringify(storedPositions);
  window.localStorage.setItem("position", stringifiedPosition);
}

function loadPositions() {
  storedPositions = JSON.parse(window.localStorage.getItem("position"));
  storedPositions.forEach(function(spot) {
    createMarker(spot);
  })
}
