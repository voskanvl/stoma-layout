export function startLicense() {
    console.log("startLicense");
    const imgs = document.querySelectorAll(".licenses__img");
    const containerModalLicense = document.querySelector(
        ".modalLicense__container",
    );
    const targetImg = document.querySelector(".modalLicense__img");
    const modalLicenseClose = document.querySelector(".modalLicense__close");
    const modalLicenseDownload = document.querySelector(
        ".modalLicense__download",
    );
    imgs.forEach(img =>
        img.addEventListener("click", ({ currentTarget }) => {
            if ("dataset" in currentTarget && "id" in currentTarget.dataset) {
                const { id } = currentTarget.dataset;
                containerModalLicense.removeAttribute("hidden");
                targetImg.src = `../../assets/images/licenses/800/00${
                    +id + 1
                }.jpg`;
                modalLicenseDownload.href = `../../assets/images/licenses/800/00${
                    +id + 1
                }.jpg`;
            }
        }),
    );
    modalLicenseClose.addEventListener("click", () => {
        containerModalLicense.setAttribute("hidden", "hidden");
    });
}
