//create an empty variable to store the music
song = "";

leftWristX = 0;
leftWristY = 0;

rightWristX = 0;
rightWristY = 0;

//var to store the confidence level of left wrist
score_lw = 0;

//var to store the confidence level of right wrist
score_rw = 0;

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

    //check if right wrist is detected
    if(score_rw > 0.2){
    //draw circle on right wrist
    circle(rightWristX,rightWristY,20);

    //check the value of y coordinate of right wrist

    //from 1 to 100
    if(rightWristY > 0 && rightWristY <= 100){              //from 1 to 100
        document.getElementById("speed").innerHTML = "Speed : 0.5 times of normal speed";
        song.rate(0.5);
    }
    else if(rightWristY > 100 && rightWristY <= 200){       //from 101 to 200

        document.getElementById("speed").innerHTML = "Speed : 1 times of normal speed";
        song.rate(1);
    }
    else if(rightWristY > 200 && rightWristY <= 300){       //from 201 to 300
        document.getElementById("speed").innerHTML = "Speed : 1.5 times of normal speed";
        song.rate(1.5);
    }
    else if(rightWristY > 300 && rightWristY <= 400){       //from 301 to 400
        document.getElementById("speed").innerHTML = "Speed : 2 times of normal speed";
        song.rate(2);
    }
    else if(rightWristY > 400){                             //from 401 to 500
        document.getElementById("speed").innerHTML = "Speed : 2.5 times of normal speed";
    }
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

        //get the scores of the left and the right wrists
        score_rw = results[0].pose.keypoints[10].score;
        score_lw = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist : " + score_lw + " , Score Right Wrist : " + score_rw);

    }
}

function play(){
    //play the sound
    song.play();
    song.setVolume(1);
    song.rate(1);
}