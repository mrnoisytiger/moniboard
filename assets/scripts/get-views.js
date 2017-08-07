// Loads the list of available views into the sidebar

var api_loc = "api";

$(document).ready(function() {
    
    var $views;
    $.ajax({url: $api_loc/list-views.php}, success: function(result) {

        $views = result;        

    });

    console.log($views);

})