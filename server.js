const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/customers', (req, res) => {
    res.send([
        {
        'id' :  1,
        'image' : './logo.svg',
        'name'  :   '이영민121',
        'birthday'  :   '111111',
        'gender'    :   '남자',
        'job'       :   '대학생'
        },
        {
          'id' :  2,
          'image' : './logo.svg',
          'name'  :   '이영민2',
          'birthday'  :   '222222',
          'gender'    :   '남자',
          'job'       :   '대학생'
        },
        {
            'id' :  3,
            'image' : './logo.svg',
            'name'  :   '이영민',
            'birthday'  :   '333333',
            'gender'    :   '남자',
            'job'       :   '대학생'
         }
      ]);
});

app.listen(port, () => 
    //1옆에~ 를 눌러라 야함
    console.log(`Listening on port ${port}`)
);