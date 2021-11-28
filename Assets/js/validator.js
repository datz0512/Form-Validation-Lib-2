function Validator(formSelector) {
    function getParent(element, selector){
        while (element.parentElement) {
            if(element.parentElement.matches(selector)){
                return element.parentElement;
            }
            element = element.parentElement;
        }
    }

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
                var ruleInfo;
                var isRuleHasValue = rule.includes(':');

                if (isRuleHasValue) {
                    ruleInfo = rule.split(':');
                    rule = ruleInfo[0];
                }

                var ruleFunction = validatorRules[rule];

                if(isRuleHasValue){
                    ruleFunction = ruleFunction(ruleInfo[1]);
                }

                if(Array.isArray(formRules[input.name])) {
                    formRules[input.name].push(ruleFunction);
                }else{
                    formRules[input.name] = [ruleFunction];
                }
            }

            input.onblur = handleValidate;
            input.oninput = handleClearError;

        } 

        function handleValidate(event){
            var rules = formRules[event.target.name];
            var errorMessage ;

            rules.some((rule) => {
                errorMessage = rule(event.target.value);
                return errorMessage;
            })
            
            if(errorMessage){
                var formGroup = getParent(event.target, '.form-group');
                if(formGroup){
                    formGroup.classList.add('invalid');
                    var formMessage = formGroup.querySelector('.form-message');
                    if(formMessage){
                        formMessage.innerText = errorMessage;
                    }
                }
            }
        }

        function handleClearError(event){
            var formGroup = getParent(event.target, '.form-group');
            var formMessage = formGroup.querySelector('.form-message');
            if(formGroup.classList.contains('invalid')){
                formGroup.classList.remove('invalid');
                formMessage.innerText = '';
            }
        }
    }
}

Validator('#form-1');