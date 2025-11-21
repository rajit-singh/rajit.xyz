// Time-based greeting
function setGreeting() {
    const hour = new Date().getHours();
    const greetingEl = document.getElementById('greeting');
    
    if (hour >= 5 && hour < 12) {
        greetingEl.textContent = 'Good morning';
    } else if (hour >= 12 && hour < 17) {
        greetingEl.textContent = 'Good afternoon';
    } else {
        greetingEl.textContent = 'Good evening';
    }
}

// Magnetic cursor effect
function initCursor() {
    // Only run on devices with hover capability
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) {
        return;
    }

    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, .profile-picture, .footer p');

    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;
    let cursorX = 0, cursorY = 0;

    // Show cursors after a brief delay
    setTimeout(() => {
        cursor.classList.add('active');
        follower.classList.add('active');
    }, 100);

    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });

    // Smooth cursor animation
    function animateCursor() {
        // Smooth follow for cursor
        cursorX += (mouseX - cursorX) * 0.3;
        cursorY += (mouseY - cursorY) * 0.3;
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';

        // Slower follow for follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        follower.style.left = followerX + 'px';
        follower.style.top = followerY + 'px';

        requestAnimationFrame(animateCursor);
    }
    animateCursor();

    // Magnetic effect on interactive elements
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            follower.classList.add('hover');
        });

        link.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            follower.classList.remove('hover');
        });

        link.addEventListener('mousemove', (e) => {
            const rect = link.getBoundingClientRect();
            const relX = e.clientX - rect.left;
            const relY = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const deltaX = (relX - centerX) * 0.05;
            const deltaY = (relY - centerY) * 0.05;
            
            link.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        });

        link.addEventListener('mouseleave', () => {
            link.style.transform = 'translate(0, 0)';
        });
    });
}

// Initialize on page load
window.addEventListener('DOMContentLoaded', () => {
    setGreeting();
    initCursor();
});