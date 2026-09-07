const photos = [
  "assets/kamran-1.jpeg",
  "assets/kamran-2.jpeg",
  "assets/kamran-3.jpeg",
  "assets/kamran-4.jpeg",
  "assets/kamran-5.jpeg"
];

const words = [
  "WEB EXPERIENCES",
  "FULL-STACK APPS",
  "SMART SOLUTIONS",
  "PYTHON PROJECTS",
  "DIGITAL PRODUCTS",
  "AI / ML IDEAS"
];

window.addEventListener("load", () => {
  setTimeout(() => document.body.classList.add("loaded"), 650);
});

const rotating = document.getElementById("rotatingText");
let wi = 0;
function typeCycle(){
  const next = words[wi];
  let phase = 0;
  rotating.textContent = "";
  const type = setInterval(() => {
    rotating.textContent = next.slice(0, phase++);
    if(phase > next.length){
      clearInterval(type);
      setTimeout(() => {
        let del = next.length;
        const erase = setInterval(() => {
          rotating.textContent = next.slice(0, del--);
          if(del < 0){
            clearInterval(erase);
            wi = (wi + 1) % words.length;
            setTimeout(typeCycle, 180);
          }
        }, 38);
      }, 1150);
    }
  }, 62);
}
setTimeout(typeCycle, 900);

const heroPhoto = document.getElementById("heroPhoto");
const photoIndex = document.getElementById("photoIndex");
let pi = 0;
function changePhoto(dir=1){
  pi = (pi + dir + photos.length) % photos.length;
  heroPhoto.style.opacity = "0";
  heroPhoto.style.transform = "scale(1.04)";
  setTimeout(() => {
    heroPhoto.src = photos[pi];
    photoIndex.textContent = String(pi+1).padStart(2,"0");
    heroPhoto.onload = () => {
      heroPhoto.style.opacity = "1";
      heroPhoto.style.transform = "scale(1)";
    };
  }, 180);
}
document.getElementById("nextPhoto").addEventListener("click",()=>changePhoto(1));
document.getElementById("prevPhoto").addEventListener("click",()=>changePhoto(-1));
setInterval(()=>changePhoto(1), 5000);

const observer = new IntersectionObserver((entries)=>{
  entries.forEach(e=>{if(e.isIntersecting)e.target.classList.add("visible")});
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el=>observer.observe(el));

const menuBtn = document.getElementById("menuBtn");
const navLinks = document.getElementById("navLinks");
menuBtn.addEventListener("click",()=>navLinks.classList.toggle("open"));
document.querySelectorAll(".nav-links a").forEach(a=>a.addEventListener("click",()=>navLinks.classList.remove("open")));

const glow = document.querySelector(".cursor-glow");
window.addEventListener("pointermove",(e)=>{
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

document.querySelectorAll(".project-row,.skill-card,.photo-frame,.btn").forEach(el=>{
  el.addEventListener("mouseenter",()=>document.body.classList.add("hovering"));
  el.addEventListener("mouseleave",()=>document.body.classList.remove("hovering"));
});
