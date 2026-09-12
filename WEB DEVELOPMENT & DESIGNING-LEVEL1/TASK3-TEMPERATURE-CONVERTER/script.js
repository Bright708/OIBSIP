const input = document.getElementById("temperatureInput");
const unitSelect = document.getElementById("unitSelect");
const convertButton = document.getElementById("convertBtn");
const validationMessage = document.getElementById("validationMessage");

const celsiusResult = document.getElementById("celsiusResult");
const fahrenheitResult = document.getElementById("fahrenheitResult");
const kelvinResult = document.getElementById("kelvinResult");

const ABSOLUTE_ZERO_CELSIUS = -273.15;

const toCelsius = (value, unit) => {
    switch (unit) {
        case "C":
            return value;
        case "F":
            return (value - 32) * (5 / 9);
        case "K":
            return value - 273.15;
        default:
            return value;
    }
};

const formatValue = (value, maxDecimals = 2) => {
    if (!Number.isFinite(value)) {
        return "0.00";
    }

    const rounded = Number(value.toFixed(maxDecimals));
    return rounded.toLocaleString(undefined, {
        minimumFractionDigits: 2,
        maximumFractionDigits: maxDecimals,
    });
};

const setValidation = (message = "", isSuccess = false) => {
    validationMessage.textContent = message;
    validationMessage.classList.toggle("success", isSuccess);
};

const convertTemperature = () => {
    const rawValue = input.value.trim();

    if (rawValue === "") {
        setValidation("Please enter a temperature value.");
        return;
    }

    const numericValue = Number(rawValue);

    if (!Number.isFinite(numericValue)) {
        setValidation("Invalid input: please enter a numeric temperature value.");
        return;
    }

    const celsiusValue = toCelsius(numericValue, unitSelect.value);

    if (celsiusValue < ABSOLUTE_ZERO_CELSIUS) {
        setValidation(
            "Absolute zero violation: values below -273.15°C are not physically possible.",
        );
        celsiusResult.textContent = "-273.15";
        fahrenheitResult.textContent = "-459.67";
        kelvinResult.textContent = "0.00";
        return;
    }

    const fahrenheitValue = (celsiusValue * 9) / 5 + 32;
    const kelvinValue = celsiusValue + 273.15;

    celsiusResult.textContent = formatValue(celsiusValue, 2);
    fahrenheitResult.textContent = formatValue(fahrenheitValue, 2);
    kelvinResult.textContent = formatValue(kelvinValue, 2);

    const sourceUnit = unitSelect.value;
    const formulaText = document.getElementById("formulaText");

    if (sourceUnit === "C") {
        formulaText.textContent = "°F = (°C × 9/5) + 32 | K = °C + 273.15";
    } else if (sourceUnit === "F") {
        formulaText.textContent =
            "°C = (°F − 32) × 5/9 | K = (°F − 32) × 5/9 + 273.15";
    } else {
        formulaText.textContent = "°C = K − 273.15 | °F = (K − 273.15) × 9/5 + 32";
    }

    setValidation("Conversion complete.", true);
};

input.addEventListener("input", () => {
    const value = input.value.trim();

    if (value === "") {
        setValidation("");
        return;
    }

    if (!/^[-+]?\d*\.?\d*$/.test(value)) {
        setValidation("Invalid input: only numeric values are allowed.");
        return;
    }

    setValidation("Auto-calculating...", true);
    convertTemperature();
});

unitSelect.addEventListener("change", () => {
    if (input.value.trim() !== "") {
        convertTemperature();
    }
});

convertButton.addEventListener("click", convertTemperature);

document
    .querySelector(".utility-btn:nth-of-type(1)")
    .addEventListener("click", () => {
        input.value = "";
        setValidation("");
        celsiusResult.textContent = "0.00";
        fahrenheitResult.textContent = "32.00";
        kelvinResult.textContent = "273.15";
        document.getElementById("formulaText").textContent =
            "°F = (°C × 9/5) + 32 | K = °C + 273.15";
    });

document
    .querySelector(".utility-btn:nth-of-type(2)")
    .addEventListener("click", () => {
        input.value = "";
        setValidation("");
        celsiusResult.textContent = "0.00";
        fahrenheitResult.textContent = "32.00";
        kelvinResult.textContent = "273.15";
        document.getElementById("formulaText").textContent =
            "°F = (°C × 9/5) + 32 | K = °C + 273.15";
    });

document.querySelectorAll(".preset").forEach((button) => {
    button.addEventListener("click", () => {
        const { value, unit } = button.dataset;
        input.value = value;
        unitSelect.value = unit;
        convertTemperature();
    });
});

input.value = "25";
unitSelect.value = "C";
convertTemperature();