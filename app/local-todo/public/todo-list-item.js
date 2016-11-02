/* globals define */

define(function() {
  return {
    init: function(Vue) {
      Vue.component('todo-list-item', {
        props: ['id', 'text', 'complete'],
        template: '\
          <div class="row list-group-item todo-item">\
            <div class="col-xs-1">\
              <span class="todo-check glyphicon"\
                    v-bind:class="checked"\
                    v-on:click="check"></span>\
            </div>\
            <div class="col-xs-8 col-sm-9 col-md-9 col-lg-9 word-break-constraint">\
              <input v-show="editable"\
                     multiline\
                     v-bind:value="text"\
                     v-on:keyup="editable = !editable">\
              <span v-show="!editable"\
                    class="todo-text"\
                    v-bind:class="{ checkedItem: complete }"\
                    v-on:click="edit">\
                {{ text }}\
              </span>\
            </div>\
            <div class="col-xs-1"></div>\
            <div class="col-xs-1 remove-sign-wrapper">\
              <span class="remove glyphicon glyphicon-remove-sign"\
                    v-on:click="remove"></span>\
            </div>\
          </div>\
        ',
        data: function() {
          return {
            editable: false
          };
        },
        computed: {
          checked: function() {
            console.log(this.text, 'complete', this.complete);
            return {
              'glyphicon-check': this.complete,
              'checked-box': this.complete,
              'glyphicon-unchecked': !this.complete
            };
          }
        },
        methods: {
          check: function() {
            console.log('clicked on', this.id);
            this.$emit('item-check', this.id);
          },
          remove: function() {
            console.log('removing', this.id);
            this.$emit('item-remove', this.id);
          },
          edit: function () {
            this.editable = true;
          }
        }
      });
    }
  };
});
