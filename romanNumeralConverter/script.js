const numberInput = document.getElementById("number");
const convertBtn = document.getElementById("convert-btn");
const output = document.getElementById("output");
const romanNumerals = [
  {
    input: 3999,
    output: "MMMCMXCIX",
  },
  {
    input: 1000,
    output: "M",
  },
  {
    input: 900,
    output: "CM",
  },
  {
    input: 500,
    output: "D",
  },
  {
    input: 400,
    output: "CD",
  },
  {
    input: 100,
    output: "C",
  },
  {
    input: 90,
    output: "XC",
  },

  {
    input: 50,
    output: "L",
  },

  {
    input: 40,
    output: "XL",
  },

  {
    input: 10,
    output: "X",
  },

  {
    input: 9,
    output: "IX",
  },

  {
    input: 5,
    output: "V",
  },

  {
    input: 4,
    output: "IV",
  },

  {
    input: 1,
    output: "I",
  },
  {
    input: 0,
    output: "",
  },
];

const decimalToRoman = (input) => {
  if (input === 0) {
    return "";
  } else if (input < 0) {
    return "Please enter a number greater than or equal to 1";
  } else if (input > 3999) {
    return "Please enter a number less than or equal to 3999";
  } else {
    for (let i = 0; i < romanNumerals.length; i++) {
      if (input >= romanNumerals[i].input) {
        return (
          romanNumerals[i].output +
          decimalToRoman(input - romanNumerals[i].input)
        );
      }
    }
  }
};

const checkUserInput = () => {
  const inputInt = parseInt(numberInput.value);

  if (!numberInput.value || isNaN(inputInt)) {
    output.innerText = "Please enter a valid number";
    return;
  }

  output.innerText = decimalToRoman(inputInt);
  numberInput.value = "";
};

convertBtn.addEventListener("click", checkUserInput);

numberInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    checkUserInput();
  }
});
