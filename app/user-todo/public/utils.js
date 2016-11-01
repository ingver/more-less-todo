/* globals define, window */
'use strict';

define(['jquery'], function($) {

  return {
    ajaxErrorHandler: function(jqXHR, textStatus, errorThrown) {
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
    },

    postJSON: function(url, data, cb, type) {
      $.post(url, JSON.stringify(data), cb, type)
        .fail(this.ajaxErrorHandler);
    }
  };
});
