function setupTypewriter() {
    const subtitle = document.querySelector(".subtitle");
    const text = "osu!team, software engineering";

    subtitle.textContent = "";
    subtitle.style.animation = "blink-caret 0.5s normal infinite";

    let i = 0;

    function type() {
        if (i < text.length) {
            subtitle.textContent += text[i];
            i++;
            setTimeout(type, 60);
        }
    }

    type();
}

document.addEventListener("DOMContentLoaded", setupTypewriter);
