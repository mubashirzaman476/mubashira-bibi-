const text = [
"Computer Science Aspirant",
"Future AI Innovator",
"Creative Problem Solver",
"Technology Explorer"
];

let count = 0;
let index = 0;
let current = "";
let letter = "";

(function type(){

if(count===text.length){
count=0;
}

current=text[count];

letter=current.slice(0,++index);

document.getElementById("typing").textContent=letter;

if(letter.length===current.length){

count++;

index=0;

setTimeout(type,1200);

}else{

setTimeout(type,75);

}

})();

// ==========================
// Animated Star Background
// ==========================

const canvas = document.getElementById("starCanvas");
const ctx = canvas.getContext("2d");

let stars = [];

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}

resizeCanvas();
window.addEventListener("resize", resizeCanvas);

class Star {

    constructor() {

        this.reset();

    }

    reset() {

        this.x = Math.random() * canvas.width;

        this.y = Math.random() * canvas.height;

        this.radius = Math.random() * 2 + 0.5;

        this.alpha = Math.random();

        this.speed = Math.random() * 0.01 + 0.002;

        this.dx = (Math.random() - 0.5) * 0.08;
this.dy = (Math.random() - 0.5) * 0.08;


    }

    draw() {

        ctx.beginPath();

        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);

        const colors = [
"#ffffff",
"#dff7ff",
"#bfefff",
"#f8fbff"
];

ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
ctx.globalAlpha = this.alpha;

        ctx.shadowBlur = this.radius * 8;

        ctx.shadowColor = "#00E5FF";

        ctx.fill();

        ctx.globalAlpha = 1;

    }

    update() {

        this.alpha += this.speed;

        if (this.alpha >= 1 || this.alpha <= 0.2) {

            this.speed *= -1;

        }
        this.x += this.dx;
this.y += this.dy;

if (this.x < 0) this.x = canvas.width;
if (this.x > canvas.width) this.x = 0;

if (this.y < 0) this.y = canvas.height;
if (this.y > canvas.height) this.y = 0;


        this.draw();

    }

}

for (let i = 0; i < 220; i++) {

    stars.push(new Star());

}

// ==========================
// Shooting Star
// ==========================

class ShootingStar {

    constructor() {
        this.reset();
    }

    reset() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * (canvas.height * 0.4);

        this.length = Math.random() * 120 + 80;
        this.speed = Math.random() * 12 + 10;

        this.life = 0;
        this.wait = Math.random() * 1200 + 800; // random delay
    }



    update() {

        if (this.wait > 0) {
            this.wait--;
            return;
        }

        this.life++;

        this.x += this.speed;
        this.y += this.speed * 0.35;

        ctx.beginPath();

        ctx.moveTo(this.x, this.y);

        ctx.lineTo(
            this.x - this.length,
            this.y - this.length * 0.35
        );

        const gradient = ctx.createLinearGradient(
            this.x,
            this.y,
            this.x - this.length,
            this.y - this.length
        );

        gradient.addColorStop(0, "rgba(255,255,255,.9)");
        gradient.addColorStop(1, "rgba(255,255,255,0)");

        ctx.strokeStyle = gradient;
        ctx.lineWidth = 2;
        ctx.stroke();

        if (this.life > 40) {
            this.reset();
        }

    }

}

const shootingStar = new ShootingStar();

function animateStars() {

    ctx.clearRect(0,0,canvas.width,canvas.height);

    stars.forEach(star=>star.update());

    shootingStar.update();

    requestAnimationFrame(animateStars);

}

animateStars();



// ==========================
// Scroll Reveal
// ==========================

const reveals = document.querySelectorAll(".reveal");

function revealOnScroll(){

reveals.forEach((element)=>{

const windowHeight = window.innerHeight;

const revealTop = element.getBoundingClientRect().top;

const revealPoint = 100;

if(revealTop < windowHeight - revealPoint){

element.classList.add("active");

}

});

}

window.addEventListener("scroll",revealOnScroll);

revealOnScroll();

// ==========================
// Active Navigation
// ==========================

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll("nav ul li a");

window.addEventListener("scroll", () => {

    let current = "";

    sections.forEach(section => {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (window.scrollY >= sectionTop) {
            current = section.getAttribute("id");
        }

    });

    navLinks.forEach(link => {

        link.classList.remove("active-link");

        if(link.getAttribute("href") === "#" + current){

            link.classList.add("active-link");

        }

    });

});

// ==========================
// Back To Top Button
// ==========================

const backToTop = document.getElementById("backToTop");

window.addEventListener("scroll", () => {

    if(window.scrollY > 300){

        backToTop.classList.add("show");

    }else{

        backToTop.classList.remove("show");

    }

});

backToTop.addEventListener("click", () => {

    window.scrollTo({

        top:0,

        behavior:"smooth"

    });

});

// ==========================
// Skill Bar Animation
// ==========================

const skillBars = document.querySelectorAll(".progress-bar");

const skillObserver = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

const bar = entry.target;

bar.style.width = bar.dataset.width;

}

});

},{
threshold:0.4
});

skillBars.forEach(bar=>{

skillObserver.observe(bar);

});


