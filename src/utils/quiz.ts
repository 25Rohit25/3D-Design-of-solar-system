export interface Question {
    id: string;
    planetId: string; // which planet this question is about
    text: string;
    options: string[];
    correctIndex: number;
    explanation: string;
}

export const quizData: Question[] = [
    {
        id: 'q1',
        planetId: 'mercury',
        text: "Why does Mercury have such extreme temperature changes?",
        options: [
            "It is too far from the Sun",
            "It has almost no atmosphere to trap heat",
            "It is made of ice",
            "It spins too fast"
        ],
        correctIndex: 1,
        explanation: "Without an atmosphere to hold heat, Mercury burns at 430°C in the day and freezes at -180°C at night!"
    },
    {
        id: 'q2',
        planetId: 'venus',
        text: "Venus is hotter than Mercury despite being further away. Why?",
        options: [
            "It has more volcanoes",
            "The Sun shines brighter on Venus",
            "A runaway Greenhouse Effect traps heat",
            "It has a molten core"
        ],
        correctIndex: 2,
        explanation: "Venus has a thick atmosphere of CO2 that traps heat like a blanket, creating a runaway Greenhouse Effect."
    },
    {
        id: 'q3',
        planetId: 'earth',
        text: "What makes Earth unique in our solar system?",
        options: [
            "It is the largest planet",
            "It is the only one with liquid water on the surface",
            "It has the most moons",
            "It is the closest to the Sun"
        ],
        correctIndex: 1,
        explanation: "Earth is in the 'Goldilocks Zone', allowing liquid water to exist, which is essential for life."
    },
    {
        id: 'q4',
        planetId: 'mars',
        text: "Why is Mars known as the 'Red Planet'?",
        options: [
            "Because of its hot temperature",
            "Iron oxide (rust) in its soil",
            "Reflection from the Sun",
            "Red plants growing on the surface"
        ],
        correctIndex: 1,
        explanation: "The surface is covered in iron oxide dust—essentially rust—which gives it a reddish appearance."
    },
    {
        id: 'q5',
        planetId: 'jupiter',
        text: "What is the 'Great Red Spot' on Jupiter?",
        options: [
            "A giant volcano",
            "A massive storm lasting hundreds of years",
            "A crater from an asteroid",
            "A large lake of red gas"
        ],
        correctIndex: 1,
        explanation: "It is a high-pressure storm, larger than Earth, that has been raging for at least 300 years."
    },
    {
        id: 'q6',
        planetId: 'saturn',
        text: "What are Saturn's rings primarily made of?",
        options: [
            "Solid gold",
            "Gas and clouds",
            "Chunks of ice and rock",
            "Diamonds"
        ],
        correctIndex: 2,
        explanation: "The rings are mostly chunks of water ice, ranging from tiny grains to massive boulders."
    }
];
