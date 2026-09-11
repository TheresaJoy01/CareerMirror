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

        modalInput.placeholder = "e.g. Python";
    }

    else if (type === "project") {

        modalTitle.textContent = "Add Project";

        modalDescription.textContent =
            "Enter the project you want to add.";

        modalInput.placeholder = "e.g. Java Calculator";
    }

    else if (type === "certification") {

        modalTitle.textContent = "Add Certification";

        modalDescription.textContent =
            "Enter the certification you want to add.";

        modalInput.placeholder = "e.g. Python Certification";
    }

    // Clear previous input
    modalInput.value = "";

    // Show modal
    modal.classList.add("active");

    // Automatically focus input
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

    // Don't add empty values
    if (value === "") {

        modalInput.focus();

        return;
    }


    /* Add Skill */

    if (currentType === "skill") {

        addSkillToPage(value);
    }


    /* Add Project */

    else if (currentType === "project") {

        addProjectToPage(value);
    }


    /* Add Certification */

    else if (currentType === "certification") {

        addCertificationToPage(value);
    }


    // Close modal after adding
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


    // Create skill chip
    const chip =
        document.createElement("div");

    chip.className = "skill-chip";


    // Add skill name and remove button
    chip.innerHTML = `
        ${skill}
        <button onclick="removeSkill(this)">×</button>
    `;


    // Put skill before Add Skill button
    skillsBox.insertBefore(
        chip,
        addButton
    );
}


/* Remove Skill */

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


    // Create project item
    const item =
        document.createElement("div");

    item.className = "project-item";


    // Add project name and remove button
    item.innerHTML = `
        <span>${project}</span>
        <button onclick="removeProject(this)">×</button>
    `;


    // Put project before Add Project button
    projectsBox.insertBefore(
        item,
        addButton
    );
}


/* Remove Project */

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


    // Create certification item
    const item =
        document.createElement("div");

    item.className = "project-item";


    // Add certification name and remove button
    item.innerHTML = `
        <span>${certification}</span>
        <button onclick="this.parentElement.remove()">×</button>
    `;


    // Add certification before Add Certification button
    certificationBox.insertBefore(
        item,
        addButton
    );
}


/* =========================
   KEYBOARD CONTROLS
========================= */

modalInput.addEventListener(
    "keydown",
    function(event) {

        // Press Enter → Add
        if (event.key === "Enter") {

            event.preventDefault();

            saveModalInput();
        }


        // Press Escape → Close
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

        // If user clicks the dark area
        // outside the modal
        if (event.target === modal) {

            closeModal();
        }
    }
);


/* =========================
   CONTINUE BUTTON
========================= */

function continueProfile() {

    const name =
        document.getElementById("name").value.trim();


    // Don't continue without a name
    if (name === "") {

        document.getElementById("name").focus();

        return;
    }


    // Collect skills
    const skillElements =
        document.querySelectorAll(".skill-chip");

    const skills = [];

    skillElements.forEach(function(skill) {

        const skillName =
            skill.childNodes[0].textContent.trim();

        if (skillName !== "") {

            skills.push(skillName);
        }
    });


    // Collect projects
    const projectElements =
        document.querySelectorAll(
            "#projectsBox .project-item"
        );

    const projects = [];

    projectElements.forEach(function(project) {

        const projectName =
            project.querySelector("span");

        if (projectName) {

            projects.push(
                projectName.textContent.trim()
            );
        }
    });


    // Collect certifications
    const certificationElements =
        document.querySelectorAll(
            "#certificationBox .project-item"
        );

    const certifications = [];

    certificationElements.forEach(function(certification) {

        const certificationName =
            certification.querySelector("span");

        if (certificationName) {

            certifications.push(
                certificationName.textContent.trim()
            );
        }
    });


    // Profile data
    const profileData = {

        name: name,

        skills: skills,

        projects: projects,

        certifications: certifications
    };


    // For now, display the data in console.
    // Later this will be sent to the Flask backend.
    console.log("Profile Data:", profileData);
}