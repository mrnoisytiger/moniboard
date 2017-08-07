// Used to load sections

$(document).ready(function() {
    $("#view-select-list").on('click', 'li', function() {
        console.log($(this).data("view-id"));
    });
});