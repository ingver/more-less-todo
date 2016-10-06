'use strict'

function loadTodos(cntrl) {
    console.log(localStorage);

    cntrl.todos = JSON.parse(localStorage.getItem('todo-list')) || [];

    console.log('Loaded todos:');
    cntrl.todos.forEach(function(el, index) {
        console.log(index, el);
    });

    renderList(cntrl);
}

function renderList(cntrl) {
    var $ul = $('#todo-list').empty(),
        checkedClass = 'glyphicon-check',
        uncheckedClass = 'glyphicon-unchecked';

    $ul.empty();
    cntrl.todos.forEach(function(el, index) {
        var $li = $('<li/>', {
                'class': 'list-group-item',
                'data-id': index
            });

        var $check = $('<span>', {
                'class': 'todo-check glyphicon'
            })
            .addClass(el.checked ? checkedClass : uncheckedClass)
            .appendTo($li);

        var $val = $('<span>', {
                'class': 'todo-text' + (el.checked ? ' checked-item' : ''),
                text: el.value
            })
            .appendTo($li);

        var $x = $('<span>', {
                'class': 'remove glyphicon glyphicon-remove-sign'
            })
            .appendTo($li);

        $li.appendTo($ul);
    });
    checkboxClick(cntrl);
    xMarkClick(cntrl);
    recalcProgress();
}

function updateList(cntrl) {
    localStorage.setItem('todo-list', JSON.stringify(cntrl.todos));
    renderList(cntrl);
}

function handleCheck(cntrl, id, checked) {
    cntrl.todos[id].checked = checked;
    updateList(cntrl);
}

function addItem(cntrl, text) {
    cntrl.todos.push({ value: text, checked: false });
    updateList(cntrl);
}

function removeItem(cntrl, id) {
    cntrl.todos.splice(id, 1);
    updateList(cntrl);
}
