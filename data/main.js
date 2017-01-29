$(function () {
    /*
    FUNCTIONS
    */
    function updateList() {
        console.log(filters);
        $("#mirrors tr").each(function() {
            var country = $("td:eq(1)", this).text();
            if(country) {
                if(filters["country"] == "all")
                    country = "all";
                var protocol = $("td:eq(2)", this).text();
                if(protocol) {
                    condition = filters["country"] == country && filters[protocol];
                    $(this).toggle(condition);
                }
            }
        });
    }

    /*
    MAIN
    */
    // Enable tooltips
    $('[data-toggle="tooltip"]').tooltip()
    // Enable table sorting
    $.tablesorter.addParser({
        id: "branch",
        is: function(s, table, cell, $cell) {
            return false;
        },
        format: function(s, table, cell, cellIndex) {
            if($(cell).html().includes("check"))
                return 0
            else if($(cell).html().includes("times"))
                return 1
            else
                return 2
        },
        type: 'numeric'
    });
    $("#mirrors").tablesorter();
    // Filters
    var filters = {
        "country": "all",
        "http": true,
        "https": true,
        "ftp": true
    }

    $("#country-select").change(function() {
        var country = $(this).find("option:selected").text();
        country = country.split(' ').join('_');
        filters["country"] = (country == "All countries") ? "all" : country;
        updateList();
    });
    $('input[type="checkbox"]').change(function() {
        var protocol = $(this).parent().find(".custom-control-description").text().toLowerCase();
        filters[protocol] = $(this).is(":checked");
        updateList();
    });
});
