const modal = document.getElementById("projectModal");
const modalBody = document.getElementById("modalBody");
const darkBtn = document.getElementById("darkModeToggle");

const projects = [
  {
    id: 1,
    title: "Smart Resume Analyzer",
    desc: "NLP-based resume analyzer that extracts skills, experience, and matches job descriptions using Python and AI/ML.",
    tech: ["Python", "NLP", "Transformers", "Flask"],
    link: "https://github.com/habibcse20/Smart-Resume-Analyzer"
  },
  {
    id: 2,
    title: "Image Captioning Web App",
    desc: "Generate captions from images using CNN + Transformer encoder-decoder model with a clean UI.",
    tech: ["PyTorch", "Computer Vision", "Flask", "API"],
    link: "#"
  },
  {
    id: 3,
    title: "AI Chatbot (RAG)",
    desc: "Retrieval-Augmented Generation chatbot using LangChain, FAISS, and vector databases.",
    tech: ["LangChain", "RAG", "FAISS", "Python"],
    link: "#"
  },
  {
    id: 4,
    title: "Stock Price Predictor",
    desc: "LSTM-based stock price prediction with data visualization and model evaluation metrics.",
    tech: ["LSTM", "Time Series", "Pandas", "Matplotlib"],
    link: "#"
  }
];

function openModal(id) {
  const project = projects.find(p => p.id === id);
  modalBody.innerHTML = `
    <h2>${project.title}</h2>
    <p>${project.desc}</p>
    <p><strong>Tech:</strong> ${project.tech.join(", ")}</p>
    <a class="btn" href="${project.link}">View Code</a>
  `;
  modal.style.display = "flex";
}

function closeModal() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target === modal) {
    closeModal();
  }
};

/* ===== Particles Background ===== */
const canvas = document.getElementById("particles");
const ctx = canvas.getContext("2d");

let particlesArray;
let mouse = { x: null, y: null };

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function(){
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
  init();
});

window.addEventListener("mousemove", function(event){
  mouse.x = event.x;
  mouse.y = event.y;
});

class Particle {
  constructor(x, y, size, color, weight) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.color = color;
    this.weight = weight;
  }
  draw() {
    ctx.fillStyle = this.color;
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.closePath();
    ctx.fill();
  }
  update() {
    this.y += this.weight;
    if (this.y > canvas.height) {
      this.y = 0 - this.size;
      this.x = Math.random() * canvas.width;
      this.weight = Math.random() * 1 + 0.5;
    }
    // mouse interaction
    let dx = mouse.x - this.x;
    let dy = mouse.y - this.y;
    let distance = Math.sqrt(dx*dx + dy*dy);
    if (distance < 100) {
      this.x -= dx / 20;
      this.y -= dy / 20;
    }
  }
}

function init() {
  particlesArray = [];
  for (let i = 0; i < 120; i++) {
    let x = Math.random() * canvas.width;
    let y = Math.random() * canvas.height;
    let size = Math.random() * 2 + 1;
    let color = "rgba(255,255,255,0.7)";
    let weight = Math.random() * 1 + 0.5;
    particlesArray.push(new Particle(x, y, size, color, weight));
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  for (let p of particlesArray) {
    p.update();
    p.draw();
  }
  connect();
  requestAnimationFrame(animate);
}

function connect() {
  for (let a = 0; a < particlesArray.length; a++) {
    for (let b = a; b < particlesArray.length; b++) {
      let dx = particlesArray[a].x - particlesArray[b].x;
      let dy = particlesArray[a].y - particlesArray[b].y;
      let distance = Math.sqrt(dx*dx + dy*dy);
      if (distance < 100) {
        ctx.strokeStyle = "rgba(255,255,255,0.1)";
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(particlesArray[a].x, particlesArray[a].y);
        ctx.lineTo(particlesArray[b].x, particlesArray[b].y);
        ctx.stroke();
      }
    }
  }
}

// Smooth Scroll
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', (e) => {
    e.preventDefault();
    const target = document.querySelector(link.getAttribute('href'));
    target.scrollIntoView({ behavior: 'smooth' });
  });
});

// Active link on scroll
const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-link");

window.addEventListener("scroll", () => {
  let current = "";

  sections.forEach(section => {
    const sectionTop = section.offsetTop - 100;
    if (pageYOffset >= sectionTop) {
      current = section.getAttribute("id");
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("active");
    if (link.getAttribute("href") === "#" + current) {
      link.classList.add("active");
    }
  });
});

init();
animate();

/* ===== Dark Mode Toggle ===== */
let darkMode = true;
darkBtn.addEventListener("click", () => {
  darkMode = !darkMode;
  document.body.style.background = darkMode ? "#0b1020" : "#f7f8fb";
  document.querySelectorAll(".section-title, .hero-text h2, .hero-text p, .nav-links a, .logo").forEach(el => {
    el.style.color = darkMode ? "rgba(255,255,255,0.85)" : "#111";
  });
});

