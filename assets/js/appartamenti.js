let map;
let citta = "";

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.89039378761143, lng: 12.492083482586754 },
    zoom: 5,
  });

  const labels = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  // ajax get coordinates
  $.ajax({
    url: "http://localhost:8080/api/appartamenti/map/coordinate",
    method: "GET",
    success: function (data) {
      let markers = [];
      for (let i = 0; i < data.length; i++) {
        var marker = new google.maps.Marker({
          position: { lat: data[i].lat, lng: data[i].lng },
          label: labels[i % labels.length],
          title: data[i].titolo,
          url: "http://localhost:8080/appartamento?id=" + data[i]._id,
        });

        marker.addListener("click", () => {
          window.open(marker.url, "_blank");
        });

        markers.push(marker);
      }
      new markerClusterer.MarkerClusterer({ markers, map });
    },
    error: function (err) {
      console.log(err);
    },
  });

  const autocompleteInput = document.getElementById("indirizzo");

  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
    fields: ["address_components", "geometry", "name"],
    types: ["university"],
  });

  autocomplete.addListener("place_changed", () => {
    let place = autocomplete.getPlace();
    citta = place.address_components[2].long_name;
    let lat = place.geometry.location.lat();
    let lng = place.geometry.location.lng();

    map.setZoom(14);
    map.setCenter({ lat: lat, lng: lng });

    updateFiltri();
  });
}

window.initMap = initMap;

//Scorri verso Howto
function StartFunction() {
  document
    .getElementById("HowTo")
    .scrollIntoView({ behavior: "smooth", block: "end" });
}

//Filtri
function updateFiltri() {
  var filtri = {
    tipologia: $("#tipologiaAnnuncio").val(),
    prezzo: $("#prezzo").val(),
    posti_letto: $("#postiLetto").val(),
    citta: citta,
    classe_energetica: $("#classeEnergetica").val(),
    contratto: $("#tipologiaContratto").val(),
    restrizioni: $("#restrizioni").val(),
    riscaldamento: $("#riscaldamento").val(),
    internet: $("#internet").is(":checked"),
    fumatori_ammessi: $("#fumatori").is(":checked"),
    ascensore: $("#ascensore").is(":checked"),
    animali_domestici: $("#animali").is(":checked"),
    lavatrice: $("#lavatrice").is(":checked"),
    asciugatrice: $("#asciugatrice").is(":checked"),
    televisione: $("#televisione").is(":checked"),
    aria_condizionata: $("#aria").is(":checked"),
    accesso_disabili: $("#disabili").is(":checked"),
  };

  Object.keys(filtri).forEach((key) => {
    if (filtri[key] === "" || filtri[key] === false) {
      delete filtri[key];
    }
  });

  $.ajax({
    url: "http://localhost:8080/api/appartamenti",
    method: "GET",
    data: filtri,
    success: processAppartamenti,
    error: function (err) {
      console.log(err);
    },
  });
}

$(document).ready(function () {
  // Espandi e nascondi filtri
  function resizeFiltri(width) {
    if (width <= 750) {
      $("#collapsedFiltri").removeClass("show");
    } else {
      $("#collapsedFiltri").addClass("show");
    }
  }

  resizeFiltri($(window).width());

  $(window).on("resize", function (event) {
    resizeFiltri($(this).width());
  });

  $("#collapseButton").click(function () {
    if ($("#filterIcon").hasClass("fa-filter-circle-xmark")) {
      $("#filterIcon").removeClass("fa-filter-circle-xmark");
      $("#filterIcon").addClass("fa-filter");
    } else {
      $("#filterIcon").removeClass("fa-filter");
      $("#filterIcon").addClass("fa-filter-circle-xmark");
    }
  });

  //Filtri
  $("#indirizzo").click(function () {
    $("#indirizzo").val("");
    citta = "";
    updateFiltri();
  });

  $("#prezzo").on("input", function () {
    var prezzo = $(this).val();
    if (prezzo == 5000 || prezzo == 0) {
      prezzo = "Qualsiasi";
    } else {
      prezzo = prezzo + " €";
    }
    $("#valPrezzo").html(prezzo);
  });

  $("#postiLetto").on("input", function () {
    $("#valPostiLetto").html($(this).val());
  });

  $("#filtri").change(updateFiltri);

  //Script FAQ
  var acc = document.getElementsByClassName("accordion");
  var i;

  for (i = 0; i < acc.length; i++) {
    acc[i].addEventListener("click", function () {
      var panel = this.nextElementSibling;
      if (panel.style.maxHeight) {
        panel.style.maxHeight = null;
      } else {
        let active = document.querySelectorAll(
          ".accordion-div .accordion.active"
        );
        for (let j = 0; j < active.length; j++) {
          active[j].classList.remove("active");
          active[j].nextElementSibling.style.maxHeight = null;
        }
        this.classList.toggle("active");
        panel.style.maxHeight = panel.scrollHeight + "px";
      }
    });
  }

  //ajax get request
  $.ajax({
    url: "http://localhost:8080/api/appartamenti",
    method: "GET",
    success: processAppartamenti,
    error: function (err) {
      console.log(err);
    },
  });
});

function processAppartamenti(data) {
  $("#appartamenti").empty();

  for (let i = 0; i < data.length; i++) {
    $("#appartamenti").append(
      `
      <div class="col">
        <div class="card">
            <img src="${data[i].immagini[0]}" class="card-img-top">
            <div class="card-body">
              <div class="row">
                  <div class="col-sm-6">
                      <h5 class="card-title">${data[i].titolo}</h5>
                      <p class="card-text cut-text">${data[i].descrizione}</p>
                  </div>
                  <div class="col-sm-6 d-flex align-items-center justify-content-end">
                      <div class="row d-flex justify-content-between">
                      <div class="Info_acquisto">
                          <div class="tipo_prezzo">
                              <h5 class="tipologia">${data[i].tipologia}</h5>
                              <h5 class="prezzo">${data[i].prezzo}€</h5>
                          <div>
                              <a href="appartamento?id=${
                                data[i]._id
                              }" class="btn btn-app float-right">Dettagli</a>
                          </div>
                          <div class="tipo_servizi">
                            ${
                              data[i].internet
                                ? '<i class="fa-solid fa-wifi"></i>'
                                : ""
                            }
                            ${
                              data[i].fumatori_ammessi
                                ? '<i class="fa-solid fa-smoking"></i>'
                                : ""
                            }
                            ${
                              data[i].ascensore
                                ? '<i class="fa-solid fa-elevator"></i>'
                                : ""
                            }
                            ${
                              data[i].animali_domestici
                                ? '<i class="fa-solid fa-cat"></i>'
                                : ""
                            }
                            ${
                              data[i].lavatrice
                                ? '<i class="fa-solid fa-soap"></i>'
                                : ""
                            }
                            ${
                              data[i].asciugatrice
                                ? '<i class="fa-solid fa-fire-flame-simple"></i>'
                                : ""
                            }
                            ${
                              data[i].televisione
                                ? '<i class="fa-solid fa-tv"></i>'
                                : ""
                            }
                            ${
                              data[i].aria_condizionata
                                ? '<i class="fa-solid fa-wind"></i>'
                                : ""
                            }
                            ${
                              data[i].accesso_disabili
                                ? '<i class="fa-solid fa-wheelchair"></i>'
                                : ""
                            }
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
}
