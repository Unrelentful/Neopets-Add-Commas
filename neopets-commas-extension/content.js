function formatWithCommas(value) {
  const num = value.replace(/,/g, "");
  if (!isNaN(num) && num !== "") {
    return Number(num).toLocaleString();
  }
  return value;
}

function stripCommas(value) {
  return value.replace(/,/g, "");
}

function setupLiveCommaInput(input) {
  if (input.dataset.commaFormatted) return;

  input.dataset.commaFormatted = "true";

  // Create wrapper
  const wrapper = document.createElement("div");
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";
  wrapper.style.width = input.offsetWidth + "px";

  // Create fake display
  const display = document.createElement("span");
  display.style.position = "absolute";
  display.style.top = "55%";
  display.style.left = "0";
  display.style.transform = "translateY(-50%)";
  display.style.color = "black";
  display.style.pointerEvents = "none";
  display.style.whiteSpace = "pre";
  display.style.padding = window.getComputedStyle(input).padding;
  display.style.height = input.offsetHeight + "px";
  display.style.width = input.offsetWidth + "px";
  display.style.fontSize = window.getComputedStyle(input).fontSize;
  display.style.fontFamily = window.getComputedStyle(input).fontFamily;
  display.style.lineHeight = window.getComputedStyle(input).lineHeight;
  display.style.textAlign = window.getComputedStyle(input).textAlign;
  display.style.boxSizing = "border-box";
  display.style.zIndex = "1";

  // Style the input to be transparent but keep caret
  input.style.color = "transparent";
  input.style.caretColor = "black";
  input.style.background = "transparent";
  input.style.position = "relative";
  input.style.zIndex = "2";
  input.style.width = "100%";
  input.style.boxSizing = "border-box";

  // Wrap and insert into DOM
  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);
  wrapper.appendChild(display);

  const updateDisplay = () => {
    const raw = stripCommas(input.value);
    if (!/^\d*$/.test(raw)) return;
    display.textContent = formatWithCommas(raw);
  };

  input.addEventListener("input", updateDisplay);
  input.addEventListener("keyup", updateDisplay);
  updateDisplay();

  // Remove commas before form submission
  const form = input.closest("form");
  if (form && !form.dataset.commaSubmitHandled) {
    form.dataset.commaSubmitHandled = "true";
    form.addEventListener("submit", () => {
      const inputs = form.querySelectorAll("input");
      inputs.forEach((i) => {
        if (i.dataset.commaFormatted) {
          i.value = stripCommas(i.value);
        }
      });
    });
  }
}

function initInputs() {
  const inputs = document.querySelectorAll('input[type="text"]');
  inputs.forEach((input) => {
    const name = (input.name || "").toLowerCase();
    const id = (input.id || "").toLowerCase();

    // Only apply to likely numeric fields
    if (
      /amount|price|cost|np|points|bid|offer|quantity|qty/.test(name) ||
      /amount|price|cost|np|points|bid|offer|quantity|qty/.test(id)
    ) {
      setupLiveCommaInput(input);
    }
  });
}

// Run once when the page loads
window.addEventListener("load", () => {
  initInputs();

  // Set up MutationObserver for dynamically added inputs
  const observer = new MutationObserver(() => {
    initInputs(); // reapply formatting on new elements
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
