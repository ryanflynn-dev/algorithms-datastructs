const userInput = document.getElementById("user-input");
const checkBtn = document.getElementById("check-btn");
const resultsDiv = document.getElementById("results-div");

checkBtn.addEventListener("click", () => {
  const number = userInput.value;
  const isValid = validatePhoneNumber(number);
  if (number === "") {
    alert("Please provide a phone number");
    return;
  }
  if (isValid) {
    resultsDiv.textContent = `Valid US number: ${number}`;
  } else {
    resultsDiv.textContent = `Invalid US number: ${number}`;
  }
});

userInput.addEventListener("keydown", (event) => {
  if (event.key === "Enter") {
    checkBtn.click();
  }
  if (event.key === "Escape") {
    clearInput();
  }
});

function validatePhoneNumber(number) {
  const regex = /^(1\s?)?(\(\d{3}\)|\d{3})[\s-]?\d{3}[\s-]?\d{4}$/;
  return regex.test(number);
}

function clearInput() {
  userInput.value = "";
  resultsDiv.innerHTML = "";
}
