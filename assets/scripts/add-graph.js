// Used to bring up the add graphs form and send to backend

$(document).ready(function() {
    $(document).on('click', '.add-graph-div', function() {
        var active_section = $(this).parent();

        $.ajax({
            type: "GET",
            url: active_section[0].getAttribute('data-section-host') + "api/v1/charts",
            success: function(data) {
               console.log(data);
               for (var i in data['charts']) {
                   select_option_string = "<option value=\"" + data['charts'][i]['id'] + "\">" + data['charts'][i]['title'] + "</option>";
                   active_section.append(select_option_string);
               }
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