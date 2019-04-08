// Object property shorthand
const name = "sky";
const userAge = 27;

const user = {
    name,
    userAge,
    location: 'Harbin'
}

console.log(user);

// Object destructuring

const product = {
    label: 'Red notebook',
    price: 3,
    stock: 201,
    salePrice: undefined
}
// rename variable
// default value if no match found
const {label:productLabel, price, rating=5} = product;
console.log(price, rating, productLabel); 
console.log(productLabel, price, rating); 

// const transaction = (type, myProduct) => {
const transaction = (type, {label, price}) => {
    console.log(price, label);
}
transaction("order", product);