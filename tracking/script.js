document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".tracking-button");
  const resultParagraph = document.querySelector(".result");

  button.addEventListener("click", function () {
    const newMessage = "Jon needs to be patient...";
    resultParagraph.innerHTML += `<br>${newMessage}`;
  });
});
