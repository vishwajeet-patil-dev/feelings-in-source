// SET YOUR FAREWELL DATE HERE
// Format: YYYY-MM-DDTHH:MM:SS
const farewellDate = new Date("2026-02-16T05:00:00").getTime();

function updateTimer() {
  const now = new Date().getTime();
  const diff = farewellDate - now;

  if (diff <= 0) {
    document.getElementById("days").innerText = "00";
    document.getElementById("hours").innerText = "00";
    document.getElementById("minutes").innerText = "00";
    return;
  }

  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
  const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));

  document.getElementById("days").innerText = String(days).padStart(2, "0");
  document.getElementById("hours").innerText = String(hours).padStart(2, "0");
  document.getElementById("minutes").innerText = String(minutes).padStart(
    2,
    "0",
  );
}

updateTimer();
setInterval(updateTimer, 1000);

const isMobile = window.innerWidth < 768;

const mobileMessage = document.getElementById("mobileMessage");
const desktopContent = document.getElementById("desktopContent");
const resultMessage = document.getElementById("resultMessage");
const rewardSection = document.getElementById("rewardSection");

const yesBtn = document.getElementById("yesBtn");
const noBtn = document.getElementById("noBtn");

let yesAttempts = 0;

// Device check
if (isMobile) {
  mobileMessage.classList.remove("hidden");
} else {
  desktopContent.classList.remove("hidden");
}

// No button
noBtn.addEventListener("click", () => {
  desktopContent.classList.add("hidden");
  resultMessage.textContent = "Okay 🙂";
  resultMessage.classList.remove("hidden");
});

yesBtn.addEventListener("click", () => {
  if (yesAttempts >= 5) {
    desktopContent.classList.add("hidden");
    rewardSection.classList.remove("hidden");
  }
});

// Cancel reward
document.getElementById("cancelBtn").addEventListener("click", () => {
  rewardSection.classList.add("hidden");
  resultMessage.textContent = "Okay 🙂";
  resultMessage.classList.remove("hidden");
});

// Submit reward → API call

const loadingState = document.getElementById("loadingState");

document.getElementById("submitBtn").addEventListener("click", async () => {
  const value = document.getElementById("rewardInput").value.trim();

  if (!value) {
    alert("Type something 😄");
    return;
  }

  // Hide form, show loader
  rewardSection.classList.add("hidden");
  loadingState.classList.remove("hidden");

  try {
    await fetch("https://formspree.io/f/xjgwpore", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        answer: value,
        page: "farewell",
        timestamp: new Date().toISOString(),
      }),
    });

    // Stop loading
    loadingState.classList.add("hidden");

    // Final message after submit
    resultMessage.textContent = "I’ll think on it 🤍";
    resultMessage.classList.remove("hidden");
  } catch (error) {
    loadingState.classList.add("hidden");
    alert("Something went wrong. Try again.");
    rewardSection.classList.remove("hidden");
  }
});

yesBtn.addEventListener("mouseenter", () => {
  if (yesAttempts < 5) {
    yesAttempts++;

    // Random movement range
    const x = gsap.utils.random(-200, 200);
    const y = gsap.utils.random(-120, 120);

    gsap.to(yesBtn, {
      x,
      y,
      duration: 0.4,
      ease: "power2.out",
    });
  }
});

gsap.to(yesBtn, {
  x,
  y,
  rotation: gsap.utils.random(-10, 10),
  duration: 0.4,
  ease: "power2.out",
});
gsap.from(yesBtn, {
  scale: 0.9,
  duration: 0.2,
  ease: "back.out(2)",
});
