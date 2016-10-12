'use strict'

function loadTodos(cntrl) {
    //console.log('loadTodos...');
    $.get('/u/get')
        .done(procData(cntrl, 'loadTodos'))
        .fail(ajaxErrorHandler);
}

function renderList(cntrl) {
    //console.log('renderList...');
    var $ul = $('#todo-list').empty(),
        checkedClass = 'glyphicon-check',
        uncheckedClass = 'glyphicon-unchecked';

    $ul.html(cntrl.todos);

    checkboxClick(cntrl);
    xMarkClick(cntrl);
    recalcProgress();
    setCount(cntrl);
}

function handleCheck($checkbox, cntrl) {
    //console.log('handleCheck...');
    var id = $checkbox.closest('li').data('id');
    var checked = !$checkbox.hasClass('checked-box');
    //console.log('checked', checked);
    postJSON(
        '/u/check',
        { id: id, checked: checked },
        procData(cntrl, 'handleCheck'),
        'json');
}

function addItem(cntrl, text) {
    //console.log('addItem...');
    postJSON(
        '/u/add',
        { text: text },
        procData(cntrl, 'addItem'),
        'json');
}

function removeItem(cntrl, id) {
    //console.log('removeItem...');
    postJSON(
        '/u/remove',
        { id: id },
        procData(cntrl, 'removeItem'),
        'json');
}

function setCount(cntrl) {
    $('#count-badge').text($('.list-group-item').length);
}

function postJSON(url, data, cb, type) {
    $.post(url, JSON.stringify(data), cb, type)
    .fail(ajaxErrorHandler);
}

function procData(cntrl, context) {
    return function(data) {
        //console.log(context + ' :: received data:', data);
        if ('redirect' in data) {
            window.location.replace(data.redirect);
        } else if ('error' in data) {
            console.error(data.error);
        } else if ('html' in data && 'count' in data) {
            cntrl.todos = data.html;
            cntrl.count = data.count;
            renderList(cntrl);
        } else {
            console.error('Bad response');
        }
    }
}

function ajaxErrorHandler(jqXHR, textStatus, errorThrown) {
    if (jqXHR.status === 401) {
        var res = JSON.parse(jqXHR.responseText);
        if ('redirect' in res) {
            return window.location.replace(res.redirect);
        } else {
            return console.error('Badly formed redirection response');
        }
    }

    console.error('ajax error');
    console.error(textStatus + ': ' + errorThrown);
}
