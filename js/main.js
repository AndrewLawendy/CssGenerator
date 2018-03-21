var cssGetter = function (prop, value) {
    var cssDeclaration = {
        'height': 'height:',
        'min-height': 'min-height:',
        'width': 'width:',
        'min-width': 'min-width:',
        'padding': 'padding:',
        'padding-top': 'padding-top:',
        'padding-right': 'padding-right:',
        'padding-bottom': 'padding-bottom:',
        'padding-left': 'padding-left:',
        'margin': 'margin:',
        'margin-top': 'margin-top:',
        'margin-right': 'margin-right:',
        'margin-bottom': 'margin-bottom:',
        'margin-left': 'margin-left:',
        'border': 'border:',
        'border-width': 'border-width:',
        'border-top-width': 'border-top-width:',
        'border-right-width': 'border-right-width:',
        'border-bottom-width': 'border-bottom-width:',
        'border-left-width': 'border-left-width:',
        'border-color': 'border-color:',
        'border-top-color': 'border-top-color:',
        'border-right-color': 'border-right-color:',
        'border-bottom-color': 'border-bottom-color:',
        'border-left-color': 'border-left-color:',
        'border-style': 'border-style:',
        'border-top-style': 'border-top-style:',
        'border-right-style': 'border-right-style:',
        'border-bottom-style': 'border-bottom-style:',
        'border-left-style': 'border-left-style:',
        'border-radius': '-webkit-border-radius:;border-radius:',
        'border-top-right-radius': '-webkit-border-top-right-radius:;border-top-right-radius:',
        'border-bottom-right-radius': '-webkit-border-bottom-right-radius:;border-bottom-right-radius:',
        'border-bottom-left-radius': '-webkit-border-bottom-left-radius:;border-bottom-left-radius:',
        'border-top-left-radius': '-webkit-border-top-left-radius:;border-top-left-radius:',
        'box-shadow': '-webkit-box-shadow:;box-shadow:',
        'position': 'position:',
        'top': 'top:',
        'right': 'right:',
        'bottom': 'bottom:',
        'left': 'left:',
        'z-index': 'z-index:',
        'display': 'display:',
        'box-sizing': '-webkit-box-sizing:;box-sizing:',
        'overflow': 'overflow:',
        'overflow-x': 'overflow-x:',
        'overflow-y': 'overflow-y:',
        'float': 'float:',
        'clear': 'clear:',
        'opacity': 'opacity:'
    };
    return cssDeclaration[prop].split(';').map(function (x) {
        return x + value;
    }).join(';');
}

var initCssGenerator = function () {
    $('#generateCss').on('click', function () {
        var collectionAttr = $('#css-collector').attr('style');
        if (collectionAttr == undefined || collectionAttr == '') return alert('Add style to generate it');
        var cssCollection = '{' + collectionAttr.split('; ').map(function (dec) {
            var prop = dec.split(': ')[0],
                value = dec.split(': ')[1].replace(';','');
            return cssGetter(prop, value);
        }).join(';') + '}';
        $('#generation-popup .popup-content p').text(cssCollection);
        $('#generation-popup').fadeIn();
        $('#generation-popup .popup-content').on('click', function (e) {
            e.stopPropagation()
        });

        function closePopUp() {
            $('#generation-popup').delay(150).fadeOut(function () {
                $('.popup-content').removeClass('leaving')
            }).find('.popup-content').addClass('leaving');
            $(document).off('keyup');
        }
        $('#generation-popup,#close-popup').on('click', closePopUp);
        $(document).on('keyup', function (e) {
            '27' == e.keyCode && closePopUp()
        });
    });
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
        $('#preview-side [data-show-template] [style],#css-collector').removeAttr('style');
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
    $('#model-template').change();

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
            prop = dataBox[0],
            selector = '#' + dataBox[1],
            val = $(this).val().replace(' ','-').toLowerCase(),
            unit = $(this).closest('.prop-control').find('.unit select')
            unitVal = val != '' && !isNaN(val) && unit.length ? unit.val() : '';
        "#undefined" == selector && (selector = '[data-prop-apply*="' + prop.split("-")[0] + '"]');
        $(selector + ',#css-collector').css(prop, val + unitVal);
    });

    $('.unit select').on('change', function () {
        $(this).closest('.prop-control').find('input').keyup();
    });

    $('[data-collective]').on('change keyup', function () {
        var collapsibleContent = $(this).closest('.collapsible-content'),
            dataBox = collapsibleContent.data('collective').split(','),
            prop = dataBox[0],
            selector = '#' + dataBox[1],
            val = collapsibleContent.find('.overflow-hidden>input,.overflow-hidden>select').map(function () {
                return $(this).val() != 'Outset' && $(this).val() != '' ? $(this).val() + $(this).closest('.prop-control').find('.unit select').val() : '';
            }).get().join(' ').replace(/undefined/g, '');
        "#undefined" == selector && (selector = '[data-prop-apply*="' + prop.split("-")[0] + '"]');
        $(selector + ',#css-collector').css(prop, val);
    });
}

$(document).ready(initCssGenerator)