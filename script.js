document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const themeToggle = document.querySelector('.theme-toggle');
    const languageSelect = document.getElementById('language-select');
    
    // Import translations
    import('./translations.js')
        .then(module => {
            const translations = module.default;
            initializeLanguage(translations);
        })
        .catch(error => console.error('Error loading translations:', error));

    // Initialize language
    function initializeLanguage(translations) {
        // Set initial language
        const savedLanguage = localStorage.getItem('language') || 'en';
        document.documentElement.lang = savedLanguage;
        document.documentElement.dir = savedLanguage === 'he' ? 'rtl' : 'ltr';
        languageSelect.value = savedLanguage;
        updateTranslations(translations[savedLanguage]);

        // Language change handler
        languageSelect.addEventListener('change', function() {
            const language = this.value;
            document.documentElement.lang = language;
            document.documentElement.dir = language === 'he' ? 'rtl' : 'ltr';
            localStorage.setItem('language', language);
            updateTranslations(translations[language]);
        });
    }

    // Update page translations
    function updateTranslations(langData) {
        // Update navigation
        document.querySelector('.nav-links li:nth-child(1) a').textContent = langData.home;
        document.querySelector('.nav-links li:nth-child(2) a').textContent = langData.calculator;
        document.querySelector('.nav-links li:nth-child(3) a').textContent = langData.about;

        // Update hero section
        document.querySelector('.hero-content h1').textContent = langData.heroTitle;
        document.querySelector('.hero-content p').textContent = langData.heroDescription;
        document.querySelector('.hero-content .btn').textContent = langData.getStarted;

        // Update calculator section
        document.querySelector('.calculator-section .section-header h2').textContent = langData.calculatorTitle;
        document.querySelector('.calculator-section .section-header p').textContent = langData.calculatorDescription;

        // Update form labels
        document.querySelector('label[for="gender"]').textContent = langData.gender;
        document.querySelector('option[value="male"]').textContent = langData.male;
        document.querySelector('option[value="female"]').textContent = langData.female;
        document.querySelector('label[for="course"]').textContent = langData.course;
        document.querySelector('option[value="lcm"]').textContent = langData.longCourse;
        document.querySelector('option[value="scm"]').textContent = langData.shortCourse;
        document.querySelector('label[for="stroke"]').textContent = langData.stroke;
        document.querySelector('option[value="freestyle"]').textContent = langData.freestyle;
        document.querySelector('option[value="backstroke"]').textContent = langData.backstroke;
        document.querySelector('option[value="breaststroke"]').textContent = langData.breaststroke;
        document.querySelector('option[value="butterfly"]').textContent = langData.butterfly;
        document.querySelector('option[value="im"]').textContent = langData.im;
        document.querySelector('label[for="distance"]').textContent = langData.distance;
        document.querySelector('label[for="time"]').textContent = langData.time;
        document.getElementById('time').placeholder = langData.timePlaceholder;
        document.getElementById('calculate-btn').textContent = langData.calculatePoints;

        // Update results section
        document.querySelector('.comparison-info .comparison-item:nth-child(1) .label').textContent = langData.worldRecord + ':';
        document.querySelector('.comparison-info .comparison-item:nth-child(2) .label').textContent = langData.percentageOfRecord;
        document.getElementById('save-btn').textContent = langData.saveResult;

        // Update about section
        document.getElementById('about-title').textContent = langData.aboutTitle;
        document.getElementById('about-description').textContent = langData.aboutDescription;
        document.getElementById('calculation-title').textContent = langData.calculationTitle;
        document.getElementById('calculation-description').textContent = langData.calculationDescription;
        document.getElementById('world-records-title').textContent = langData.worldRecordsTitle;
        document.getElementById('world-records-description').textContent = langData.worldRecordsDescription;
        document.getElementById('progress-title').textContent = langData.progressTitle;
        document.getElementById('progress-description').textContent = langData.progressDescription;

        // Update PB's section
        document.getElementById('pbs-title').textContent = langData.pbsTitle;
        document.getElementById('pbs-description').textContent = langData.pbsDescription;
        document.getElementById('add-pb-text').textContent = langData.addNewPB;
        document.getElementById('no-pbs-message').textContent = langData.noPBsYet;
    }
    const genderSelect = document.getElementById('gender');
    const courseSelect = document.getElementById('course');
    const strokeSelect = document.getElementById('stroke');
    const distanceSelect = document.getElementById('distance');
    const timeInput = document.getElementById('time');
    const calculateBtn = document.getElementById('calculate-btn');
    const pointsDisplay = document.getElementById('points-display');
    const worldRecordDisplay = document.getElementById('world-record');
    const percentageDisplay = document.getElementById('percentage');
    const saveBtn = document.getElementById('save-btn');
    
    // Theme Toggle
    themeToggle.addEventListener('click', function() {
        document.body.classList.toggle('dark-theme');
        localStorage.setItem('theme', document.body.classList.contains('dark-theme') ? 'dark' : 'light');
    });
    
    // Check for saved theme preference
    if (localStorage.getItem('theme') === 'dark') {
        document.body.classList.add('dark-theme');
    }
    
    // Base times (world records) for points calculation
    // Format: baseTimeData[gender][course][stroke][distance] = time in seconds
    const baseTimeData = {
        male: {
            lcm: { // Long Course Meters
                freestyle: {
                    '50': 20.91,   // Cesar Cielo (BRA) 2009
                    '100': 46.40,  // Pan Zhanle (CHN) 2024
                    '200': 102.00, // Paul Biedermann (GER) 2009
                    '400': 219.96, // Lukas Märtens (GER) 2025
                    '800': 452.12, // Zhang Lin (CHN) 2009
                    '1500': 870.67 // Robert "Bobby" Fink (USA) 2024
                },
                backstroke: {
                    '50': 23.71,   // Kliment Kolesnikov (RUS) 2018
                    '100': 51.60,  // Thomas Ceccon (ITA) 2022
                    '200': 111.92  // Aaron Peirsol (USA) 2009
                },
                breaststroke: {
                    '50': 25.95,   // Adam Peaty (GBR) 2017
                    '100': 56.88,  // Adam Peaty (GBR) 2019
                    '200': 125.48  // Qia Haiyang (CHN) 2023
                },
                butterfly: {
                    '50': 22.27,   // Andriy Govorov (UKR) 2018
                    '100': 49.45,  // Caeleb Dressel (USA) 2019
                    '200': 110.34  // Kristof Milak (HUN) 2022
                },
                im: {
                    '200': 114.00, // Leon Marchand (FRA) 2023
                    '400': 242.50  // Leon Marchand (FRA) 2023
                }
            },
            scm: { // Short Course Meters
                freestyle: {
                    '50': 19.90,   // Jordan Crooks (KY) 2024
                    '100': 44.84,  // Kyle Chalmers (AUS) 2021
                    '200': 98.37,  // Luke Hubson (USA) 2024
                    '400': 212.25, // Paul Biedermann (GER) 2009
                    '800': 443.42, // Grant Hackett (AUS) 2008
                    '1500': 848.06 // Grant Hackett (AUS) 2001
                },
                backstroke: {
                    '50': 22.22,   // Kliment Kolesnikov (RUS) 2021
                    '100': 48.33,  // Coleman Stewart (USA) 2021
                    '200': 105.63  // Evgeny Rylov (RUS) 2018
                },
                breaststroke: {
                    '50': 24.95,   // Emre Sacki (TUR) 2021
                    '100': 55.28,  // Ilya Shymanovich (BLR) 2021
                    '200': 120.16  // Kirill Prigoda (RUS) 2018
                },
                butterfly: {
                    '50': 21.32,   // Noe Ponti (SWI) 2024
                    '100': 47.71,  // Noe Ponti (SWI) 2024
                    '200': 106.85  // Tomoru Honda (JPN) 2022
                },
                im: {
                    '200': 108.88, // Leon Marchand (FRA) 2024
                    '400': 234.81  // Daiya Seto (JPN) 2019
                }
            }
        },
        female: {
            lcm: { // Long Course Meters
                freestyle: {
                    '50': 23.67,   // Sarah Sjöström (SWE) 2017
                    '100': 51.71,  // Sarah Sjöström (SWE) 2017
                    '200': 112.98, // Mollie O'Callaghan (AUS) 2023
                    '400': 236.46, // Ariarne Titmus (AUS) 2022
                    '800': 484.79, // Katie Ledecky (USA) 2016
                    '1500': 920.48 // Katie Ledecky (USA) 2018
                },
                backstroke: {
                    '50': 26.98,   // Kaylee McKeown (AUS) 2023
                    '100': 57.33,  // Kaylee McKeown (AUS) 2023
                    '200': 123.35  // Kaylee McKeown (AUS) 2023
                },
                breaststroke: {
                    '50': 29.30,   // Benedetta Pilato (ITA) 2021
                    '100': 64.13,  // Lilly King (USA) 2017
                    '200': 139.11  // Tatjana Schoenmaker (RSA) 2021
                },
                butterfly: {
                    '50': 24.43,   // Sarah Sjöström (SWE) 2023
                    '100': 55.48,  // Sarah Sjöström (SWE) 2016
                    '200': 124.57  // Zhang Yufei (CHN) 2021
                },
                im: {
                    '200': 126.12, // Kaylee McKeown (AUS) 2023
                    '400': 266.36  // Summer McIntosh (CAN) 2023
                }
            },
            scm: { // Short Course Meters
                freestyle: {
                    '50': 22.93,   // Sarah Sjöström (SWE) 2017
                    '100': 50.25,  // Sarah Sjöström (SWE) 2017
                    '200': 110.43, // Siobhan Haughey (HKG) 2021
                    '400': 230.90, // Ariarne Titmus (AUS) 2018
                    '800': 479.34, // Mireia Belmonte (ESP) 2013
                    '1500': 911.38 // Katie Ledecky (USA) 2019
                },
                backstroke: {
                    '50': 25.25,   // Kira Toussaint (NED) 2020
                    '100': 54.89,  // Minna Atherton (AUS) 2019
                    '200': 118.94  // Kaylee McKeown (AUS) 2020
                },
                breaststroke: {
                    '50': 28.56,   // Alia Atkinson (JAM) 2018
                    '100': 62.36,  // Alia Atkinson (JAM) 2018
                    '200': 134.57  // Rebecca Soni (USA) 2009
                },
                butterfly: {
                    '50': 24.38,   // Therese Alshammar (SWE) 2009
                    '100': 54.61,  // Kelsi Dahlia (USA) 2018
                    '200': 119.61  // Mireia Belmonte (ESP) 2014
                },
                im: {
                    '200': 120.82, // Katinka Hosszu (HUN) 2014
                    '400': 252.06  // Katinka Hosszu (HUN) 2015
                }
            }
        }
    };
    
    // Update available distances based on stroke selection
    strokeSelect.addEventListener('change', updateDistanceOptions);
    
    // Initial update of distance options
    updateDistanceOptions();
    
    // Calculate button click handler
    calculateBtn.addEventListener('click', calculatePoints);
    
    // Save button click handler
    saveBtn.addEventListener('click', saveResult);
    
    // Function to update distance options based on stroke
    function updateDistanceOptions() {
        const stroke = strokeSelect.value;
        const gender = genderSelect.value;
        const course = courseSelect.value;
        
        // Clear current options
        distanceSelect.innerHTML = '';
        
        // Get available distances for the selected stroke
        const availableDistances = Object.keys(baseTimeData[gender][course][stroke]);
        
        // Add options for available distances
        availableDistances.forEach(distance => {
            const option = document.createElement('option');
            option.value = distance;
            option.textContent = `${distance}m`;
            distanceSelect.appendChild(option);
        });
    }
    
    // Function to convert time string to seconds
    function timeToSeconds(timeStr) {
        // Handle different time formats (MM:SS.HH or SS.HH)
        let minutes = 0;
        let seconds = 0;
        
        if (timeStr.includes(':')) {
            const parts = timeStr.split(':');
            minutes = parseFloat(parts[0]);
            seconds = parseFloat(parts[1]);
        } else {
            seconds = parseFloat(timeStr);
        }
        
        return minutes * 60 + seconds;
    }
    
    // Function to convert seconds to time string (MM:SS.HH)
    function secondsToTimeString(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = (seconds % 60).toFixed(2);
        
        // Ensure remaining seconds has leading zero if needed
        const formattedSeconds = remainingSeconds < 10 && minutes > 0 ? 
            '0' + remainingSeconds : remainingSeconds;
        
        return minutes > 0 ? `${minutes}:${formattedSeconds}` : formattedSeconds;
    }
    
    // Function to calculate swimming points
    function calculatePoints() {
        const gender = genderSelect.value;
        const course = courseSelect.value;
        const stroke = strokeSelect.value;
        const distance = distanceSelect.value;
        const timeStr = timeInput.value.trim();
        
        // Validate time input
        if (!timeStr) {
            alert('Please enter a valid time');
            return;
        }
        
        try {
            // Convert time to seconds
            const timeSeconds = timeToSeconds(timeStr);
            
            // Get base time (world record)
            const baseTime = baseTimeData[gender][course][stroke][distance];
            
            // Calculate points using the formula: 1000 × (Base Time / Actual Time)³
            const points = 1000 * Math.pow(baseTime / timeSeconds, 3);
            
            // Calculate percentage of world record
            const percentage = (baseTime / timeSeconds * 100).toFixed(2);
            
            // Display results
            pointsDisplay.textContent = Math.round(points);
            worldRecordDisplay.textContent = secondsToTimeString(baseTime);
            percentageDisplay.textContent = `${percentage}%`;
            
            // Add animation effect
            pointsDisplay.classList.add('highlight');
            setTimeout(() => {
                pointsDisplay.classList.remove('highlight');
            }, 1000);
            
        } catch (error) {
            alert('Error calculating points. Please check your time format.');
            console.error(error);
        }
    }
    
    // Function to save result to local storage
    function saveResult() {
        const points = pointsDisplay.textContent;
        
        // Don't save if no calculation has been done
        if (points === '--') {
            alert('Please calculate points first');
            return;
        }
        
        const result = {
            gender: genderSelect.value,
            course: courseSelect.value,
            stroke: strokeSelect.value,
            distance: distanceSelect.value,
            time: timeInput.value,
            points: points,
            date: new Date().toISOString()
        };
        
        // Get existing saved results or initialize empty array
        let savedResults = JSON.parse(localStorage.getItem('swimResults') || '[]');
        
        // Add new result
        savedResults.push(result);
        
        // Save back to local storage
        localStorage.setItem('swimResults', JSON.stringify(savedResults));
        
        // Show confirmation
        alert('Result saved successfully!');
    }
    
    // Smooth scroll for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80, // Adjust for navbar height
                    behavior: 'smooth'
                });
            }
        });
    });
});

// Add animation class to points display
document.addEventListener('DOMContentLoaded', function() {
    const pointsDisplay = document.getElementById('points-display');
    if (pointsDisplay) {
        // Add highlight animation when points are calculated
        pointsDisplay.classList.add('animate-on-load');
    }
});