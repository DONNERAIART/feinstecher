export function initVideoScroll() {
  const video = document.getElementById("hero-video");
  const container = document.getElementById("video-hero-container");

  if (!video || !container) return;

  // Ensure video metadata is loaded
  video.addEventListener("loadedmetadata", () => {
    // Optional: set initial frame
    video.currentTime = 0;
  });

  window.addEventListener("scroll", () => {
    const scrollPos = window.scrollY;
    const containerHeight = container.offsetHeight;
    const windowHeight = window.innerHeight;

    // Calculate progress (0 to 1) over the 200vh range (since container is 300vh and video takes 100vh)
    const progress = Math.min(Math.max(scrollPos / (containerHeight - windowHeight), 0), 1);

    if (video.duration) {
      video.currentTime = video.duration * progress;
    }
  });
}
