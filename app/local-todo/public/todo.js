/* globals define, localStorage, window */
'use strict';

define(['jquery', 'vue', './todo-list-item', './todo-list'],
function($, Vue, ListItem, List) {

  return {
    init: function() {
      // initializing components
      ListItem.init(Vue);
      List.init(Vue);

      // initializing Vue instance
      new Vue({
        el: '#todo-list',
        data: {
          list: JSON.parse(localStorage.getItem('todo-list')) || []
        }
      });
      //this.loadTodos();
      //this.addButtonClick();
      //this.inputKeyUp();
    },

    loadTodos: function() {
      //this.todos = JSON.parse(localStorage.getItem('todo-list')) || [];
      //this.renderList();
    },

    renderList: function() {
      var $todoList = $('#todo-list-container').empty(),
        html = window.todoListTemplate({ list: this.todos });
      $todoList.html(html);

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
      this.todos.push({
        text: text,
        complete: false
      });
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
        var id = $(e.target).closest('.todo-item').data('id');
        var complete = !self.todos[id].complete;

        self.handleCheck(id, complete);
      });
    },

    xMarkClick: function() {
      var self = this;
      $('.remove').click(function(e) {
        var id = $(e.target).closest('.todo-item').data('id');
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
      this.todos.forEach(function(el, index) {
        el.id = index;
      });
      localStorage.setItem('todo-list', JSON.stringify(this.todos));
      this.renderList();
    },

    handleCheck: function(id, complete) {
      this.todos[id].complete = complete;
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
});
