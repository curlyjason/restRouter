// "use strict";

let user = {
    name: 'John'
};

Object.defineProperty(user, 'name', {
    writable: false
})

let descriptor = Object.getOwnPropertyDescriptor(user, 'name');

console.log(JSON.stringify(descriptor, null, 2));

user.name = 'Pete';

console.log(JSON.stringify(descriptor, null, 2));
console.log(descriptor);
