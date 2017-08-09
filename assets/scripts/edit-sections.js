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
            $(".section-sortable").sortable('disable');
        }
       
    });
});

function getGraphOrder(selected_section) {
    $(selected_section).$(".section-sortable div");
}