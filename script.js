window.addEventListener('load', async function () {

    const foo = (a, b, callback) => callback(...(a + b < 10 ? ['error'] : [null, '(:']));

    const fooAsync = Promise.promisify(foo);

    function log(promise) {
        return promise.then(console.info).catch(console.error);
    }

    const plus = {
        op: (a, b) => a + b,
        foo(a, b) {
            return this.op(a, b);
        },
    };

    const times = {
        op: (a, b) => a * b,
    };

    const a = 5, b = 8;

    console.log('--- Testing bind2 ---');
    console.log(`plus.foo(${a}, ${b}) =>`, plus.foo(a, b)); // 13
    try {
        const fooUnbound = plus.foo;
        console.log(`fooUnbound(${a}, ${b}) =>`);
        console.log(fooUnbound(a, b));
    } catch (err) {
        console.error(err); // TypeError: this.op is not a function
    }
    console.log(`plus.foo.bind(times)(${a}, ${b}) =>`, plus.foo.bind(times)(a, b)); // 40
    console.log(`plus.foo.bind2(times)(${a}, ${b}) =>`, plus.foo.bind2(times)(a, b)); // 40
    console.log(`plus.foo.bind(times, 10)(${b}) =>`, plus.foo.bind(times, 10)(b)); // 80
    console.log(`plus.foo.bind2(times, 10)(${b}) =>`, plus.foo.bind2(times, 10)(b)); // 80
    console.log('');
    
    console.log('--- Testing promisify ---');
    foo(1, 4, console.log); // error
    foo(10, 4, console.log); // null (:
    await log(fooAsync(1, 4)); // error
    await log(fooAsync(10, 4)); // (:
    console.log('');

});

