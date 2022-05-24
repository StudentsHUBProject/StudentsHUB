let isAuth = false;

$.ajax({
  url: "http://localhost:8080/api/user",
  method: "GET",
  success: function (data) {
    isAuth = true;
  },
  error: function (err) {
    isAuth = false;
  },
});

$(document).ready(function () {
  if (isAuth) {
    $("#navbar").append(
      '<a href="./user" class="btn btn-lg" id="UserButton"><i class="fas fa-user-circle"></i></a>'
    );
  } else {
    $("#navbar").append(
      '<a href="./signin" class="btn btn-outline-light btn-lg" id="loginButton">Login</a>'
    );
  }
});
