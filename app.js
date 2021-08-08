require('dotenv').config()
const mailjet = require('node-mailjet').connect('a0f8b7ad472c8f9a05f21a5e93c00e24', "22b5502e1c64b670790e1089404eeadf")
const express = require('express');
const ejs_mate = require('ejs-mate');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const flash = require('connect-flash')
const session = require('express-session')
const port = process.env.PORT || 3000;
var requestOptions = { method: 'GET', redirect: 'follow' };
const sessionConfig = {
    secret: 'u.controllers.token',
    name: 'u.controllers',
    resave: false,
    saveUninitialized: false,
    Cookie: {
        secure: true,
        httpOnly: true,
    }

}


app.engine('ejs', ejs_mate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads-ssl.webflow.com', express.static('uploads-ssl.webflow.com'))
app.use('/ajax.googleapis.com', express.static('ajax.googleapis.com'))
app.use('/d3e54v103j8qbb.cloudfront.net', express.static('d3e54v103j8qbb.cloudfront.net'))

app.use(session(sessionConfig))
app.use(flash())


app.use((req, res, next) => {
    res.locals.success = req.flash('success')
    res.locals.danger = req.flash('danger')
    next();
})


app.get('/', (req, res) => {
    res.render('index')
})
app.get('/index', (req, res) => {
    res.render('index')
})


app.get('/home', (req, res) => {
    res.render('index')
})

app.get('/about', (req, res) => {
    res.render('about')
})

app.get('/contact', (req, res) => {
    res.render('contact')
})

app.get('/katte', (req, res) => {
    res.render('katte')
})

app.get('/maroche', (req, res) => {
    res.render('maroche')
})


app.get('/plant-paradise', (req, res) => {
    res.render('plants-paradise')
})



app.get('/social-media', (req, res) => {
    res.render('social-media-vol1')
})



















app.post('/send', (req, res) => {
    console.log(req.body.email)
    fetch(`https://api.eva.pingutil.com/email?email=${req.body.email}`, requestOptions)
        .then(() => {
            const request = mailjet
                .post("send", { 'version': 'v3.1' })
                .request({
                    "Messages": [{
                        "From": {
                            "Email": req.body.email,
                            "Name": req.body.name
                        },
                        "To": [{
                            "Email": "afazedine@gmail.com",
                            "Name": "azedine af"
                        }],
                        "Subject": "Client feedbacks & Requests",
                        "HTMLPart": `<h3>client full name: ${req.body.name}</h3><br><h3>client email address: ${req.body.email}</h3><br><h4>client budget: ${req.body.budget}$</h4><br><p>client text: ${req.body.description}</p><br>`,
                    }]
                })
            request
                .then((result) => {
                    req.flash('success', "Thank you , I will contact you soon!")
                    res.redirect('/index#form')

                })
                .catch((err) => {
                    req.flash('danger', "Oop something went wrong! Please try again ...")
                    res.redirect('/index#form')
                })
        })
        .catch(err => {
            req.flash('danger', "Oop something went wrong! Please try again ...")
            res.redirect('/index#form')
        })

})



app.listen(port, () => {
    console.log('listening on port ' + port)
})