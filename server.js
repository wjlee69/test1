const express = require("express");
const bodyParser = require("body-parser");
const fs = require('fs');
const mysql = require('mysql');
const multer = require('multer');

const app = express();
const port = process.env.PORT || 5000;
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);

const upload = multer({dest: './upload'});

const connection = mysql.createConnection({
  host: conf.host,
  user: conf.user,
  password: conf.pwd,
  port: conf.port,
  database: conf.db
});

connection.connect();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use('/image', express.static('./upload'));

// you can check the json grammar at http://jsonlint.com
app.get('/api/customers',(req,res)=>{
    connection.query(
      "select * from customer",
      (err, rows, fields) =>{
        res.send(rows);
      }
    );


});

app.post('/api/customers', upload.single('image'), (req,res)=>{
  let sql = 'INSERT INTO CUSTOMER VALUES(null, ?, ?, ?, ?, ?)';
  let image = '/image/' + req.file.filename;
  let name = req.body.name;
  let birthday = req.body.birthday;
  let gender = req.body.gender;
  let job = req.body.job;
  let params = [image, name, birthday, gender, job];

  connection.query(sql, params, (err, rows, fields)=>{
    res.send(rows);
  })
});

app.listen(port, ()=> console.log(`Listening on port ${port}`));