lwxc= "";
lwyc= "";

rwxc= "";
rwyc= "";

lwsc= "";
rwsc= "";

song1= "";
song2= "";

guitar_status="";
sitar_status= "";


function preload() {
song1= loadSound("Guitar_Sound.mp3");
song2= loadSound("Sitar_Sound.mp3");   
}

function setup() {
 canvas= createCanvas(500,400);
 canvas.center();
 video= createCapture(VIDEO); 
 video.hide();  

 poseNet= ml5.poseNet(video, modelLoaded);
 poseNet.on("pose", gotPoses);
}

function modelLoaded() {
  console.log("Model is initialised!!!!");
}

function gotPoses(results) {
  if (results.length>0) {
     lwxc= results[0].pose.leftWrist.x;
     lwyc= results[0].pose.leftWrist.y;
     rwxc= results[0].pose.rightWrist.x;
     rwyc= results[0].pose.rightWrist.y;
     
     console.log("The x-coordinate of the left wrist is "+lwxc+", and the y-coordinate is "+lwyc);
     console.log("The x-coordinate of the right wrist is "+rwxc+", and the y-coordinate is "+rwyc);

      lwsc= results[0].pose.keypoints[9].score;
      rwsc= results[0].pose.keypoints[10].score;
  }
}


function draw(){
image(video, 0, 0, 500, 400);
fill("red");
stroke("black");
guitar_status= song1.isPlaying();
sitar_status= song2.isPlaying();

if (lwsc>0.2) {
    circle(lwxc-70, lwyc-20, 20);
    song2.stop();
    if (guitar_status==false) {
      song1.play();
      document.getElementById("SONG_IS").innerHTML= "Guitar is playing...";  
    }
   }

   if(rwsc>0.2){
    circle(rwxc-70, rwyc-20, 20);
    song1.stop();
    if (sitar_status==false) {
      song2.play();
      document.getElementById("SONG_IS").innerHTML= "Sitar is playing..."; 
    }

   }
}

function play() {
  song1.play();
  song2.play();
  song1.setVolume(1);
  song2.setVolume(1);
  song1.rate(1);
  song2.rate(1);
}
