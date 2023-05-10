const express = require('express');
const bodyParser = require('body-parser');
const dotenv = require('dotenv');
const path = require('path');

const app = express();
//settings
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');
//midlewares
dotenv.config();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

//define variables with values of entorne (dotenv) .env
port = process.env.PORT || 3000;

//array

let users = [ { username: 'vt', password: '123' }, { username: 'admin', password: 'admin' } ];

//routes

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    let {username, password} = req.body;
    let user = users.find(user =>user.username === username && user.password === password);
    if (username != undefined || password!== undefined) {
            res.redirect('/');
        } else {
            res.redirect('/login');
        }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
