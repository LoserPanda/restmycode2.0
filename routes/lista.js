var express = require('express');
var router = express.Router();

/* GET lista page. */
router.get('/', function (req, res, next) {
    res.render('lista', {title: 'Asiat listana'});
});


$(function () {
    var $body = $('#tulos');
    var pohja = 'http://localhost:3000/users';

    function haeTiedot() {
        var url = pohja;
        fetch(url)
            .then(function (tulokset) {
                return tulokset.json();
            })
            .then(function (lista) {
                for (let i = 0; i < lista.length; i++) {
                    let koodipatka = lista[i];
                    // var alue = ravintola.borough;
                    // var keittio = ravintola.cuisine;
                    $("<li>")
                        .text(koodipatka.name)
                        .appendTo($body)
                }
            });
    }
});

module.exports = router;

