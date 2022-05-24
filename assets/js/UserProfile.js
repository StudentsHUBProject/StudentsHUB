$(document).ready(function () {
 
  $(document).on("click", "#logoutButton", function () {
    document.cookie = "access-token=;expires=Thu, 01 Jan 1970 00:00:01 GMT;";
    window.location.href = "./signin";
  });

  $.ajax({
    url: "http://localhost:8080/api/user",
    method: "GET",
    success: function (data) {
      $(".UserSection").append(
        `
          <div class="UserPage">
            <div class="card">
              <div class="imgBx">
                <img src=${data.avatar} alt="">
              </div>
            <div class="content">
              <div class="details">
                  <h2>${data.name}</h2>
                  <br><span>${data.email}</span>
                  <div class="actionbtn">
                      <a href="" class="btn" id="logoutButton">Logout</a>
                  </div>
              </div>
           </div>
          </div>

          <div class="FormContainer">
            <div class="FormBox">
              <div class="title">Annunci</div>
                <div class="Annunci">
                  <div class="Section Appartamenti">
                    <h2 id="appartamenti">Appartamenti</h2>
                      <div class="AnnunciAppartamenti"></div>     
                  </div>
                  <div class="Section Libri">
                    <h2 id="libri">Libri</h2>
                    <div class="AnnunciLibri">
                      <a class="ACardLibri" href="/">
                        <div class="LibriContainer" id="libricard">
                          <div class="cardLibri">
                            <div class="card-body">
                                <img src="./img/81l0RVWNgfL.jpg" class="card-img-top">
                                <h5 class="card-title">Analisi 1</h5>
                                <p class="card-text">20 euro</p>
                            </div>
                          </div>
                        </div> 
                      </a>
                      <a class="ACardLibri" href="/">
                        <div class="LibriContainer" id="libricard">
                          <div class="cardLibri">
                            <div class="card-body">
                                <img src="./img/81l0RVWNgfL.jpg" class="card-img-top">
                                <h5 class="card-title">Analisi 1</h5>
                                <p class="card-text">20 euro</p>
                            </div>
                          </div>
                        </div> 
                      </a>
                      <a class="ACardLibri" href="/">
                        <div class="LibriContainer" id="libricard">
                          <div class="cardLibri">
                            <div class="card-body">
                                <img src="./img/81l0RVWNgfL.jpg" class="card-img-top">
                                <h5 class="card-title">Analisi 1</h5>
                                <p class="card-text">20 euro</p>
                            </div>
                          </div>
                        </div> 
                      </a>
                      <a class="ACardLibri" href="/">
                        <div class="LibriContainer" id="libricard">
                          <div class="cardLibri">
                            <div class="card-body">
                                <img src="./img/81l0RVWNgfL.jpg" class="card-img-top">
                                <h5 class="card-title">Analisi 1</h5>
                                <p class="card-text">20 euro</p>
                            </div>
                          </div>
                        </div> 
                      </a> 
                      </div>
                    </div>
                    <div class="Section Corsi">
                        <h2 id="corsi">Corsi</h2>
                          <div class="AnnunciCorsi">
                          </div>
                  </div>
                </div>
            </div>
          </div>
          `
      );
    },
    error: function (err) {
      console.log(err);
    },
  });

  $(document).on("click", ".removebtn", function () {
    $.ajax({
      url:
        "http://localhost:8080/api/" +
        $(this).attr("sezione") +
        "/" +
        $(this).attr("_id"),
      method: "DELETE",
      success: function (data) {
        $("#" + data._id).remove();
      },
      error: function (err) {
        console.log(err);
      },
    });
  });


  //appartamenti
  $.ajax({
    url: "http://localhost:8080/api/user/appartamenti",
    method: "GET",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $(".AnnunciAppartamenti").append(`
          <div id="${data[i]._id}">
            <div class="remove">
              <div class="removebtn" sezione="appartamenti" _id="${data[i]._id}"> x </div>
            </div>
            <a class="ACardAppartamenti" href="./appartamento?id=${data[i]._id}">
            <div class="cardAppartamenti">
              <img src="${data[i].immagini[0]}" class="cardAppartamenti-img-top">
              <div class="cardAppartamenti-body">
                <h5 class="cardAppartamenti-title">${data[i].titolo}</h5>
                <h4 class="cardAppartamenti-price">${data[i].prezzo}€</h4>
              </div>
            </div>
            </a>
          </div>
          `);
      }
    },
    error: function (err) {
      console.log(err);
    },
  });

  //corsi
  $.ajax({
    url: "http://localhost:8080/api/user/corsi",
    method: "GET",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $(".AnnunciCorsi").append(
          ` 
            <div id="${data[i]._id}">
              <div class="remove">
                <div class="removebtn" sezione="corsi" _id="${data[i]._id}"> x </div>
              </div>
                  <a class="ACardCorsi" href="SchedaTutor?id=${data[i]._id}">
                    <div class="cardCorso">
                      <div class="content">
                        <div class="details">
                          <div class="data">
                            <p>${data[i].Titolo}</p>
                          </div>
                          <div class="icons">
                            <span id="prezzo">${data[i].Prezzo}</span>
                            <span class="homeicon">${data[i].Modalita[0] == "on" ? '<i class="fa fa-solid fa-house-user"></i>': ""}</span>
                            <span class="awayicon">${data[i].Modalita[1] == "on" ? '<i class="fa fa-solid fa-house-laptop"></i>': ""}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </a>
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
