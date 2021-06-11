var song = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var leftWristYInNumber = 0;
var removeDecimals = 0;
var volume = 0;
var leftWristScore = 0;
var rightWristScore = 0;

function preload() {
  song = loadSound("music.mp3");
}

function setup() {
  canvas = createCanvas(600, 500);
  canvas.center();

  video = createCapture(VIDEO);
  video.hide();

  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("Model Loaded");
}

function gotPoses(results) {
  if (results.length > 0) {
    console.log(results);
    leftWristScore = results[0].pose.keypoints[9].score;
    rightWristScore = results[0].pose.keypoints[10].score;
    console.log("Score of left wrist = " + leftWristScore);
    console.log("Score of right wrist = " + rightWristScore);

    leftWristX = results[0].pose.leftWrist.x;
    leftWristY = results[0].pose.leftWrist.y;
    console.log(leftWristX + " " + leftWristY);

    rightWristX = results[0].pose.rightWrist.x;
    rightWristY = results[0].pose.rightWrist.y;
    console.log(rightWristX + " " + rightWristY);
  }
}

function draw() {
  image(video, 0, 0, 600, 500);

  fill("#FFA500");
  stroke("#FFA500");

  circle(rightWristX, rightWristY, 20);

  if (rightWristScore > 0.2) {
    if (rightWristY > 0 && rightWristY <= 100) {
      document.getElementById("speedText").innerHTML = "Speed = 0.5x";
      song.rate(0.5);
    } else if (rightWristY > 100 && rightWristY <= 200) {
      document.getElementById("speedText").innerHTML = "Speed = 1x";
      song.rate(1);
    } else if (rightWristY > 200 && rightWristY <= 300) {
      document.getElementById("speedText").innerHTML = "Speed = 1.5x";
      song.rate(1.5);
    } else if (rightWristY > 300 && rightWristY <= 400) {
      document.getElementById("speedText").innerHTML = "Speed = 2x";
      song.rate(2);
    } else if (rightWristY > 400 && rightWristY <= 500) {
      document.getElementById("speedText").innerHTML = "Speed = 2.5x";
      song.rate(2.5);
    }
  }

  if (leftWristScore > 0.2) {
    circle(leftWristX, leftWristY, 20);
    leftWristYInNumber = Number(leftWristY);
    removeDecimals = floor(leftWristYInNumber);
    volume = removeDecimals / 500;
    document.getElementById("volumeText").innerHTML = "Volume = " + volume;
    song.setVolume(volume);
  }
}

function play() {
  song.play();
  song.setVolume(1);
  song.rate(1);
}

function pause() {
  song.pause();
}
