const express = require("express");
const fileUpload = require("express-fileupload");
const cors = require("cors");
const mongoose = require("mongoose");
const config = require("./config");

const authRoutes = require("./routes/auth");

const app = express();

app.use(cors());
app.use(express.json());
app.use("static", express.static("public"));
app.use(fileUpload());

app.use("/api/auth", authRoutes);

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