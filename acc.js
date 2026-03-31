const container = document.querySelector('.tilt-container');
const image = document.querySelector('.tilt-image');

const boxes = [
  document.querySelector('.left.one'),
  document.querySelector('.left.two'),
  document.querySelector('.right.three'),
  document.querySelector('.right.four')
];

let active = false;

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const cx = rect.width / 2;
  const cy = rect.height / 2;

  const rx = ((y - cy) / cy) * 15;
  const ry = ((x - cx) / cx) * -15;

  /* IMAGE TILT */
  image.style.transform = `
    rotateX(${rx}deg)
    rotateY(${ry}deg)
    translateZ(20px)
  `;

  /* BOXES APPEAR ONE BY ONE */
  if (!active) {
    active = true;

    boxes.forEach((box, i) => {
      setTimeout(() => {
        box.style.opacity = "1";
        box.style.transform = `
          translateZ(40px)
          scale(1)
        `;
      }, i * 250); // 👈 longer cinematic delay
    });
  }
});

container.addEventListener('mouseleave', () => {
  active = false;

  image.style.transform =
    "rotateX(0deg) rotateY(0deg) translateZ(0)";

  boxes.forEach((box, i) => {
    setTimeout(() => {
      box.style.opacity = "0";
      box.style.transform =
        "translateZ(-80px) scale(0.5)";
    }, i * 120);
  });
});




const track = document.getElementById("diagTrack");
let x = 0;
const speed = 0.7;

function animate() {
  x -= speed;

  const first = track.children[0];
  const width = first.offsetWidth + parseFloat(getComputedStyle(first).marginRight);

  if (-x >= width) {
    track.appendChild(first);
    x += width;
  }

  track.style.transform = `translateX(${x}px) `;
  requestAnimationFrame(animate);
}

animate();

gsap.registerPlugin(ScrollTrigger);

const box = document.querySelector(".ani-sq");

/* initial state */
gsap.set(box, {
  width: "6rem",
  height: "6rem",
  scale: 1,
  rotation: 0,
  transformOrigin: "50% 50%"
});

gsap.set(".head, .min-con, .cir-brand", {
  opacity: 0,
  y: 50
});

/* MAIN TIMELINE */
const tl = gsap.timeline({
  scrollTrigger: {
    trigger: ".ani-wrapper",
    start: "top bottom",
    end: "top top",
    scrub: true
  }
});


tl.to(box, {
  width: "100%",
  height: "fit-content",
  borderRadius: "0rem",
  ease: "none"
})

  .to(".head, .min-con, .cir-brand", {
    opacity: 1,
    y: 0,
    ease: "none"
  }, ">-=0.1");

const track1 = document.getElementById("marqueeTrack");
let speed1 = 0.6;
let offset = 0;

// 1rem to px
const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

function animateMarquee() {
  offset -= speed1;

  track1.style.transform = `translate3d(${offset}px, 0, 0)`;

  const firstItem = track1.children[0];
  const itemWidth = firstItem.getBoundingClientRect().width + rem;

  if (Math.abs(offset) >= itemWidth) {
    offset += itemWidth;
    track1.appendChild(firstItem);
  }

  requestAnimationFrame(animateMarquee);
}

animateMarquee();



gsap.registerPlugin(ScrollTrigger);

/* MAIN TIMELINE */
const t2 = gsap.timeline({
  scrollTrigger:{
    trigger:".video-grid-section",
    start:"top top",
    end:"bottom bottom",
    scrub:true
  }
});

/* ===== PHASE 1: ONLY VIDEO (0–50%) ===== */
t2.to({}, {duration:1}); // hold state

/* ===== PHASE 2: GRID APPEARS TOGETHER ===== */
t2.to(".grid-item",{
  opacity:1,
  scale:1,
  duration:1,
  ease:"power2.out"
});

/* ===== PHASE 3: VIDEO → CENTER GRID ===== */
t2.to("#videoWrap",{
  scale:.31,
  width:"100vw",
  y:7,
  x:-6,
  duration:1,
  ease:"power2.inOut"
},"<");

/* DOM MOVE (video becomes 5th grid bg) */
ScrollTrigger.create({
  trigger:".video-grid-section",
  start:"top 50%",
  onEnter:()=>{
    document.getElementById("centerSlot")
      .appendChild(document.getElementById("videoWrap"));
  },
  onLeaveBack:()=>{
    document.querySelector(".pin-wrap")
      .appendChild(document.getElementById("videoWrap"));
  }
});

function clgit()
{
   window.location.href="getintouch.html";
}


