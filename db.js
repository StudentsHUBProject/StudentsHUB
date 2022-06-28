const mongoose = require("mongoose");

require("dotenv").config({
    path: ".env",
  });

function connect(){
    return new Promise((resolve,reject) => {
        if(process.env.NODE_ENV == "test"){
            const Mockgoose = require("mockgoose").Mockgoose;
            const mockgoose = new Mockgoose(mongoose);

            mockgoose.prepareStorage()
               .then(() => {
                mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then((res,err) => {
                    if(err) reject(err)
                    resolve();
                  })
               })
        } else{
        mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true }).then((res,err) => {
            if(err) reject(err);
            resolve();
          })
        }
    })
}

function close(){
    return mongoose.disconnect();
}

module.exports = {connect, close}






