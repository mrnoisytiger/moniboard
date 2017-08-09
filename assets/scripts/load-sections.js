// Used to load sections

$(document).ready(function() {
    $("#view-select-list").on('click', 'li', function() {
        var view_id = $(this).data("view-id");
        console.log(view_id);

        $.ajax({
            type: "POST",
            url: "api/section/load-section.php",
            data: "view_id=" + view_id,
            success: function(data) {
                console.log(data);
                var section_info = JSON.parse(data);

                section_info['graphs'].sort(function(a, b) {
                    return a.order - b.orer;
                });
                
                NETDATA.pause(function() {

                    $("#section-container").empty();
                    for ( var sec in section_info ) {
                        insertSection(section_info[sec], sec);

                    }

                    NETDATA.start();
                    NETDATA.unpause();

                });
                
            }
        });

    });

    function insertSection(info, num) {

        section_string = "<div class=\"section-block\" id=\"section-" + num + "\" data-section-id=\"" + info['section-id'] + "\">\
            <h2>" + info['section-name'] + "</h2> \
            <p>" + info['section-desc'] + "</p>"


        $("#section-container").append(section_string);

        var graph_string = "<div class=\"section-sortable\">";
        
        for (  var graph in info['graphs'] ) {
            graph_string += "<div><h3>" + info['graphs'][graph]['title'] + "</h3>\
            <div data-netdata=\"" + info['graphs'][graph]['metric-id'] + "\"\
            data-host=\"" + info['section-host'] + "\"\
            data-title=\"" + info['graphs'][graph]['title'] + "\" \
            data-chart-library=\"" + info['graphs'][graph]['library'] + "\"\
            data-after=\"" + info['graphs'][graph]['after'] + "\"\
            data-before=\"" + info['graphs'][graph]['before'] + "\"\
            data-height=\"175px\"></div></div><br>";
        }
        graph_string += "</div>";

        $("#section-" + num).append(graph_string);

        edit_section_string = "<i class=\"fa fa-pencil section-edit-pencil\" aria-hidden=\"true\" id=\"section-" + num + "edit\"></i>"
        $("#section-" + num).append(edit_section_string);

    }
});