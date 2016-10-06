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
            // preinstall items
            //localStorage.setItem('todo-list', JSON.stringify([
                //{ value: 'First', checked: false },
                //{ value: 'Second', checked: true }
            //]));
            loadTodos(this);
            addButtonClick(this);
            inputKeyUp();
        }
    };
}

function checkboxClick(cntrl) {
    $('.todo-check').click(function(e) {
        var id = $(e.target).closest('li').data('id');
        var checked = !cntrl.todos[id].checked;

        handleCheck(cntrl, id, checked);
    });
}

function addButtonClick(cntrl) {
    $('#todo-button-add').click(function() {
        var $input = $('#todo-input-add')[0];
        var text = $input.value;
        if (text !== '') {
            var params = { text: text };
            addItem(cntrl, text);
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

function xMarkClick(cntrl) {
    $('.remove').click(function(e) {
        var id = $(e.target).closest('li').data('id');
        removeItem(cntrl, id);
    });
}

function recalcProgress() {
    var $checks = $('.todo-check'),
        $progress = $('#todo-progress');

    if ($checks.length === 0) {
        $progress.css('width', '0%');
    } else {
        var number = $checks.filter('.glyphicon-check').length,
            percent = number / $checks.length * 100;

        $progress.css('width', percent + '%');
    }
}
