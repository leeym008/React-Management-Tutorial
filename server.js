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

//const request = new mssql.Request();

app.get('/api/customers', (req, res) => {
    mssql.connect(config, err => {
        if (err) console.log('에러' + err);

        const request = new mssql.Request();
        //console.log('연동');
        request.query('SELECT * FROM CUSTOMER', (err, result) => {
            if (err) console.log(err);

            //console.log(result);
            res.send(result.recordset);
        });
    });
});


const multer = require('multer');
const upload = multer({dest: './upload'})

app.use('/image', express.static('./upload'));

app.post('/api/customersAdd', upload.single('image'), (req, res) => {
    
    let image = 'http://localhost:5000/image/' + req.file.filename;  //multer 라이브러리가 UUID처럼 겹치지 않은 이름값을 설정해줌
    let userName = req.body.userName;
    let birthday = req.body.birthday;
    let gender = req.body.gender;
    let job = req.body.job;
    //let params = [image, userName, birthday, gender, job];
    let sql = 'INSERT INTO CUSTOMER VALUES (@image, @userName, @birthday, @gender, @job)';

    // console.log(image);
    // console.log(userName);
    // console.log(birthday);
    // console.log(gender);
    // console.log(job);
    // console.log(params);

    mssql.connect(config, err => {
        if (err) console.log('에러' + err);
        console.log('고객Add');
        const request = new mssql.Request();
        request.input("image", mssql.VarChar, image)
        .input("userName", mssql.VarChar, userName)
        .input("birthday", mssql.VarChar, birthday)
        .input("gender", mssql.VarChar, gender)
        .input("job", mssql.VarChar, job)

        //.query(sql, params, (err, result) => {
        .query(sql, (err, result) => {
            if (err) console.log(err);
            console.log("결과값: " + result);
            res.send(result.recordset);
        });    
    });
})


app.listen(port, () => 
    //1옆에~ 를 눌러라 야함
    console.log(`Listening on port ${port}`)
);