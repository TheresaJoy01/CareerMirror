const journeyButton = document.getElementById("journeyButton");

journeyButton.addEventListener("click", function () {

    const howItWorks = document.querySelector(".how-it-works");

    howItWorks.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});