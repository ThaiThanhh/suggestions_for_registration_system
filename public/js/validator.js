function Validator(formSelector) {
    let formRules = {};
    let _this = this;
    let formElement = document.querySelector(formSelector);

    function getParent(element, selector) {
        while (element.parentElement) {
            if (element.parentElement.matches(selector)) {
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

    function getPassword(selector) {
        let pass = formElement.querySelector(selector).value;
        return pass;
    }

    let validatorRules = {
        required(value, message = 'Vui lòng nhập trường này') {
            return value ? undefined : message;
        },
        min(min) {
            return function (
                value,
                message = `Vui lòng nhập ít nhất ${min} ký tự`
            ) {
                return value.length >= min ? undefined : message;
            };
        },
        confirmed() {
            return function (value, message = 'Mật khẩu không đúng') {
                return value === getPassword('#password') ? undefined : message;
            };
        },
    };

    // Chỉ xử lý khi tìm thấy form element trong DOM
    if (formElement) {
        let inputs = formElement.querySelectorAll('[name][rules]');

        // Lập qua và gán các validate function cho đối tượng formRules
        for (let input of inputs) {
            let rules = input.getAttribute('rules').split('|');
            for (let rule of rules) {
                let ruleFunct = validatorRules[rule];

                // Nếu rule là min (có dạng min:4)
                if (rule.includes(':')) {
                    let ruleMin = rule.split(':');
                    rule = ruleMin[0];
                    ruleFunct = validatorRules[rule](ruleMin[1]);
                }

                if (rule === 'confirmed') {
                    ruleFunct = validatorRules[rule]();
                }

                // Nếu formRules[input.name] là mảng thì push rule function mới vào
                // Nếu không thì gán formRules[input.name] bằng một mảng mới có 1 phần tử là ruleFunct
                // Với formRules là đối tượng chưa các rule function
                // [input.name] là key
                // ruleFunct là value tương ứng với key
                if (Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunct);
                } else {
                    formRules[input.name] = [ruleFunct];
                }
            }

            // Lắng nghe các sự kiện để validate
            input.onblur = handleValidte;
            input.oninput = handleClear;
        }

        // Xử ký validation form
        function handleValidte(e) {
            // e.target.name là name của input tag và cũng là key của đối tượng formRules
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
            //  Trả về true nếu không có lỗi
            return !errorMessage;
        }
        // Xử lý khi nhập input
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
