
var Color = {
    RED: 1,
    BLACK: 2
};

class RedBlackTree {
    constructor(){
		this.root = null;
		this.size = 0;
        this.version = 0;
        this.rotationCount = 0;
    }

    insert(newElement) {
        if(this.root == null) {
            this.root = new BinaryNode(newElement);
            this.root.color = Color.BLACK;
            this.size++;
            this.version++;
            return true;
        }

        let loop = true;
		let success = true;
		let lineage = [];
		let temp = this.root;
		
		while(loop) {
			//Check to see if we need to swap the colors of this node and its children
			if(temp.color == Color.BLACK && temp.leftChild != null && temp.rightChild != null) {
				if(temp.leftChild.color == Color.RED && temp.rightChild.color == Color.RED) {
					temp.color = Color.RED; 
					temp.leftChild.color = Color.BLACK;
					temp.rightChild.color = Color.BLACK;
					this.checkBalance(lineage);
				}
			}

			lineage.push(temp);
			
			//Should this new element go Left, Right, or Center of the current node?
			//Left
			if(newElement < temp.element) {
				if(temp.leftChild == null) {
					temp.leftChild = new BinaryNode(newElement);
					this.checkBalance(lineage);
					success = true;
					loop = false;
				} 
				else temp = temp.leftChild;
			} 
			//Right
			else if(newElement > temp.element) {
				if(temp.rightChild == null) {
					temp.rightChild = new BinaryNode(newElement);
					this.checkBalance(lineage);
					success = true;
					loop = false;
				} 
				else temp = temp.rightChild;
			}
			//Center
			else {
				success = false;
				loop = false;
			}			
		}
		
		//Make root black
		this.root.color = Color.BLACK;
				
		if(success) this.size++;
		this.version++;
		return success;
    }
    
    checkBalance(l) {
		if(l.length == 0) return;
		let pa = l.pop();
		let gpa = null;
		let ggpa = null;
		if(l.length != 0) gpa = l.pop();
		if(l.length != 0) ggpa = l.pop();
		
		//If the current node has a parent
		if(pa.color == Color.RED) {
			//if there is a greatgrandpa, then it receives the result of the rotation
			if(ggpa != null) {
				//Figure out which child of the ggpa is being balanced
				if(ggpa.leftChild == gpa) ggpa.leftChild = gpa.balance();
				else if(ggpa.rightChild == gpa) ggpa.rightChild = gpa.balance();
			}
			//if there is no greatgrandpa, then just rotate the grandpa and make the root the result
			else this.root = gpa.balance();
		}
		
		if(ggpa != null) l.push(ggpa);
		if(gpa != null) l.push(gpa);
        l.push(pa);
	}

    print() {
        console.log('Root:');
        console.log(this.root.color);
        console.log(this.root.element);
        console.log('Left:');
        console.log(this.root.leftChild.color);
        console.log(this.root.leftChild.element);
        console.log('Right:');
        console.log(this.root.rightChild.color);
        console.log(this.root.rightChild.element);
    }
}

class BinaryNode {
    constructor(element) {
        this.element = element;
        this.leftChild = null;
        this.rightChild = null;	
        this.color = Color.RED;
    }

    // get leftChild() {return this.leftChild;}
    // setLeftChild(child) {this.leftChild = child;}
    // get rightChild() {return this.rightChild;}
    // setRightChild(child) {this.rightChild = child;}
    // get element() {return this.element;}
    // setElement(ele) {this.element = ele;}
    // get color() {return this.color;}
    // setColor(col) {this.color = col;}

    balance() {
        if(this.leftChild != null && this.leftChild.color == Color.RED) {
            if(this.leftChild.leftChild != null && this.leftChild.leftChild.color == Color.RED)
                return this.rotateRight();
            if(this.leftChild.rightChild != null && this.leftChild.rightChild.color == Color.RED)
                return this.doubleRotateRight();
        }
        if(this.rightChild != null && this.rightChild.color == Color.RED) {
            if(this.rightChild.leftChild != null && this.rightChild.leftChild.color == Color.RED)
                return this.doubleRotateLeft();
            if(this.rightChild.rightChild != null && this.rightChild.rightChild.color == Color.RED)
                return this.rotateLeft();
        }
        return this;
    }

    rotateRight() {
        let temp = this.leftChild;
        let tempC = this.color;
        this.color = temp.color;
        temp.color = tempC;
        
        this.rotationCount++;
        this.leftChild = this.leftChild.rightChild;
        temp.rightChild = this;
        return temp;
    }
    
    rotateLeft() {
        let temp = this.rightChild;
        let tempC = this.color;
        this.color = temp.color;
        temp.color = tempC;
        
        this.rotationCount++;
        this.rightChild = this.rightChild.leftChild;
        temp.leftChild = this;
        return temp;
    }
    
    doubleRotateRight() {
        this.leftChild = this.leftChild.rotateLeft();
        return this.rotateRight();
    }
    
    doubleRotateLeft() {
        this.rightChild = this.rightChild.rotateRight();
        return this.rotateLeft();
    }
    
    height() {
        let leftHeight = -1;
        let rightHeight = -1;
        if(this.leftChild != null) leftHeight = this.leftChild.height();
        if(this.rightChild != null) rightHeight = this.rightChild.height();
        
        return (leftHeight>rightHeight?leftHeight:rightHeight) + 1;
    }
}

var tree;

function preload() {

}

function setup() {
    tree = new RedBlackTree();
}

function draw() {
    update()
}

function update() {

}

function insertButton(element) {
    if(inputText != NaN) {
        tree.insert(element);
    }
}

function clearButton(){
    console.log(tree.root);
    tree.print();
}