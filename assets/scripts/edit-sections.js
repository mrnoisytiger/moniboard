// Used to trigger edit mode for sections

$(document).ready(function() {
    edit_mode = false;
    $(document).on('click', '.section-edit-pencil', function() {
        if ( !edit_mode ) {
            edit_mode = true;
            $(this).css("color","red");
            $(this).parent().find(".add-graph").fadeIn(100);
            // Make the parent div to the edit button sortable, but only that one. Don't affect the other sections
            $(this).parent().find(".section-sortable").sortable({
                update: function() {
                    NETDATA.start();
                    NETDATA.unpause();
                },
                axis: 'y'
            });
            $(".section-sortable").sortable('enable');
        } else {
            edit_mode = false;
            $(this).parent().find(".add-graph").fadeIn(100);
            $(this).css("color","inherit");
            $(this).parent().find(".section-sortable").sortable('disable');
            setGraphOrder($(this).parent());
        }
       
    });
});

function setGraphOrder(selected_section) {
    // Get the divs for the charts
    var graph_divs = $(selected_section).find(".section-sortable > div > .netdata-container-with-legend");
    var graph_ids = [];
    // For all the divs, put their graph id into an array in order they are in the dom.
    graph_divs.each(function(i) {
        var found_id = graph_divs[i].getAttribute("data-graph-id");
        graph_ids.push(found_id);
    });

    graph_ids = JSON.stringify(graph_ids);
    current_section_id = selected_section[0].getAttribute("data-section-id");

    // Send the graph ids with the section id to the backend to reorder in the DB.
    $.ajax({
        type: "POST",
        url: "api/section/order-graphs.php",
        data: "graphs-order=" + graph_ids + "&section-id=" + current_section_id,
        success: function(data) {
        }
    });
}