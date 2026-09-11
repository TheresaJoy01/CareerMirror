/* =========================
   CAREERMIRROR PROFILE PAGE
========================= */


/* =========================
   MODAL ELEMENTS
========================= */

const modal = document.getElementById("inputModal");
const modalTitle = document.getElementById("modalTitle");
const modalDescription = document.getElementById("modalDescription");
const modalInput = document.getElementById("modalInput");

let currentType = "";


/* =========================
   OPEN MODAL
========================= */

function openModal(type) {

    currentType = type;

    if (type === "skill") {

        modalTitle.textContent = "Add Skill";

        modalDescription.textContent =
            "Enter the skill you want to add.";

        modalInput.placeholder =
            "e.g. Python";
    }

    else if (type === "project") {

        modalTitle.textContent = "Add Project";

        modalDescription.textContent =
            "Enter the project you want to add.";

        modalInput.placeholder =
            "e.g. Java Calculator";
    }

    else if (type === "certification") {

        modalTitle.textContent = "Add Certification";

        modalDescription.textContent =
            "Enter the certification you want to add.";

        modalInput.placeholder =
            "e.g. Python Certification";
    }


    modalInput.value = "";

    modal.classList.add("active");


    setTimeout(() => {

        modalInput.focus();

    }, 150);
}


/* =========================
   CLOSE MODAL
========================= */

function closeModal() {

    modal.classList.remove("active");

    modalInput.value = "";

    currentType = "";
}


/* =========================
   SAVE MODAL INPUT
========================= */

function saveModalInput() {

    const value = modalInput.value.trim();


    if (value === "") {

        modalInput.focus();

        return;
    }


    if (currentType === "skill") {

        addSkillToPage(value);

    }

    else if (currentType === "project") {

        addProjectToPage(value);

    }

    else if (currentType === "certification") {

        addCertificationToPage(value);

    }


    closeModal();
}


/* =========================
   SKILLS
========================= */

function addSkill() {

    openModal("skill");
}


function addSkillToPage(skill) {

    const skillsBox =
        document.getElementById("skillsBox");

    const addButton =
        skillsBox.querySelector(".add-btn");


    const chip =
        document.createElement("div");

    chip.className = "skill-chip";


    chip.innerHTML = `
        ${skill}
        <button
            type="button"
            onclick="removeSkill(this)"
        >
            ×
        </button>
    `;


    skillsBox.insertBefore(
        chip,
        addButton
    );
}


function removeSkill(button) {

    button.parentElement.remove();
}


/* =========================
   PROJECTS
========================= */

function addProject() {

    openModal("project");
}


function addProjectToPage(project) {

    const projectsBox =
        document.getElementById("projectsBox");

    const addButton =
        projectsBox.querySelector(".project-add");


    const item =
        document.createElement("div");

    item.className = "project-item";


    item.innerHTML = `
        <span>${project}</span>

        <button
            type="button"
            onclick="removeProject(this)"
        >
            ×
        </button>
    `;


    projectsBox.insertBefore(
        item,
        addButton
    );
}


function removeProject(button) {

    button.parentElement.remove();
}


/* =========================
   CERTIFICATIONS
========================= */

function addCertification() {

    openModal("certification");
}


function addCertificationToPage(certification) {

    const certificationBox =
        document.getElementById("certificationBox");

    const addButton =
        certificationBox.querySelector(".add-btn");


    const item =
        document.createElement("div");

    item.className = "project-item";


    item.innerHTML = `
        <span>${certification}</span>

        <button
            type="button"
            onclick="removeCertification(this)"
        >
            ×
        </button>
    `;


    certificationBox.insertBefore(
        item,
        addButton
    );
}


function removeCertification(button) {

    button.parentElement.remove();
}


/* =========================
   KEYBOARD CONTROLS
========================= */

modalInput.addEventListener(
    "keydown",
    function(event) {

        if (event.key === "Enter") {

            event.preventDefault();

            saveModalInput();
        }


        if (event.key === "Escape") {

            closeModal();
        }

    }
);


/* =========================
   CLICK OUTSIDE MODAL
========================= */

modal.addEventListener(
    "click",
    function(event) {

        if (event.target === modal) {

            closeModal();
        }

    }
);


/* =========================
   CONTINUE BUTTON
========================= */

async function continueProfile() {

    // Get name
    const name = document.getElementById("name").value.trim();

    // Get skills
    const skillElements = document.querySelectorAll("#skillsBox .skill-chip");

    const skills = [];

    skillElements.forEach(chip => {
        const button = chip.querySelector("button");

        // Get only the skill text, not the × button
        const skill = chip.textContent.replace("×", "").trim();

        if (skill !== "") {
            skills.push(skill);
        }
    });

    // Get projects
    const projectElements = document.querySelectorAll(
        "#projectsBox .project-item"
    );

    const projects = [];

    projectElements.forEach(item => {
        const project = item.querySelector("span");

        if (project) {
            projects.push(project.textContent.trim());
        }
    });

    // Get certifications
    const certificationElements = document.querySelectorAll(
        "#certificationBox .project-item"
    );

    const certifications = [];

    certificationElements.forEach(item => {
        const certification = item.querySelector("span");

        if (certification) {
            certifications.push(certification.textContent.trim());
        }
    });

    // Create profile data
    const profileData = {
        user_id: "user_001",
        name: name,
        skills: skills,
        projects: projects,
        certifications: certifications
    };

    console.log("Sending profile:", profileData);

    // Send data to Flask backend
    try {

        const response = await fetch(
            "http://127.0.0.1:5000/api/profile",
            {
                method: "POST",

                headers: {
                    "Content-Type": "application/json"
                },

                body: JSON.stringify(profileData)
            }
        );

        const result = await response.json();

        console.log("Backend response:", result);

        if (response.ok) {

            window.location.href = "career.html";

        } else {

            alert("Failed to save profile.");

        }

    } catch (error) {

        console.error("Error:", error);

        alert(
            "Could not connect to the backend. Make sure Flask is running."
        );
    }
}