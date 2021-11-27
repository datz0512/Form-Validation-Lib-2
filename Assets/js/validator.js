function Validator(formSelector) {
    var formRules = {};
    var validatorRules = {
        required: function(value) {
            return value.trim() ? undefined : 'Vui lòng nhập trường này';
        },
        email: function(value) {
            var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
            return regex.test(value) ? undefined : 'Trường này phải là email';
        },
        min: function(min) {
            return function(value) {
                return value.length >= min ? undefined : `Vui lòng nhập ít nhất ${min} ký tự`;
            }
        },
        max: function(max) {
            return function(value) {
                return value.length <= max ? undefined : `Vui lòng nhập tối đa ${min} ký tự`;
            }
        },
    };

    var formElement = document.querySelector(formSelector);

    if (formElement) {
        var inputs = formElement.querySelectorAll('[name][rules]');
        for (var input of inputs) {

            var rules = input.getAttribute('rules').split('|');
            for (var rule of rules) {
                if (rule.includes(':')) {
                    var ruleInfo = rule.split(':')
                    console.log(ruleInfo);
                }
                console.log(rule);
            }

            formRules[input.name] = input.getAttribute('rules');
        }

        // console.log(formRules);
    }
}

Validator('#form-1');