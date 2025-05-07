function formatWithCommas(value) {
  const num = value.replace(/[^\d]/g, "");
  if (!num) return "";
  return Number(num).toLocaleString();
}

function enhanceInputVisual(input) {
  if (input.dataset.commaVisual) return;
  input.dataset.commaVisual = "true";

  // Create wrapper
  const wrapper = document.createElement("div");
  wrapper.className = "comma-wrapper";
  wrapper.style.position = "relative";
  wrapper.style.display = "inline-block";
  wrapper.style.width = input.offsetWidth + "px";

  // Create fake display
  const display = document.createElement("span");
  display.className = "fake-display";
  display.style.position = "absolute";
  display.style.top = "70%";
  display.style.left = "0";
  display.style.transform = "translateY(-50%)";
  display.style.textAlign = "left";
  display.style.color = "black";
  display.style.pointerEvents = "none";
  display.style.whiteSpace = "pre";
  display.style.boxSizing = "border-box";
  display.style.zIndex = "1";

  // Copy computed styles for consistent display
  const styles = window.getComputedStyle(input);
  display.style.padding = styles.padding;
  display.style.height = styles.height;
  display.style.width = styles.width;
  display.style.fontSize = styles.fontSize;
  display.style.fontFamily = styles.fontFamily;
  display.style.fontWeight = styles.fontWeight;
  display.style.letterSpacing = styles.letterSpacing;
  display.style.lineHeight = styles.lineHeight;
  display.style.textAlign = styles.textAlign;

  // Style real input
  input.style.position = "relative";
  input.style.background = "transparent";
  input.style.color = "transparent";
  input.style.caretColor = "black";
  input.style.zIndex = "2";
  input.style.width = "100%";
  input.style.boxSizing = "border-box";

  // Wrap it
  input.parentNode.insertBefore(wrapper, input);
  wrapper.appendChild(input);
  wrapper.appendChild(display);

  // Prevent shrinkage on some pages (e.g., Bank)
  requestAnimationFrame(() => {
    wrapper.style.width = input.offsetWidth + "px";
    wrapper.style.height = input.offsetHeight + "px";
  });

  // Live update
  const updateDisplay = () => {
    display.textContent = formatWithCommas(input.value);
  };
  input.addEventListener("input", updateDisplay);
  updateDisplay();
}

function initVisualInputs() {
  const inputs = document.querySelectorAll('input[type="text"], input[type="number"]');
  inputs.forEach((input) => {
    const name = (input.name || "").toLowerCase();
    const id = (input.id || "").toLowerCase();
    const likelyNumeric = /amount|price|cost|np|points|bid|offer|quantity|qty|number|total|value/.test(name + id);

    if (likelyNumeric || input.type === "number") {
      enhanceInputVisual(input);
    }
  });
}

window.addEventListener("load", () => {
  initVisualInputs();

  const observer = new MutationObserver(() => {
    initVisualInputs();
  });

  observer.observe(document.body, {
    childList: true,
    subtree: true
  });
});
