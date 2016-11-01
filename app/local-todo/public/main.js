/* globals require */
'use strict';

require(['/scripts/thirdparties.js'], function() {

  require(['jquery', './todo-controller'], function($, TodoController) {

    $(function() {
      $.ajaxSetup({
        contentType: 'application/json'
      });

      var controller = TodoController();
      controller.init();
    });
  });
});
