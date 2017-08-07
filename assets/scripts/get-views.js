// Loads the list of available views into the sidebar
$(document).ready(function() {
    
    var views;
    var data;
    $.ajax({
        url: "api/view/list-views.php", 
        data: {
            format: 'json'
        },
        success: function(result) {
            data = JSON.parse(result);
            
            for (var element in data) {
                var append_string = "<li data-view-id=\"" + data[element]['view-id'] + "\">" + data[element]['view-name'] + "</li>";
                $('#view-select-list').append(append_string);
            }
        },
        type: 'GET', 
    }); 


});