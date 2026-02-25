const mongoose = require("mongoose");

mongoose.set("strictQuery", true);
mongoose.connect("mongodb://localhost:27017/test"); 

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", async function () {
  // 1) Create schema
  const kittySchema = new mongoose.Schema({
    name: String,
  });

  // 2) Set a method
  kittySchema.methods.speak = function () {
    const greeting = this.name
      ? "Meow name is " + this.name
      : "I don't have a name";
    console.log(greeting);
  };

  // 3) Create model + call method
  const Kitten = mongoose.model("Kitten", kittySchema);

  const fluffy = new Kitten({ name: "fluffy" });
  fluffy.speak(); 

  await mongoose.connection.close();
});