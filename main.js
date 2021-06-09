var song = "";
var leftWristX = 0;
var leftWristY = 0;
var rightWristX = 0;
var rightWristY = 0;
var leftWristYInNumber = 0;
var removeDecimals = 0;
var volume = 0;
var leftWristScore = 0;

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
    console.log("Score of left wrist = " + leftWristScore);

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
