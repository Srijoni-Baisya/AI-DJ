//create an empty variable to store the music
song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

//var to store the confidence level of left wrist
score_lw = 0;

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

    poseNet = ml5.poseNet(video,modelLoaded);

    poseNet.on('pose',gotPoses);
}

function modelLoaded(){
    console.log("PoseNet is initialized!");
}

function draw(){
    //place the video
    image(video,0,0,500,500);

    //red coloured-circle
    fill('#FF0000');
    stroke('#FF0000');

    //check if the left wrist is detected 
    if(score_lw > 0.2){
        //draw the circle
        circle(leftWristX,leftWristY,20);

        //convert the left wrist y value to a number
        Num_left = Number(leftWristY);

        //remove the decimals
        r_decimal = floor(Num_left);

        //get the value between 0 and 1, by dividing left wrist y value by 500
        volume = r_decimal/500;
        
        //print on the webpage
        document.getElementById("volume").innerHTML = "Volume : " + volume;

        //set the volume
        song.setVolume(volume);
    }
    
}

function gotPoses(results){
    if(results.length > 0){
        console.log(results);

        leftWristX = results[0].pose.leftWrist.x;
        leftWristY = results[0].pose.leftWrist.y;
        console.log("Left Wrist X = " + leftWristX + " , Left Wrist Y = " + leftWristY);

        rightWristX = results[0].pose.rightWrist.x;
        rightWristY = results[0].pose.rightWrist.y;
        console.log("Right Wrist X = " + rightWristX + " , Right Wrist Y = " + rightWristY);

        score_lw = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist : " + score_lw);
    }
}

function play(){
    //play the sound
    song.play();
    song.setVolume(1);
    song.rate(1);
}