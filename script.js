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
    const fooUnbound = plus.foo;
    const fooBoundToTimes = plus.foo.bind(times);
    const fooBound2ToTimes = plus.foo.bind2(times);
    const fooBoundToTimes10 = plus.foo.bind(times, 10);
    const fooBound2ToTimes10 = plus.foo.bind2(times, 10);

    const a = 5, b = 8;

    console.log('--- Testing bind2 ---');
    console.log(`plus.foo(${a}, ${b}) =>`, plus.foo(a, b)); // 13
    try {
        console.log(`fooUnbound(${a}, ${b}) =>`);
        console.log(fooUnbound(a, b));
    } catch (err) {
        console.error(err); // TypeError: this.op is not a function
    }
    console.log(`fooBoundToTimes(${a}, ${b}) =>`, fooBoundToTimes(a, b)); // 40
    console.log(`fooBound2ToTimes(${a}, ${b}) =>`, fooBound2ToTimes(a, b)); // 40
    console.log(`fooBoundToTimes10(${b}) =>`, fooBoundToTimes10(b)); // 80
    console.log(`fooBound2ToTimes10(${b}) =>`, fooBound2ToTimes10(b)); // 80
    console.log('');
    
    console.log('--- Testing promisify ---');
    foo(1, 4, console.log); // error
    foo(10, 4, console.log); // null (:
    await log(fooAsync(1, 4)); // error
    await log(fooAsync(10, 4)); // (:
    console.log('');

});

