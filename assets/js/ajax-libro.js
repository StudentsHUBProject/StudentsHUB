$(document).ready(function () {
  var id = window.location.href.split("?id=")[1];

  //ajax get request
  $.ajax({
    url: "http://localhost:8080/api/libri/" + id,
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
              <h3 id="em">Email del venditore: <a id="b" class="btn btn-danger" role="button" href="mailto:${data.email}">Contattami!</a> </h3>
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
      console.log(err);
    },
  });
});
