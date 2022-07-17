$(document).ready(function () {
  var id = window.location.href.split("?id=")[1];
  //ajax get request
  $.ajax({
    url: API_ENDPOINT + "/api/corsi/SchedaTutor/" + id,
    method: "GET",
    success: function (data) {
      console.log(data);
      $(".TutorInfo").append(
        `
            <div class="card">
              <div class="imgBx">
                  <img src=${data.Foto} alt="">
              </div>
              <div class="content">
                  <div class="details">
                      <h2>${data.Nome}</h2>
                      <h2>${data.Cognome}
                      <br><span>${data.Regione}</span><br><span>${
          data.Titolo_di_studio
        }</span></h2>
                      <div class="data">
                          <p>${data.Titolo}</p>
                      </div>
                      <div class="icons">
                          <span id="prezzo">${data.Prezzo}</span>
                          <span class="homeicon">${
                            data.Modalita[0] == "on"
                              ? `<i class="fa fa-solid fa-house-user"></i>`
                              : ` `
                          }</span>
                          <span class="awayicon">${
                            data.Modalita[1] == "on"
                              ? `<i class="fa fa-solid fa-house-laptop"></i>`
                              : ` `
                          }</span>
                      </div>
                  </div>
              </div>
           </div>
            <div class="Info">
                <h1>Riguardo la lezione</h1>
                <p>${data.Descrizione}</p>
                <div class="TutorContent">
                  <div class="argomentiBox">
                      <div class="argomenti">
                        <h2>INFO</h2>
                        <li>Materia: ${data.Materia}</li>
                        <li>Livello: ${data.Livello}</li>
                      </div>
                  </div>
                  <div class="LingueBox">
                      <div class="Lingue">
                        <h2>LINGUE</h2>
                        <li>${data.Lingua}</li>
                        <li>${data.Lingua_Secondaria}</li>
                      </div>
                  </div>
                  <div class="UtilLinks">
                    <div class="ContactBox">
                      <div class="contatta">
                      <a href="mailto:${data.email}">
                          Prenota una lezione
                      </a>
                      </div>
                    </div>
                    <div class="Drive">
                      <div class="cartellaD">
                        <a href="${data.drive}">
                          Materiale del Corso
                        </a>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            `
      );
    },
    error: function (err) {
      window.location.href = "/corsi";
    },
  });
});
