var tagArray = [];
console.log("mono");

function addTagToArray() {
    let tagSuspection = $('#helptagsid').val().toString();
    tagArray.push(tagSuspection);
    console.log(tagArray);
    $('<li></li>').text(tagSuspection).appendTo('#helptagslistid');
    $('#tagsid').val(tagArray);
    $('#helptagsid').val('');
}