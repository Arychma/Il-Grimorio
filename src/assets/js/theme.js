document.addEventListener('DOMContentLoaded', () => {
    const themeToggle = document.querySelector('#theme-toggle');
    const htmlElement = document.documentElement; // Usiamo html per coerenza con lo script nel head

    // Funzione per aggiornare il tema
    const setTheme = (theme) => {
        if (theme === 'dark') {
            htmlElement.classList.add('dark-mode');
            localStorage.setItem('theme', 'dark');
        } else {
            htmlElement.classList.remove('dark-mode');
            localStorage.setItem('theme', 'light');
        }
    };

    // Gestione al click
    themeToggle.addEventListener('click', () => {
        const isDark = htmlElement.classList.contains('dark-mode');
        setTheme(isDark ? 'light' : 'dark');
    });
});