$(document).ready(function () {
  $(document).on("submit", "#signupf", function () {
    var data = {
      name: $("#user").val(),
      email: $("#email").val(),
      password: $("#password").val(),
      confirmpassword: $("#confirmpassword").val(),
    };

    if (
      data.name == "" ||
      data.email == "" ||
      data.password == "" ||
      data.confirmpassword == ""
    ) {
    } else {
      $.ajax({
        url: "http://localhost:8080/api/user/register",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(data),
        success: function (token) {
          window.location.href = "http://localhost:8080/signin";
        },
        error: function (err) {
          for (var i = 0; i < err.responseJSON.errors.length; i++) {
            $.toast({
              heading: "Error",
              text: err.responseJSON.errors[i].msg,
              showHideTransition: "fade",
              icon: "error",
              position: "top-right",
            });
          }
        },
      });
    }

    return false;
  });

  $(document).on("submit", "#signinf", function () {
    var data = {
      email: $("#signeduser").val(),
      password: $("#signedpass").val(),
    };

    if (data.email == "" || data.password == "") {
    } else {
      $.ajax({
        url: "http://localhost:8080/api/user/login",
        method: "POST",
        dataType: "json",
        contentType: "application/json",
        processData: false,
        data: JSON.stringify(data),
        success: function (token) {
          console.log(token);
          window.location.href = "http://localhost:8080/user";
        },
        error: function (err) {
          for (var i = 0; i < err.responseJSON.errors.length; i++) {
            $.toast({
              heading: "Error",
              text: err.responseJSON.errors[i].msg,
              showHideTransition: "fade",
              icon: "error",
              position: "top-right",
            });
          }
        },
      });
    }

    return false;
  });
});
