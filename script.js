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

const foo = (a, b, callback) => callback(...(a + b < 10 ? ['error', null] : [null, '(:']));

const fooAsync = Promise.promisify(foo);

function log(promise) {
    return promise.then(console.info).catch(console.error);
}

window.addEventListener('load', async function () {
    foo(1, 4, console.log);
    foo(10, 4, console.log);
    await log(fooAsync(1, 4));
    await log(fooAsync(10, 4));
});

