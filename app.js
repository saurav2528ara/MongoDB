const express = require('express');
const app = express();
const path = require('path');
const userModel = require('./models/user');

app.set('view engine', 'ejs');
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.get('/', function(req, res) {
    res.render('index');
})

app.get('/read', async function(req, res) {
    let users = await userModel.find();
    res.render('read', {users});
})

app.post('/edit/:userid', async function(req, res) {
   let user = await userModel.findOne({_id: req.params.userId});
   res.render("edit", {user});
})

app.get('/delete/:id', async function(req, res) {
    let users = await userModel.findOneAndDelete({_id: req.params.id});
    res.redirect('/read');
})

app.post('/create', async function(req, res) {
    let {name, email, image} = req.body;

    let createdUser = await userModel.create({
        name,
        email,
        image
    })
    res.redirect("/");
})

app.listen(3000);