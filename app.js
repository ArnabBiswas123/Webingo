const express = require("express");
const connectDB = require("./db/connect");
const distanceRouter=require('./routes/distanceRouter')
const userRouter=require('./routes/userRouter');

const app = express();
const port = process.env.PORT || 5000;

require("dotenv").config();

const cors = require("cors");
app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Webingo");
});


app.use('/api/v1/user',userRouter)
app.use('/api/v1/distance',distanceRouter)

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    await app.listen(port, () => {
      console.log(`Example app listening on port ${port}`);
    });
  } catch (error) {
    console.log(error);
  }
};

start();
