const WebSocket = require('ws');
const jwt = require("jsonwebtoken");
const User = require("./models/User");
const Chat = require("./models/Chat");

const dotenv = require("dotenv");

//Connessione Moongose
require("./db").connect();

dotenv.config({
  path: ".env",
});

const wss = new WebSocket.Server({ port: process.env.WEBSOCKET_PORT ?? 3001 });

let users = [];

wss.on('connection', function connection(ws, req) {
  let access_token = req.headers.cookie?.split("; ").map(x => x.split("=")).find(x => x[0] == "access-token")[1];

  let connected_user;
  
  if (!access_token) {
    ws.close();
    return;
  }

  // Verifica token
  try {
    const decoded = jwt.verify(access_token, process.env.JWT_SECRET);
    users[decoded.user.id] = ws;
    connected_user = decoded.user.id;
  } catch (error) {
    ws.close();
    return;
  }

  ws.on('message', async function message(data_) {
    try {
      const data = JSON.parse(data_);

      if(!data.message) return("Empty message");

      try {
        const receiver = await User.findById(data.to_user);

        if (!receiver) return("Receiver not found");

        const sender = await User.findById(connected_user);

        if (!sender) return("Sender not found");

        let chat = await Chat.findOne({
          partecipanti: {
            $all: [sender._id, receiver._id],
          },
        });

        if (!chat) {
          chat = new Chat({
            partecipanti: [sender._id, receiver._id],
            messaggi: [],
          });
        } 

        chat.messaggi.push({
          testo: data.message,
          inviato_da: sender._id,
        });

        chat.ultimo_messaggio = new Date();

        chat.save();

        const packet = {
          message: data.message,
          user_id: sender._id,
          user_name: sender.name,
          user_email: sender.email,
          user_avatar: sender.avatar
        };

        if (users[receiver._id]) users[receiver._id].send(JSON.stringify(packet));
      } catch (error) {
        console.log(error);
        ws.close();
      }
      
    } catch (error) {
      console.log(error);
      ws.close();
    }
  });

  ws.on('close', function close() {
    try {
      delete users[connected_user];
    } catch (error) {
      console.log(error);
    }
  });
});