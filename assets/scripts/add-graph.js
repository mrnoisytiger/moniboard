// Used to bring up the add graphs form and send to backend

$(document).ready(function() {
    $(document).on('click', '.add-graph-div', function() {
        var active_section = $("this").parent();

        $.ajax({
            type: "POST",
            url: active_section.getAttribute('data-section-host') + "api/v1/charts",
            data: "view_id=" + view_id,
            success: function(data) {
               console.log(JSON.parse(data));
            }
        });

        // Show overlay and add graph form and handle close behavior
        $("#add-overlay").fadeIn('200');
        $("#add-graph").fadeIn('200');
        $(document).on('click', '#add-overlay', function() {
            // Hide overlay and add graph form
            $("#add-overlay").fadeOut('200');
            $("#add-graph").fadeOut('200');
        });
        
    })
})