/* globals define, window */
'use strict';

define(['jquery', './utils'], function($, utils) {

    return function TodoController() {

        return {
            init: function() {
                //console.log('init()...');
                this.loadTodos();
                this.addButtonClick();
                this.inputKeyUp();
            },

            loadTodos: function() {
                //console.log('loadTodos()...');
                $.get('/u/get')
                    .done(this.procResponse('loadTodos'))
                    .fail(utils.ajaxErrorHandler);
            },

            addButtonClick: function() {
                //console.log('addButtonClick()...');
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
                //console.log('addItem()...');
                utils.postJSON(
                    '/u/add',
                    { text: text },
                    this.procResponse('addItem'),
                    'json');
            },

            inputKeyUp: function() {
                //console.log('inputKeyUp()...');
                var ENTER = 13;
                $('#todo-input-add').keyup(function(e) {
                    if (e.which === ENTER) {
                        $('#todo-button-add').click();
                        //$(this).blur();
                    }
                });
            },

            procResponse: function(/*context*/) {
                return (function(data) {
                    //console.log(context + ' :: received data:', data);
                    //console.log('procResponse this:', this);
                    if ('redirect' in data) {
                        console.log('got redirecting');
                        window.location.replace(data.redirect);
                    } else if ('error' in data) {
                        console.log('got error');
                        console.error(data.error);
                    } else if ('html' in data && 'count' in data) {
                        console.log('got data', data);
                        this.todos = data.html;
                        this.count = data.count;
                        this.renderList();
                    } else {
                        console.error('Bad response');
                    }
                }).bind(this);
            },

            renderList: function() {
                //console.log('renderList()...');
                var $todoList = $('#todo-list-container').empty();

                $todoList.html(this.todos);

                this.checkboxClick();
                this.xMarkClick();
                this.recalcProgress();
                this.setCount();
            },

            checkboxClick: function() {
                //console.log('checkboxClick()...');
                var self = this;
                $('.todo-check').click(function(e) {
                    self.handleCheck($(e.target));
                });
            },

            handleCheck: function($checkbox) {
                //console.log('handleCheck()...');
                var id = $checkbox.closest('.todo-item').data('id');
                var checked = !$checkbox.hasClass('checked-box');
                //console.log('checked', checked);
                utils.postJSON(
                    '/u/check',
                    { id: id, checked: checked },
                    this.procResponse('handleCheck'),
                    'json');
            },

            xMarkClick: function() {
                //console.log('xMarkClick()...');
                var self = this;
                $('.remove').click(function(e) {
                    //console.log('xMarkClick self:', self);
                    var id = $(e.target).closest('.todo-item').data('id');
                    self.removeItem(id);
                });
            },

            removeItem: function(id) {
                //console.log('removeItem()...');
                utils.postJSON(
                    '/u/remove',
                    { id: id },
                    this.procResponse('removeItem'),
                    'json');
            },

            recalcProgress: function() {
                //console.log('recalcProgress()...');
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

            setCount: function() {
                $('#count-badge').text($('.list-group-item').length);
            }
        };
    };
});
