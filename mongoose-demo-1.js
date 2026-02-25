const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/test"); 
const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  // 1) Create schema + model
  const fruitSchema = new mongoose.Schema({
    name: String,
  });

  const Fruit = mongoose.model("Fruit", fruitSchema);

  // 2) Add a new Fruit and display it
  const apple = new Fruit({ name: "apple" });
  console.log(apple.name); 
  await mongoose.connection.close();
});