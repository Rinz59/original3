function navigateToAnime(title, image, description, episodes) {
    const url = `REPETICION.html?title=${encodeURIComponent(title)}&image=${encodeURIComponent(image)}&description=${encodeURIComponent(description)}&episodes=${encodeURIComponent(JSON.stringify(episodes))}`;
    window.location.href = url;
}