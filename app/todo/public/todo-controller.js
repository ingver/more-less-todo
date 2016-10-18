/* globals define, localStorage */
'use strict';

define(['jquery'], function($) {

    return function TodoController() {

        return {
            init: function() {
                // preinstall items
                //localStorage.setItem('todo-list', JSON.stringify([
                    //{ value: 'First', checked: false },
                    //{ value: 'Second', checked: true }
                //]));
                this.loadTodos();
                this.addButtonClick();
                this.inputKeyUp();
            },

            loadTodos: function() {
                console.log(localStorage);

                this.todos = JSON.parse(localStorage.getItem('todo-list')) || [];

                console.log('Loaded todos:');
                this.todos.forEach(function(el, index) {
                    console.log(index, el);
                });

                this.renderList();
            },

            renderList: function() {
                var $ul = $('#todo-list').empty(),
                    checkedClass = 'glyphicon-check',
                    uncheckedClass = 'glyphicon-unchecked';

                this.todos.forEach(function(el, index) {
                    var $li = $('<li/>', {
                            'class': 'list-group-item',
                            'data-id': index
                        });

                    var $check = $('<span>', {
                            'class': 'todo-check glyphicon'
                        })
                        .addClass(el.checked ? checkedClass : uncheckedClass);

                    var $text = $('<span>', {
                            'class': 'todo-text' + (el.checked ? ' checked-item' : ''),
                            text: el.value
                        });

                    var $x = $('<span>', {
                            'class': 'remove glyphicon glyphicon-remove-sign'
                        });

                    $li.append($check)
                       .append($text)
                       .append($x)
                       .appendTo($ul);
                });

                this.checkboxClick();
                this.xMarkClick();
                this.recalcProgress();
                this.setCount();
            },

            addButtonClick: function() {
                var self = this;
                $('#todo-button-add').click(function() {
                    var $input = $('#todo-input-add')[0];
                    var text = $input.value;
                    if (text !== '') {
                        self.addItem(text);
                        $input.value = '';
                    }
                });
            },

            addItem: function(text) {
                this.todos.push({ value: text, checked: false });
                this.updateList();
            },

            inputKeyUp: function() {
                var ENTER = 13;
                $('#todo-input-add').keyup(function(e) {
                    if (e.which === ENTER) {
                        $('#todo-button-add').click();
                        //$(this).blur();
                    }
                });
            },

            checkboxClick: function() {
                var self = this;
                $('.todo-check').click(function(e) {
                    var id = $(e.target).closest('li').data('id');
                    var checked = !self.todos[id].checked;

                    self.handleCheck(id, checked);
                });
            },

            xMarkClick: function() {
                var self = this;
                $('.remove').click(function(e) {
                    var id = $(e.target).closest('li').data('id');
                    self.removeItem(id);
                });
            },

            recalcProgress: function() {
                var $checks = $('.todo-check'),
                    $progress = $('#todo-progress');

                if ($checks.length === 0) {
                    $progress.css('width', '0%');
                } else {
                    var number = $checks.filter('.glyphicon-check').length,
                        percent = number / $checks.length * 100;

                    $progress.css('width', percent + '%');
                }
            },

            updateList: function() {
                localStorage.setItem('todo-list', JSON.stringify(this.todos));
                this.renderList();
            },

            handleCheck: function(id, checked) {
                this.todos[id].checked = checked;
                this.updateList();
            },

            removeItem: function(id) {
                this.todos.splice(id, 1);
                this.updateList();
            },

            setCount: function() {
                $('#count-badge').text(this.todos.length);
            }
        };
    };
});
