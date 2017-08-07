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

                insertSection(section_info[0], 1);

            }
        });

    });

    function insertSection(info, num) {

        section_string = "<div class=\"section-block\" id=\"section-" + num + "\"> \
            <h2>" + info['section-name'] + "</h2> \
            <p>" + info['section-desc'] + "</p>"

        $("#section-container").append(section_string);

        for (  var graph in info['graphs'] ) {
            graph_string = "<div data-netdata=\"" + info['graphs'][graph]['metric-id'] + "\"\
            data-host=\"" + info['section-host'] + "\"\
            data-title=\"" + info['graphs'][graph]['title'] + "\" \
            data-chart-library=\"" + info['graphs'][graph]['library'] + "\"\
            data-after=\"" + info['graphs'][graph]['after'] + "\"\
            data-before=\"" + info['graphs'][graph]['before'] + "\"></div>"

            $("#section-" + num).append(graph_string);
        }
    }
});