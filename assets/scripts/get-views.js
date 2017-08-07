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
            result.forEach(function(element) {
                $list_element = "<li data-id=\"" + element['view-id'] + "\">" + element['view-name'] + "</li>";
                $("#view-select-list").append($list_element);
            }, this);
        },
        type: 'GET', 
    }); 
  
});