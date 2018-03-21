var cssGetter = function (prop, value, unit) {
    var cssDeclaration = {
        height: 'height:',
        minHeight: 'min-height:',
        width: 'width:',
        minWidth: 'min-width:',
        padding: 'padding:',
        paddingTop: 'padding-top:',
        paddingRight: 'padding-right:',
        paddingBottom: 'padding-bottom:',
        paddingLeft: 'padding-left:',
        margin: 'margin:',
        marginTop: 'margin-top:',
        marginRight: 'margin-right:',
        marginBottom: 'margin-bottom:',
        marginLeft: 'margin-left:',
        border: 'border:',
        borderWidth: 'border-width',
        borderTopWidth: 'border-top-width:',
        borderRightWidth: 'border-right-width:',
        borderBottomWidth: 'border-bottom-width:',
        borderLeftWidth: 'border-left-width:',
        borderColor: 'border-color',
        borderTopColor: 'border-top-color',
        borderRightColor: 'border-right-color',
        borderBottomColor: 'border-bottom-color',
        borderLeftColor: 'border-left-color',
        borderStyle: 'border-style',
        borderTopStyle: 'border-top-style',
        borderRightStyle: 'border-right-style',
        borderBottomStyle: 'border-bottom-style',
        borderLeftStyle: 'border-left-style',
        borderRadius: '-webkit-border-radius:;border-radius:',
        borderTopRightRadius: '-webkit-border-top-right-radius:;border-top-right-radius:',
        borderBottomRightRadius: '-webkit-border-bottom-right-radius:;border-bottom-right-radius:',
        borderBottomLeftRadius: '-webkit-border-bottom-left-radius:;border-bottom-left-radius:',
        borderTopLeftRadius: '-webkit-border-top-left-radius:;border-top-left-radius:',
        boxShadow: '-webkit-box-shadow:;box-shadow:',
        position: 'position',
        top: 'top',
        right: 'right',
        bottom: 'bottom',
        left: 'left',
        zIndex: 'z-index',
        display: 'display',
        boxSizing: '-webkit-box-sizing:;box-sizing:',
        overflow: 'overflow',
        overflowX: 'overflow-x',
        overflowY: 'overflow-y',
        float: 'float',
        clear: 'clear',
        opacity: 'opacity'
    };
    return cssDeclaration[prop].split(';').map(function (x) {
        return x + value + unit
    }).join(';');
}

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

    $('#reset').on('click', function () {
        $('.prop-control input').val('');
        $('.prop-control select').prop('selectedIndex', 0);
        $('#preview-side [style]').removeAttr('style');
    });

    $('.prop-control [class*="switch"] input[data-show]').on('change', function () {
        var dataShow = $(this).data('show');
        $('#' + dataShow).slideToggle('fast');
    });

    $('.prop-control input[type="color"]').on('change', function () {
        var propControl = $(this).closest('.prop-control'),
            propUnit = propControl.find('.input-display'),
            colorValue = $(this).val();
        propUnit.text(colorValue).css('background', colorValue);
    });
    $('.prop-control input[type="color"]').change();

    $('#model-template').on('change', function () {
        var value = $(this).val();
        $('[data-show-template].active').addClass('leaving').fadeOut('300', function () {
            $(this).removeClass('active leaving');
            $('[data-show-template="' + value + '"]').addClass('active entering').show();
        });
    });

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
        value == condition ? target.slideUp('fast').find('input').val('').change() : target.slideDown('fast');
    });

    $('[data-control]').on('keyup change', function () {
        var dataBox = $(this).data('control').split(','),
            selector = dataBox[0],
            prop = dataBox[1],
            val = $(this).val(),
            unit = val != '' && !isNaN(val) ? $(this).closest('.prop-control').find('.unit select').val() : '';
        $('#' + selector).css(prop, val + unit);
    });

    $('.unit select').on('change', function () {
        $(this).closest('.prop-control').find('input').keyup();
    });

    $('[data-collective]').on('change keyup', function () {
        var collapsibleContent = $(this).closest('.collapsible-content'),
            dataBox = collapsibleContent.data('collective').split(','),
            selector = dataBox[0],
            prop = dataBox[1],
            val = collapsibleContent.find('.overflow-hidden>input,.overflow-hidden>select').map(function () {
                return $(this).val() != 'Outset' && $(this).val() != '' ? $(this).val() + $(this).closest('.prop-control').find('.unit select').val() : '';
            }).get().join(' ').replace(/undefined/g, '');
        $('#' + selector).css(prop, val);
    });
}

$(document).ready(initCssGenerator)