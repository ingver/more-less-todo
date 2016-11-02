/* globals require */
'use strict';

require(['/scripts/thirdparties.js'], function() {

  require(['jquery', './todo'], function($, Todo) {

    $(function() {
      $.ajaxSetup({
        contentType: 'application/json'
      });

      Todo.init();
    });
  });
});
