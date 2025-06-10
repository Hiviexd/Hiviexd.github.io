function setupTypewriter() {
    const subtitle = document.querySelector(".subtitle");
    const text = "osu!team, software engineering";

    subtitle.textContent = "";
    subtitle.style.opacity = "0";

    // Start typewriter after links animation completes (0.5s + 1s = 1.5s)
    setTimeout(() => {
        subtitle.style.opacity = "1";
        subtitle.style.animation = "blink-caret 0.5s normal infinite";

        let i = 0;

        function type() {
            if (i < text.length) {
                subtitle.textContent += text[i];
                i++;
                setTimeout(type, 30);
            }
        }

        type();
    }, 2750);
}

document.addEventListener("DOMContentLoaded", setupTypewriter);
