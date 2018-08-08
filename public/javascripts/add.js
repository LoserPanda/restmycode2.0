var tagArray = [];
console.log("mono");

function addTagToArray() {
    let tagSuspection = $('#helptagsid').val().toString();
    tagArray.push(tagSuspection);
    console.log(tagArray);
    $('<tr ><td>' + tagSuspection + '</td><td onclick=removeTagFromArray(this)><img src="/images/switch.png" ></td></tr>').addClass('deletetag').appendTo('#helptagstableid');
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