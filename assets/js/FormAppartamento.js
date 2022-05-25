let map;
let indirizzo = {
  citta: "",
  provincia: "",
  regione: "",
  paese: "",
  via: "",
  cap: "",
  lat: "",
  lng: "",
};
let immagini = [];

function initMap() {
  map = new google.maps.Map(document.getElementById("map"), {
    center: { lat: 41.89039378761143, lng: 12.492083482586754 },
    zoom: 5,
  });

  const autocompleteInput = document.getElementById("indirizzo");

  const autocomplete = new google.maps.places.Autocomplete(autocompleteInput, {
    fields: ["address_components", "geometry", "name"],
    types: ["address"],
  });

  autocomplete.addListener("place_changed", () => {
    const place = autocomplete.getPlace();

    for (const component of place.address_components) {
      const componentType = component.types[0];

      switch (componentType) {
        case "street_number": {
          indirizzo.via += component.long_name;
          break;
        }

        case "route": {
          indirizzo.via = `${component.long_name} ${indirizzo.via}`;
          break;
        }

        case "postal_code": {
          indirizzo.cap = `${component.long_name}${indirizzo.cap}`;
          break;
        }

        case "postal_code_suffix": {
          indirizzo.cap = `${indirizzo.cap}-${component.long_name}`;
          break;
        }
        case "locality":
          indirizzo.citta = component.long_name;
          break;
        case "administrative_area_level_1": {
          indirizzo.regione = component.short_name;
          break;
        }
        case "administrative_area_level_2": {
          indirizzo.provincia = component.short_name;
          break;
        }
        case "country":
          indirizzo.paese = component.long_name;
          break;
      }
    }

    indirizzo.lat = place.geometry.location.lat();
    indirizzo.lng = place.geometry.location.lng();

    const marker = new google.maps.Marker({
      position: { lat: indirizzo.lat, lng: indirizzo.lng },
      map,
      label: indirizzo.via,
    });

    map.setZoom(18);
    map.setCenter(marker.getPosition());
  });
}
window.initMap = initMap;

$(document).ready(function () {
  var current_fs, next_fs, previous_fs;
  var opacity;

  $("[required]").click(function () {
    $(this).removeClass("is-invalid");
  });

  $(".next").click(function () {
    let valid = true;
    $(this)
      .parent()
      .find("[required]")
      .each(function () {
        if (
          $(this).is("img") &&
          $(this).attr("src") ==
            "https://icon-library.com/images/add-picture-icon/add-picture-icon-16.jpg"
        ) {
          valid = false;
          $(this).addClass("is-invalid");
        } else if (
          !$(this).is("img") &&
          ($(this).is(":invalid") || !$(this).val() || indirizzo.via == "")
        ) {
          valid = false;
          $(this).addClass("is-invalid");
        }
      });
    if (!valid) {
      document
        .getElementById("msform")
        .scrollIntoView({ behavior: "smooth", block: "end" });
      return;
    }

    current_fs = $(this).parent();
    next_fs = $(this).parent().next();

    if (next_fs.attr("id") == "latest") {
      var appartamento = {
        titolo:
          $("#tipologiaAnnuncio option:selected").text() +
          " - " +
          indirizzo.via.trim() +
          ", " +
          indirizzo.citta,
        descrizione: $("#descrizione").val(),
        tipologia: $("#tipologiaAnnuncio").val(),
        prezzo: $("#prezzo").val(),
        caparra: $("#caparra").val(),
        utenze_medie: $("#utenzeMedie").val(),
        contratto: $("#tipologiaContratto").val(),
        metri_quadri: $("#dimensioni").val(),
        restrizioni: $("#restrizioni").val(),
        indirizzo: `${indirizzo.via}, ${indirizzo.citta}, ${indirizzo.cap} (${indirizzo.provincia})`,
        citta: indirizzo.citta,
        lat: indirizzo.lat,
        lng: indirizzo.lng,
        posti_letto: $("#postiLetto").val(),
        classe_energetica: $("#classeEnergetica").val(),
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
        immagini: immagini,
      };
      $.ajax({
        url: "http://localhost:8080/api/appartamenti",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(appartamento),
        success: function (data) {
          if (data.name && data.name == "CastError") {
            return alert("Qualcosa è andato storto: " + data.message);
          }
          $("#progressbar li")
            .eq($("fieldset").index(next_fs))
            .addClass("active");
          next_fs.show();
          current_fs.animate(
            { opacity: 0 },
            {
              step: function (now) {
                opacity = 1 - now;
                current_fs.css({
                  display: "none",
                  position: "relative",
                });
                next_fs.css({ opacity: opacity });
              },
              duration: 600,
            }
          );
        },
        error: function (err) {
          return alert("Qualcosa è andato storto!");
        },
      });

      return;
    }

    $("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

    next_fs.show();
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          opacity = 1 - now;
          current_fs.css({
            display: "none",
            position: "relative",
          });
          next_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
  });

  $(".previous").click(function () {
    current_fs = $(this).parent();
    previous_fs = $(this).parent().prev();

    $("#progressbar li")
      .eq($("fieldset").index(current_fs))
      .removeClass("active");

    previous_fs.show();
    current_fs.animate(
      { opacity: 0 },
      {
        step: function (now) {
          opacity = 1 - now;
          current_fs.css({
            display: "none",
            position: "relative",
          });
          previous_fs.css({ opacity: opacity });
        },
        duration: 600,
      }
    );
  });

  let numero_foto = 1;

  $(".add").click(function () {
    numero_foto++;
    if (numero_foto == 8) {
      $(this).hide();
    }
    $(this)
      .closest(".row")
      .find(".add")
      .before(
        '<div class="col-sm-3"><img class="img-thumbnail" src="https://icon-library.com/images/add-picture-icon/add-picture-icon-16.jpg"><i class="fa fa-xmark del"></i><input type="file" accept="image/*" class="uploadFile" value="Carica Foto" style="width:0px;height:0px;overflow:hidden;"></div>'
      );
  });

  $(document).on("click", "i.del", function () {
    if (numero_foto == 8) {
      $(".add").show();
    }
    numero_foto--;
    let value = $(this).parent().find("img").attr("src");
    if (
      value !=
      "https://icon-library.com/images/add-picture-icon/add-picture-icon-16.jpg"
    ) {
      immagini.splice(immagini.indexOf(value), 1);
    }
    $(this).parent().remove();
  });

  $(document).on("click", ".img-thumbnail", function () {
    $(this).parent().find(".uploadFile").trigger("click");
  });

  $(document).on("change", ".uploadFile", function () {
    var uploadFile = $(this);
    var files = !!this.files ? this.files : [];
    if (!files.length || !window.FileReader) return;

    //verifica che sia un'immagine
    if (/^image/.test(files[0].type)) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onloadend = function () {
        uploadFile
          .closest(".col-sm-3")
          .find(".img-thumbnail")
          .attr("src", this.result);
        immagini.push(this.result);
      };
    }
  });
});
