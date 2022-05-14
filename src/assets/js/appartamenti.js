let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.89039378761143, lng: 12.492083482586754 },
    zoom: 11,
  });

  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const markers = locations.map((position, i) => {
    const label = labels[i % labels.length];
    const marker = new google.maps.Marker({
      position: { lat: position.lat, lng: position.lng },
      label,
      title: position.title,
      url: "http://127.0.0.1:5500/src/appartamento.html"
    });

    marker.addListener("click", () => {
      window.open(marker.url, "_blank");
    });

    return marker;
  });

  new markerClusterer.MarkerClusterer({ markers, map });

  const autocompleteInput = document.getElementById('indirizzo');
  
  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  });

  autocomplete.addListener("place_changed", () => {
    
  });
}

const locations = [
  { title: "Appartamento 1", lat: 41.866751449417364, lng: 12.49313473557354 },
  { title: "Appartamento 2", lat: 41.90638667800423, lng: 12.491350085542015 },
  { title: "Appartamento 3", lat: 41.883109274789916, lng: 12.51338572592724 },
  { title: "Appartamento 4", lat: 41.9094012650354, lng: 12.464291615363098 },
  { title: "Appartamento 5", lat: 41.86549482599551, lng: 12.499613450686475 },
  { title: "Appartamento 6", lat: 41.91181283216575, lng: 12.45910675880187 },
  { title: "Appartamento 7", lat: 41.906266091562046, lng: 12.49491467442786 },
  { title: "Appartamento 8", lat: 41.880214082367964, lng: 12.450681366889873 },
];

window.initMap = initMap;

$(document).ready(function () {
  $('#select-state').selectize({
    sortField: 'text'
  });
});