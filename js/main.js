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
        collapsible.find('.show-each').slideUp('fast');
        collapsible.find('input[type="checkbox"]:checked').prop('checked', false);
        collapsible.toggleClass('active');
        content.slideToggle('fast');
    });

    $('select[data-hide]').on('change', function () {
        var condition = $(this).data('hide'),
            target = $('[data-hide-condition="' + condition + '"]'),
            value = $(this).val().toLowerCase();
        value == condition ? target.slideUp('fast') : target.slideDown('fast');
    });
}

$(document).ready(initCssGenerator)