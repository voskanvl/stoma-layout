import Splide from "@splidejs/splide";

// if (document.readyState === "loading") {
//     start();
// } else {
//     document.addEventListener("DOMContentLoaded", start);
// }

window.onload = start;

function start() {
    console.log("start");

    let splideReview = new Splide("#splideReview", {
        type: "loop",
        gap: "3vw",
        fixedWidth: "clamp(370px,48vw, 603px",
        arrowPath: " ",
    }).mount();
    new Splide("#splideTiser", {
        perPage: 1,
        rewind: false,
    }).mount();

    // window.onresize = () => {
    //     const match = matchMedia("max-width: 770px");
    //     document.querySelector("#splideReview").inn
    //     splideReview = new Splide("#splideReview", {
    //         type: "loop",
    //         perPage: 1,
    //         arrowPath: " ",
    //     }).mount();
    // };
}
