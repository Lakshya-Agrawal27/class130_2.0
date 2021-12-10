song = ""
leftwristX = 0;
leftwristY = 0;
rightwristX = 0;
rightwristY = 0;
scoreLeftWrist = 0;
scoreRightWrist = 0;

function setup()
{
    canvas = createCanvas(500, 500);
    canvas.position(520, 190);


    video = createCapture(VIDEO);
    video.hide();

    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on('pose', gotPoses);
}

function modelLoaded(){
     console.log('PoseNet Is Initialized');
}

function draw(){
    image(video, 0, 0, 600, 500);

    fill("#0000FF");
    stroke("#0000FF");

    if(scoreRightWrist > 0.01){

        circle(rightwristX, rightwristY, 20);

    if(rightwristY >0 && rightwristY <= 100){
        document.getElementById("speed").innerHTML = "$peed: 0.5x";
        song.rate(0.5);
    } else if (rightwristY > 100 && rightwristY <= 200){
        document.getElementById("speed").innerHTML = "$peed: 1.0x";
        song.rate(1);
    } else if(rightwristY > 200 && rightwristY <= 300){
        document.getElementById("speed").innerHTML = "$peed: 1.5x";
        song.rate(1.5);
    } else if(rightwristY > 300 && rightwristY <= 400){
        document.getElementById("speed").innerHTML = "$peed: 2.0";
        song.rate(2);
    } else if(rightwristY > 400 && rightwristY <= 500){
        document.getElementById("speed").innerHTML = "$peed: 2.5";
        song.rate(2.5);
    }
}

    if(scoreLeftWrist > 0.001)
    {
    circle(leftwristX, leftwristY, 20);
    InNumberleftWristY = Number(leftwristY);
    remove_decimals = floor(InNumberleftWristY);
    volume = remove_decimals/500;
    document.getElementById("volume").innerHTML = "Volume ="+volume;
    song.setVolume(volume);
    }
}

function preload(){
    song = loadSound("music.mp3");
}

function play(){
    song.play()
    song.setVolume(1);
    song.rate(1);
}

function gotPoses(results)
{
     if(results.length > 0)
     {
         console.log(results);
         scoreLeftWrist = results[0].pose.keypoints[9].score;
         scoreRightWrist = results[0].pose.keypoints[10].score;
         console.log("scoreLeftWrist = " + scoreLeftWrist);
         console.log("scoreightWrist = " + scoreRightWrist);
        
         leftwristX = results[0].pose.leftWrist.x;
         leftwristY = results[0].pose.leftWrist.y;
         console.log("leftWristX = " + leftwristX + "leftWristY = " + leftwristY);
         
         rightwristX = results[0].pose.rightWrist.x;
         rightwristY = results[0].pose.rightWrist.y;
         console.log("rightWristX =" + rightwristX + "rightWristY = " + rightwristY);   
    }
}
