const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

app.get('/api/hello', (req, res) => {
    res.send({message: 'Hello Express!!'});
});

app.listen(port, () => 
    //1옆에~ 를 눌러라 야함
    console.log(`Listening on port ${port}`)
);