/* globals define, window */
'use strict';

define(['jquery', './utils'], function($, utils) {

  return function TodoController() {

    return {
      init: function() {
        //console.log('init()...');
        this.loadTodos();

        this.checkboxClick();
        this.xMarkClick();
        this.recalcProgress();
        this.setCount();

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
          if ('redirect' in data) {
            console.log('got redirecting');
            window.location.replace(data.redirect);
          } else if ('error' in data) {
            console.log('got error');
            console.error(data.error);
          } else if ('list' in data/* && 'count' in data*/) {
            console.log('got data', data);
            this.todos = data.list;
            this.count = this.todos.length;
            this.renderList();
          } else {
            console.error('Bad response');
          }
        }).bind(this);
      },

      renderList: function() {
        //console.log('renderList()...');
        var $todoList = $('#todo-list-container').empty(),
          html = window.todoListTemplate({ list: this.todos });
        $todoList.html(html);

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
        var $item = $checkbox.closest('.todo-item');
        var id = $item.data('id');
        var complete = !$item.data('complete');
        utils.postJSON(
          '/u/check',
          { id: id, complete: complete },
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
