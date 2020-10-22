Function.prototype.bind2 = function (thisArg, ...boundArgs) {
    return (...callArgs) => this.call(thisArg, ...boundArgs, ...callArgs);
};