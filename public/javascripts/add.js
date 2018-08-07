var tagArray = [];
console.log("mono");
function addTagToArray() {
    // console.log("helouuu");
    // tagArray.push($('#helptagsid').val());
    // $('#helptagsid').empty();
    // console.log(tagArray);
    let tagSuspection = $('#helptagsid').val().toString();
    if (tagSuspection.substring(tagSuspection.length - 1) === " ") {
        tagArray.push(tagSuspection.substring(0, tagSuspection.length - 1));
    }
    console.log(tagArray);
}