export interface PlanetData {
    id: string;
    name: string;
    radius: number; // visual radius relative to earth=1 (approx)
    distance: number; // visual distance from sun
    orbitSpeed: number; // orbit speed factor
    color: string;
    description: string;
    eccentricity: number; // 0 = circle, < 1 = ellipse
    orbitOffset: number; // random starting angle offset
    realDetails: {
        mass: string;
        radius: string;
        distance: string;
        temp: string;
    };
}

export const solarSystemData: PlanetData[] = [
    {
        id: 'mercury',
        name: 'Mercury',
        radius: 0.38,
        distance: 10,
        orbitSpeed: 0.04,
        color: '#A5A5A5',
        description: 'The smallest planet in the Solar System and the closest to the Sun.',
        eccentricity: 0.2, // High eccentricity
        orbitOffset: Math.random() * Math.PI * 2,
        realDetails: {
            mass: '3.30 × 10^23 kg',
            radius: '2,439.7 km',
            distance: '57.9 million km',
            temp: '167 °C'
        }
    },
    {
        id: 'venus',
        name: 'Venus',
        radius: 0.95,
        distance: 15,
        orbitSpeed: 0.015,
        color: '#E3BB76',
        description: 'Second planet from the Sun. It has a thick atmosphere that traps heat.',
        eccentricity: 0.007,
        orbitOffset: Math.random() * Math.PI * 2,
        realDetails: {
            mass: '4.87 × 10^24 kg',
            radius: '6,051.8 km',
            distance: '108.2 million km',
            temp: '464 °C'
        }
    },
    {
        id: 'earth',
        name: 'Earth',
        radius: 1,
        distance: 20,
        orbitSpeed: 0.01,
        color: '#22A6B3',
        description: 'Our home planet, the only known planet to survive life.',
        eccentricity: 0.017,
        orbitOffset: Math.random() * Math.PI * 2,
        realDetails: {
            mass: '5.97 × 10^24 kg',
            radius: '6,371 km',
            distance: '149.6 million km',
            temp: '15 °C'
        }
    },
    {
        id: 'mars',
        name: 'Mars',
        radius: 0.53,
        distance: 25,
        orbitSpeed: 0.008,
        color: '#DD4C22',
        description: 'The dusty, cold, desert world with a very thin atmosphere.',
        eccentricity: 0.093,
        orbitOffset: Math.random() * Math.PI * 2,
        realDetails: {
            mass: '6.42 × 10^23 kg',
            radius: '3,389.5 km',
            distance: '227.9 million km',
            temp: '-65 °C'
        }
    },
    {
        id: 'jupiter',
        name: 'Jupiter',
        radius: 3.5,
        distance: 35,
        orbitSpeed: 0.004,
        color: '#C99039',
        description: 'A gas giant and the largest planet in our solar system.',
        eccentricity: 0.048,
        orbitOffset: Math.random() * Math.PI * 2,
        realDetails: {
            mass: '1.90 × 10^27 kg',
            radius: '69,911 km',
            distance: '778.6 million km',
            temp: '-110 °C'
        }
    },
    {
        id: 'saturn',
        name: 'Saturn',
        radius: 3,
        distance: 45,
        orbitSpeed: 0.003,
        color: '#EAD6B8',
        description: 'Adorned with a dazzling, complex system of icy rings.',
        eccentricity: 0.054,
        orbitOffset: Math.random() * Math.PI * 2,
        realDetails: {
            mass: '5.68 × 10^26 kg',
            radius: '58,232 km',
            distance: '1.4 billion km',
            temp: '-140 °C'
        }
    },
    {
        id: 'uranus',
        name: 'Uranus',
        radius: 2,
        distance: 55,
        orbitSpeed: 0.002,
        color: '#D1F7FF',
        description: 'An ice giant that rotates at a nearly 90-degree angle.',
        eccentricity: 0.047,
        orbitOffset: Math.random() * Math.PI * 2,
        realDetails: {
            mass: '8.68 × 10^25 kg',
            radius: '25,362 km',
            distance: '2.9 billion km',
            temp: '-195 °C'
        }
    },
    {
        id: 'neptune',
        name: 'Neptune',
        radius: 1.9,
        distance: 65,
        orbitSpeed: 0.001,
        color: '#4B70DD',
        description: 'The dark, cold, and supersonic windy ice giant.',
        eccentricity: 0.009,
        orbitOffset: Math.random() * Math.PI * 2,
        realDetails: {
            mass: '1.02 × 10^26 kg',
            radius: '24,622 km',
            distance: '4.5 billion km',
            temp: '-200 °C'
        }
    }
];
