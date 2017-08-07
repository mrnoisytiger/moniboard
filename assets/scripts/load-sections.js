// Used to load sections

$(document).ready(function() {
    $("#view-select-list").on('click', 'li', function() {
        var view_id = $(this).data("view-id");
        console.log(view_id);

        $.ajax({
            type: "POST",
            url: "api/section/load-section.php",
            data: "view_id=" + view_id,
            success: function(data) {
                console.log(data);
            }
        });

    });
});