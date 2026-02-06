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

/* ================= ACTUAL DAY PLAN ================= */

const plans = [
  {
    title: "Picking Up the Princess",
    datetime: "2026-02-16T05:00:00",
    location: "Hostel",
    image: "/assets/plans/0.png",
    alwaysVisible: true,
  },
  {
    title: "A New Chapter Unfolds",
    datetime: "2026-02-16T05:00:00",
    location: "Somewhere Special",
    image: "/assets/plans/0.png",
    alwaysVisible: true,
    type: "gift",
  },
  {
    title: "Some Beginnings Meant to be Blessed",
    datetime: "2026-02-16T05:30:00",
    location: "Dagdusheth Halwai Ganpati Mandir, Pune",
    image: "/assets/plans/1.png",
    alwaysVisible: true,
  },
  {
    title: "Some Journeys Don't Need Words",
    datetime: "2026-02-16T06:00:00",
    location: "Bike Ride | Tamhini Ghat, Mulashi, Pune",
    image: "/assets/plans/2.png",
  },
  {
    title: "One Last Walk",
    datetime: "2026-02-16T11:00:00",
    location: "Pashan Tekdi",
    image: "/assets/plans/1.png",
  },
  {
    title: "Goodbyes, Slowly",
    datetime: "2026-02-16T14:00:00",
    location: "Somewhere Familiar",
    image: "/assets/plans/1.png",
  },
];

const planContainer = document.getElementById("planContainer");

function isRevealed(planTime, alwaysVisible = false) {
  if (alwaysVisible) return true;

  const now = new Date().getTime();
  const revealTime = new Date(planTime).getTime() - 15 * 60 * 1000; // 15 mins before
  return now >= revealTime;
}

function renderPlans() {
  planContainer.innerHTML = "";

  plans.forEach((plan, index) => {
    const revealed = isRevealed(plan.datetime, plan.alwaysVisible);
    const isOdd =
      plans.filter((p) => p.type !== "gift").indexOf(plan) % 2 === 0;

    const card = document.createElement("div");
    card.className = `relative transition-all duration-700
      ${revealed ? "opacity-100 blur-0" : "opacity-40 blur-lg"}
    `;
    //     ${new Date(plan.datetime).toLocaleDateString("en-IN", {
    //   weekday: "long",
    //   day: "numeric",
    //   month: "long",
    // })} ·

    card.innerHTML =
      plan.type === "gift"
        ? `<section class="px-4 text-black">
  <div class="mx-auto backdrop-blur-md px-6">
    
    <div class="flex items-center justify-center">
      <div class="flex items-center gap-4">
        <p class="text-xs tracking-widest uppercase ">
          A small pause :
        </p>
        <h3 class="text-base font-medium ">
          A little something for you
        </h3>
      </div>
    </div>
  </div>
</section>
`
        : `
    <div class="absolute top-0 left-1/2 transform -translate-y-1/2 -translate-x-1/2 text-center bg-white px-2 "><p class="text-xs tracking-[0.3em] opacity-60">

        ${new Date(plan.datetime).toLocaleTimeString("en-IN", {
          hour: "2-digit",
          minute: "2-digit",
        })}
        </p></div>
      <div class="border-y border-black border-opacity-30 flex flex-col md:flex-row gap-10 items-center py-6  ${isOdd ? "" : "md:flex-row-reverse"}">
      
      <!-- Image -->
      <div class="w-full md:w-[45%] overflow-hidden">
        <img
        src="${plan.image}"
        alt="${plan.title}"
        class="h-full w-full object-contain grayscale rounded-lg ${revealed ? "grayscale-0" : ""}"
        />
      </div>

      <!-- Content -->
      <div class="flex-1 text-left">
        
        <p class="text-5xl uppercase text-gray-200 font-bold mb-4">
        ${revealed ? plan.title : "Yet to be revealed"}
        </p>

        <p class="text-sm opacity-40 text-end">
        ${revealed ? plan.location : "This moment will reveal itself, quietly."}
        </p>
      </div>
      </div>
    `;

    planContainer.appendChild(card);

    if (revealed) {
      gsap.from(card, {
        opacity: 0,
        y: 40,
        duration: 1,
        ease: "power3.out",
        delay: index * 0.1,
      });
    }
  });
}

renderPlans();
setInterval(renderPlans, 60 * 1000); // refresh every minute
