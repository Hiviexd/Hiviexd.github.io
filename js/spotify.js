function setupSpotify() {
    const DISCORD_ID = "341321481390784512";
    let receivedData = false;
    let heartbeatInterval;

    const socket = new WebSocket("wss://api.lanyard.rest/socket");

    socket.onopen = () => {
        socket.send(
            JSON.stringify({
                op: 2,
                d: {
                    subscribe_to_id: DISCORD_ID,
                },
            })
        );
    };

    socket.onmessage = ({ data }) => {
        const receivedPayload = JSON.parse(data);

        if (receivedPayload.op === 1) {
            heartbeatInterval = setInterval(() => {
                socket.send(JSON.stringify({ op: 3 }));
            }, receivedPayload.d.heartbeat_interval);
        }

        if (!receivedData && receivedPayload.t === "INIT_STATE") {
            updateSpotifyPresence(receivedPayload.d);
            receivedData = true;
        }

        if (receivedPayload.t === "PRESENCE_UPDATE") {
            updateSpotifyPresence(receivedPayload.d);
        }
    };

    function updateSpotifyPresence(data) {
        const spotifyText = document.querySelector(".spotify-text");
        if (!spotifyText) return;

        if (!data?.spotify) {
            spotifyText.textContent = "Not playing";
            return;
        }

        const { song, artist, track_id } = data.spotify;
        spotifyText.innerHTML = `<a href="https://open.spotify.com/track/${track_id}" target="_blank" style="color: inherit; text-decoration: none;">${song} - ${artist}</a>`;
    }

    socket.onclose = () => {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    };

    socket.onerror = (error) => {
        if (heartbeatInterval) clearInterval(heartbeatInterval);
    };
}

document.addEventListener("DOMContentLoaded", setupSpotify);
