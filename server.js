const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

//DB
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const mssql = require('mssql');
const config = {
    server: conf.server,
    user: conf.user,
    password: conf.password,
    database: conf.database,
    port: conf.port,
    options: {
        encrypt: false,
    },
};

app.get('/api/customers', (req, res) => {
    mssql.connect(config, err => {
        if (err) console.log('에러' + err);

        // create a new request object
        const request = new mssql.Request();

        // query to the database and get the data
        //console.log('연동');
        request.query('SELECT * FROM CUSTOMER', (err, result) => {
            if (err) console.log(err);

            //console.log(result);
            res.send(result.recordset);
        });
    });
});

app.listen(port, () => 
    //1옆에~ 를 눌러라 야함
    console.log(`Listening on port ${port}`)
);