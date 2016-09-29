const Observer = require('../observer');

function TodoModel() {
    this.list = [];
    this.observers = Observer.create();
}

TodoModel.prototype.getList = function() {
    return this.list;
};

TodoModel.prototype.addItem = function(val) {
    this.list.push({
        val,
        checked: false
    });
    this.observers.notify();
};

TodoModel.prototype.getItem = function(id) {
    return this.list[id];
};

TodoModel.prototype.remove = function(id) {
    this.list.splice(id, 1);
    this.observers.notify();
};

TodoModel.prototype.check = function(index, checked) {
    if (index < 0 || index >= this.list.length)
        return;

    this.list[index].checked = checked;
    this.observers.notify();
};

TodoModel.prototype.addObserver = function(observer) {
    this.observers.add(observer);
};

module.exports.create = () => new TodoModel();
