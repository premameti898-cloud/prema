document.addEventListener("DOMContentLoaded", () => {

    loadPortfolio();

});


/* ==================================================
   MAIN FUNCTION
================================================== */

async function loadPortfolio() {

    try {

        const response = await fetch("database.json");

        if (!response.ok) {
            throw new Error("Could not load database.json");
        }

        const data = await response.json();

        renderPersonal(data.personal);
        renderAbout(data.about);
        renderEducation(data.education);
        renderSkills(data.skills);
        renderProjects(data.projects);
        renderCertifications(data.certifications);
        renderAchievements(data.achievements);
        renderInterests(data.interests);
        renderContact(data.personal);

        initializeNavigation();

    } catch (error) {

        console.error(error);

        document.querySelector("main").innerHTML = `
            <div class="container">
                <div class="error-message">
                    <h2>Unable to load portfolio</h2>
                    <p>
                        Please make sure database.json exists
                        and run the website using a local server.
                    </p>
                </div>
            </div>
        `;

    }

}


/* ==================================================
   PERSONAL INFORMATION
================================================== */

function renderPersonal(personal) {

    document.title =
        `${personal.name} | Portfolio`;

    document.getElementById("nav-name").textContent =
        personal.name;

    document.getElementById("hero-name").textContent =
        personal.name;

    document.getElementById("hero-title").textContent =
        personal.title;

    document.getElementById("hero-tagline").textContent =
        personal.tagline;

    document.getElementById("footer-name").textContent =
        personal.name;

    document.getElementById("location-text").textContent =
        personal.location;


    /* ================= PROFILE IMAGE ================= */

    const profileImage =
        document.getElementById("profile-image");

    const profilePlaceholder =
        document.getElementById("profile-placeholder");


    if (personal.profileImage &&
        personal.profileImage.trim() !== "") {

        profileImage.src =
            personal.profileImage;

        profileImage.style.display =
            "block";

        profilePlaceholder.style.display =
            "none";

    } else {

        const initials =
            getInitials(personal.name);

        profilePlaceholder.textContent =
            initials;

    }


    /* ================= RESUME ================= */

    const resumeButton =
        document.querySelector(
            'a[href="#projects"]'
        );

}


/* ==================================================
   ABOUT
================================================== */

function renderAbout(about) {

    document.getElementById("about-heading").textContent =
        about.heading;

    document.getElementById("about-description").textContent =
        about.description;

}


/* ==================================================
   EDUCATION
================================================== */

function renderEducation(education) {

    const container =
        document.getElementById(
            "education-container"
        );

    container.innerHTML = "";


    education.forEach((item) => {

        const element =
            document.createElement("div");

        element.className =
            "timeline-item";


        element.innerHTML = `

            <div class="timeline-dot"></div>

            <div class="timeline-content">

                <span class="timeline-duration">
                    ${escapeHTML(item.duration)}
                </span>

                <h3>
                    ${escapeHTML(item.degree)}
                </h3>

                <h4>
                    ${escapeHTML(item.institution)}
                </h4>

                <div class="timeline-location">
                    ${escapeHTML(item.location)}
                </div>

                <p>
                    ${escapeHTML(item.description)}
                </p>

                ${
                    item.grade
                    ? `
                        <span class="grade">
                            ${escapeHTML(item.grade)}
                        </span>
                    `
                    : ""
                }

            </div>
        `;


        container.appendChild(element);

    });

}


/* ==================================================
   SKILLS
================================================== */

function renderSkills(skills) {

    const container =
        document.getElementById(
            "skills-container"
        );

    container.innerHTML = "";


    skills.forEach((skill) => {

        const percentage =
            getSkillPercentage(skill.level);


        const element =
            document.createElement("div");

        element.className =
            "skill-card";


        element.innerHTML = `

            <div class="skill-header">

                <span class="skill-name">
                    ${escapeHTML(skill.name)}
                </span>

                <span class="skill-level">
                    ${escapeHTML(skill.level)}
                </span>

            </div>

            <div class="skill-bar">

                <div
                    class="skill-progress"
                    style="width: ${percentage}%"
                ></div>

            </div>

        `;


        container.appendChild(element);

    });

}


/* ==================================================
   SKILL LEVEL
================================================== */

function getSkillPercentage(level) {

    const levels = {

        "Beginner": 45,
        "Intermediate": 70,
        "Advanced": 90,
        "Expert": 100

    };


    return levels[level] || 50;

}


/* ==================================================
   PROJECTS
================================================== */

function renderProjects(projects) {

    const container =
        document.getElementById(
            "projects-container"
        );

    container.innerHTML = "";


    projects.forEach((project, index) => {

        const element =
            document.createElement("article");

        element.className =
            "project-card";


        const tags =
            project.technologies
                .map(
                    technology => `
                        <span class="project-tag">
                            ${escapeHTML(technology)}
                        </span>
                    `
                )
                .join("");


        element.innerHTML = `

            <span class="project-number">
                PROJECT ${String(index + 1).padStart(2, "0")}
            </span>

            <h3>
                ${escapeHTML(project.title)}
            </h3>

            <p>
                ${escapeHTML(project.description)}
            </p>

            <div class="project-tags">
                ${tags}
            </div>

            ${
                project.link &&
                project.link !== "#"
                ? `
                    <a
                        href="${escapeAttribute(project.link)}"
                        target="_blank"
                        rel="noopener noreferrer"
                        class="project-link"
                    >
                        View Project →
                    </a>
                `
                : `
                    <span class="project-link">
                        Project Details →
                    </span>
                `
            }

        `;


        container.appendChild(element);

    });

}


/* ==================================================
   CERTIFICATIONS
================================================== */

function renderCertifications(certifications) {

    const container =
        document.getElementById(
            "certifications-container"
        );

    container.innerHTML = "";


    certifications.forEach((certification) => {

        const element =
            document.createElement("div");

        element.className =
            "certification-card";


        element.innerHTML = `

            <div class="cert-icon">
                ✓
            </div>

            <div>

                <h3>
                    ${escapeHTML(certification.name)}
                </h3>

                <p>
                    ${escapeHTML(certification.issuer)}
                    •
                    ${escapeHTML(certification.year)}
                </p>

                ${
                    certification.link &&
                    certification.link !== "#"
                    ? `
                        <a
                            href="${escapeAttribute(certification.link)}"
                            target="_blank"
                            rel="noopener noreferrer"
                        >
                            View Certificate →
                        </a>
                    `
                    : ""
                }

            </div>

        `;


        container.appendChild(element);

    });

}


/* ==================================================
   ACHIEVEMENTS
================================================== */

function renderAchievements(achievements) {

    const container =
        document.getElementById(
            "achievements-container"
        );

    container.innerHTML = "";


    achievements.forEach((achievement) => {

        const element =
            document.createElement("div");
