let particleSystems = [];
let generatingParticles = false;
let particleContainer;

function setup() {
  particleContainer = select("#particle-container");
  const rect = particleContainer.elt.getBoundingClientRect();
  const canvas = createCanvas(rect.width, rect.height);
  canvas.parent(particleContainer);
}

function draw() {
  clear();

  if (mouseIsInImage()) {
    if (!generatingParticles) {
      generatingParticles = true;
      addParticleSystem(createVector(mouseX, mouseY));
    }
  } else {
    generatingParticles = false;
  }

  for (let i = particleSystems.length - 1; i >= 0; i--) {
    let ps = particleSystems[i];
    ps.run();

    if (ps.isDead()) {
      particleSystems.splice(i, 1);
    }
  }
}

function mouseIsInImage() {
  const rect = particleContainer.elt.getBoundingClientRect();
  return (
    mouseX > rect.left &&
    mouseX < rect.right &&
    mouseY > rect.top &&
    mouseY < rect.bottom
  );
}

function addParticleSystem(position) {
  let ps = new ParticleSystem(position);
  particleSystems.push(ps);
}

let Particle = function (position, velocity) {
  this.acceleration = createVector(0, 0.05);
  this.velocity = velocity.copy();
  this.position = position.copy();
  this.lifespan = 255;
  this.color = color(random(255), random(255), random(255), this.lifespan);
};

Particle.prototype.run = function () {
  this.update();
  this.display();
};

// Method to update position
Particle.prototype.update = function () {
  this.velocity.add(this.acceleration);
  this.position.add(this.velocity);
  this.lifespan -= 2;
  this.color.setAlpha(this.lifespan);
};

// Method to display
Particle.prototype.display = function () {
  stroke(200, this.lifespan);
  strokeWeight(2);
  fill(127, this.lifespan);
  ellipse(this.position.x, this.position.y, 12, 12);
};

// Is the particle still useful?
Particle.prototype.isDead = function () {
  return this.lifespan < 0;
};

let ParticleSystem = function (position) {
  this.origin = position.copy();
  this.particles = [];
};

ParticleSystem.prototype.addParticle = function () {
  let angle = random(TWO_PI); // Random angle
  let speed = random(0.5, 2); // Random speed
  let velocity = p5.Vector.fromAngle(angle).mult(speed);

  //let velocity = createVector(random(-1, 1), random(-1, 1));
  this.particles.push(new Particle(this.origin, velocity));
};

ParticleSystem.prototype.run = function () {
  for (let i = this.particles.length - 1; i >= 0; i--) {
    let p = this.particles[i];
    p.run();
    if (p.isDead()) {
      this.particles.splice(i, 1);
    }
  }
};

ParticleSystem.prototype.isDead = function () {
  return this.particles.length === 0;
};

function mousePressed() {
  // Create a new particle system at the mouse position only if mouse is in the area
  if (generatingParticles) {
    let ps = new ParticleSystem(createVector(mouseX, mouseY));
    particleSystems.push(ps);
  }
}
