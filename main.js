gsap.registerPlugin(ScrollTrigger);

// Hero
gsap.from(".hero h1, .hero .sub", {
  opacity: 0,
  y: 40,
  stagger: 0.2,
  duration: 1.4,
  ease: "power2.out",
});

// Lines animation
gsap.utils.toArray(".section").forEach((section) => {
  const lines = section.querySelectorAll(".line");

  if (lines.length) {
    gsap.from(lines, {
      opacity: 0,
      y: 25,
      stagger: 0.25,
      duration: 1,
      ease: "power2.out",
      scrollTrigger: {
        trigger: section,
        start: "top 75%",
      },
    });
  }
});

// Triple blocks
gsap.from(".block", {
  opacity: 0,
  y: 30,
  stagger: 0.3,
  scrollTrigger: {
    trigger: ".triple",
    start: "top 70%",
  },
});
