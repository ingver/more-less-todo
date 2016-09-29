'use strict'

$(function() {
    var controller = TodoController();
    controller.init();
});

function TodoController() {
    return {
        init: function() {
            getTodos(function(res) {
                console.log('response');
                console.log(res);
                this.todos = res;
            }.bind(this));

            registerEvents();
        }
    };
}


function getTodos(callback) {
    var $todoList = $('#todo-list');

    $.get('/todo/get', callback)
    .fail(function(jqXHR, textStatus, errorThrown) {
        console.error(
            'Failed to get TODO list. ' + textStatus + ': ' + errorThrown);
    });
};


function showProps(o) {
    for (key in o)
        console.log(key, o[key]);
}

function registerEvents() {
}
