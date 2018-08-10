var tagArray = [];

function addTagToArray(tagSuspection) {
    // console.log(x);
    // let tagSuspection = $('#helptagsid').val().toString();
    tagArray.push(tagSuspection);
    console.log(tagArray);
    $('<tr><td>' + tagSuspection + '</td><td onclick=removeTagFromArray(this)><img src="/images/deletetag.png" ></td></tr>').addClass('deletetag').appendTo('#helptagstableid');
    $('#tagsid').val(tagArray);
    $('#helptagsid').val('');
}


function setIdToLocalStorage(id) {
    localStorage.setItem("id", JSON.stringify(id));
}

function removeTagFromArray(param) {
    console.log(param.parentNode);
    var row = param.parentNode.rowIndex;
    param.parentNode.style.display = "none";
    tagArray.splice(row, 1);
    $('#tagsid').val(tagArray);
    console.log(tagArray);
}

function removeData() {
    var uri = 'users/deletedata/' + JSON.parse(localStorage.getItem("id"));
    console.log("Tämä on uri: " + uri);
    $.ajax({
        url: uri,
        type: 'DELETE',
        dataType: 'json',
        success: function () {
            alert("Deleted successfully!");
            location.href = "/users/";
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("The data you are trying to delete doesn't exist");
            location.href = "/users/";
        }
    });
}

function search(){
    var tag = $('#tagsearch').val();
    var lang = $('#selectedLang').val();
    var aut = $('#authorSearch').val();
    console.log(lang);
    var lahetettava = {};
    if (tag!=='') lahetettava.tags=tag;
    if (aut!=='') lahetettava.author=aut;
    if (lang!=='All') lahetettava.lang=lang;
    // if (lahetettava.lang !== undefined || lahetettava.tags!== undefined) {
        console.log(lahetettava);
        $.ajax({
            url: 'users/filter',
            type: 'POST',
            contentType: 'application/json',
            data: JSON.stringify(lahetettava),
            success: function (result) {
                $(document.documentElement).html(result);
                ini
            },
            error: function () {
                alert("No data found")
            }
        });
    // }
}


function initLangSelect(){
    $("<option value='HTML'>HTML</option>").appendTo("#langid");
    $("<option value='JavaScript'>JavaScript</option>").appendTo("#langid");
    $("<option value='CSS'>CSS</option>").appendTo("#langid");
    $("<option value='PHP'>PHP</option>").appendTo("#langid");
    $("<option value='Ruby'>Ruby</option>").appendTo("#langid");
    $("<option value='Python'>Python</option>").appendTo("#langid");
    $("<option value='Java'>Java</option>").appendTo("#langid");
    $("<option value='C'>C</option>").appendTo("#langid");
    $("<option value='C#'>C#</option>").appendTo("#langid");
    $("<option value='C++'>C++</option>").appendTo("#langid");
    $("<option value='Other'>Other</option>").appendTo("#langid");
}


function initLangSelectAdd(){
    $("<option value='HTML'>HTML</option>").appendTo("#langid");
    $("<option value='JavaScript'>JavaScript</option>").appendTo("#langid");
    $("<option value='CSS'>CSS</option>").appendTo("#langid");
    $("<option value='PHP'>PHP</option>").appendTo("#langid");
    $("<option value='Ruby'>Ruby</option>").appendTo("#langid");
    $("<option value='Python'>Python</option>").appendTo("#langid");
    $("<option value='Java' selected='true'>Java</option>").appendTo("#langid");
    $("<option value='C'>C</option>").appendTo("#langid");
    $("<option value='C#'>C#</option>").appendTo("#langid");
    $("<option value='C++'>C++</option>").appendTo("#langid");
    $("<option value='Other'>Other</option>").appendTo("#langid");
}

function userNameToLocalStorageUp() {
    localStorage.setItem('username', $('#signupnameid').val());
}

function userNameToLocalStorageIn() {
    localStorage.setItem('username', $('#signinnameid').val());
}

function userNameFROMLocalStorageToCommentAuthor() {
    $("#authorid").val(localStorage.getItem('username'));
}

function sortTableByScoreDesc() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[5];
            y = rows[i + 1].getElementsByTagName("TD")[5];
            if (Number(x.innerHTML) > Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}
function sortTableByScoreAsc() {
    var table, rows, switching, i, x, y, shouldSwitch;
    table = document.getElementById("myTable");
    switching = true;
    while (switching) {
        switching = false;
        rows = table.rows;
        for (i = 1; i < (rows.length - 1); i++) {
            shouldSwitch = false;
            x = rows[i].getElementsByTagName("TD")[5];
            y = rows[i + 1].getElementsByTagName("TD")[5];
            if (Number(x.innerHTML) < Number(y.innerHTML)) {
                shouldSwitch = true;
                break;
            }
        }
        if (shouldSwitch) {
            rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
            switching = true;
        }
    }
}


function logout() {
    localStorage.removeItem('username');
    window.location.href = "/login";
}

function stopIrresponsi(x){
    var row = x.parentNode.parentNode.rowIndex;
    var author = document.getElementById('myTable').rows[row].cells[3].innerHTML;
    if (author !== localStorage.getItem('username')) {
        alert("Not authorized! You can not update other user's code.");
    } else {
        window.location.href = '/update';
    }
}
function stopIrresponsiDel(x) {
    var row = x.parentNode.parentNode.rowIndex;
    var author = document.getElementById('myTable').rows[row].cells[3].innerHTML;
    if (author !== localStorage.getItem('username')) {
        alert("Not authorized! You can not delete other user's code.");
    } else {
        window.location.href = '/delete';
    }
}

function stopIrresponsiAdd(){
    if (localStorage.getItem('username') === null || localStorage.getItem('username')=== '') {
        alert("Remember to log in first!");
        window.location.href = '/login';

    } else {
        window.location.href = '/add';
    }
}
//
// function showUser() {
//     // document.getElementById('showUser').innerText = localStorage.getItem('username');
//     $('<p>' + localStorage.getItem('username').toString() + '</p>').appendTo('#showUser');
// }