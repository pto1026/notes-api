const http = require("http");
const mongoose = require("mongoose");
const app = require("./app");

const PORT = process.env.PORT || 8000;

const MONGO_URL =
  "mongodb+srv://pto1026:bXXiMQba06Q6TOww@nasacluster.dr894.mongodb.net/notesDatabase?retryWrites=true&w=majority";

mongoose.connection.once("open", () => {
  console.log("MongoDB connection ready!");
});

mongoose.connection.on("error", (err) => {
  console.error(err);
});

const server = http.createServer(app);

async function startServer() {
  await mongoose.connect(MONGO_URL);

  server.listen(PORT, () => {
    console.log(`Listening on port ${PORT}`);
  });
}

startServer();