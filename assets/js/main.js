const lters = "!@#$%^&*()_+[]{}|;:',.<>/?1234567890";
function randomChar() {
    return lters[Math.floor(Math.random() * lters.length)];
}

function animateText(element, finalText, duration = 0.8, fps = 30) {
    let frame = 0;
    const totalFrames = Math.floor(duration * fps);
    let interval;
    const original = finalText.split("");

    clearInterval(element.__interval); // Dừng hiệu ứng cũ nếu có

    interval = setInterval(() => {
        let display = "";
        for (let i = 0; i < original.length; i++) {
            if (frame < totalFrames) {
                const progress = frame / totalFrames;
                if (i / original.length < progress) {
                    display += original[i];
                } else if (original[i] === " ") {
                    display += " ";
                } else {
                    display += randomChar();
                }
            } else {
                display = finalText;
            }
        }
        element.textContent = display;
        frame++;
        if (frame > totalFrames) clearInterval(interval);
    }, 1000 / fps);
    element.__interval = interval;
}

// Áp dụng cho tất cả .codedText menu
document.querySelectorAll(".codedTextWrapper").forEach((wrapper) => {
    const coded = wrapper.querySelector(".codedText");
    const finalText = coded.textContent;
    wrapper.parentElement.addEventListener("mouseenter", () => {
        animateText(coded, finalText);
    });
    // Reset lại chữ khi mouseleave (option)
    wrapper.parentElement.addEventListener("mouseleave", () => {
        coded.textContent = finalText;
        clearInterval(coded.__interval);
    });
});
