require('dotenv').config()
const mailjet = require('node-mailjet').connect("9f95d00d0529a265f38e75655312d482", 'dd7434a25be90ff3bf53828443a59fa1')
const express = require('express');
const ejs_mate = require('ejs-mate');
const fetch = require('node-fetch');
const path = require('path');
const app = express();
const port = process.env.PORT || 3000;
var requestOptions = {
    method: 'GET',
    redirect: 'follow'
};




app.engine('ejs', ejs_mate);
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/uploads-ssl.webflow.com', express.static('uploads-ssl.webflow.com'))
app.use('/ajax.googleapis.com', express.static('ajax.googleapis.com'))
app.use('/d3e54v103j8qbb.cloudfront.net', express.static('d3e54v103j8qbb.cloudfront.net'))


app.get('/', (req, res) => {
    res.render('index')
})
app.get('/index', (req, res) => {
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
    console.log(req.body)
    fetch(`https://api.eva.pingutil.com/email?email=${req.body.email}`, requestOptions)
        .then(() => {
            const request = mailjet
                .post("send", { 'version': 'v3.1' })
                .request({
                    "Messages": [{
                        "From": {
                            "Email": "afazedine@gmail.com",
                            "Name": "azedine af"
                        },
                        "To": [{
                            "Email": "ghernaoutmassi@gmail.com",
                            "Name": "Massiles Ghernaout"
                        }],
                        "Subject": "Client feedbacks & Requests",
                        "TextPart": "client email address" + req.body.email + "client full name" + req.body.Name + "client budget" + req.body.budget + "client description" + req.body.description
                    }]
                })
            request
                .then((result) => {
                    console.log(result.body)
                })
                .catch((err) => {
                    console.log(err.message)
                })
            res.redirect('/')
        })

})



app.listen(port, () => {
    console.log('listening on port ' + port)
})