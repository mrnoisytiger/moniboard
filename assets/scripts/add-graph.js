// Used to bring up the add graphs form and send to backend

$(document).ready(function() {
    $(document).on('click', '.add-graph-div', function() {
        var active_section = $(this).parent();

        $.ajax({
            type: "GET",
            url: active_section[0].getAttribute('data-section-host') + "api/v1/charts",
            success: function(data) {
                console.log(data);
                for (var i in data['charts']) {
                    select_option_string = "<option value=\"" + data['charts'][i]['id'] + "\">" + data['charts'][i]['title'] + "</option>";
                    $("#add-graph-metric").append(select_option_string);
                }
                sortSelect(document.getElementById("add-graph-metric"));
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
        
    })
})

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