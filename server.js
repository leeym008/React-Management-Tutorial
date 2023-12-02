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
        useUTC: conf.useUTC,
    },
};


//파비콘 요청 무시
//app.get("/favicon.ico", (req, res) => res.status(204).end());
//app.use(favicon(path.join('/favicon.ico', 'public', 'icons', 'favicon.png'))); //loads

//Middleware
app.use('/api', (req, res, next) => {
    console.log('first middleware!');
    req.loginId = 'admin';
    mssql.connect(config, err => {
        if (err) console.log('에러' + err);
        const request = new mssql.Request();

        //procApiResopnseIns 프로시저 실행
        request.input("reqUrl", mssql.VarChar, req.originalUrl)
        .input("regId", mssql.VarChar, req.loginId)
        .output('responseSeq')

        .execute('[procApiResopnseIns]')
        .then(result => {
            console.log('return seq : ' + result.output.responseSeq);
            req.responseSeq = result.output.responseSeq;
            //mssql.close();
            next();
        })
    });
    },
/* 
    (req, res, next) => {
        console.log('second middleware!');
        console.log(`두번째 미들웨어 responseSeq : ' + ${req.responseSeq}`);
        //console.log(`두번째 미들웨어 loginId : ' + ${req.loginId}`);
        next();
    },
    
    (req, res, next) => {
        console.log('thrid middleware!');
        next();
    }
 */
);





//const request = new mssql.Request();

app.get('/api/customers', (req, res) => {
    mssql.connect(config, err => {
        if (err) console.log('에러' + err);

        const request = new mssql.Request();
        //console.log('연동');
        request.query('SELECT * FROM CUSTOMER WHERE isDeleted = 0', (err, result) => {
            if (err) console.log(err);
            //console.log(result);
            res.send(result.recordset);
            //mssql.close();
        });

        //api 응답속도 기록
        let apiUpdSql = `UPDATE API_RESPONSE SET resTime = getDate() , responseSpeed = DATEDIFF(MS, reqTime, getDate()) WHERE seq = ${req.responseSeq}`;
        request.query(apiUpdSql, (err, result) => {
            if (err) console.log(err);
            console.log(`${req.originalUrl} + API UPD 요청 완료 : ' + ${req.responseSeq}`);
            //mssql.close();
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
    let sql = 'INSERT INTO CUSTOMER VALUES (@image, @userName, @birthday, @gender, @job, getDate(), 0)';

    mssql.connect(config, err => {
        if (err) console.log('에러' + err);
        console.log('고객Add');
        const request = new mssql.Request();
        request.input("image", mssql.VarChar, image)
        .input("userName", mssql.VarChar, userName)
        .input("birthday", mssql.VarChar, birthday)
        .input("gender", mssql.VarChar, gender)
        .input("job", mssql.VarChar, job)
        .query(sql, (err, result) => {
            if (err) console.log(err);
            console.log("결과값: " + result);
            res.send(result.recordset);
            //mssql.close();
        });
    });
})

app.delete('/api/customers/:id', (req, res) => {   
    let sql = 'UPDATE CUSTOMER SET isDeleted = 1 WHERE id = @id';
    let id = [req.params.id];

    mssql.connect(config, err => {
        if (err) console.log('에러' + err);
        console.log('고객Del');
        const request = new mssql.Request();
        request.input("id", mssql.Int, id)
        .query(sql, (err, result) => {
            if (err) console.log(err);
            console.log("결과값: " + result);
            res.send(result.recordset);
            //mssql.close();
        });
    });

})

app.listen(port, () => 
    //1옆에~ 를 눌러라 야함
    console.log(`Listening on port ${port}`)
);

app.use(express.json());

app.get('/api/scatterData', (req, res) => {
  console.log(`api/scatterData에서 받아온 responseSeq : ' + ${req.responseSeq}`);
  let sql = `SELECT TOP 100 reqTime AS X, ISNULL(responseSpeed, 9999) AS Y FROM API_RESPONSE WHERE seq != ${req.responseSeq} AND DATEDIFF(SECOND, resTime, getDate()) <= 7200 ORDER BY SEQ DESC`;

  mssql.connect(config, err => {
      if (err) console.log('에러' + err);
      const request = new mssql.Request();
      request.query(sql, (err, result) => {
          if (err) console.log(err);
          const data = [];
          for (let i = 0; i<result.recordset.length; i++) {
            //console.log(result.recordset[i]['X'] + ', ' + result.recordset[i]['Y']);    //숫자 -> 문자열로 변환되면서 +9시간이 붙음
            const x = result.recordset[i]['X']; //숫자
            //console.log(x);
            //console.log('------');
            const y = result.recordset[i]['Y'];
            data.push([x, y]);
          }
          res.json(data);
          //console.log(data);
        });
        
        //api 응답속도 기록
        let apiUpdSql = `UPDATE API_RESPONSE SET resTime = getDate() , responseSpeed = DATEDIFF(MS, reqTime, getDate()) WHERE seq = ${req.responseSeq}`;
        request.query(apiUpdSql, (err, result) => {
            if (err) console.log(err);
            console.log(`${req.originalUrl} + API UPD 요청 완료 : ' + ${req.responseSeq}`);
            //mssql.close();
        });
      });
  });