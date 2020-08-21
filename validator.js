(function () {
    validate.extend(validate.validators.datetime, {
        // The value is guaranteed not to be null or undefined but otherwise it
        // could be anything.
        parse: function (value, options) {
            return +moment.utc(value);
        },
        // Input is a unix timestamp
        format: function (value, options) {
            var format = options.dateOnly ? "YYYY-MM-DD" : "YYYY-MM-DD hh:mm:ss";
            return moment.utc(value).format(format);
        }
    });

    // These are the constraints used to validate the form
    var constraints = {
        "marketChoice": {
            // Selecting a market is required
            presence: true
        },
        "geography": {
            // Selecting a geography is required
            presence: true
        },
        "undergraduateDegree": {
            // Selecting an Undergraduate degree is required
            presence: true
        },
        "graduateDegree": {
            // Selecting a Master's degree is required
            presence: true
        },
        "militarySpecialty": {
            // Selecting a Military Specialty is required
            presence: true
        },
        "militaryEvaluation": {
            // Selecting a Military Evaluation is required
            presence: true
        },
        "baseSalary": {
            // Selecting a Base salary is required
            presence: true
        }
    };

    // Hook up the form so we can prevent it from being posted
    var form = document.querySelector("form#successOddsCalculator");
    form.addEventListener("submit", function (ev) {
        ev.preventDefault();
        handleFormSubmit(form);
    });

    // Hook up the inputs to validate on the fly
    var inputs = document.querySelectorAll("select")
    for (var i = 0; i < inputs.length; ++i) {
        inputs.item(i).addEventListener("change", function (ev) {
            var errors = validate(form, constraints) || {};
            showErrorsForInput(this, errors[this.name])
        });
    }

    function handleFormSubmit(form, input) {
        // validate the form against the constraints
        var errors = validate(form, constraints);
        // then we update the form to reflect the results
        showErrors(form, errors || {});
        if (!errors) {
            showSuccess();
        }
    }

    // Updates the inputs with the validation errors
    function showErrors(form, errors) {
        // We loop through all the inputs and show the errors for that input
        _.each(form.querySelectorAll("select[name]"), function (input) {
            // Since the errors can be null if no errors were found we need to handle
            // that
            showErrorsForInput(input, errors && errors[input.name]);
        });
    }

    // Shows the errors for a specific input
    function showErrorsForInput(input, errors) {
        // This is the root of the input
        var formGroup = closestParent(input.parentNode, "form-group")
            // Find where the error messages will be insert into
            , messages = formGroup.querySelector(".messages");
        // First we remove any old messages and resets the classes
        resetFormGroup(formGroup);
        // If we have errors
        if (errors) {
            // we first mark the group has having errors
            formGroup.classList.add("has-error");
            // then we append all the errors
            _.each(errors, function (error) {
                addError(messages, error);
            });
        } else {
            // otherwise we simply mark it as success
            formGroup.classList.add("has-success");
        }
    }

    // Recusively finds the closest parent that has the specified class
    function closestParent(child, className) {
        if (!child || child == document) {
            return null;
        }
        if (child.classList.contains(className)) {
            return child;
        } else {
            return closestParent(child.parentNode, className);
        }
    }

    function resetFormGroup(formGroup) {
        // Remove the success and error classes
        formGroup.classList.remove("has-error");
        formGroup.classList.remove("has-success");
        // and remove any old messages
        _.each(formGroup.querySelectorAll(".help-block.error"), function (el) {
            el.parentNode.removeChild(el);
        });
    }

    // Adds the specified error with the following markup
    // <p class="help-block error">[message]</p>
    function addError(messages, error) {
        var block = document.createElement("span");
        block.classList.add("help-block");
        block.classList.add("error");
        block.innerText = error;
        messages.appendChild(block);

    }

    // Calculate the chance of landing a career based on the selections
    function showSuccess() {
        var marketChoice = $("#marketChoice :selected").val();
        var geography = $("#geography :selected").val();
        var undergraduateDegree = $("#undergraduateDegree :selected").val();
        var graduateDegree = $("#graduateDegree :selected").val();
        var militarySpecialty = $("#militarySpecialty :selected").val();
        var militaryEvaluation = $("#militaryEvaluation :selected").val();
        var baseSalary = $("#baseSalary :selected").val();

        // Multiple chances together and by 100 to get percentage
        var careerChance = (marketChoice * geography * undergraduateDegree * graduateDegree
            * militarySpecialty * militaryEvaluation * baseSalary) * 100;
        
        var result = document.getElementById("careerChances");
        result.innerText = Math.round(careerChance) + "%";
    }
})();
