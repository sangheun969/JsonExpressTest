const express = require("express");
const path = require("path");

const app = express();
// app.set("port", process.env.PORT || 8000);
// app.get("/", (req, res) => {
//   // res.send("Hello, Express");
//   res.sendFile(path.join(__dirname, "/index.html"));
// });

app.set("port", process.env.PORT || 8000);

app.use((req, res, next) => {
  console.log("모든 요청이 실행됩니다");
  next();
});

app.get(
  "/",
  (req, res, next) => {
    console.log("GET/ 여청에서만 실행됩니다.");
    next();
  },
  (res, req) => {
    throw new Error("에러는 에러 처리 미들웨어 갑니다.");
  }
);

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).send(err.message);
});

app.listen(app.get("port"), () => {
  console.log(app.get("port"), "번 포트에서 대기중");
});
