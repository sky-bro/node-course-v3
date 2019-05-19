const add = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (a < 0 || b < 0){
                reject('Numbers must be non-negative!');
            }
            resolve(a + b);
        }, 200)
    })
}

const doWork = async () => {
    // throw new Error('Something went wrong!');
    const sum1 = await add(1,2);
    const sum2 = await add(sum1,3);
    const sum3 = await add(sum2,-4);
    return sum3;
}

doWork().then(result => {
    console.log(result);
}).catch(e => {
    console.log('e', e);
})