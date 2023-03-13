import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const app = express();

function authentication(req, res, next) {
    let authHeader = req.headers.authorozation;
    console.log(req.headers);

    if (!authHeader) {
        let error = new Error("You are not authenticated");
        res.setHeader("WWW-Authenticate", "Basic");
        error.status = 401;
        return next(error);
    }

    let auth = new Buffer.from(authHeader.split()[1], "base64")
        .toString()
        .split(":");
    let user = auth[0];
    let pass = auth[1];

    if (user == "admin" && pass == "password") {
        next();
    } else {
        let error = new Error("You are not authenticated");
        res.setHeader("WWW-Authenticate", "Basic");
        error.status = 401;
        return next(error);
    }
}


const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(authentication);
app.use(express.static(path.join(__dirname, 'public')));

app.listen(3000, () => {
    console.log("Server is running");
});
