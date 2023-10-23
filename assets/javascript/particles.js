let systemLeft, systemRight, triggerTime;
const triggerDuration = 2000; // 2 seconds in milliseconds
let aboutSection;

function setup() {
  aboutSection = select(".about"); // Select the 'About Me' section
  const aboutSectionSize = aboutSection.size();
  const canvas = createCanvas(aboutSectionSize.width, aboutSectionSize.height);
  canvas.parent(aboutSection); // Set the 'About Me' section as the parent of the canvas
  canvas.position(0, 0); // Position the canvas at the top-left corner of the section
  canvas.style("z-index", "-1"); // Place the canvas behind the HTML content of the section
  systemLeft = new ParticleSystem(createVector(0, 50));
  systemRight = new ParticleSystem(createVector(width, 50));
  colorMode(HSB, 255);
}

function draw() {
  clear(); // Clear the canvas
  const img = document.querySelector(".about .row .image img"); // Select the image in the 'About Me' section
  const rect = img.getBoundingClientRect();
  const inTriggerArea =
    mouseX > rect.left &&
    mouseX < rect.right &&
    mouseY > rect.top &&
    mouseY < rect.bottom;

  if (
    inTriggerArea &&
    (triggerTime === undefined || millis() - triggerTime < triggerDuration)
  ) {
    if (triggerTime === undefined) {
      triggerTime = millis();
      let hue = random(255);
      systemLeft.setHue(hue);
      systemRight.setHue(hue);
    }
    systemLeft.addParticle();
    systemRight.addParticle();
  } else {
    triggerTime = undefined;
  }

  systemLeft.run();
  systemRight.run();
}

// A simple Particle class
class Particle {
  constructor(position, hue) {
    this.acceleration = createVector(0, 0.05);
    this.velocity = createVector(random(-1, 1), random(-1, 0));
    this.position = position.copy();
    this.lifespan = 255;
    this.hue = hue;
  }

  run() {
    this.update();
    this.display();
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
  }

  display() {
    noStroke();
    fill(this.hue, 255, 255, this.lifespan);
    ellipse(this.position.x, this.position.y, 12, 12);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

class ParticleSystem {
  constructor(position) {
    this.origin = position.copy();
    this.particles = [];
    this.hue = random(255);
  }

  setHue(hue) {
    this.hue = hue;
  }

  addParticle() {
    this.particles.push(new Particle(this.origin, this.hue));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.run();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}
