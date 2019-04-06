// const square = function (x) {
//     return x * x;
// }

// const square = x => x*x;

// console.log(square(3));

const event = {
    name: 'Brithday Party',
    // printGuestList: function (){
    //     console.log('Guest list for ' + this.name);
    // }
    guestList: [...'abcd'],
    printGuestList(){
        console.log('Guest list for ' + this.name);
        this.guestList.forEach(name=>{
            console.log(name +" is attending " + this.name);
        })
    }
}

event.printGuestList();