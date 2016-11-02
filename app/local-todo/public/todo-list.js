/* globals define */

define(function() {
  return {
    init: function(Vue) {
      Vue.component('todo-list', {
        props: ['list'],
        template: '\
          <div class="list-group">\
            <todo-list-item v-for="item in list"\
                       v-bind:id="item.id"\
                       v-bind:text="item.text"\
                       v-bind:complete="item.complete"\
                       v-on:item-check="check"\
                       v-on:item-remove="remove">\
            </todo-list-item>\
          </div>\
        ',
        methods: {
          check: function(id) {
            console.log('caught "check" from', id);
          },
          remove: function(id) {
            console.log('caught "remove" from', id);
          }
        }
      });
    }
  };
});
