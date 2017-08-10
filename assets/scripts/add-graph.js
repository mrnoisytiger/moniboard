// Used to bring up the add graphs form and send to backend

$(document).ready(function() {
    $(document).on('click', '.add-graph-div', function() {
        var active_section = $("this").parent();

        $("#add-overlay").show('300');
        $("#add-graph-form").show('300');
    })
})