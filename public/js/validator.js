function Validator(formSelector) {
    let formRules = {};
    let formElement = document.querySelector(formSelector);

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    const getPassword = (selector) => {
        let pass = formElement.querySelector(selector).value;
        return pass;
    };

    let validatorRules = {
        required(value, message = 'Vui lòng nhập trường này') {
            return value ? undefined : message;
        },
        min(min) {
            return (value, message = `Vui lòng nhập ít nhất ${min} ký tự`) =>
                value.length >= min ? undefined : message;
        },
        confirmed() {
            return (value, message = 'Mật khẩu không đúng') =>
                value === getPassword('#password') ? undefined : message;
        },
    };

    if (formElement) {
        let inputs = Array.from(formElement.querySelectorAll('[name][rules]'));

        inputs.forEach((input) => {
            let rules = input.getAttribute('rules').split('|');
            for (let rule of rules) {
                let ruleFunct = validatorRules[rule];

                if (rule.includes(':')) {
                    let ruleMin = rule.split(':');
                    rule = ruleMin[0];
                    ruleFunct = validatorRules[rule](ruleMin[1]);
                }

                if (rule === 'confirmed') {
                    ruleFunct = validatorRules[rule]();
                }

                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunct);
                } else {
                    formRules[input.name] = [ruleFunct];
                }
            }

            input.onblur = handleValidte;
            input.oninput = handleClear;
        });

        function handleValidte(e) {
            let inputElement = e.target;
            let rulesFunct = formRules[inputElement.name];
            let errorMessage;

            for (let rule of rulesFunct) {
                if (rule(inputElement.value)) {
                    errorMessage = rule(inputElement.value);
                    break;
                }
            }
            if (errorMessage) {
                let formGroup = getParent(inputElement, '.form-group');
                if (formGroup) {
                    let formMessage = formGroup.querySelector('.form-message');
                    if (formMessage) {
                        formMessage.innerHTML = errorMessage;
                        formGroup.classList.add('invalid');
                    }
                }
            }
            return !errorMessage;
        }
        function handleClear(e) {
            let inputElement = e.target;
            let formGroup = getParent(inputElement, '.form-group');
            if (formGroup.classList.contains('invalid')) {
                let formMessage = formGroup.querySelector('.form-message');
                formGroup.classList.remove('invalid');

                if (formMessage) {
                    formMessage.innerHTML = '';
                }
            }
        }
    }
}
