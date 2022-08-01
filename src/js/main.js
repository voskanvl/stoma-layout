import Splide from "@splidejs/splide";
import { startLicense } from "./modalLicense";
import { YM } from "./YM";
import { Validation } from "./validation";
import Inputmask from "inputmask";

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
    if (location.pathname === "/" || document.querySelector(".contacts #map"))
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
    const errorEl = document.querySelector(".modal__error");
    buttons.forEach(button =>
        button.addEventListener("click", () => modal.removeAttribute("hidden")),
    );
    if (close)
        close.addEventListener("click", () =>
            modal.setAttribute("hidden", "hidden"),
        );
    //--- redirect to services ---
    const details = document.querySelectorAll(".services__details");
    details.forEach(el => {
        el.addEventListener("click", () => {
            location.pathname = "/services.html";
        });
    });
    //--- Validation
    const modalForm = document.querySelector(".modal__form");
    if (modalForm) {
        const validate = Validation(modalForm);
        window.validate = validate;
        validate.addMask({
            phone: new Inputmask("+7(999) 999-99-99"),
            text: new Inputmask({ regex: "[a-zA-Zа-яёА-ЯЁ0-9]{1,}" }),
        });
        //--- handle inputs & check validity. remove disabled sign from submit if form valid
        validate.data.required.forEach(e =>
            e.addEventListener("change", function () {
                if (validate.valid) {
                    validate.data.submit.removeAttribute("disabled");
                } else {
                    validate.data.submit.setAttribute("disabled", "disabled");
                }
            }),
        );
        validate.data.submit.addEventListener("click", async function (ev) {
            ev.preventDefault();
            if (validate.valid) {
                this.removeAttribute("disabled");
                try {
                    let response = await fetch("/mail.php", {
                        method: "POST",
                        body: new FormData(modalForm),
                    });
                    if (response.ok) {
                        setTimeout(() => {
                            validate.data.phone.forEach(e => (e.value = ""));
                            validate.data.text.forEach(e => (e.value = ""));
                            validate.data.checkbox.forEach(e =>
                                e.removeAttribute("checkbox"),
                            );
                            errorEl.setAttribute("hidden", "hidden");
                            modal.setAttribute("hidden", "hidden");
                        }, 3000);
                    } else {
                        const { status, statusText } = response;
                        throw Error(status + " " + statusText);
                    }
                } catch (error) {
                    console.log("🚀 ~ error", error);

                    errorEl.textContent =
                        "Произошла ошибка при отправке данных на сервер";
                    errorEl.removeAttribute("hidden");
                }
            } else {
                [...modalForm.elements].forEach(e => e.reportValidity());
            }
        });
    }
}
