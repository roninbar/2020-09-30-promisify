Function.prototype.bind2 = function (thisArg, ...boundArgs) {
    const f = this;
    return function(...callArgs) {
        return f.call(thisArg, ...boundArgs, ...callArgs);
    };
};