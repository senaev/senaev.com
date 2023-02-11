import express from 'express';

const app = express();

app.use(express.json());

app.get("/health-check", (_, res) => {
  res.send("ok");
});

app.use(express.static(__dirname + "/static"));

app.listen(80, () => console.log("Listening on port 80"));
