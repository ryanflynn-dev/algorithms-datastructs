document.addEventListener("DOMContentLoaded", function () {
  const button = document.querySelector(".tracking-button");
  const resultParagraph = document.querySelector(".result");
  const trackingNumber = document.querySelector("#trackingNumber");

  button.addEventListener("click", function () {
    const newMessage = "Jon needs to be patient...";
    resultParagraph.innerHTML += `<br>${newMessage}`;
  });
  trackingNumber.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      button.click();
    }
  });
});
