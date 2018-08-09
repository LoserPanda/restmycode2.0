var tagArray = [];

function addTagToArray() {
    let tagSuspection = $('#helptagsid').val().toString();
    tagArray.push(tagSuspection);
    console.log(tagArray);
    $('<tr ><td>' + tagSuspection + '</td><td onclick=removeTagFromArray(this)><img src="/images/deletetag.png" ></td></tr>').addClass('deletetag').appendTo('#helptagstableid');
    $('#tagsid').val(tagArray);
    $('#helptagsid').val('');
}

function setIdToLocalStorage(id){
    localStorage.setItem("id",JSON.stringify(id));

}

function removeTagFromArray(param){
    console.log(param.parentNode);
    var row = param.parentNode.rowIndex;
    param.parentNode.style.display = "none";
    tagArray.splice(row,1);
    $('#tagsid').val(tagArray);
    console.log(tagArray);
}

function removeData(){
    var uri = 'users/deletedata/' + JSON.parse(localStorage.getItem("id"));
    console.log("Tämä on uri: " + uri);
    $.ajax({
        url: uri,
        type: 'DELETE',
        dataType: 'json',
        success: function () {
            console.log("Toimii");
            location.href = "/users/data/deleted";
        },
        error: function (xhr, textStatus, errorThrown) {
            alert("Error: data not found!");
            location.href = "/users/";
        }
    });
}

function userNameToLocalStorageUp() {
    localStorage.setItem('username', $('#signupnameid').val());
}

function userNameToLocalStorageIn() {
    localStorage.setItem('username', $('#signinnameid').val());
}