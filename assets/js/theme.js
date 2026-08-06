(function () {
  function isDarkMode() {
    var hour = new Date().getHours();
    return hour < 5 || hour > 19 || window.matchMedia('(prefers-color-scheme: dark)').matches;
  }

  function applyTheme() {
    document.body.classList.toggle('dark-mode', isDarkMode());
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', applyTheme);
  } else {
    applyTheme();
  }
})();
