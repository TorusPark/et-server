import expressAsyncHandler from "express-async-handler";
import express from "express";
import request from "request";
import bodyParser from "body-parser";
// import dotenv from "dotenv";

// dotenv.config();

const app = express();
// app.use(express.json());
app.use(bodyParser.json({ limit: "50mb" }));
app.use(bodyParser.urlencoded({ limit: "50mb", extended: true }));

// app.use(express.static("build"));

app.get(
  "/api",
  expressAsyncHandler(async (req, res) => {
    const fileUrl = req.query.url;
    // console.log("Query Url: ", fileUrl);
    if (fileUrl) {
      const escChars = { ">": "/", "<": "?", " ": "%20" };
      var fullPath = fileUrl.replace(/[>< ]/g, (m) => escChars[m]);

      // console.log("File Path: " + fullPath);

      // console.log(documents);
    }
    request.get(fileUrl, function (error, response, body) {
      if (!error && response.statusCode == 200) {
        var etfData = body;
        // Continue with your processing here.
        // console.log("File received!!!!!!!!!");
        res.header("Access-Control-Allow-Origin", "*");
        res.send({ etfData });
      }
    });
  })
);

app.use((err, req, res, next) => {
  res.status(500).send({ message: err.message });
});

const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server Running at ${port}`);
});
