const book = {
    1: "ego is the enemy.",
    "1": "Ryan Holiday"
}

const bookJson = JSON.stringify(book);
console.log(book);
console.log(typeof(bookJson));
console.log(JSON.parse(bookJson));