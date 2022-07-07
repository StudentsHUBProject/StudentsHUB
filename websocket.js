const WebSocket = require('ws');
const User = require("./models/User");

const dotenv = require("dotenv");

if (process.env.NODE_ENV != "test") {
  //Connessione Moongose
  require("./db").connect();

  dotenv.config({
    path: ".env",
  });
} else {
  dotenv.config({
    path: ".env.example",
  });
}

const wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT ?? 3001 });

wss.on('connection', function connection(ws) {
  ws.on('message', function incoming(message_email) {
    wss.clients.forEach(function each(client) {
      if(client !== ws && client.readyState === WebSocket.OPEN){
      //client.send(data.toString());

        const x= message_email.toString().split("---");
        const message = x[0];
        const email= x[1];
        console.log(message);
        console.log(email);
        
        User.findOne({email: email}, (err, result) => {
          if (err) {
            res.status(400).send(err);
          } else {
            if(result!=null){
              console.log("ok");
              //ws.send(message);
              client.send(message);
            }
          } 
        });
      }
      /*
      if(client != ws && client.readyState == WebSocket.OPEN) {
        const x= message_email.toString().split("---");
        const message = x[0];
        const email= x[1];
        console.log(message);
        console.log(email);
        
        User.findOne({email: email}, (err, result) => {
          if (err) {
            res.status(400).send(err);
          } else {
            if(result!=null){
              console.log("ok");
              //ws.send(message);
              client.send(message);
            }
          } 
        });
      }
      */
    })
  })
    //ws.send(message);
    /*
    wss.clients.forEach(function each(client) {
      if(client !== ws && client.readyState == WebSocket.OPEN){
        client.send(message);
      }
    })
    */

  //active_connection = ws;
  
  //test();
});