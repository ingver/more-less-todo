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
            loadTodos(this);
            addButtonClick(this);
            inputKeyUp();
        }
    };
}

function checkboxClick(cntrl) {
    //console.log('checkboxClick...');
    $('.todo-check').click(function(e) {
        handleCheck($(e.target), cntrl);
    });
}

function addButtonClick(cntrl) {
    //console.log('addButtonClick...');
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
    //console.log('inputKeyUp...')
    var ENTER = 13;
    $('#todo-input-add').keyup(function(e) {
        if (e.which === ENTER) {
            $('#todo-button-add').click();
            //$(this).blur();
        }
    });
}

function xMarkClick(cntrl) {
    //console.log('xMarkClick...');
    $('.remove').click(function(e) {
        var id = $(e.target).closest('li').data('id');
        removeItem(cntrl, id);
    });
}

function recalcProgress() {
    //console.log('recalcProgress...');
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
