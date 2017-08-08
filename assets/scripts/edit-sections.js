// Used to trigger edit mode for sections

$(document).ready(function() {
    edit_mode = false;
    $(document).on('click', '.section-edit-pencil', function() {
        if ( !edit_mode ) {
            edit_mode = true;
            $(this).css("color","red");
            $(".section-sortable").sortable({
                update: function() {
                    NETDATA.start();
                    NETDATA.unpause();
                },
                axis: 'y'
            });
        } else {
            edit_mode = false;
            $(this).css("color","inherit");
            $(".section-sortable").sortable('disable');
        }
       
    });
});