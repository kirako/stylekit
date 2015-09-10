/*-------------------------------------------------------------------------------------------------------------------------
= INTIALIZE
= Default things to start components (most via jQuery UI).
--------------------------------------------------------------------------------------------------------------------------*/
$(document).ready(function () {
    
    // Check indeterminate box
    $('#ind').prop('indeterminate', true);
    
    // Select highlighted table row
    $('.highlight tr').click(function () {
        $(this).parents().find('.selected').removeClass('selected');
        $(this).addClass('selected');
    });

    //jQuery for page scrolling feature - requires jQuery Easing plugin
    // https://github.com/IronSummitMedia/startbootstrap-scrolling-nav/blob/gh-pages/js/scrolling-nav.js
    $('#Navigation a, #Back').bind('click', function (event) {
        var $anchor = $(this);
        $('html, body').stop().animate({
            scrollTop: $($anchor.attr('href')).offset().top - 50
        }, 1500, 'easeInOutExpo');
        event.preventDefault();
    });

    $('.tabs a').click(function (e) {
        e.preventDefault()
        $(this).tab('show');
    })

    $('[title!=""]').qtip({
        position: {
            target: 'mouse', // Track the mouse as the positioning target
            viewport: $(window), // Determines the viewport used to keep the tooltip visible i.e. the element whose boundaries the tooltip must stay visible within at all times if possible.
            adjust: { x: 11, y: 11 } // Offset it slightly from under the mouse
        }
    });

    $(".date input").datepicker();

    $('.time input').clockpicker();

    var availableTags = [
      "Orc",
      "Troll",
      "Forsaken",
      "Blood Elf",
      "Tauren",
      "Goblin",
      "Pandaren",
      "Human",
      "Gnome",
      "Dwarf",
      "Night Elf",
      "Worgen"
    ];
    $( ".autocomplete" ).autocomplete({
        source: availableTags
    });

    $('.modal').modal({ show: false, backdrop: 'static' });

    $('table.paginated').each(function () {
        var currentPage = 0;
        var numPerPage = 3;
        var $table = $(this);
        $table.bind('repaginate', function () {
            $table.find('tbody tr').hide().slice(currentPage * numPerPage, (currentPage + 1) * numPerPage).show();
        });
        $table.trigger('repaginate');
        var numRows = $table.find('tbody tr').length;
        var numPages = Math.ceil(numRows / numPerPage);
        var $pager = $('<div class="pagination"></div>');
        for (var page = 0; page < numPages; page++) {
            $('<button class="small"></button>').text(page + 1).bind('click', {
                newPage: page
            }, function (event) {
                currentPage = event.data['newPage'];
                $table.trigger('repaginate');
                $(this).addClass('active').siblings().removeClass('active');
            }).appendTo($pager);
        }
        $pager.insertAfter($table).find('span.page-number:first').addClass('active');
    });

});