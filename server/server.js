require('./config/config');

const express = require('express');
var bodyParser = require('body-parser');
var mysql = require('mysql');
const { host, user, password, port, database } = require('./config/config');


const app = express();

// CORS
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*"); // update to match the domain you will make the request from
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS");
    next();
});

// Body Parser

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

// Configuración global de rutas
app.use(require('./routes/index'));
app.use('/uploads', express.static('uploads'));

// mongoose.connection.openUri(process.env.URLDB, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true }, (err, res) => {

//     if (err) throw err;

//     console.log('Base de datos ONLINE');

// });



var con = mysql.createConnection({
  host: host,
  user: user,
  password: password,
  port: port,
  database: database
});

con.connect(function(err) {
  if (err) throw err;
  console.log("Connected!");
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando puerto: ', process.env.PORT);
});