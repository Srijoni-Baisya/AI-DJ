//create an empty variable to store the music
song = "";

function preload(){
    song = loadSound("music.mp3");
}

function setup(){
    //create canvas
    canvas = createCanvas(500,500);
    canvas.center();

    //access the webcam
    video = createCapture(VIDEO);
    video.hide();
}

function draw(){
    //place the video
    image(video,0,0,500,500);
}

function play(){
    //play the sound
    song.play();
}