// FINA Base Times (World Records as of 2023)
const baseTimesMen = {
    'freestyle': {
        '50': 20.91,
        '100': 46.86,
        '200': 102.00,
        '400': 220.07,
        '800': 452.12,
        '1500': 871.02
    },
    'backstroke': {
        '50': 23.71,
        '100': 51.60,
        '200': 111.92
    },
    'breaststroke': {
        '50': 25.95,
        '100': 56.88,
        '200': 126.12
    },
    'butterfly': {
        '50': 22.27,
        '100': 49.45,
        '200': 110.73
    },
    'medley': {
        '200': 114.00,
        '400': 243.84
    }
};

const baseTimesWomen = {
    'freestyle': {
        '50': 23.67,
        '100': 51.71,
        '200': 112.98,
        '400': 236.46,
        '800': 484.79,
        '1500': 932.98
    },
    'backstroke': {
        '50': 26.98,
        '100': 57.45,
        '200': 123.35
    },
    'breaststroke': {
        '50': 29.16,
        '100': 64.13,
        '200': 139.11
    },
    'butterfly': {
        '50': 24.43,
        '100': 55.48,
        '200': 121.81
    },
    'medley': {
        '200': 126.12,
        '400': 266.36
    }
};

document.addEventListener('DOMContentLoaded', () => {
    const calculateBtn = document.getElementById('calculate');
    const pointsDisplay = document.getElementById('points');
    const strokeSelect = document.getElementById('stroke');
    const distanceSelect = document.getElementById('distance');
    const genderSelect = document.getElementById('gender');
    const minutesInput = document.getElementById('minutes');
    const secondsInput = document.getElementById('seconds');
    const millisecondsInput = document.getElementById('milliseconds');

    // Update available distances based on stroke
    strokeSelect.addEventListener('change', updateDistances);

    function updateDistances() {
        const stroke = strokeSelect.value;
        const distances = Object.keys(genderSelect.value === 'male' ? 
            baseTimesMen[stroke] : baseTimesWomen[stroke]);
        
        distanceSelect.innerHTML = distances.map(distance => 
            `<option value="${distance}">${distance} מטר</option>`
        ).join('');
    }

    // Calculate FINA Points
    calculateBtn.addEventListener('click', () => {
        const stroke = strokeSelect.value;
        const distance = distanceSelect.value;
        const gender = genderSelect.value;
        
        const minutes = parseInt(minutesInput.value || 0);
        const seconds = parseInt(secondsInput.value || 0);
        const milliseconds = parseInt(millisecondsInput.value || 0);
        
        const timeInSeconds = minutes * 60 + seconds + milliseconds / 100;
        const baseTime = gender === 'male' ? 
            baseTimesMen[stroke][distance] : 
            baseTimesWomen[stroke][distance];

        // FINA Points Formula: (Base Time / Actual Time)^3 * 1000
        const points = Math.round((baseTime / timeInSeconds) ** 3 * 1000);

        // Animate points display
        animatePoints(points);
    });

    function animatePoints(targetPoints) {
        const duration = 1500; // Animation duration in milliseconds
        const start = parseInt(pointsDisplay.textContent) || 0;
        const startTime = performance.now();

        function update(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);

            // Easing function for smooth animation
            const easeOut = 1 - Math.pow(1 - progress, 3);
            const currentPoints = Math.round(start + (targetPoints - start) * easeOut);

            pointsDisplay.textContent = currentPoints;

            if (progress < 1) {
                requestAnimationFrame(update);
            }
        }

        requestAnimationFrame(update);
    }

    // Initialize distances
    updateDistances();
});