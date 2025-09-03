// ===== Navbar Toggle =====
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// ===== Dark Mode Toggle =====
const darkModeToggle = document.getElementById("dark-mode-toggle");
const toggleBall = darkModeToggle.querySelector(".toggle-ball");
const sunIcon = darkModeToggle.querySelector(".sun");
const moonIcon = darkModeToggle.querySelector(".moon");

// Apply saved mode on page load
(function applySavedMode() {
  const savedMode = localStorage.getItem("dark-mode") === "true";
  document.body.classList.toggle("dark-mode", savedMode);

  if (savedMode) {
    toggleBall.style.left = "33px";
    sunIcon.style.opacity = "0.3";
    moonIcon.style.opacity = "1";
  } else {
    toggleBall.style.left = "3px";
    sunIcon.style.opacity = "1";
    moonIcon.style.opacity = "0.7";
  }
})();

// Toggle dark mode
darkModeToggle.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
  const isDark = document.body.classList.contains("dark-mode");

  toggleBall.style.transition = "left 0.4s ease, transform 0.4s ease, background 0.4s ease";
  toggleBall.style.left = isDark ? "33px" : "3px";
  toggleBall.style.transform = isDark ? "rotate(360deg)" : "rotate(0deg)";
  sunIcon.style.opacity = isDark ? "0.3" : "1";
  moonIcon.style.opacity = isDark ? "1" : "0.7";

  localStorage.setItem("dark-mode", isDark);
});

// ===== Skills Animation on Scroll =====
const skills = document.querySelectorAll(".skill-progress");

function animateSkills() {
  const skillsSection = document.getElementById("skills");
  const sectionPos = skillsSection.getBoundingClientRect().top;
  const screenPos = window.innerHeight;

  if (sectionPos < screenPos - 100) {
    skills.forEach(skill => {
      const width = skill.dataset.width || skill.style.width;
      skill.style.width = "0%";
      setTimeout(() => {
        skill.style.width = width;
      }, 100);
    });
  }
}

window.addEventListener("scroll", animateSkills);

// Animate skill bars on load
window.addEventListener("load", () => {
  skills.forEach(bar => {
    bar.style.width = bar.dataset.width || bar.style.width;
  });
});

// ===== Certificate Modal =====
function openModal(imgSrc) {
  const modal = document.createElement("div");
  modal.className = "modal";
  modal.innerHTML = `
    <div class="modal-content">
      <span class="close">&times;</span>
      <img src="${imgSrc}" alt="Certificate">
    </div>
  `;
  document.body.appendChild(modal);

  modal.querySelector(".close").onclick = () => modal.remove();
  modal.onclick = (e) => { if (e.target === modal) modal.remove(); };
}

// ===== Tab Functionality =====
const tabBtns = document.querySelectorAll(".tab-btn");
const tabs = document.querySelectorAll(".tab");

tabBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    tabBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");

    const target = btn.dataset.tab;
    tabs.forEach(tab => {
      tab.classList.toggle("active", tab.id === target);
    });
  });
});

// ===== Initialize EmailJS =====
(function () {
  emailjs.init("hHRSEc02ykVPiZBbf"); // ✅ Replace with your actual PUBLIC KEY
})();

// ===== Send Email Function =====
function sendMail() {
  const params = {
    from_name: document.getElementById("fullname").value,
    email_id: document.getElementById("email").value,
    phone: document.getElementById("phonenumber").value,
    subject: document.getElementById("subject").value,
    message: document.getElementById("yourmessage").value,
  };

  emailjs.send("service_tw1zhuw", "template_7voo1ud", params) // ✅ Replace with your Service & Template IDs
    .then(() => {
      alert("✅ Your message has been sent successfully!");
      document.querySelector("form").reset();
    })
    .catch(error => {
      alert("❌ Failed to send message. Please try again!");
      console.error("EmailJS Error:", error);
    });
}
