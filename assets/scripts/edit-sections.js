// Used to trigger edit mode for sections

$(document).ready(function() {
    edit_mode = false;
    $(document).on('click', '.section-edit-pencil', function() {
        if ( !edit_mode ) {
            edit_mode = true;
            $(this).css("color","red");
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
            $(this).css("color","inherit");
            $(this).parent().find(".section-sortable").sortable('disable');
            getGraphOrder($(this).parent());
        }
       
    });
});

function getGraphOrder(selected_section) {
    var graph_divs = $(selected_section).find(".section-sortable > div > .netdata-container-with-legend");
    var graph_ids = [];
    for (var i in graph_divs) {
        var found_id = graph_divs[i].getAttribute("data-graph-id");
        graph_ids.push(found_id);
    }
    console.log(graph_ids);
}