const API_ENDPOINT = window.location.port > 0 ? window.location.protocol + '//' + window.location.hostname + ':' + window.location.port : window.location.protocol + '//' + window.location.hostname;

let isAuth = false;



$(document).ready(function () {
  $.ajax({
    url: API_ENDPOINT + "/api/user",
    method: "GET",
    success: function (data) {
      isAuth = true;
      $("#navbar").append(
        '<a href="./user" class="btn btn-lg" id="UserButton"><i class="fas fa-user-circle"></i></a>'
      );
    },
    error: function (err) {
      isAuth = false;
      $("#navbar").append(
        '<a href="./signin" class="btn btn-outline-light btn-lg" id="loginButton">Login</a>'
      );
    }
  });
});
