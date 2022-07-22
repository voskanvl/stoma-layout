import Splide from "@splidejs/splide";

if (document.readyState === "loading") {
    start();
} else {
    document.addEventListener("DOMContentLoaded", start);
}

function start() {
    console.log("start");
    new Splide(".splide", {
        type: "loop",
        perPage: 2,
        gap: "114px",
        arrowPath: " ",
    }).mount();
}
