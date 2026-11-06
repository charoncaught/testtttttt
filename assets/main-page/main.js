const links = [
    { name: 'ghosty', role: 'Developer', status: 'dnd', color: 'text-yellow-500', memberOf: '#GCS | #POW' },
    { name: 'key', role: 'Management', status: 'online', color: 'text-red-500', memberOf: '#POW' },
    { name: 'caught', role: 'Administrator', status: 'online', color: 'text-purple-500', memberOf: '#POW' },
    { name: 'psycho', role: 'Administrator', status: 'online', color: 'text-purple-500', memberOf: '#POW' },
    { name: 'chaos', role: 'Superior', status: 'online', color: 'text-superior-500' },
    { name: 'fear', role: 'Music Artist', status: 'online', color: 'text-cyan-500' },
    { name: 'hexx', role: 'Music Artist', status: 'online', color: 'text-cyan-500' },
    { name: 'lost', role: 'VIP', status: 'offline', color: 'text-blue-500' },
    { name: 'foreign', role: 'VIP', status: 'online', color: 'text-blue-500' },
    { name: 'cash', role: 'VIP', status: 'offline', color: 'text-blue-500' },
    { name: 'magnum', role: 'VIP', status: 'offline', color: 'text-blue-500'},
    { name: 'symbolic', role: 'VIP', status: 'offline', color: 'text-blue-500' },
    { name: 'narcotics', role: 'VIP', status: 'offline', color: 'text-blue-500' },
    { name: 'carti', role: 'VIP', status: 'offline', color: 'text-blue-500' }
];


function getColor(tailwindClass) {
    const colorMap = {
        'text-yellow-500': '#eab308',
        'text-red-500': '#d56565',
        'text-purple-500': '#a855f7',
        'text-superior-500': '#e04c19',
        'text-cyan-500': '#06b6d4',
        'text-blue-500': '#3b82f6'
    };
    return colorMap[tailwindClass] || '#ffffff';
}

function handleLinkClick(event, username) {
    event.preventDefault();
    window.location.href = `/${username}`;
}

(function() {
    const shutdownDate = new Date("2025-09-21");
    const today = new Date();
    
    const diffTime = shutdownDate - today;
    const daysLeft = Math.max(0, Math.ceil(diffTime / (1000 * 60 * 60 * 24)));

    const bar = document.getElementById("announcement-bar");
    if (daysLeft > 0) {
        bar.textContent = `⚠️ NXU.LOL WILL BE SHUTDOWN IN ${daysLeft} DAY${daysLeft === 1 ? "" : "S"}`;
    } else {
        bar.textContent = `⚠️ NXU.LOL HAS BEEN SHUTDOWN BY GHOSTY.`;
    }
})();

window.addEventListener("scroll", () => {
    const bar = document.getElementById("announcement-bar");
    if (window.scrollY > 0) {
        bar.classList.add("hidden");
    } else {
        bar.classList.remove("hidden");
    }
});


const linksContainer = document.querySelector('.links');
links.forEach((link, index) => {
    const card = document.createElement('a');
    card.className = `link-card glass card ${index >= 6 ? '' : 'fade-in'}`;
    card.onclick = (e) => handleLinkClick(e, link.name);
    
    const cardContent = `
        <div class="card-content">
            <div class="user-info">
                <div class="status-dot ${link.status}"></div>
                <style>
                    .glowing-link {
                        transition: filter 0.3s ease-in-out;
                    }

                    .glowing-link:hover {
                        filter: brightness(1.5); /* Increase brightness on hover */
                    }
                    </style>
                <span class="glowing-link" style="color: ${getColor(link.color)}">${link.name}</span>
                <span class="badge">${link.role}</span>
            </div>
            ${link.memberOf ? `<span class="member-tag">${link.memberOf}</span>` : ''}
        </div>
    `;
    
    card.innerHTML = cardContent;
    linksContainer.appendChild(card);

    // Set up Intersection Observer to trigger fade-in for the hidden links
    if (index >= 3) { // Only apply observer to the 7th and onwards
        const observer = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('fade-in');
                    observer.unobserve(entry.target); // Stop observing once it's faded in
                }
            });
        }, {
            threshold: 0.1 // Trigger when the element is just starting to be visible
        });

        observer.observe(card); // Start observing the card
    }
});
