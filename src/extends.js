function Parent() {
  this.name = 'parent'
  this.friends = [0, 1, 2, 3]
}

Parent.prototype.method1 = function () {
  return this.name
}

function Child(name) {
  Parent.call(this);
  this.name = name;
}

Child.prototype = new Parent();

const child1 = new Child('child1');
console.log(child1.name)
console.log(child1.friends) // [0,1,2,3]

const child2 = new Child('child2');
child2.friends.push(5)

// 问题： 实例之间共享原型对象上的引用类型值
console.log('child1Friends', child1.friends)
console.log('child2Friends', child2.friends)


console.log(child2.method1())