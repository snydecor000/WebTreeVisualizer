var tree;
var Color = {
    RED: 1,
    BLACK: 2
};
var headerHeight;
var fr = 30;

function setup() {
    frameRate(fr);
    //make the tree
    headerHeight = document.getElementById("header").offsetHeight;
    //Create the canvas then properly size it
    canvas = createCanvas(1, 1);
    windowResized();

    let startx = canvas.width/2;
    let starty = 60;
    tree = new RedBlackTree(startx, starty);
    update();
}

function draw() {
    //black background: clear screen
    background(255);

    tree.draw();
}

function update() {
    let xWidth = 160;
    let yHeight = 80;
    tree.update(xWidth,yHeight);
}

function insertButton(element) {
    if(element.length == 0) {
        dispMessage("Please insert an integer using the textbox");
        return;
    }
    if(isNaN(parseInt(element))) {
        dispMessage("Only integers can be inserted");
        return;
    }
    tree.insert(parseInt(element));
    update();
}

function clearButton(){
    tree.clear();
    update();
}

//Event triggered when the window is resized
function windowResized() {
    /*Subtracts a lil from the height to make sure that 
    canvas loads on the webpage without scroll bars*/
    let heightLimit = round(windowHeight - headerHeight);//- (windowHeight / 30)

    //Use 16:9 ratio to calculate width
    let widthLimit = round(windowWidth );//- (windowWidth / 30)

    resizeCanvas(widthLimit, heightLimit);
}

function dispMessage(message){
    textAlign(LEFT, TOP);
    fill(0);
    textSize(18);
    strokeWeight(1);
    text(message,0,0);
}