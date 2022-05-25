$(document).ready(function () {
  //ajax get request dei libri
  $.ajax({
    url: "http://localhost:8080/api/libri",
    method: "GET",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $("#libri").append(
          `
              <div class="card">
                  <div class="card-body">
                      <img src=${data[i].immagine} class="card-img-top">
                      <h5 class="card-title m-2">${data[i].titolo}</h5>
                      <p class="card-text">${data[i].prezzo} euro</p>
                      <a href="libro?id=${data[i]._id}" class="btn btn-primary" style="width: 100%">Dettagli</a>
                  </div>
              </div>
            `
        );
      }
    },
    error: function (err) {
      console.log(err);
    },
  });


  // ajax get request per la sezione dei filtri
  $("#filtri").change(function () {
    var filtri = {
      prezzo: $("#prezzo").val(),
    };

    $("input:checked").each(function () {
      filtri.materia = $(this).val();
    });

    $.ajax({
      url: "http://localhost:8080/api/libri/materie-prezzo",
      method: "GET",
      data: filtri,
      success: function (data) {
        console.log(data);
        $("#libri").empty();
        for (let i = 0; i < data.length; i++) {
          $("#libri").append(
            `
            <div class="card">
                <div class="card-body">
                    <img src=${data[i].immagine} class="card-img-top">
                    <h5 class="card-title m-2">${data[i].titolo}</h5>
                    <p class="card-text">${data[i].prezzo} euro</p>
                    <a href="libro?id=${data[i]._id}" class="btn btn-primary" style="width: 100%">Dettagli</a>
                </div>
            </div>
            `
          );
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });

  //ajax get request per la ricerca dei libri in base al titolo
  $("#cerca").on("click", function () {
    var search = $("#search-api").val();

    $.ajax({
      url: "http://localhost:8080/api/libri/search/" + search,
      method: "GET",
      success: function (data) {
        $("#libri").empty();
        for (let i = 0; i < data.length; i++) {
          $("#libri").append(
            `
            <div class="card">
              <div class="card-body">
                  <img src=${data[i].immagine} class="card-img-top">
                  <h5 class="card-title m-2">${data[i].titolo}</h5>
                  <p class="card-text">${data[i].prezzo} euro</p>
                  <a href="libro?id=${data[i]._id}" class="btn btn-primary" style="width: 100%">Dettagli</a>
              </div>
            </div>
            `
          );
        }
      },
      error: function (err) {
        console.log(err);
      },
    });
  });
});
