// Loads the list of available views into the sidebar
$(document).ready(function() {
    
    var api_loc = "api";
    var views;
    var data;
    $.ajax({
        url: api_loc + "/view/list-views.php", 
        data: {
            format: 'json'
        },
        success: function(result) {
            data = JSON.parse(result);
            
            for (var element in data) {
                var append_string = "<li data-view-id=\"" + data[element]['view-id'] + "\">" + data[element]['view-name'] + "</li>";
                $('#view--select-list').append(append-string);
            }
        },
        type: 'GET', 
    }); 


});