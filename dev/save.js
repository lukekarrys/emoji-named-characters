/* global $ */

$(function () {
    $('form').on('submit', function (e) {
        e.preventDefault();
        var $form = $(e.target);
        $.post('/save', {
            character: $form.find('input[name=unicode]').val(),
            name: $form.attr('id')
        }, function () {
            $form.parents('li').remove();
        });
    });
});