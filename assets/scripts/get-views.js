// Loads the list of available views into the sidebar
$(document).ready(function() {
    
    var api_loc = "api";
    var views;
    $.ajax({
        url: api_loc + "/view/list-views.php", 
        data: {
            format: 'json'
        },
        success: function(result) {
            alert(result);    
        },
        type: 'GET', 
    }); 
});