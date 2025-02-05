document.querySelector(".discord-link").addEventListener("click", (e) => {
    e.preventDefault();
    navigator.clipboard.writeText("hivie");

    const notification = document.getElementById("copy-notification");
    const rect = e.target.getBoundingClientRect();

    notification.style.left = `${rect.left + rect.width / 2}px`;
    notification.style.top = `${rect.top}px`;

    notification.classList.add("show");

    setTimeout(() => {
        notification.classList.remove("show");
    }, 1000);
});
