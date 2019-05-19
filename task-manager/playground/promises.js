const doWorkCallback = (callback) => {
    setTimeout(()=>{
        callback('This is an error-callback', undefined);
        callback(undefined, 'Success-Callback!');
    }, 2000);
}

doWorkCallback((error, result) => {
    if (error){
        return console.log(error);
    }
    console.log(result);
})

const doWorkPromise = new Promise((resolve, reject) => {
    setTimeout(()=>{
        reject('This is an Error-Promise');
        console.log('hello after reject!');
        resolve('Success-Promise!');
    }, 2000);
})

doWorkPromise.then(result=>{
    console.log(result);
}).catch(error=>{
    console.log(error);
})

console.log('hello');