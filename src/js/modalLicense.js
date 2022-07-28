export function startLicense() {
    console.log("startLicense");
    const imgs = document.querySelectorAll(".licenses__img");
    const targetImg = document.querySelector(".modalLicense__img");
    imgs.forEach(img =>
        img.addEventListener("click", ({ currentTarget }) => {
            if ("dataset" in currentTarget && "id" in currentTarget.dataset) {
                const { id } = currentTarget.dataset;
                targetImg.src = `../../assets/images/licenses/800/00${
                    +id + 1
                }.jpg`;
            }
        }),
    );
}
