function setupThemeToggle() {
    const root = document.documentElement;
    const logo = document.querySelector(".logo-main");
    const storedTheme = localStorage.getItem("theme") || "dark";

    // Apply initial theme
    root.setAttribute("data-theme", storedTheme);
    updateParticlesColor(storedTheme);

    logo.addEventListener("click", () => {
        const currentTheme = root.getAttribute("data-theme");
        const newTheme = currentTheme === "dark" ? "light" : "dark";

        root.setAttribute("data-theme", newTheme);
        localStorage.setItem("theme", newTheme);
        updateParticlesColor(newTheme);
    });
}

function updateParticlesColor(theme) {
    if (!window.pJSDom) return;

    const colors = theme === "dark" ? ["#fff", "#e6e6e6", "#b9b9b9"] : ["#161616", "#363636", "#565656"];

    const lineColor = theme === "dark" ? "#ffffff" : "#161616";

    const particles = window.pJSDom[0].pJS.particles;
    particles.color.value = colors;
    particles.line_linked.color = lineColor;

    // Refresh particles
    window.pJSDom[0].pJS.fn.particlesRefresh();
}

document.addEventListener("DOMContentLoaded", setupThemeToggle);
