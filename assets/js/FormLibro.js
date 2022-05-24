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
  $("#crea-libro").on("click", function () {
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
        url: "http://localhost:8080/api/libri/crea-libro",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(crea),
        success: function () {
          window.location.href = "http://localhost:8080/libri";
        },
        error: function (err) {
          console.log(err);
        },
      });
    }
  });
});
