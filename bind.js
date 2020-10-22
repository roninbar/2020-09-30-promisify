Function.prototype.bind2 = function (thisArg, ...argArray) {
    const f = this;
    return function(...args) {
        return f.apply(thisArg, [...argArray, ...args]);
    };
};