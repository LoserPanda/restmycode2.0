$(document).ready(function () {
    $('.footernappi').click(function () {
        $('.footernappi').text() == "HIDE CHUCK NORRIS" ?
            $('.footernappi').text("GENERATE CHUCK NORRIS") && $('img').hide() :
            $('.footernappi').text("HIDE CHUCK NORRIS") && $('img').show();
    })
});