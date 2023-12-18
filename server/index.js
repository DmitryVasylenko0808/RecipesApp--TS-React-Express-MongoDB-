const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");

const authRoutes = require("./routes/auth");
const profileRoutes = require("./routes/profile");
const recipeRoutes = require("./routes/recipes");
const reviewRoutes = require("./routes/review");

const app = express();

app.use(cors());
app.use(express.json());
app.use("static", express.static("public"));
app.use(fileUpload());

app.use("/api/auth", authRoutes);
app.use("/api/profile", profileRoutes);
app.use("/api/recipe", recipeRoutes);
app.use("/api/review", reviewRoutes);

const main = async () => {
    try {
        await mongoose.connect(config.DB_URL);
        console.log("DB OK");
        app.listen(config.PORT, () => {
            console.log("Server OK", config.PORT);
        })
    } catch (err) {
        console.log(err);
    }
};

main();