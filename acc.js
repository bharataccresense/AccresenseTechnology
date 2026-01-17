const container = document.querySelector('.tilt-container');
const image = document.querySelector('.tilt-image');

container.addEventListener('mousemove', (e) => {
  const rect = container.getBoundingClientRect();

  const x = e.clientX - rect.left;
  const y = e.clientY - rect.top;

  const centerX = rect.width / 2;
  const centerY = rect.height / 2;

  const rotateX = ((y - centerY) / centerY) * 15;
  const rotateY = ((x - centerX) / centerX) * -15;

  image.style.transform = `
    rotateX(${rotateX}deg)
    rotateY(${rotateY}deg)
    scale(1)
  `;

});

container.addEventListener('mouseleave', () => {
  image.style.transform = "rotateX(0deg) rotateY(0deg) scale(1)";
  image.style.boxShadow = "none";
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

// 1rem ko px me convert karo
const rem = parseFloat(getComputedStyle(document.documentElement).fontSize);

function animateMarquee() {
  offset -= speed1;
  track1.style.transform = `translateX(${offset}px)`;

  const firstItem = track1.children[0];
  const firstItemWidth = firstItem.offsetWidth + rem; // 🔑 1rem gap

  if (Math.abs(offset) >= firstItemWidth) {
    offset += firstItemWidth;
    track1.appendChild(firstItem);
  }

  requestAnimationFrame(animateMarquee);
}

animateMarquee();


