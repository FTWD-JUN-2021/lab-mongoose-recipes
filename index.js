const mongoose = require("mongoose");

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require("./models/Recipe.model");
// Import of the data from './data.json'
const data = require("./data");

const MONGODB_URI =
  "mongodb+srv://mahim:mahim@cluster0.r3bte.mongodb.net/myFirstDatabase?retryWrites=true&w=majority";

// Connection to the database "recipe-app"
let newRecipe = {
  title: "Hamburger",
  cuisine: "American",
};
mongoose
  .connect(MONGODB_URI, {
    useCreateIndex: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then((self) => {
    console.log(`Connected to the database: "${self.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    Recipe.create(newRecipe).then((res) => {
      console.log(res.title);
    });
    // Run your code here, after you have insured that the connection was made
    Recipe.insertMany(data).then((res) => {
      console.log(res.map((eachRes) => eachRes.title));
      console.log("race condition");
      Recipe.updateOne(
        { title: "Rigatoni alla Genovese" },
        { duration: 100 }
      ).then((res) => console.log("The recipe was updated successfully", res));
    });
  })
  .catch((error) => {
    console.error("Error connecting to the database", error);
  });
