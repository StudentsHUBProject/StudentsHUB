$(document).ready(function () {
  let users = [];
  let selected_user;

  //ajax get request
  $.ajax({
    url: API_ENDPOINT + "/api/user/chat",
    method: "GET",
    success: processChats,
    error: function (err) {
      console.log(err);
    },
  });

  function processChats(data) {
    $(".sidebar").empty();

    for (let i = 0; i < data.length; i++) {
      let user = data[i].user;
      users[user._id] = user;
      let chat = data[i].chat;
      let ultimo_messaggio = chat.messaggi[chat.messaggi.length - 1] || {testo: "", data: new Date()};
      $(".sidebar").append(
        `
        <div id="sidebar-${user._id}">
          <div class="friend-drawer friend-drawer--onhover">
            <img class="profile-image" src="${user.avatar}" alt="">
            <div class="text">
            <h6>${user.name}</h6>
            <p class="text-muted">${ultimo_messaggio.testo}</p>
            </div>
            <span class="time text-muted small">${timeSince(new Date(ultimo_messaggio.data))}</span>
          </div>
          <hr>
        </div>
        `
      );

      $(".chat-panel").prepend(`<div id="chat-${user._id}" class="chat-area" style="display: none"></div>`);

      for(let i = 0; i < chat.messaggi.length; i++) {
        const messaggio = chat.messaggi[i];
        if(messaggio.inviato_da !== user._id) {
          direzione = "right";
          offset = "offset-md-9";
        }
        else {
          direzione = "left";
          offset = '';
        }
        $(`#chat-${user._id}`).append(
          `
          <div class="row no-gutters">
            <div class="col-md-3 ${offset}">
              <div class="chat-bubble chat-bubble--${direzione}">
              ${messaggio.testo}
              </div>
            </div>
          </div>
          `
        );
      }
    }

    if (data[0] && data[0].user) {
      selected_user = data[0].user._id;
      $(`#chat-${selected_user}`).show();
      $("#userImg").attr("src", users[selected_user].avatar);
      $("#userName").html(users[selected_user].name);
      $(`#chat-${selected_user}`).scrollTop($(`#chat-${selected_user}`).prop("scrollHeight"));
    } else {
      selected_user = null;
      $("#input").hide();
    }
  }

  const message = document.querySelector('#message');

  let ws;

  if (ws) {
    ws.onerror = ws.onopen = ws.onclose = null;
    ws.close();
  }

  const endpoint = window.location.port ? 'ws://' + window.location.hostname + ':3001' : 'wss://' + window.location.hostname + '/websocket';

  ws = new WebSocket(endpoint);
  ws.onopen = () => {
  }
  ws.onmessage = ({ data }) => showMessage(JSON.parse(data));
  ws.onclose = function() {
    ws = null;
    alert('Connection closed!');
  }

  function showMessage(data) {
    if(data.to_user) {
      direzione = "right";
      offset = "offset-md-9";
      user = data.to_user;
    }
    else {
      direzione = "left";
      offset = '';
      user = data.user_id;

      if(!users[data.user_id]) {
        users[data.user_id] = {
          _id: data.user_id,
          name: data.user_name,
          email: data.user_email,
          avatar: data.user_avatar
        };
        $(".sidebar").append(
          `
          <div id="sidebar-${data.user_id}">
            <div class="friend-drawer friend-drawer--onhover">
              <img class="profile-image" src="${data.user_avatar}" alt="">
              <div class="text">
              <h6>${data.user_name}</h6>
              <p class="text-muted">${data.message}</p>
              </div>
              <span class="time text-muted small">${data.data}</span>
            </div>
            <hr>
          </div>
          `
        );
        $("#input").before(`<div id="chat-${data.user_id}" class="chat-area" style="display: none"></div>`);
        
      }
    }

    $(`#sidebar-${user}`).parent().prepend($(`#sidebar-${user}`));

    $(`#chat-${user}`).append(
      `
      <div class="row no-gutters">
        <div class="col-md-3 ${offset}">
          <div class="chat-bubble chat-bubble--${direzione}">
          ${data.message}
          </div>
        </div>
      </div>
      `
    );
    $(`#sidebar-${user} p`).text(data.message);
    $(`#sidebar-${user} span`).text(timeSince(new Date()));
    $(`#chat-${user}`).scrollTop($(`#chat-${user}`).prop("scrollHeight"));
    message.value = '';
  }

  $('#message').keypress(function(event) {
    var keycode = (event.keyCode ? event.keyCode : event.which);
    if(keycode == '13'){
       $('#send').click();
    }
  });

  $('#send').click(function () {
    if (!message.value || message.value.replace(" ", "") == "" || !selected_user) return;

    if (!ws) {
      alert("No WebSocket connection :(");
      return;
    }

    let data = {
        message: message.value,
        to_user: selected_user,
    };
    ws.send(JSON.stringify(data));
    showMessage(data);
  });


  $(document).on("click", '.friend-drawer--onhover', function() {
    $("#input").show();
    $(`#chat-${selected_user}`).hide();
    selected_user = $(this).parent().attr("id").split("-")[1];
    $(`#chat-${selected_user}`).show();
    $("#userImg").attr("src", users[selected_user].avatar);
    $("#userName").html(users[selected_user].name);
    $(`#chat-${selected_user}`).scrollTop($(`#chat-${selected_user}`).prop("scrollHeight"));
  });
});

function timeSince(date) {

  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    return Math.floor(interval) + " anni fa";
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    return Math.floor(interval) + " mesi fa";
  }
  interval = seconds / 86400;
  if (interval > 1) {
    return Math.floor(interval) + " giorni fa";
  }
  interval = seconds / 3600;
  if (interval > 1) {
    return Math.floor(interval) + " ore fa";
  }
  interval = seconds / 60;
  if (interval > 1) {
    return Math.floor(interval) + " minuti fa";
  }
  if (seconds > 1) {
    return Math.floor(seconds) + " secondi fa";
  }
  return "ora";
}