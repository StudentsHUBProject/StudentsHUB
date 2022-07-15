$(document).ready(function () {
  const to_user = document.querySelector('#to_user');
  const showmessages = document.querySelector('#showmessage');
  const message = document.querySelector('#message');

  let ws;

  if (ws) {
        ws.onerror = ws.onopen = ws.onclose = null;
        ws.close();
  }

  const endpoint = window.location.port ? 'ws://' + window.location.hostname + ':3001' : 'wss://' + window.location.hostname + '/websocket';

  ws = new WebSocket(endpoint);
  ws.onopen = () => {
    alert('Connection opened!');
  }
  ws.onmessage = ({ data }) => showMessage(JSON.parse(data));
  ws.onclose = function() {
    ws = null;
    alert('Connection closed!');
  }

  function showMessage(data) {
    console.log(data);
    showmessages.textContent += `\n\n${data.message}`;
    showmessages.scrollTop = showmessages.scrollHeight;
    message.value = '';
  }

  $('#send').click(function () {
    if (!ws) {
        showMessage("No WebSocket connection :(");
        return ;
    }

    let data = {
        message: message.value,
        to_user: to_user.value,
    };
    ws.send(JSON.stringify(data));
    showMessage(data);
  });
});