const textInput = document.getElementById("text-input");
const checkBtn = document.getElementById("check-btn");
const result = document.getElementById("result");

checkBtn.addEventListener("click", () => {
  const text = textInput.value;
  if (text === "") {
    alert("Please input a value");
    return;
  }
  const normalisedText = text.replace(/[^a-z0-9]/gi, "").toLowerCase();
  const reversedText = normalisedText.split("").reverse().join("");
  if (normalisedText === reversedText) {
    result.innerText = `${text} is a palindrome`;
  } else {
    result.innerText = `${text} is not a palindrome`;
  }
});
