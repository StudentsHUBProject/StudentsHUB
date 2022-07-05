const mongoose = require("mongoose");

require("dotenv").config({
  path: ".env",
});

function connect() {
  return new Promise(async (resolve, reject) => {
    if (process.env.NODE_ENV == "test") {
      const MongoMemoryServer =
        require("mongodb-memory-server").MongoMemoryServer;

      const mongod = await MongoMemoryServer.create();
      mongoose
        .connect(mongod.getUri(), {
          dbName: "test",
          useNewUrlParser: true,
          useUnifiedTopology: true,
        })
        .then((res, err) => {
          if (err) reject(err);
          resolve();
        });
    } else {
      mongoose
        .connect(process.env.MONGO_URI, { useNewUrlParser: true })
        .then((res, err) => {
          if (err) reject(err);
          resolve();
        });
    }
  });
}

function close() {
  return mongoose.disconnect();
}

module.exports = { connect, close };
