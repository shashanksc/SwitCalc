document.addEventListener("DOMContentLoaded", function() {
    const display = document.getElementById("display");
    const display2 = document.getElementById("display2");
    const buttons = document.querySelectorAll(".button");
    const addDummyButton = document.getElementById("addDummy");

    let initialButtonSize = { height: "60px", fontSize: "18px" };
    let modifiedButtonSize = {height: "48px", fontSize: "14px" };

    let isButtonSizeModified = false;

    addDummyButton.addEventListener("click", function() {
        addDummyButtons();

        // Toggle between initial and modified button sizes
        if (isButtonSizeModified) {
            resetButtonSize();
        } else {
            modifyButtonSize();
        }
        // Toggle the flag
        isButtonSizeModified = !isButtonSizeModified;
    });

   

    function addDummyButtons() {
        const dummyButtons = [
            { id: "buttonLeftParen", text: "(", class: "button added" },
            { id: "buttonRightParen", text: ")", class: "button added" },
            { id: "buttonFactorial", text: "!", class: "button added" },
            { id: "buttonSquareRoot", text: "√", class: "button added" }
        ];
        const existingDummyButtons = document.querySelectorAll(".dummy-button");
        if (existingDummyButtons.length > 0) {
            // Remove existing dummy buttons
            existingDummyButtons.forEach(button => button.remove());
            return;
        }
        // Append dummy buttons to the calculator
        const buttonsContainer = document.querySelector(".buttons");
        const firstButton = buttonsContainer.querySelector("button");
        dummyButtons.forEach(dummyButton => {
            const button = document.createElement("button");
            button.id = dummyButton.id;
            button.textContent = dummyButton.text;
            button.className = dummyButton.class + " dummy-button";
            button.addEventListener("click", function() {
                // Handle click event for dummy buttons if needed
            });
            buttonsContainer.insertBefore(button, firstButton);
        });
    }
    function modifyButtonSize() {
        // Apply modified button size to all buttons
        buttons.forEach(button => {
            
            button.style.height = modifiedButtonSize.height;
            button.style.fontSize = modifiedButtonSize.fontSize;
        });
    }

    function resetButtonSize() {
        // Apply initial button size to all buttons
        buttons.forEach(button => {
            
            button.style.height = initialButtonSize.height;
            button.style.fontSize = initialButtonSize.fontSize;
        });
    }

    // Attach click event listener to each button
    buttons.forEach(button => {
        button.addEventListener("click", function() {
            const buttonText = this.textContent;
            // Handle different button actions
            switch(buttonText) {
                case "C":
                    clearDisplay();
                    break;
                case "DEL":
                    deleteLast();
                    break;
                case "%":
                    per();
                    break;
                case "=":
                    calculate();
                    break;
                default:
                    addToDisplay(buttonText);
                    break;
            }
        });
    });

    // Function to add text to display
    function addToDisplay(text) {
        display.value += text;
        updateDisplay2();
    }

    // Function to update display2 with evaluated expression
    function updateDisplay2() {
        let newVal = display.value.replace('x', '*');
        try {
            display2.value = eval(newVal);
        } catch(error) {
            // Handle error if needed
        }
    }

    // Function to calculate percentage
    function per() {
        display.value = display.value / 100;
        updateDisplay2();
    }

    // Function to clear display
    function clearDisplay() {
        display.value = "";
        display2.value = "";
    }

    // Function to delete last character from display
    function deleteLast() {
        display.value = display.value.slice(0, -1);
        updateDisplay2();
    }

    // Function to evaluate expression in display
    function calculate() {
        updateDisplay2();
    }
});
