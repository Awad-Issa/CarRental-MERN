const express = require('express');
const cors = require('cors') // This is new
const cookieParser = require('cookie-parser');
// const authRoute = require("./Routes/AuthRoute");

const app = express();
require('dotenv').config();
const port = process.env.PORT;
require('./config/mongoose.config'); // This is new
app.use(express.json()); // This is new
app.use(express.urlencoded({ extended: true })); // This is new

app.use(cookieParser());
// Change the app.use(cors()) to the one below
app.use(cors({ credentials: true, origin: 'http://localhost:3000' }));
require('./routes/app.routes')(app);

const server = app.listen(port, () => console.log(`Listening on port: ${port}`));
// const io = require('socket.io')(server, { cors: true });
//
// io.on("connection", socket => {
//
//     socket.on("message", ({ name, message }) => {
//         io.emit("message", { name, message })
//     })
//
//
// })
