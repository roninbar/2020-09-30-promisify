window.addEventListener('load', async function () {

    const foo = (a, b, callback) => callback(...(a + b < 10 ? ['error'] : [null, '(:']));

    const fooAsync = Promise.promisify(foo);

    function log(promise) {
        return promise.then(console.info).catch(console.error);
    }

    const obj = {
        op: (a, b) => a + b,
        foo(a, b) {
            return this.op(a, b);
        },
    };
    const fooUnbound = obj.foo;
    const fooBound = obj.foo.bind(obj);
    const fooBound2 = obj.foo.bind2(obj);
    const fooBoundWithArgs = obj.foo.bind(obj, 10, 10);
    const fooBound2WithArgs = obj.foo.bind2(obj, 10, 10);

    const a = 5, b = 8;

    console.log('--- Testing bind2 ---');
    console.log(`obj.foo(${a}, ${b}) =>`, obj.foo(a, b)); // 13
    try {
        console.log(`fooUnbound(${a}, ${b}) =>`);
        console.log(fooUnbound(a, b));
    } catch (err) {
        console.error(err); // TypeError: this.op is not a function
    }
    console.log(`fooBound(${a}, ${b}) =>`, fooBound(a, b)); // 13
    console.log(`fooBound2(${a}, ${b}) =>`, fooBound2(a, b)); // 13
    console.log(`fooBoundWithArgs(${a}, ${b}) =>`, fooBoundWithArgs(a, b)); // 20
    console.log(`fooBound2WithArgs(${a}, ${b}) =>`, fooBound2WithArgs(a, b)); // 20
    console.log('');
    
    console.log('--- Testing promisify ---');
    foo(1, 4, console.log); // error
    foo(10, 4, console.log); // null (:
    await log(fooAsync(1, 4)); // error
    await log(fooAsync(10, 4)); // (:
    console.log('');

});

