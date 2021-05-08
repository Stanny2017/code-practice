// binaryTreeNode
class Node {
    constructor(element) {
        this.element = element;
        this.left = null;
        this.right = null;
    }
}

class BinarySearchTree {
    constructor() {
        this.root = null;
    }

    insert(element) {
        const insertNode = new Node(element);
        if (!this.root) {
            this.root = insertNode;
        } else {
            insertTraverse(this.root, insertNode);
        }

        function insertTraverse(currentRoot, insertNode) {
            if (compare(currentRoot, insertNode) > 0) {

                if (currentRoot.left == null) {
                    currentRoot.left = insertNode;
                } else {
                    insertTraverse(currentRoot.left, insertNode);
                }

            } else {
                if (currentRoot.right == null) {
                    currentRoot.right = insertNode
                } else {
                    insertTraverse(currentRoot.right, insertNode);
                }

            }
        }

        function compare(node1, node2) {
            return node1.element - node2.element;
        }
    }

    inOrderTraverse() {
        const res = [];
        inOrderNodes(this.root);
        return res;

        function inOrderNodes(root) {
            if (!root) {
                return;
            } else {
                inOrderNodes(root.left);
                res.push(root.element);
                inOrderNodes(root.right);
            }
        }
    }

    preOrderTraverse() {
        const res = [];
        preOrder(this.root);
        return res;


        function preOrder(root) {
            if (root == null) {
                return;
            } else {
                res.push(root.element)
                preOrder(root.left)
                preOrder(root.left)
            }
        }
    }

    afterOrderTraverse() {
        const res = [];
        afterOrder(this.root);
        return res;


        function afterOrder(root) {
            if (root == null) {
                return;
            } else {
                preOrder(root.left)
                preOrder(root.left)
                res.push(root.element)
            }
        }
    }

    min() {
        if (this.root === null) {
            return 'root is null?'
        }

        let minVal;
        getLeftTraverse(this.root);
        return minVal;

        function getLeftTraverse(root) {

            if (root.left === null) {
                return root.element
            } else {
                getLeftTraverse(root.left)
            }
        }
    }

    max() {
        if (this.root === null) {
            return 'root is null?'
        }

        let maxVal;
        getRightTraverse(this.root);
        return maxVal;

        function getRightTraverse(root) {
            if (root.right === null) {
                return root.element
            } else {
                getRightTraverse(root.right)
            }
        }
    }

    search(val) {
        if (this.root === null) {
            return 'root is null?'
        }

        return searchHelp(this.root);

        function searchHelp(root) {
            if (root === null) {
                return 'sorry, search value not found'
            }

            if (root.element === val) {
                console.log('find it!')
                return root.element;
            } else if (val > root.element) {
                return searchHelp(root.right);
            } else {
                return searchHelp(root.left);
            }
        }

    }


}

const tree = new BinarySearchTree();

tree.insert(10)
tree.insert(100)
tree.insert(0)
tree.insert(3)
tree.insert(50)
tree.insert(30)
tree.insert(8)

console.log(tree.search(10))

console.log(tree.search(100))
console.log(tree.search(800))

console.log(tree.inOrderTraverse())