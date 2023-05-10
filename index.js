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

let users = [ { username: 'vt', password: '123', name:'cecilio' }, { username: 'admin', password: 'admin', name:'armando' } ];

//routes

app.get('/', (req, res) => {
    res.render('index');
});

app.get('/login', (req, res) => {
    res.render('login');
});

app.post('/login', (req, res) => {
    //tomar info del formulario para el login
    let {username, password} = req.body;
    let user = users.find(user =>user.username === username && user.password === password);
    if (user !== undefined) {
            res.render('profile', {name: user.name});
        } else {
            res.redirect('/login');
        }
});

app.listen(port, () => {
    console.log(`Server started on port ${port}`);
});
