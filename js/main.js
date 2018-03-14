var initCssGenerator = function () {
    $('#collapseAll').on('click', function () {
        $('.collapsible').removeClass('active');
        $('.collapsible-content,.show-each').slideUp('fast');
        $('.prop-control .all input[type="checkbox"]:checked').prop('checked', false);
    });
    $('#expandAll').on('click', function () {
        $('.collapsible').addClass('active');
        $('.collapsible-content').slideDown('fast');
    });

    $('.prop-control .all input').on('change', function () {
        var dataShow = $(this).data('show');
        $('#' + dataShow).slideToggle('fast');
    });

    $('.prop-control input[type="color"]').on('change', function () {
        var propControl = $(this).closest('.prop-control'),
            propUnit = propControl.find('.unit'),
            colorValue = $(this).val();
        propUnit.text(colorValue).css('background', colorValue);
    });

    $('.prop-control input[type="color"]').change();

    $('.collapsible h3').on('click', function () {
        var collapsible = $(this).closest('.collapsible'),
            content = collapsible.find('.collapsible-content');
        $('.show-each').slideUp('fast');
        collapsible.toggleClass('active');
        content.slideToggle('fast');
    });
}

$(document).ready(initCssGenerator)