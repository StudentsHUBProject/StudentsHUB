$(document).ready(function () {
  let immagine;

  $(document).on("change", "#immagine", function () {
    var uploadFile = $(this);
    var files = !!this.files ? this.files : [];
    if (!files.length || !window.FileReader) return;

    //verifica che sia un'immagine
    if (/^image/.test(files[0].type)) {
      var reader = new FileReader();
      reader.readAsDataURL(files[0]);

      reader.onloadend = function () {
        immagine = this.result;
      };
    }
  });

  //ajax post request per la creazione del libro
  $(document).on("click", "#crea-libro", function (event) {
    event.preventDefault();
    var crea = {
      immagine: immagine,
      materia: $("#materia").val(),
      titolo: $("#titolo").val(),
      descrizione: $("#descrizione").val(),
      prezzo: $("#prezzo").val(),
    };

    if (
      crea.materia == "" ||
      crea.titolo == "" ||
      crea.descrizione == "" ||
      crea.prezzo == "" ||
      crea.immagine == ""
    ) {
    } else {
      $.ajax({
        url: API_ENDPOINT + "/api/libri/crea-libro",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(crea),
        success: function (data) {
          window.location.href = API_ENDPOINT + "/libri";
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
  });
});
