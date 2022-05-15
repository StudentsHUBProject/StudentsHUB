let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.866751449417364, lng: 12.49313473557354 },
    zoom: 14,
  });

  marker = new google.maps.Marker({
    position: { lat: 41.866751449417364, lng: 12.49313473557354 },
    map,
    title: "Appratamento 1",
  });

  marker.addListener("click", () => {
    map.setZoom(18);
    map.setCenter(marker.getPosition());
  });

  map.addListener("center_changed", () => {
    window.setTimeout(() => {
      map.panTo(marker.getPosition());
    }, 5000);
  });
}

window.initMap = initMap;
