function Animal(name) {
    this.name = name;
    this.foods = ['meat', 'vegetables']
}

Animal.prototype.getFriends = function () {
    return ['bird', 'dog', 'cat']
}

function Tiger(name, age) {
    Animal.call(this, name);
    this.age = age;
}

const t0 = new Tiger('t0', 1);

Tiger.prototype = Object.create(Animal.prototype);
// Tiger.prototype.constructor = Tiger;

const t1 = new Tiger('t1', 3);
const t2 = new Tiger('t2', 4);
t1.foods.push('grass')

console.log(t2.foods, t1.foods)
console.log(t1.getFriends())

console.log(t0 instanceof Tiger)
console.log(t1 instanceof Tiger)
console.log(t2 instanceof Tiger)

