Promise.promisify = function (f) {
    return function (...args) {
        const op = result => `(${args.join(', ')}) => ${result}`;
        return new Promise(function (resolve, reject) {
            f(...args, function (err, data) {
                if (err) {
                    reject(op(err));
                } else {
                    resolve(op(data));
                }
            });
        });
    };
};
