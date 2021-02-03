const express = require('express')
var cors = require('cors')
var bodyParser = require('body-parser')
const http = require('http');
var mongojs = require('mongojs');
var MongoClient = require('mongodb').MongoClient;
const nodemailer = require('nodemailer')
const app = express();
const port = 3000;
app.use(cors())
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: true
}));
var db = require('./database').url;

app.post('/scheduleMail', (req, res) => {
    let originalDate = new Date(req.body.date);
    db.schedule.insert({ "EmailId": req.body.EmailId, "Date": originalDate, "Time": req.body.time, "Status": "yet-to-send" }, (err, doc) => {
        res.json(doc)
    })
})

setInterval(function () {
    var newDate = new Date();
    var min = newDate.getHours() + ":" + (newDate.getMinutes() < 10 ? '0' : '') + newDate.getMinutes()
    var getDate = newDate.toISOString().split("T")[0] + "T00:00:00.000Z";
    console.log("getDate", getDate)

    db.schedule.find({
        $and: [{
            "Date": new Date(getDate)
        }, {
            "Time": min
        }]
    }, function (err, doc) { 
        if (doc.length > 0) {
            for (i = 0; i < doc.length; i++) {
                let emailData = doc[i].EmailId
                const transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'example@gmail.com', // Add valid emailID
                        pass: 'example@12345'        // Add password 
                    }
                });

                const options = {
                    from: "madhu <example@gmail.com>",
                    to: doc[i].EmailId,
                    subject: "Schedule Mail",
                    html: '<a>' + "Subject:" + "Scheduled Mail" + '</br>' + '</br>' +'</br>' +
                        "Message:" + "Hi mail successfully sent" +
                        '</a>'

                }

                transporter.sendMail(options, (err, info) => {
                    if(err){
                        console.log(err.response)
                        err ? console.log(err) : console.log(info);
                    }else{
                    db.schedule.update({ "EmailId": emailData },
                        { $set: { "Status": "mailsent" } }, (err, doc) => {

                            return "mailsent"

                        })
                    }
                })
            }
        } else {
            console.log("no scheduled mails")

        }
    })
}, 60 * 600);

app.get('/tableData', (req, res) => {
    db.schedule.find({}, (err, doc) => {
        res.json(doc)
    })
})

app.post('/updateMail', (req, res) => {
    let originalDate = new Date(req.body.date);
    db.schedule.update({ "_id": mongojs.ObjectId(req.body.id) },
        { $set: { "EmailId": req.body.EmailId, "Date": originalDate, "Time": req.body.time, "Status": "yet-to-send" } }, (err, doc) => {
            db.schedule.find({}, (err, doc) => {
                res.json(doc)
            })

        })
})

app.delete('/deteleMail:id', (req, res) => {
    db.schedule.remove({ "_id": mongojs.ObjectId(req.params.id) }, (err, doc) => {
        db.schedule.find({}, (err, doc) => {
            res.json(doc)
        })
    })
})

app.listen(port, () => console.log(`Example app listening on port ${port}!`))