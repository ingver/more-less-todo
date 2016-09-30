'use strict'

$(function() {
    $.ajaxSetup({
        contentType: 'application/json'
    });

    var controller = TodoController();
    controller.init();
});

function TodoController() {
    return {
        init: function() {
            checkboxClick();
            addButtonClick();
            inputKeyUp();
            xMarkClick();
            recalcProgress();
        }
    };
}

function checkboxClick() {
    $('.todo-check').click(function(e) {
        var $el = $(e.target);
        var id = $el.closest('li').data('id');
        var checked = $el.prop('checked');
        var params = { id: id, checked: checked };

        postJSON('/todo/check', params, render, 'html');
    });
}

function addButtonClick() {
    $('#todo-button-add').click(function() {
        var $input = $('#todo-input-add')[0];
        var text = $input.value;
        if (text !== '') {
            var params = { text: text };
            postJSON('/todo/add', params, render, 'html');
            $input.value = '';
        }
    });
}

function inputKeyUp() {
    var ENTER = 13;
    $('#todo-input-add').keyup(function(e) {
        if (e.which === ENTER) {
            $('#todo-button-add').click();
            //$(this).blur();
        }
    });
}

function xMarkClick() {
    $('.remove').click(function(e) {
        var $el = $(e.target);
        var id = $el.closest('li').data('id');

        postJSON('/todo/remove', { id: id }, render, 'html');
    });
}

function postJSON(url, data, cb, type) {
    $.post(url, JSON.stringify(data), cb, type)
    .fail(ajaxErrorHandler);
}

function render(html) {
    $('#todo-list-container').html(html);
    checkboxClick();
    xMarkClick();
    recalcProgress();
}

function ajaxErrorHandler(jqXHR, textStatus, errorThrown) {
    console.error('ajax error');
    console.error(textStatus + ': ' + errorThrown);
}

function recalcProgress() {
    var $checks = $('.todo-check'),
        $progress = $('#todo-progress');

    if ($checks.length === 0) {
        $progress
            .css('width', '0%');
    } else {
        var number = $checks.filter(':checked').length,
            percent = number / $checks.length * 100;

        $progress
            .css('width', percent + '%');
    }
}
