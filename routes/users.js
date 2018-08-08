var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const db = "mongodb://localhost:27017/restmycodeDB";

const Data = require('../Schemas/Data');
const User = require('../Schemas/User');


mongoose.connect(db, {useNewUrlParser: true}).then(() => {
        console.log('Database is connected')
    },
    err => {
        console.log('Can not connect to the database' + err)
    });

router.get('/', function (req, res, next) {
    Data.find().sort({title: 'asc'}).exec(function (err, data) {
        // console.log(data);
        res.render('listing.ejs', {data: data, title:"RestMyCode_2.0"});
    });
});

router.post('/', (req, res) => {
    const user = new User(req.body);
    user.save()
        .then(user => {
            res.status(200).redirect("/");
        })
        .catch(err => {
            res.status(400).send('unable to save the course into database');
        });
});

router.post('/data', (req, res) => {
    console.log(req.body);
    const data = new Data(req.body);
    data.save()
        .then(data => {
            res.status(200).redirect("/");
        })
        .catch(err => {
            res.status(400).send('unable to save the course into database');
        });
});

// {"userId":"5b6991df4315dc21ac3e13e1","title":"Syuuuggyhgjhing","descript":"String","lang":"String","tags":["jotain1", "jotain2"],"score": 2,"code":"String","comments":[{"author":"5b6995401e4ba7ae48fe6495", "comment":"Schaqize"},{"author":"5b6995401e4ba7ae48fe6495", "comment":"Schaqize"}]}

//TODO kaikki muokkauskentät auki, mutta vanhoilla arvoilla täytettyinä
router.route('/update/:id').put(function (req, res) {
    Data.findById(req.params.id, function(err, data) {
        if (!data)
            return next(new Error('Could not load Document'));
        else {

            data.tags = req.body.tags;
            data.descript = req.body.descript;
            data.code = req.body.code;
            data.date = Date.now;

            data.save().then(data => {
                res.json('Successfully Updated');
            })
                .catch(err => {
                    res.status(400).send("unable to update the database");
                });
        }
    });
});

router.route('/deletedata/:id').delete(function (req, res) {
    Data.findByIdAndRemove({_id: req.params.id}, function (err, course) {
        if (err) res.json(err);
        else res.json('Successfully removed');
    });
});

router.route('/deleteuser/:id').delete(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        if(err) res.json(err);
        else res.json('Successfully removed');
    });
});

module.exports = router;
