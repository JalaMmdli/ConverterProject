const leftInput = document.querySelector(".leftInput");
const rightInput = document.querySelector(".rightInput");
const secondAreaItems = document.querySelectorAll(".secondAreaItem");
const firstAreaItems = document.querySelectorAll(".firstAreaItem");
let valyutaInfo = document.querySelector(".valyutaInfo");
let valyutaInfo2 = document.querySelector(".valyutaInfo2");
let errorMessage = document.querySelector(".errorMessage");
let currency = "rub";
let factorName = "usd";
let factor = 0;

let getData = async (currency) => {
  try {
    const response = await fetch(
      `https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies/${currency}.json`
    );
    const data = await response.json();
    return data[currency];
  } catch {
    errorMessage.classList.remove("hidden");
  }
};
let data = await getData(currency);
if (data !== undefined) {
  factor = Number(data[factorName]).toFixed(4);
}

function formatCurrency(input) {
  let value = input.value.replace(/,/g, ".");

  value = value.replace(/[^0-9.]/g, "");

  const dotIndex = value.indexOf(".");
  if (dotIndex !== -1 && value.indexOf(".", dotIndex + 1) !== -1) {
    value = value.substring(0, value.indexOf(".", dotIndex + 1));
  }

  if (dotIndex !== -1) {
    const integerPart = value.substring(0, dotIndex); 
    const decimalPart = value.substring(dotIndex + 1, dotIndex + 5); 
    value = integerPart + "." + decimalPart;
  }

  input.value = value;
}

leftInput.addEventListener("input", (e) => {
  formatCurrency(leftInput);
  rightInput.value = (leftInput.value * factor).toFixed(4);
});

rightInput.addEventListener("input", (e) => {
  formatCurrency(rightInput);
  leftInput.value = (rightInput.value / factor).toFixed(42);
});

firstAreaItems.forEach((item) => {
  item.addEventListener("click", async (e) => {
    firstAreaItems.forEach((x) => {
      x.classList.remove("selected");
    });
    item.classList.add("selected");

    currency = item.dataset.currency;

    if (factorName == currency) {
      rightInput.value = leftInput.value;
      factor = 1;
      valyutaInfo.innerHTML = ` <p class="valyutaInfo">1 ${currency} =${factor.toFixed(
        4
      )} ${factorName}</p>`;
  
      valyutaInfo2.innerHTML = ` <p class="valyutaInfo">1 ${factorName} =${(
        1 / factor
      ).toFixed(4)} ${currency}</p>`;
  
      return;
    }

    data = await getData(currency);
    factor = data[factorName];
    if (rightInput.value !== "") {
      rightInput.value = (leftInput.value * factor).toFixed(4);
    }

    valyutaInfo.innerHTML = ` <p class="valyutaInfo">1 ${currency} =${factor.toFixed(
      4
    )} ${factorName}</p>`;

    valyutaInfo2.innerHTML = ` <p class="valyutaInfo">1 ${factorName} =${(
      1 / factor
    ).toFixed(4)} ${currency}</p>`;
  });
});

secondAreaItems.forEach((item) => {
  item.addEventListener("click", (e) => {
    secondAreaItems.forEach((x) => {
      x.classList.remove("selected");
    });
    item.classList.add("selected");

    factorName = item.dataset.currency;

    if (factorName == currency) {
      rightInput.value = leftInput.value;
      factor = 1;
      valyutaInfo.innerHTML = ` <p class="valyutaInfo">1 ${currency} =${factor.toFixed(
        4
      )} ${factorName}</p>`;
  
      valyutaInfo2.innerHTML = ` <p class="valyutaInfo">1 ${factorName} =${(
        1 / factor
      ).toFixed(4)} ${currency}</p>`;
  
      return;
    }

    factor = data[factorName];
    if (rightInput.value !== "") {
      rightInput.value = (leftInput.value * factor).toFixed(4);
    }

    valyutaInfo.innerHTML = ` <p class="valyutaInfo">1 ${currency} =${factor.toFixed(
      4
    )} ${factorName}</p>`;

    valyutaInfo2.innerHTML = ` <p class="valyutaInfo">1 ${factorName} =${(
      1 / factor
    ).toFixed(4)} ${currency}</p>`;
  });
});
