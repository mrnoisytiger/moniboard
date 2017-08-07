// Loads the list of available views into the sidebar
$(document).ready(function() {
    
    var api_loc = "api";
    var views;
    $.ajax({
        url: api_loc + "/list-views.php", 
        data: {
            format: 'json'
        },
        success: function(result) {
            views = result;        
        },
        type: 'GET',
    }); 

    console.log(views);

}) 