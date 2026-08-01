export const getMoonPhase = (date = new Date()) => {
    let year = date.getFullYear();
    let month = date.getMonth() + 1;
    let day = date.getDate();
    
    if (month < 3) {
        year--;
        month += 12;
    }
    month++;
    
    let c = 365.25 * year;
    let e = 30.6 * month;
    let jd = c + e + day - 694039.09;
    jd /= 29.5305882;
    let phase = parseInt(jd);
    jd -= phase;
    let phaseFraction = Math.round(jd * 8);
    if (phaseFraction >= 8) phaseFraction = 0;
    
    const phases = [
        { phase: 'New Moon', emoji: '🌑', name: 'New Moon', illumination: 0 },
        { phase: 'Waxing Crescent', emoji: '🌒', name: 'Waxing Crescent', illumination: 25 },
        { phase: 'First Quarter', emoji: '🌓', name: 'First Quarter', illumination: 50 },
        { phase: 'Waxing Gibbous', emoji: '🌔', name: 'Waxing Gibbous', illumination: 75 },
        { phase: 'Full Moon', emoji: '🌕', name: 'Full Moon', illumination: 100 },
        { phase: 'Waning Gibbous', emoji: '🌖', name: 'Waning Gibbous', illumination: 75 },
        { phase: 'Last Quarter', emoji: '🌗', name: 'Last Quarter', illumination: 50 },
        { phase: 'Waning Crescent', emoji: '🌘', name: 'Waning Crescent', illumination: 25 }
    ];
    
    return phases[phaseFraction];
};
