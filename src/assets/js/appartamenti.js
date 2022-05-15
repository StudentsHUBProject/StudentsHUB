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
      url: "http://localhost:8080/appartamento"
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

  //ajax get request
  $.ajax({
    url: "http://localhost:8080/api/appartamenti",
    method: "GET",
    success: function (data) {
      console.log(data);
      for (let i = 0; i < data.length; i++) {
        $("#appartamenti").append(
          `
          <div class="col">
            <div class="card">
                <img src="./assets/img/Appartamenti1.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <div class="row">
                      <div class="col-sm-6">
                          <h5 class="card-title">${data[i].titolo}</h5>
                          <p class="card-text">${data[i].descrizione}</p>
                      </div>
                      <div class="col-sm-6 d-flex align-items-center justify-content-end">
                          <div class="row d-flex justify-content-between">
                              <div class="col-md-12">
                                  <h5 class="tipologia">${data[i].tipologia}</h5>
                                  <h5 class="prezzo">${data[i].prezzo}€</h5>
                                  <a href="appartamento.html" class="btn btn-primary float-right">Dettagli</a>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          <br>
          `
        );
      }
    },
    error: function (err) {
      console.log(err);
    }
  });

  //ajax post request
  $("#test").click(function (e) {
    let data = {
      titolo: "Appartamento Test",
      descrizione: "Descrizione dell'appartamento",
      tipologia: "stanza",
      prezzo: 350,
      metri_quadri: 80,
      numero_stanza: 4,
      numero_bagni: 2
    };
    console.log(data);
    
    $.ajax({
      url: "http://localhost:8080/api/appartamenti",
      method: "POST",
      dataType: 'json',
      contentType: 'application/json',
      processData: false,
      data: JSON.stringify(data),
      success: function (data) {
        console.log(data);
        $("#appartamenti").append(
          `
          <div class="col">
            <div class="card">
                <img src="./assets/img/Appartamenti1.jpg" class="card-img-top" alt="...">
                <div class="card-body">
                  <div class="row">
                      <div class="col-sm-6">
                          <h5 class="card-title">${data.titolo}</h5>
                          <p class="card-text">${data.descrizione}</p>
                      </div>
                      <div class="col-sm-6 d-flex align-items-center justify-content-end">
                          <div class="row d-flex justify-content-between">
                              <div class="col-md-12">
                                  <h5 class="tipologia">${data.tipologia}</h5>
                                  <h5 class="prezzo">${data.prezzo}€</h5>
                                  <a href="appartamento.html" class="btn btn-primary float-right">Dettagli</a>
                              </div>
                          </div>
                      </div>
                  </div>
                </div>
            </div>
          </div>
          <br>
          `
        );
      },
      error: function (err) {
        console.log(err);
      }
    });
  });
});
