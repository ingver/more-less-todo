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
            registerEvents();
        }
    };
}

function registerEvents() {
    $('.todo-check').click(function(e) {
        var $el = $(e.target);
        var id = $el.closest('li').data('id');
        var checked = $el.prop('checked');
        var params = { id: id, checked: checked };

        postJSON('/todo/check', params, render, 'html');
    });
}

function postJSON(url, data, cb, type) {
    $.post(url, JSON.stringify(data), cb, type)
    .fail(ajaxErrorHandler);
}

function render(html) {
    $('#todo-list-container').html(html);
    registerEvents();
}

function ajaxErrorHandler(jqXHR, textStatus, errorThrown) {
    console.error('ajax error');
    console.error(textStatus + ': ' + errorThrown);
}
