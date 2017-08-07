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
        var block_id = "#section- " + num;

        for (  var graph in info['graphs'] ) {
            graph_string = "<div data-netdata=\"" + info['graphs'][graph]['metric-id'] + "\"\
            data-host=\"" + info['section-host'] + "\"\
            data-title=\"" + info['graphs'][graph]['title'] + "\" \
            data-chart-library=\"" + info['graphs'][graph]['library'] + "\"\
            data-after=\"" + info['graphs'][graph]['after'] + "\"\
            data-before=\"" + info['graphs'][graph]['before'] + "\"></div>"

            $(block_id).append(graph_string);
        }

    }

                <div data-netdata="system.io"
                    data-host="http://registry.my-netdata.io"
                    data-common-max="io"
                    data-common-min="io"
                    data-title="I/O on registry.my-netdata.io"
                    data-chart-library="dygraph"
                    data-width="49%"
                    data-height="100%"
                    data-after="-300"
                    ></div>
});