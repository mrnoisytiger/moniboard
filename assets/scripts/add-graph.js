// Used to bring up the add graphs form and send to backend

$(document).ready(function() {
    var active_section;

    $(document).on('click', '.add-graph-trigger', function() {
        active_section = $(this).parent();

        $.ajax({
            type: "GET",
            url: active_section[0].getAttribute('data-section-host') + "api/v1/charts",
            success: function(data) {
                console.log(data);
                $("#add-graph-metric").empty();
                for (var i in data['charts']) {
                    select_option_string = "<option value=\"" + data['charts'][i]['id'] + "\">" + data['charts'][i]['title'] + "</option>";
                    $("#add-graph-metric").append(select_option_string);
                }
                sortSelect(document.getElementById("add-graph-metric"));
                $(".js-example-basic-single").select2();
            }
        });

        // Show overlay and add graph form and handle close behavior
        $("#add-overlay").fadeIn('200');
        $("#add-graph").fadeIn('200');
        $(document).on('click', '#add-overlay', function() {
            // Hide overlay and add graph form
            $("#add-overlay").fadeOut('200');
            $("#add-graph").fadeOut('200');
        });
    });
    
    $(document).on('click', '#add-graph-submit', function(){
        var add_graph_data = {};
        add_graph_data['section-id'] = active_section[0].getAttribute('data-section-id');
        add_graph_data['order'] = active_section.find(".section-sortable > div").length;
        add_graph_data['title'] = $("#add-graph-title").val();
        add_graph_data['after'] = parseInt($("#add-graph-time-after").val());
        add_graph_data['before'] = parseInt($("#add-graph-time-before").val());
        add_graph_data['library'] = "dygraph";
        add_graph_data['metric-id'] = $("#add-graph-metric").val();
        add_graph_data['graph-id'] = randomString(16);

        console.log(add_graph_data);

        $.ajax({
            type: "POST",
            url: "api/section/add-graph.php",
            data: "formdata=" + JSON.stringify(add_graph_data),
            success: function(data) {
            }
        });
    });
});

// Thanks to https://stackoverflow.com/questions/278089/javascript-to-sort-contents-of-select-element (Javascript to sort contents of select element)
function sortSelect(selElem) {
    var tmpAry = new Array();
    for (var i=0;i<selElem.options.length;i++) {
        tmpAry[i] = new Array();
        tmpAry[i][0] = selElem.options[i].text;
        tmpAry[i][1] = selElem.options[i].value;
    }
    tmpAry.sort();
    while (selElem.options.length > 0) {
        selElem.options[0] = null;
    }
    for (var i=0;i<tmpAry.length;i++) {
        var op = new Option(tmpAry[i][0], tmpAry[i][1]);
        selElem.options[i] = op;
    }
    return;
}

// Thanks to https://www.thepolyglotdeveloper.com/2015/03/create-a-random-nonce-string-using-javascript/ (Creating a random nonce string in JS)
var randomString = function(length) {
    var text = "";
    var possible = "abcdefghijklmnopqrstuvwxyz";
    for(var i = 0; i < length; i++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return text;
}