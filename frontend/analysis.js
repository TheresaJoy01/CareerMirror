/* =========================
   CAREERMIRROR
   CAREER ANALYSIS PAGE
========================= */


/* =========================
   VIEW ROADMAP
========================= */

function viewRoadmap() {

    console.log("View My Roadmap clicked");

    /*
        Later, connect this button
        to roadmap.html.

        Example:

        window.location.href = "roadmap.html";
    */
}


/* =========================
   CAREER READINESS RING
========================= */

document.addEventListener("DOMContentLoaded", function () {

    const progressRing =
        document.querySelector(".ring-progress");


    if (progressRing) {

        const radius = 72;

        const circumference =
            2 * Math.PI * radius;

        const readiness = 64;

        const offset =
            circumference -
            (readiness / 100) * circumference;


        progressRing.style.strokeDasharray =
            circumference;

        progressRing.style.strokeDashoffset =
            offset;
    }

});