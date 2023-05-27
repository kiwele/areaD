import env from "dotenv";
import express from "express";
import morgan from "morgan";
import bodyParser from "body-parser";
import db from "./database.js";
import userRouter from "./routes/user.js";
import propertiesRouter from "./routes/properties.js";
import https from "https";

// Load environment variables from .env file if needed
env.config();

const app = express();

let PORT = process.env.PORT || 4000;

db.sequelize.sync({ alter: true });
// db.sequelize.sync({ force: true });

// log request
app.use(morgan("tiny"));

app.use(express.urlencoded({ extended: false }));
// pass request to body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use("/", userRouter);
app.use('/property/', propertiesRouter);

// Create an HTTPS server with rejectUnauthorized set to false
const server = https.createServer({ rejectUnauthorized: false }, app);

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

export default app;
