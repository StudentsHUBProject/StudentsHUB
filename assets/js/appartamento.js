window.location.port > 0 ? window.location.protocol + '//' + window.location.hostname + ':' + window.location.port : window.location.protocol + '//' + window.location.hostname;

let map;

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.89039378761143, lng: 12.492083482586754 },
    zoom: 5,
  });
}

window.initMap = initMap;

$(document).ready(function () {
  var id = window.location.href.split("?id=")[1];

  //ajax get request
  $.ajax({
    url: API_ENDPOINT + "/api/appartamenti/" + id,
    method: "GET",
    success: function (data) {
      marker = new google.maps.Marker({
        position: { lat: data.lat, lng: data.lng },
        map,
        title: data.indirizzo,
      });

      map.setCenter(marker.getPosition());
      map.setZoom(14);

      marker.addListener("click", () => {
        map.setZoom(18);
        map.setCenter(marker.getPosition());
      });

      for (let i = 0; i < data.immagini.length; i++) {
        $(".carousel-inner").append(`
          <div class="carousel-item ${i == 0 ? "active" : ""}">
            <img class="card-img-top" style="height: 550px;" src="${
              data.immagini[i]
            }">
          </div>
        `);
        $(".carousel-indicators").append(`
          <li data-bs-target="#Slider" data-bs-slide-to="${i}" ${
          i == 0 ? 'class="active"' : ""
        }"></li>
        `);
      }

      $("#appartamento").append(
        `
        <div class="col-sm-6">
          <h5 class="card-title">${data.titolo}</h5>
          <p class="card-text">${data.descrizione}</p>
        </div>

        <div class="col-sm-6 d-flex align-items-center justify-content-end">
            <div class="row d-flex justify-content-between">
                <div class="Info_acquisto">
                  <div class="tipo_prezzo">
                    <h5 class="tipologia">${data.tipologia}</h5>
                    <h5 class="prezzo">${data.prezzo}€</h5>
                  </div>
                    <button id="contatta" ref="${data.user}" class="btn btn-app">Contatta l'inserzionista</button>
                </div>
            </div>
        </div>
        `
      );

      if (!data.internet)
        $(".fa-wifi").before('<i class="fa-solid fa-slash"></i>');
      if (!data.fumatori_ammessi)
        $(".fa-smoking").before('<i class="fa-solid fa-slash"></i>');
      if (!data.ascensore)
        $(".fa-elevator").before('<i class="fa-solid fa-slash"></i>');
      if (!data.animali_domestici)
        $(".fa-cat").before('<i class="fa-solid fa-slash"></i>');
      if (!data.lavatrice)
        $(".fa-soap").before('<i class="fa-solid fa-slash"></i>');
      if (!data.asciugatrice)
        $(".fa-fire-flame-simple").before('<i class="fa-solid fa-slash"></i>');
      if (!data.televisione)
        $(".fa-tv").before('<i class="fa-solid fa-slash"></i>');
      if (!data.aria_condizionata)
        $(".fa-wind").before('<i class="fa-solid fa-slash"></i>');
      if (!data.accesso_disabili)
        $(".fa-wheelchair").before('<i class="fa-solid fa-slash"></i>');

      if (data.posti_letto) $("#postiLetto").html(data.posti_letto);
      if (data.restrizioni) $("#restrizioni").html(data.restrizioni);
      if (data.riscaldamento) $("#riscaldamento").html(data.riscaldamento);
      if (data.classe_energetica)
        $("#classeEnergetica").html(data.classe_energetica);
      if (data.metri_quadri) $("#metriQuadri").html(data.metri_quadri + " mq");

      if (data.contratto) {
        switch (data.contratto) {
          case 1:
            $("#contratto").html("Ordinario 4 + 4");
            break;
          case 2:
            $("#contratto").html("Contratto Transitorio");
            break;
          case 3:
            $("#contratto").html("Con cedolare secca");
            break;
          case 4:
            $("#contratto").html("Contratto Convenzionato");
            break;
          case 5:
            $("#contratto").html("Transitorio per Studenti");
            break;
          case 6:
            $("#contratto").html("Commodato d'uso");
            break;
          case 7:
            $("#contratto").html("Sublocazione Autorizzata");
            break;
          case 8:
            $("#contratto").html("Altro");
            break;
        }
      }

      if (data.utenze_medie) $("#utenzeMedie").html(data.utenze_medie + " €");
      if (data.caparra) $("#caparra").html(data.caparra + " €");
    },
    error: function (err) {
      window.location.href = "/appartamenti";
    },
  });

  $(document).on("click", "#contatta", function () {
    var user = $(this).attr("ref");
    //ajax post request
    $.ajax({
      url: API_ENDPOINT + "/api/chat/",
      method: "POST",
      dataType: "json",
      contentType: "application/json",
      processData: false,
      data: JSON.stringify({user: user}),
      success: function (data) {
        window.open("/chat", "_blank");
      },
      error: function (err) {
        alert("Errore: " + err.responseText);
      }
    });
  });
});
