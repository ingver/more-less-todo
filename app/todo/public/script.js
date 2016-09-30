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
            $(this).blur();
        }
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
}

function ajaxErrorHandler(jqXHR, textStatus, errorThrown) {
    console.error('ajax error');
    console.error(textStatus + ': ' + errorThrown);
}
