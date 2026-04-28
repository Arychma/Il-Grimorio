(function() {
  // Funzione che inizializza tutto
  const initTheme = () => {
    const themeToggle = document.querySelector('#theme-toggle');
    const html = document.documentElement;

    if (!themeToggle) {
      console.warn("Pulsante theme-toggle non trovato!");
      return;
    }

    themeToggle.addEventListener('click', () => {
      // Toggle della classe
      html.classList.toggle('dark-mode');
      
      // Salvataggio preferenza
      const isDark = html.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
      
      console.log("Tema attuale:", isDark ? "Dark" : "Light");
    });
  };

  // Eseguiamo se il DOM è pronto, altrimenti aspettiamo
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initTheme);
  } else {
    initTheme();
  }
})();