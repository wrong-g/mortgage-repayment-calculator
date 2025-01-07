const inputs = document.querySelectorAll(".form-group-input input");

inputs.forEach((input) => {
  input.addEventListener("focus", () => {
    input.parentElement.classList.add("focus");
  });

  input.addEventListener("blur", () => {
    if (input.value) {
      input.classList.remove("has-error");
    }
    input.parentElement.classList.remove("focus");
  });
});

const complete = document.querySelector(".result .complete");
const btn = document.querySelector(".submit-btn");
const repayments = document.querySelector(".price.repayments");
const total = document.querySelector(".price.total");

btn.addEventListener("click", (e) => {
  e.preventDefault();

  let result = true;
  inputs.forEach((input) => {
    if (!input.value) {
      input.classList.add("has-error");
      result = false;
    }
  });

  const mortgageAmount = parseFloat(inputs[0].value);
  const mortgageTerm = parseFloat(inputs[1].value);
  const interestRate = parseFloat(inputs[2].value);
  if (isNaN(mortgageAmount) || isNaN(mortgageTerm) || isNaN(interestRate)) {
    alert("Please enter valid values for all fields.");
    return;
  }

  if (result) {
    complete.style.display = "block";
    const monthlyInterestRate = interestRate / 12 / 100;
    const totalPayments = mortgageTerm * 12;
    const monthlyPayment =
      (mortgageAmount * monthlyInterestRate) /
      (1 - Math.pow(1 + monthlyInterestRate, -totalPayments));

    repayments.textContent = monthlyPayment.toFixed(2);
    total.textContent = (monthlyPayment * totalPayments).toFixed(2);
  }
});

const clearBtn = document.querySelector(".calculator h1 span");
clearBtn.addEventListener("click", () => {
  inputs.forEach((input) => {
    input.value = "";
    input.classList.remove("has-error");
  });
  complete.style.display = "none";
});
