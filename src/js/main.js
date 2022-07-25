import Splide from "@splidejs/splide";

// if (document.readyState === "loading") {
//     start();
// } else {
//     document.addEventListener("DOMContentLoaded", start);
// }

window.onload = start;

function start() {
    console.log("start");
    new Splide("#splideReview", {
        type: "loop",
        perPage: 2,
        gap: "6.197917vw",
        arrowPath: " ",
    }).mount();
    new Splide("#splideTiser", {
        perPage: 1,
    }).mount();
}
