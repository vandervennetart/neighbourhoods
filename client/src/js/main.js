const menuBtn = document.querySelector("#menu");

menuBtn.addEventListener("click", function () {
    menuBtn.ariaExpanded = !(menuBtn.ariaExpanded === "true");
});
