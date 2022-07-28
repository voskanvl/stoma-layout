import Splide from "@splidejs/splide";
import { startLicense } from "./modalLicense";
import { YM } from "./YM";

// if (document.readyState === "loading") {
//     start();
// } else {
//     document.addEventListener("DOMContentLoaded", start);
// }

//--- YM ---

window.onload = start;
// window.onresize = () => {
//     stomaYM.getGlobalPixelCenter([53.230595, 45.011605]);
// };

function start() {
    console.log("start");
    if (document.querySelector(".modalLicense__container")) startLicense();
    if (location.pathname === "/" || location.pathname === "/contacts.html")
        YM();

    if (document.querySelector("#splideReview"))
        new Splide("#splideReview", {
            type: "loop",
            gap: "3vw",
            fixedWidth: "clamp(370px,48vw, 603px)",
            arrowPath: " ",
        }).mount();
    if (document.querySelector("#splideTiser"))
        new Splide("#splideTiser", {
            perPage: 1,
            rewind: false,
            arrowPath: " ",
        }).mount();
    if (document.querySelector("#splideServicesSlider"))
        new Splide("#splideServicesSlider", {
            type: "loop",
            gap: "0px",
            fixedHeight: "100px",
            arrowPath: " ",
        }).mount();
    if (document.querySelector("#splideAboutSlider"))
        new Splide("#splideAboutSlider", {
            type: "loop",
            gap: "0px",
            arrowPath: " ",
        }).mount();

    //--- toggle menu ---
    const menuOn = document.querySelector(".header__openmenu");
    const menuOff = document.querySelector(".menu__close-svg");
    const menuContainer = document.querySelector(".menu__container");
    menuOn.onclick = () => (menuContainer.style = "display:block");
    menuOff.onclick = () => (menuContainer.style = "display:none");
    //--- toggle modal ---
    const buttons = document.querySelectorAll(".modalable");
    const modal = document.querySelector(".modal__container");
    const close = document.querySelector(".modal__close");
    buttons.forEach(button =>
        button.addEventListener("click", () => modal.removeAttribute("hidden")),
    );
    if (close)
        close.addEventListener("click", () =>
            modal.setAttribute("hidden", "hidden"),
        );
}
