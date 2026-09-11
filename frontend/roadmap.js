// Database of preferences & roadmaps based on user target career
const userPreferencesDatabase = {
  "AI / ML Engineer": {
    roleIcon: "fa-solid fa-robot",
    steps: [
      {
        number: 1,
        title: "Statistics Fundamentals",
        icon: "fa-solid fa-chart-column",
        iconClass: "icon-teal",
        why: "Essential for understanding ML algorithms.",
        learn: "Probability • Statistics • Distributions",
        priority: "HIGH PRIORITY",
        priorityClass: "priority-high"
      },
      {
        number: 2,
        title: "Machine Learning",
        icon: "fa-solid fa-robot",
        iconClass: "icon-purple",
        why: "Builds models that learn from data and make predictions.",
        learn: "Supervised & Unsupervised Learning • Models • Evaluation",
        priority: "HIGH PRIORITY",
        priorityClass: "priority-high"
      },
      {
        number: 3,
        title: "Generative AI",
        icon: "fa-solid fa-brain",
        iconClass: "icon-pink",
        why: "Enables creation of new content (text, images, code, etc.).",
        learn: "LLMs • Prompt Engineering • Fine-tuning",
        priority: "MEDIUM",
        priorityClass: "priority-medium"
      }
    ]
  },

  "Software Developer": {
    roleIcon: "fa-solid fa-laptop-code",
    steps: [
      {
        number: 1,
        title: "Data Structures & Algorithms",
        icon: "fa-solid fa-code",
        iconClass: "icon-purple",
        why: "Crucial for writing efficient, optimized code & cracking interviews.",
        learn: "Arrays • Trees • Graphs • Dynamic Programming",
        priority: "HIGH PRIORITY",
        priorityClass: "priority-high"
      },
      {
        number: 2,
        title: "System Design & Databases",
        icon: "fa-solid fa-database",
        iconClass: "icon-blue",
        why: "Teaches building scalable architectures and managing data.",
        learn: "SQL • NoSQL • Microservices • Caching",
        priority: "HIGH PRIORITY",
        priorityClass: "priority-high"
      },
      {
        number: 3,
        title: "DevOps & Deployment",
        icon: "fa-solid fa-server",
        iconClass: "icon-orange",
        why: "Automates testing, deployment, and cloud infrastructure.",
        learn: "Docker • CI/CD • AWS/GCP • Kubernetes",
        priority: "MEDIUM",
        priorityClass: "priority-medium"
      }
    ]
  },

  "Data Analyst": {
    roleIcon: "fa-solid fa-chart-simple",
    steps: [
      {
        number: 1,
        title: "Advanced Excel & SQL",
        icon: "fa-solid fa-table",
        iconClass: "icon-teal",
        why: "Primary tools to query, filter, and structure raw business data.",
        learn: "Joins • Aggregations • Formulas • Pivot Tables",
        priority: "HIGH PRIORITY",
        priorityClass: "priority-high"
      },
      {
        number: 2,
        title: "Data Visualization (Tableau/PowerBI)",
        icon: "fa-solid fa-chart-pie",
        iconClass: "icon-orange",
        why: "Translates complex numerical insights into clear business stories.",
        learn: "Dashboards • Metrics • Storytelling",
        priority: "HIGH PRIORITY",
        priorityClass: "priority-high"
      },
      {
        number: 3,
        title: "Python for Data Analysis",
        icon: "fa-brands fa-python",
        iconClass: "icon-blue",
        why: "Automates data cleaning and handles massive datasets.",
        learn: "Pandas • NumPy • Matplotlib",
        priority: "MEDIUM",
        priorityClass: "priority-medium"
      }
    ]
  }
};

// Default selected career (or load from localStorage/User setting)
const currentSelectedRole = "AI / ML Engineer"; 

document.addEventListener("DOMContentLoaded", () => {
  renderRoadmap(currentSelectedRole);
});

function renderRoadmap(roleName) {
  const roleData = userPreferencesDatabase[roleName] || userPreferencesDatabase["AI / ML Engineer"];

  // Update Header and Banner UI Titles
  document.getElementById("topRoleBadge").querySelector("span").textContent = roleName;
  document.getElementById("topRoleIcon").className = roleData.roleIcon;
  document.getElementById("heroRoleBadge").textContent = roleName;
  document.getElementById("targetRoleTitle").textContent = roleName;

  // Render Step Cards Dynamically
  const container = document.getElementById("roadmapContainer");
  container.innerHTML = ""; // Clear existing elements

  roleData.steps.forEach((step, index) => {
    const isLast = index === roleData.steps.length - 1;

    const stepHTML = `
      <div class="step-card-wrapper">
        <div class="step-card">
          <div class="step-number">${step.number}</div>
          <div class="step-icon-box ${step.iconClass}">
            <i class="${step.icon}"></i>
          </div>
          <div class="step-details">
            <h3 class="step-title">${step.title}</h3>
            <p class="step-text"><strong>Why?</strong> ${step.why}</p>
            <p class="step-text"><strong>Learn:</strong> ${step.learn}</p>
          </div>
          <span class="priority-tag ${step.priorityClass}">${step.priority}</span>
        </div>
        ${!isLast ? '<div class="step-arrow"><i class="fa-solid fa-arrow-down"></i></div>' : ''}
      </div>
    `;

    container.insertAdjacentHTML("beforeend", stepHTML);
  });
}