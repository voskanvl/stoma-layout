import Inputmask from "inputmask"
function add(type, validator) {}
export function Validation(form) {
    const formElement =
        typeof form === "object" && form.constructor.name === "HTMLFormElement"
            ? form
            : document.querySelector(form)
    if (!formElement)
        throw Error("argument type have to be string or HTMLFormElement")

    const required = [...formElement.elements].filter(el =>
        el.getAttribute("required"),
    )

    const group = {}
    group.phone = required.filter(el => el.getAttribute("type") === "tel")
    group.text = required.filter(el => el.getAttribute("type") === "text")
    group.email = required.filter(el => el.getAttribute("type") === "email")
    group.checkbox = required.filter(
        el => el.getAttribute("type") === "checkbox",
    )
    group.submit = [...formElement.elements].filter(
        el => el.getAttribute("type") === "submit",
    )

    const isValid = () => formElement.checkValidity()

    function add(type, validator) {
        if (group[type]) group[type].forEach(e => validator.mask(e))
    }

    return {
        get valid() {
            return formElement.checkValidity()
        },
        data: {
            phone: group.phone,
            text: group.text,
            email: group.email,
            checkbox: group.checkbox,
            submit: group.submit,
        },
        addMask(props) {
            const avaibleFields = ["phone", "text", "email", "checkbox"]
            if (typeof props === "object")
                Object.keys(props).forEach(e => {
                    if (e in avaibleFields) add(e, props[e])
                })
        },
    }
}
