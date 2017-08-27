'use strict';
// Enemies our player must avoid
let Character = function(sprite,x,y,width,height){
  this.sprite = sprite;
  this.x = x;
  this.y = y;
  this.width = width;
  this.height = height;
}

Character.prototype = {
  constructor: Character,
  /*update:function(dt) {
    if (this.x < 505){
    this.x = (this.speed)*dt + this.x;} else{
        this.x = -100;
    }
    return [this.x, this.y];
  },*/
  render:function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);0
  }
};

let Enemy = function(sprite,x,y,width,height,speed){
  this.speed = speed;
  Character.call(this,sprite,x,y,width,height);
};

Enemy.prototype = Object.create(Character.prototype);
Enemy.prototype.update = function(dt){ 
    if (this.x < 505){
      this.x = (this.speed)*dt + this.x;} 
    else{
        this.x = -100;
      }
    //return [this.x, this.y];
};

Enemy.prototype.constructor = Enemy;


/*var Enemy = function(speed,y) {
    this.sprite = 'images/enemy-bug.png';
    this.speed = speed;
    this.x = 0;
    this.y = y;
    this.width = 70;
    this.height = 10;
};*/

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
/*Enemy.prototype.update = function(dt) {
    if (this.x < 505){
    this.x = (this.speed)*dt + this.x;} else{
        this.x = -100;
    }

    return [this.x, this.y];

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};*/

// Draw the enemy on the screen, required method for game
/*Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);0
};*/


// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
let Player = function(sprite,x,y,width,height){
    Character.call(this,sprite,x,y,width,height);
};

Player.prototype = Object.create(Character.prototype);
Player.prototype.constructor = Player;


/*var Player = function(x) {
    this.sprite;
    this.x = x;
    this.y = 415;
    this.width = 50;
    this.height = 20
};*/

/*Player.prototype.update = function() {
    return [this.x, this.y];
};*/

Player.prototype.render = function(char) {
    this.sprite = char;
    if (this.sprite){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);0 
    }
};

Player.prototype.reset = function() {
    player.x = 101;
    player.y = 415; 
    player.render();
}

Player.prototype.handleInput = function(key) {
    var key = key;
    if (key === 'right'&& this.x<404){
      this.x = this.x + 101;
    }
    if (key === 'left' && this.x>0){
      this.x = this.x -101;
    }
    if (key === 'up' && this.y>0){
      this.y = this.y - 85;
    }
    if (key === 'down' && this.y<415){
      this.y = this.y + 85;
    }
    this.render();
};

function chooseChar(){
    var chars = document.createDocumentFragment();
    var ul = document.createElement('ul');
    var sprites = ['images/char-boy.png', 'images/char-cat-girl.png','images/char-horn-girl.png',
     'images/char-pink-girl.png'];
    sprites.forEach(function(sprite){
      var li = document.createElement('li');
      var image = document.createElement('img');
      image.src= sprite;
      li.appendChild(image);
      ul.appendChild(li);
    });
    chars.appendChild(ul);
    document.body.appendChild(chars); 
};

chooseChar();

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var player = new Player('',101,415,50,20);
var Bug1 = new Enemy('images/enemy-bug.png',0,70,70,10,60);
var Bug2 = new Enemy('images/enemy-bug.png',0,249,70,10,120);
var Bug3 = new Enemy('images/enemy-bug.png',0,153,70,10,200);
var Bug4 = new Enemy('images/enemy-bug.png',0,70,70,10,250);
var Bug5 = new Enemy('images/enemy-bug.png',0,249,70,10,300);
var allEnemies= [Bug1, Bug2, Bug3, Bug4, Bug5];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    player.handleInput(allowedKeys[e.keyCode]);
});

var char;

document.querySelector('ul').addEventListener('click', function(e){ 
       char = e.target.getAttribute('src');
       player.render(char);
       e.currentTarget.style.display = 'none'; 
});
