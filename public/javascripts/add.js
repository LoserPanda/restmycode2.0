var tagArray = [];

function addTagToArray() {
    let tagSuspection = $('#helptagsid').val().toString();
    tagArray.push(tagSuspection);
    console.log(tagArray);
    $('<tr ><td>' + tagSuspection + '</td><td onclick=removeTagFromArray(this)><img src="/images/deletetag.png" ></td></tr>').addClass('deletetag').appendTo('#helptagstableid');
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
            location.href = "/users/data/deleted";
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error: data not found!");
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