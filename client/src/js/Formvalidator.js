export class FormValidator {
    validators = [];
    errors = [];

    constructor(form) {
        this.form = form;

        this.form.addEventListener("submit", (event) => this.onSubmit(event));
    }

    addValidator(validator) {
        this.validators.push({
            ...validator,
            field: this.form.elements[validator.name],
        });
    }

    validate() {
        this.errors = [];
        this.validators.forEach((validator) => {
            if (this.errors.find((err) => err.name === validator.name)) return;

            if (!validator.method(validator.field)) {
                this.errors.push(validator);
            }
        });
        return this.errors.length === 0;
    }

    onSubmit(event) {
        // this.resetSummary()  -> ⚠️ uitbreiding voor thuis
        // this.removeInlineErrors()
        // indien this.validate() false returnt,
        // voorkom dan het default gedrag van het event
        // this.showSummary()   -> ⚠️ uitbreiding voor thuis
        // this.showInlineErrors()
        this.resetSummary();
        this.removeInlineErrors();
        if (!this.validate()) {
            event.preventDefault();
            event.stopImmediatePropagation();
        }
        this.showSummary();
        this.showInlineErrors();
    }

    createInlineError(error) {
        // maak een HTML element van type 'span'
        // const span = ???
        // geef de span een className 'field-error'
        // geef de span innerText: error.message
        // geef de span een id: `${error.name}-error` (ofwel error.name + "-error")
        // return de span

        const span = document.createElement("span");
        span.className = "field-error";
        span.innerText = error.message;
        span.id = `${error.name}-error`;

        return span;
    }

    showInlineErrors() {
        this.errors.forEach((err) => {
            const errElement = this.createInlineError(err);

            if (err.field instanceof Node) {
                err.field.classList.add("invalid");
                err.field.setAttribute("aria-invalid", true);
                err.field.labels[0].appendChild(errElement);
            } else if (err.field instanceof NodeList) {
                err.field.forEach((node) => {
                    node.classList.add("invalid");
                    node.setAttribute("aria-invalid", true);
                    node.setAttribute("aria-describedby", errElement.id);
                });

                const fieldSet = err.field[0].closest("fieldset");

                const legend = fieldSet?.querySelector("legend");
                if (legend) {
                    legend.appendChild(errElement);
                }
            }
        });
    }
    removeInlineErrors() {
        // zoek en verwijder alle elementen **in het formulier**
        // met de class `.field-error`

        this.form
            .querySelectorAll(".field-error")
            .forEach((element) => element.remove());

        this.form.querySelectorAll(".invalid").forEach((element) => {
            element.removeAttribute("aria-invalid");
            element.removeAttribute("aria-describedby");
            element.classList.remove("invalid");
        });

        // zoek alle elementen met class invalid
        //      verwijder het attribuut 'aria-invalid'
        //      verwijder het attribuut 'aria-describedby'
        //      verwijder de class 'invalid'
    }

    showSummary() {
        this.errors.forEach((err) => {
            const errorSummary = document.querySelector("div.errorSummary");
            errorSummary.style.display = "block";
            const errorList = document
                .querySelector("div.errorSummary ul")
                .appendChild(document.createElement("li"));

            const errElement = document.createElement("a");
            errElement.href = `#${err.name}-error`;
            errElement.innerText = err.message;

            errorList.appendChild(errElement);
        });
    }

    resetSummary() {
        const errorSummary = document.querySelector("div.errorSummary");
        errorSummary.style.display = "none";

        const errorList = document.querySelector("div.errorSummary ul");
        while (errorList.firstChild) {
            errorList.removeChild(errorList.firstChild);
        }
    }
}
