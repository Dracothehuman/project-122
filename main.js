screen_height=0;
screen_width=0;
x=0;
y=0;
apple="";
speak_data="";
toNumber=0;
draw_apple="";

function preload(){
    apple=loadImage("apple-granny-smith.png");
}
var SpeechRecognition = window.webkitSpeechRecognition;
var recognition = new SpeechRecognition;

function start(){
    document.getElementById("status").innerHTML = "System is Listening";
    recognition.start();
}
recognition.onresult = function(event){
    console.log(event);
    content = event.results[0][0].transcript;
    document.getElementById("status").innerHTML = "System has recognized "+content;
    toNumber= Number(content);
    if(Number.isInteger(toNumber)){
        document.getElementById("status").innerHTML = "System will start drawing apple/s";
        draw_apple="set";
    }
    else{
        document.getElementById("status").innerHTML = "System can not recognise. Please Try Again.";
    }
}
function setup(){
    screen_height=window.innerHeight;
    screen_width=window.innerWidth;
    canvas=createCanvas(screen_width, screen_height-150);
    canvas.position(0,150);
}

function draw(){
    if(draw_apple == "set"){
        for(var i=1;i<=toNumber;i++){
            x=Math.floor(Math.random()*700);
            y=Math.floor(Math.random()*400);
            image(apple, x, y, 40, 40);
            
        }
        document.getElementById("status").innerHTML= toNumber + " amount of apples have been drawn";
        speak_data = toNumber+" amount of apples have been drawn";
        speak();
        draw_apple="";
    }
}
function speak(){
    var synth = window.speechSynthesis;
    var utterThis = new SpeechSynthesisUtterance(speak_data);
    synth.speak(utterThis);
    speak_data="";
}
