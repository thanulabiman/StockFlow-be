import express from "express";
import morgan from "morgan";

const app = express();
const port = 3000;

// middlewares
app.use(morgan("tiny"));
app.use(express.json());

app.listen(port, (error) => {
  if (error) {
    console.error("Couldn't start server", error);
    return;
  }

  console.log(`Server is running in localhost : ${port}`);
});
