"use strict";

let canvas, width, height, ctx;
let particles = [];
const aboutImage = document.querySelector(".about .row .image img");
aboutImage.addEventListener("mousemove", triggerParticles);

function setup() {
  canvas = document.getElementById("canvas");
  setSize(canvas);
  ctx = canvas.getContext("2d");
  //   ctx.fillStyle = "white";
  //   ctx.fillRect(0, 0, width, height);
  window.addEventListener("resize", windowResized);
}

setTimeout(setup, 1);

function loop() {
  ctx.globalAlpha = 0.1;
  ctx.clearRect(0, 0, width, height); // Clear the canvas
  //   ctx.fillStyle = "white";
  //   ctx.fillRect(0, 0, width, height);
  ctx.globalAlpha = 1;

  for (let i = 0; i < particles.length; i++) {
    particles[i].update();
    particles[i].draw();
    if (particles[i].lifetime > 80) particles.splice(i, 1);
  }
}

setInterval(loop, 1000 / 60);

class Particle {
  constructor(x, y, col) {
    this.x = x;
    this.y = y;
    this.col = col;
    this.vel = randomVec(2);
    this.lifetime = 0;
  }

  update() {
    this.x += this.vel.x;
    this.y += this.vel.y;
    this.vel.y += 0.02;
    this.vel.x *= 0.99;
    this.vel.y *= 0.99;
    this.lifetime++;
  }

  draw() {
    ctx.globalAlpha = Math.max(1 - this.lifetime / 80, 0);
    ctx.fillStyle = this.col;
    ctx.fillRect(this.x, this.y, 5, 5);
  }
}

// function createParticles(x, y) {
//   const color = randomCol();
//   for (let i = 0; i < 10; i++) {
//     // number of particles
//     particles.push(new Particle(x, y, color));
//   }
// }

function createParticles(x, y) {
  const color = randomCol();
  for (let i = 0; i < 10; i++) {
    const xOffset = (Math.random() - 0.5) * 50; // Increased spread
    const yOffset = (Math.random() - 0.5) * 50; // Increased spread
    particles.push(new Particle(x + xOffset, y + yOffset, color));
  }
}

function randomVec(max) {
  let dir = Math.random() * Math.PI * 2;
  let spd = Math.random() * max;
  return { x: Math.cos(dir) * spd, y: Math.sin(dir) * spd };
}

function setSize(canv) {
  canv.style.width = innerWidth + "px";
  canv.style.height = innerHeight + "px";
  width = innerWidth;
  height = innerHeight;

  canv.width = innerWidth * window.devicePixelRatio;
  canv.height = innerHeight * window.devicePixelRatio;
  canvas
    .getContext("2d")
    .scale(window.devicePixelRatio, window.devicePixelRatio);
}

// function triggerParticles(e) {
//   const rect = aboutImage.getBoundingClientRect();
//   const mouseX = e.clientX - rect.left;
//   const mouseY = e.clientY - rect.top;

//   // Determine which corner(s) to trigger based on mouse position
//   if (mouseX < rect.width / 2 && mouseY < rect.height / 2) {
//     // Top-left corner of the image
//     createParticles(rect.left, rect.top);
//   } else if (mouseX >= rect.width / 2 && mouseY < rect.height / 2) {
//     // Top-right corner of the image
//     createParticles(rect.right, rect.top);
//   } else if (mouseX < rect.width / 2 && mouseY >= rect.height / 2) {
//     // Bottom-left corner of the image
//     createParticles(rect.left, rect.bottom - 150);
//   } else {
//     // Bottom-right corner of the image
//     createParticles(rect.right, rect.bottom - 150);
//   }
// }
// function triggerParticles(e) {
//   const rect = canvas.getBoundingClientRect();
//   const mouseX = e.clientX - rect.left;
//   const mouseY = e.clientY - rect.top;

//   // Check if mouse is over the image
//   const imageRect = aboutImage.getBoundingClientRect();
//   if (
//     e.clientX >= imageRect.left &&
//     e.clientX <= imageRect.right &&
//     e.clientY >= imageRect.top &&
//     e.clientY <= imageRect.bottom
//   ) {
//     // Top-left corner of the canvas
//     createParticles(rect.left, rect.top);

//     // Top-right corner of the canvas
//     createParticles(rect.right, rect.top);

//     // Bottom-left corner of the canvas
//     createParticles(rect.left, rect.bottom);

//     // Bottom-right corner of the canvas
//     createParticles(rect.right, rect.bottom);
//   }
// }
function triggerParticles(e) {
  const canvasRect = canvas.getBoundingClientRect();
  const imageRect = aboutImage.getBoundingClientRect();

  // Check if mouse is over the image
  if (
    e.clientX >= imageRect.left &&
    e.clientX <= imageRect.right &&
    e.clientY >= imageRect.top &&
    e.clientY <= imageRect.bottom
  ) {
    // Generate particles from the left side of the canvas
    const randomHeightLeft = Math.random() * canvasRect.height;
    createParticles(canvasRect.left, canvasRect.top + randomHeightLeft);

    // Generate particles from the right side of the canvas
    const randomHeightRight = Math.random() * canvasRect.height;
    createParticles(canvasRect.right, canvasRect.top + randomHeightRight);

    // // Generate particles from the top side of the canvas
    // const randomWidthTop = Math.random() * canvasRect.width;
    // createParticles(canvasRect.left + randomWidthTop, canvasRect.top);

    // // Generate particles from the bottom side of the canvas
    // const randomWidthBottom = Math.random() * canvasRect.width;
    // createParticles(canvasRect.left + randomWidthBottom, canvasRect.bottom);
  }
}

function windowResized() {
  setSize(canvas);
  ctx.fillStyle = "white";
  ctx.fillRect(0, 0, width, height);
}

// function randomCol() {
//   return "#" + Math.floor(Math.random() * 16777215).toString(16);
// }
function randomCol() {
  const r = Math.floor(Math.random() * 256);
  const g = Math.floor(Math.random() * 256);
  const b = 255;
  return `rgb(${r},${g},${b})`;
}
