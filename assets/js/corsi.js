/**=====Scorri verso Howto=====**/
function StartFunction() {
  document
    .getElementById("HowTo")
    .scrollIntoView({ behavior: "smooth", block: "end" });
}

/**=====Select Filtri=====**/
$(document).ready(function () {
  $("#select-subject").selectize({
    sortField: "text",
  });
  $("#select-level").selectize({
    sortField: "text",
  });
  $("#select-city").selectize({
    sortField: "text",
  });

  /**======AJAX get request======**/
  $.ajax({
    url: API_ENDPOINT + "/api/corsi",
    method: "GET",
    success: function (data) {
      for (let i = 0; i < data.length; i++) {
        $(".ItemContainer").append(
          `
          <div class="card">
              <div class="imgBx">
                  <img src=${data[i].Foto} alt="">
              </div>
              <div class="content">
                  <div class="details">
                      <h2>${data[i].Nome}</h2>
                      <h2>${data[i].Cognome}
                      <br><span>${data[i].Regione}</span><br><span>${
            data[i].Titolo_di_studio
          }</span></h2>
                      <div class="data">
                          <p>${data[i].Titolo}</p>
                      </div>
                      <div class="actionbtn">
                          <a href="SchedaTutor?id=${
                            data[i]._id
                          }" class="btn btn-lg readmorebtn">Scopri</a>
                      </div>
                      <div class="icons">
                          <span id="prezzo">${data[i].Prezzo}</span>
                          <span class="homeicon">${
                            data[i].Modalita[0] == "on"
                              ? `<i class="fa fa-solid fa-house-user"></i>`
                              : ` `
                          }</span>
                          <span class="awayicon">${
                            data[i].Modalita[1] == "on"
                              ? `<i class="fa fa-solid fa-house-laptop"></i>`
                              : ` `
                          }</span>
                      </div>
                  </div>
              </div>
           </div>
          `
        );
      }

      let loadMoreBtn = document.querySelector("#loadmore");
      let min_item = 6;
      let allitems = data.length;
      console.log(allitems);
      if (allitems > min_item) {
        loadMoreBtn.style.display = "inline-block";
      }
      $(".card").slice(0, 6).show(); // select the first ten
      $("#loadmore").click(function (e) {
        // click event for load more
        e.preventDefault();
        $(".card:hidden").slice(0, 3).show(); // select next 10 hidden divs and show them
        if ($(".card:hidden").length == 0) {
          // check if any hidden divs still exist
          console.log("no more divs");
          loadMoreBtn.style.display = "none";
        }
      });
    },
    error: function (err) {
      console.log(err);
    },
  });

  $("#select-subject, #select-level, #select-city").change(function () {
    var filtri = {
      Materia: $("#select-subject").val(),
      Livello: $("#select-level").val(),
      Regione: $("#select-city").val(),
    };

    Object.keys(filtri).forEach((key) => {
      if (filtri[key] === "" || filtri[key] === false) {
        delete filtri[key];
      }
    });

    $.ajax({
      url: API_ENDPOINT + "/api/corsi/SchedaTutor/",
      method: "GET",
      data: filtri,
      success: function (data) {
        console.log(data);
        $(".ItemContainer").empty();
        for (let i = 0; i < data.length; i++) {
          $(".ItemContainer").append(
            `
          <div class="card">
              <div class="imgBx">
                  <img src=${data[i].Foto} alt="">
              </div>
              <div class="content">
                  <div class="details">
                      <h2>${data[i].Nome}</h2>
                      <h2>${data[i].Cognome}
                      <br><span>${data[i].Regione}</span><br><span>${
              data[i].Titolo_di_studio
            }</span></h2>
                      <div class="data">
                          <p>${data[i].Titolo}</p>
                      </div>
                      <div class="actionbtn">
                          <a href="SchedaTutor?id=${
                            data[i]._id
                          }" class="btn readmorebtn">Scopri</a>
                      </div>
                      <div class="icons">
                          <span> <i class="fa-solid fa-euro-sign"></i>${
                            data[i].Prezzo
                          }</span>
                          <span class="homeicon">${
                            data[i].Modalita[0] == "on"
                              ? `<i class="fa fa-solid fa-house-user"></i>`
                              : ` `
                          }</span>
                          <span class="awayicon">${
                            data[i].Modalita[1] == "on"
                              ? `<i class="fa fa-solid fa-house-laptop"></i>`
                              : ` `
                          }</span>
                      </div>
                  </div>
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
