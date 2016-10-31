
var space=15; 
var move="none";
var div1;
var counter=0;
var adder=0;
var str;
var continue1= false;
var movesCounter=0;

window.onload = function(){
    selectPicture();
    var div = document.getElementById('puzzlearea').getElementsByTagName('div');
    div1=div;
    var contr = document.getElementById('controls');
    contr.innerHTML+= '<button onclick=reload() type="button">Restart</button>';
    var shuf = document.getElementById('shufflebutton');
    shuf.onclick=shuffle;
     

    for(var i=0; i<div.length;i++){
        div[i].onmouseout = clear;
        div[i].onmouseover = Move;
        div[i].onclick = moveTile;
        div[i].className = 'puzzlepiece';
         if(i>=0 && i<=3){
            div[i].style.left+=i*100+'px';
            div[i].style.top=0+'px';
            div[i].style.backgroundPosition = -i*100+'px '+'0px';
        }else if(i>=4 && i<=7){
            div[i].style.left+=(i-4)*100+'px';
            div[i].style.top=100+'px';
            div[i].style.backgroundPosition = -(i-4)*100+'px '+'-100px';
        }else if(i>=8 && i<=11){
            div[i].style.left+=(i-8)*100+'px';
            div[i].style.top=200+'px';
            div[i].style.backgroundPosition = -(i-8)*100+'px '+'-200px';
        }else{
            div[i].style.left+=(i-12)*100+'px';
            div[i].style.top=300+'px';
            div[i].style.backgroundPosition = -(i-12)*100+'px '+'-300px';
        }

        
    }
    setTimeout(function() {Play()}, 1500);
    
};
function Move(){
    if(!continue1){

        if((parseInt(this.style.left)+parseInt(this.offsetWidth)) === parseInt(getX()) && this.style.top===getY()){
        this.className = this.className + " movablepiece";
        move="right";
        }else if(parseInt(this.style.left) === (parseInt(getX())+parseInt(this.offsetWidth)) && this.style.top===getY()){
            this.className = this.className + " movablepiece";
            move= "left";
        }else if((parseInt(this.style.top)+parseInt(this.offsetHeight)) === parseInt(getY()) && this.style.left===getX()){
            this.className = this.className + " movablepiece";
            move= "down";
        }else if(parseInt(this.style.top) === (parseInt(getY())+parseInt(this.offsetHeight)) && this.style.left===getX()){
            this.className = this.className + " movablepiece";
            move= "up";
        }else{
            move= "none";
        }
    }
    

}
function shift(){
    var indx = 0;
    for(var i=0; i<div1.length;i++){
        if(div1[i].textContent===str){
            indx=i; 
        }
    }
    
    if(adder!=100){
        if(move==="left" || move==="right"){
            div1[indx].style.left=parseInt(div1[indx].style.left)+counter+'px';
        }else{
            div1[indx].style.top=parseInt(div1[indx].style.top)+counter+'px';
        }
        adder+=1;
        continue1=true;
        setTimeout(function () {
            shift();
        },1*1);
    }else{
        adder=0;
        continue1=false;
        move="none";
    }   
    
}


function moveTile(){
    if(!continue1){
        switch(move){

        case "right":
        counter=1;
        space-=1;
        str=this.textContent;
        shift();
        movesCounter+=1;
        break;
        case "left":
        counter=-1;
        space+=1;
        str=this.textContent;
        shift();
        movesCounter+=1;
        break;
        case "down":
        counter=1;
        space-=4;
        str=this.textContent;
        shift();
        movesCounter+=1;
        break;
        case "up":
        counter=-1;
        space+=4;
        str=this.textContent;
        shift();
        movesCounter+=1;  
        break;

    

    }
    
    }
   
        
    
    
}


function getX(){
        if(space>=0 && space<=3){
            return space*100+'px';
        }else if(space>=4 && space<=7){
            return (space-4)*100+'px';
            
        }else if(space>=8 && space<=11){
            return (space-8)*100+'px';
            
        }else{
            return (space-12)*100+'px';
            
        }
        
}


function getY(){
    if(space>=0 && space<=3){
            return '0px';
        }else if(space>=4 && space<=7){
            return '100px';
            
        }else if(space>=8 && space<=11){
            return '200px';
            
        }else{
            return '300px';
            
        }
}

function clear(){
    this.className = 'puzzlepiece';
    YouWin();
}

function completemaze () {
    var div2 = document.getElementById('puzzlearea').getElementsByTagName('div');
    var result= true;
    for(var i=0; i<div2.length; i++){
            var y = parseInt(div2[i].style.top);
            var x = parseInt(div2[i].style.left);
            if (x!=(i%4*100) || y!= parseInt(i/4)*100) {
                result=false;
                break;
            }
    }
    return result;
    
}

function YouWin() {
    var div4 = document.getElementById('puzzlearea').getElementsByTagName('div');
    
    if (movesCounter>=1) {
        if (completemaze()) {
            var k = document.getElementById('overall');
            for(var i=0; i<div4.length;i++){
                div4[i].style.backgroundImage = 'url(win.gif)'; 
                }
                k.innerHTML += '<div id="idChild" style="color:red; font-size:300%; font-family:verdana; text-align: center;"> You Win! </div>';  
               
                alert("You Won in " + movesCounter + " moves");
                
                movesCounter=0;
                
                setTimeout(function () {
            PlayAgain();
        },1*5000);
                }

        }

    }


function selectPicture () {
    var div3 = document.getElementById('puzzlearea').getElementsByTagName('div');   
    var pictureChoice=prompt("Choose an image you'd like to play with! Just enter the letter that corresponds to the image below!"+'\n' + "a. Smiley Face" + '\n' + "b. Glass Fruits" + '\n' 
        + "c. Flash"+ '\n' + "d. Bird"+ '\n');
    for(var i=0; i<div3.length;i++){

        if (pictureChoice== "b"){
            div3[i].style.backgroundImage = 'url(fruits.jpg)';

        }else if (pictureChoice== "c") {
             div3[i].style.backgroundImage = 'url(flash.jpg)';

        }else if (pictureChoice== "d") {
             div3[i].style.backgroundImage = 'url(bird.jpg)';

        }else{
             div3[i].style.backgroundImage= 'url(smile.jpg)';
         }
    
}
}

function canMove1(elmt){
    if((parseInt(elmt.style.left)+parseInt(elmt.offsetWidth)) === parseInt(getX()) && elmt.style.top===getY()){
        move="right";
        return "right";
    }else if(parseInt(elmt.style.left) === (parseInt(getX())+parseInt(elmt.offsetWidth)) && elmt.style.top===getY()){
        move= "left";
        return "left";
    }else if((parseInt(elmt.style.top)+parseInt(elmt.offsetHeight)) === parseInt(getY()) && elmt.style.left===getX()){
        move= "down";
        return "down";
    }else if(parseInt(elmt.style.top) === (parseInt(getY())+parseInt(elmt.offsetHeight)) && elmt.style.left===getX()){
        move= "up";
        return "up";
    }else{
        move= "none";
        return "none";
    }

}

function moveTile1(elmt){
    
    switch(move){
        case "right":
        elmt.style.left=parseInt(elmt.style.left)+100+'px';
        space-=1;
        break;
        case "left":
        elmt.style.left=parseInt(elmt.style.left)-100+'px';
        space+=1;
        break;
        case "down":
        elmt.style.top=parseInt(elmt.style.top)+100+'px';
        space-=4;
        break;
        case "up":
        elmt.style.top=parseInt(elmt.style.top)-100+'px';
        space+=4;
        break;

        default:


    }
}

function shuffle(){

    var num=100;
    for(var i =0; i<num; i++){
        var lst = [];
        for(var i1 =0; i1<div1.length; i1++){
            if(canMove1(div1[i1])!="none"){
                lst.push(i1);
            }

        }
        
        if(lst.length!=0){
            var n = lst[Math.floor((Math.random()*lst.length)+0)];
            canMove1(div1[n]);
            moveTile1(div1[n]);
        }
    }
    move="none";

}       

function reload(){
    location.reload();
}

var count=60;

var counter=setInterval(timer, 1000);

elem = document.createElement("div");
elem.id = 'myID';
elem.innerHTML = ' Tag';

function timer()
{
    
  count=count-1;
  if (count < 0 )
  {

     clearInterval(counter);
     YouLose();
     return;

  }
  if (completemaze()) {
    count++;
    return;


  };
  document.getElementById('controls').appendChild(elem);
  elem.innerHTML ="<div >" + "Timer : " + count + "seconds" + "</div>";   
}

function Play () {
    start=false;
    while (start==false){
     if (confirm("Are You Ready to Play?")) {
        shuffle();
        start=true;
    }
    }
};

function PlayAgain () {
    if (confirm("Would You Like To Play Again?")) {
        setTimeout(function () {
            reload();
        },1*10); 
    };
}

function YouLose() {
     var e = document.getElementById('overall');
                e.innerHTML += '<div id="idch" style="color:purple; font-size:250%; font-family:verdana; text-align: center;"> Sorry, You Lose! </div>';  
                setTimeout(function () {
            PlayAgain();
        },1*5000);
                }

    






