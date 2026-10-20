const themeSelect = document.querySelector("#theme-select");
const themeStatus = document.querySelector("#theme-status");
const themeColor = document.querySelector('meta[name="theme-color"]');
const colorScheme = window.matchMedia("(prefers-color-scheme: dark)");
const themeColors = {
  light: "#f5f6f7",
  dark: "#101b20",
  "ghost-test": "#101b20",
  "type-r-redline": "#f5f6f7",
  "type-r-dark-contrast": "#11100e",
};
const themes = ["system", "type-r-redline", "ghost-test", "type-r-dark-contrast"];

function isTheme(theme) {
  return themes.includes(theme);
}

function applyTheme(theme, announce = false) {
  if (!isTheme(theme)) {
    return;
  }

  themeSelect.value = theme;
  if (theme === "system") {
    document.documentElement.removeAttribute("data-theme");
  } else {
    document.documentElement.dataset.theme = theme;
  }

  const appearance = theme === "system"
    ? (colorScheme.matches ? "dark" : "light")
    : theme;
  themeColor.content = themeColors[appearance];

  if (announce) {
    themeStatus.textContent = theme === "system"
      ? `Using your system ${appearance} appearance.`
      : `${themeSelect.selectedOptions[0].text} appearance selected.`;
  }
}

applyTheme("system");

themeSelect.addEventListener("change", () => {
  applyTheme(themeSelect.value, true);
});

const updateSystemTheme = () => {
  if (themeSelect.value === "system") {
    applyTheme("system");
  }
};

if (typeof colorScheme.addEventListener === "function") {
  colorScheme.addEventListener("change", updateSystemTheme);
} else {
  colorScheme.addListener(updateSystemTheme);
}
