$(document).ready(function () {
  var id = window.location.href.split("?id=")[1];

  //ajax get request
  $.ajax({
    url: API_ENDPOINT + "/api/libri/" + id,
    method: "GET",
    success: function (data) {
      console.log(data);
      $("#libro").append(
        `
          <div id="griglia">
            <section class="sidebar header">
              <img src=${data.immagine}>
            </section>
            <section class="content-small">
              <h1>${data.titolo}</h1>
              <hr>
              <br>
              <br>
              <h3 id="pr">Prezzo: ${data.prezzo} euro</h3>
              <h3 id="em"><p id="contatta" ref="${data.user}" class="btn btn-danger" role="button">Contattami!</p> </h3>
            </section>
            <section class="content-large">
              <h3> Descrizione del libro: </h3>
              <p> ${data.descrizione} </p>
            </section>
          </div>
          `
      );
    },
    error: function (err) {
      window.location.href = "/libri";
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
