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

//TODO sort by date ascending
router.get('/dateasc', function (req, res, next) {
    Data.find().sort({date: 'asc'}).exec(function (err, data) {
        // console.log(data);
        res.render('listing.ejs', {data: data, title:"RestMyCode_2.0"});
    });
});

//TODO sort by date descending
router.get('/datedesc', function (req, res, next) {
    Data.find().sort({date: -1}).exec(function (err, data) {
        // console.log(data);
        res.render('listing.ejs', {data: data, title:"RestMyCode_2.0"});
    });
});

router.get('/:id', function (req, res) {
    Data.findById(req.params.id,function (err, data) {
        res.json(data);
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
    var tags = req.body.tags.toString().split(',');
    const data = new Data({title: req.body.title, descript: req.body.descript, lang: req.body.lang, code: req.body.code, author: req.body.author, tags: tags});
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
router.route('/update/data/:id').post(function (req, res) {
    Data.findById(req.params.id, function(err, data) {
        if (err)
            return next(new Error('Could not load Document'));
        else {
            data.title = req.body.title;
            data.descript = req.body.descript;
            data.lang = req.body.lang;
            data.code = req.body.code;
            data.author = req.body.author;
            data.tags = req.body.tags;
            console.log(data);
            console.log("Muutokset hoidettu");
            data.save(function(err,upodate) {
                if (err) res.status(400).send("unable to update the database");
                res.json(upodate);
            });
        }
    });
});

router.route('/deletedata/:id').delete(function (req, res) {
    Data.findByIdAndRemove({_id: req.params.id}, function (err, deleted) {
        console.log("err: " + err);
        console.log("course: " + deleted);
        console.log(deleted===null);
        if(deleted === null) res.status(404).send("Unable to remove, not found");
        else res.json('Successfully removed');
    });
});

router.route('/deleteuser/:id').delete(function (req, res) {
    User.findByIdAndRemove({_id: req.params.id}, function(err, user){
        console.log(err!=null);
        if(err != null) res.status(404).send("Unable to remove, not found");
        else res.json('Successfully removed');
    });
});

router.get('/data/deleted', function (req, res) {
    console.log("deleted");
    res.render('datadeleted', {title:"RestMyCode_2.0"});
});

module.exports = router;
