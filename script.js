const canvas = document.querySelector("canvas");

const context = canvas.getContext("2d"); // Canvas pe kuch bhi likhne hatane ya draw karne ke liye CONTEXT chahiye

let frames = {
  currInd: 0,
  maxInd: 382,
};

let imagesLoaded = 0;
let allImg = [];

function preloadImages() {
  for (let i = 1; i <= frames.maxInd; i++) {
    let imageURL = `./new/frame_${i.toString().padStart(4, "0")}.jpeg`;
    const img = new Image();
    img.src = imageURL;

    img.onload = () => {
      imagesLoaded++;
      if (imagesLoaded === frames.maxInd) {
        loadImage(frames.currInd);
        startAnimation();
      }
    };
    allImg.push(img);
  }
}

function loadImage(index) {
  if (index >= 0 && index <= frames.maxInd) {
    let img = allImg[index];

    canvas.width = window.innerWidth; //Canvas ki width screen ke barabar set ki
    canvas.height = window.innerHeight; // Canvas ki height screen ke barabar set ki

    const scaleX = canvas.width / img.width; //Image ratio set according to canvas
    const scaleY = canvas.height / img.height;

    const scale = Math.max(scaleX, scaleY); // we choose the big ration taaki hamara image canvas me acche se fit ho.

    const newWidth = img.width * scale;
    const newHeigth = img.height * scale;

    const offsetX = (canvas.width - newWidth) / 2;
    const offsetY = (canvas.height - newHeigth) / 2;

    context.clearRect(0, 0, canvas.width, canvas.height); // canvas clear karne ke liye
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(img, offsetX, offsetY, newWidth, newHeigth); // draw karne ke liye
    frames.currInd = index;
  }
}

function startAnimation() {
  var tl = gsap.timeline({
    scrollTrigger: {
      trigger: ".parent",
      start: "top top",
      scrub: 2,
      end: "bottom bottom",
      markers: true, // to check scroll start and end
    },
  });
  tl.to(frames, {
    currInd: frames.maxInd,
    onUpdate: function () {
      loadImage(Math.floor(frames.currInd));
    },
  });
}
preloadImages();
