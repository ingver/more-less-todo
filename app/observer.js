function Observer() {
    this.listeners = [];
}

Observer.prototype.add = function(listener) {
    this.listeners.push(listener);
};

Observer.prototype.notify = function() {
    this.listeners.forEach((listener) => {
        listener.notify();
    });
};

Observer.prototype.removeAll = function () {
    this.listeners = [];
};

module.exports.create = () => new Observer();
