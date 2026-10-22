// SciChamp Science Content Database
// Rich data for Biology, Chemistry, and Physics games

const SCI_DATA = {
    // Daily Science Facts
    facts: [
        "Octopuses have 3 hearts, 9 brains, and their blood is blue!",
        "Bananas are curved because they grow towards the sun against gravity (negative geotropism)!",
        "Hot water freezes faster than cold water under certain conditions — this is called the Mpemba effect!",
        "A teaspoon of a neutron star would weigh about 6 billion tons on Earth!",
        "Sound travels about 4 times faster in water than it does through air!",
        "Venus is the hottest planet in our solar system, with surface temperatures over 460°C (860°F)!",
        "Human bones are ounce for ounce stronger than steel and concrete!",
        "Water expands when it freezes, which is why ice cubes float on liquid water!",
        "Butterflies taste their food with their feet using special chemoreceptors!",
        "Lightning bolts are about 5 times hotter than the surface of the Sun!"
    ],

    // CHEMISTRY: Molecule Maker Levels
    molecules: [
        {
            id: 'water',
            name: 'Water',
            formula: 'H₂O',
            description: 'Two Hydrogen atoms and one Oxygen atom make the liquid of life!',
            required: { H: 2, O: 1 },
            fact: 'Water covers over 70% of Earth’s surface and every living creature needs it!'
        },
        {
            id: 'carbondioxide',
            name: 'Carbon Dioxide',
            formula: 'CO₂',
            description: 'One Carbon atom and two Oxygen atoms. Plants love this gas!',
            required: { C: 1, O: 2 },
            fact: 'Green plants use Carbon Dioxide in photosynthesis to produce the fresh oxygen we breathe!'
        },
        {
            id: 'salt',
            name: 'Table Salt',
            formula: 'NaCl',
            description: 'One Sodium atom and one Chlorine atom bond into tasty salt crystals!',
            required: { Na: 1, Cl: 1 },
            fact: 'Sodium is an explosive metal and Chlorine is a toxic gas, but together they make delicious table salt!'
        },
        {
            id: 'methane',
            name: 'Methane Gas',
            formula: 'CH₄',
            description: 'One Carbon atom bonded with four Hydrogen atoms.',
            required: { C: 1, H: 4 },
            fact: 'Methane is the main component of natural gas used worldwide for clean cooking and electricity!'
        },
        {
            id: 'oxygen_gas',
            name: 'Oxygen Gas',
            formula: 'O₂',
            description: 'Two Oxygen atoms bonded together — the breath of life!',
            required: { O: 2 },
            fact: 'The air around you is made of about 21% Oxygen (O₂) and 78% Nitrogen (N₂)!'
        },
        {
            id: 'peroxide',
            name: 'Hydrogen Peroxide',
            formula: 'H₂O₂',
            description: 'Two Hydrogen atoms and two Oxygen atoms.',
            required: { H: 2, O: 2 },
            fact: 'Hydrogen peroxide bubbles vigorously when cleaning cuts because enzymes in blood break it into water and oxygen!'
        }
    ],

    // Available Atoms for Molecule Maker
    atoms: [
        { symbol: 'H', name: 'Hydrogen', color: '#FFFFFF', textColor: '#1e293b', radius: 24, number: 1 },
        { symbol: 'O', name: 'Oxygen', color: '#EF4444', textColor: '#FFFFFF', radius: 28, number: 8 },
        { symbol: 'C', name: 'Carbon', color: '#334155', textColor: '#FFFFFF', radius: 28, number: 6 },
        { symbol: 'Na', name: 'Sodium', color: '#8B5CF6', textColor: '#FFFFFF', radius: 30, number: 11 },
        { symbol: 'Cl', name: 'Chlorine', color: '#10B981', textColor: '#FFFFFF', radius: 30, number: 17 }
    ],

    // CHEMISTRY: Acid or Base Lab Items
    phItems: [
        { name: 'Lemon Juice', type: 'acid', ph: 2.2, icon: '🍋', color: '#EF4444', fact: 'Lemons contain citric acid, giving them that super sour zing!' },
        { name: 'Vinegar', type: 'acid', ph: 2.8, icon: '🫙', color: '#F87171', fact: 'Vinegar contains acetic acid, often used in salad dressing and science volcanoes!' },
        { name: 'Tomato', type: 'acid', ph: 4.3, icon: '🍅', color: '#F97316', fact: 'Tomatoes are mildly acidic, which is why tomato sauce has a bright tangy flavor.' },
        { name: 'Pure Water', type: 'neutral', ph: 7.0, icon: '💧', color: '#10B981', fact: 'Pure distilled water is perfectly neutral with a balanced pH of 7.0!' },
        { name: 'Fresh Milk', type: 'neutral', ph: 6.7, icon: '🥛', color: '#34D399', fact: 'Fresh cow milk is almost completely neutral with a slight gentle acidity.' },
        { name: 'Baking Soda', type: 'base', ph: 9.0, icon: '🧁', color: '#6366F1', fact: 'Baking soda is a mild base that neutralizes acids and makes cakes rise in the oven!' },
        { name: 'Soapy Handwash', type: 'base', ph: 10.0, icon: '🧼', color: '#8B5CF6', fact: 'Soaps are alkaline bases that break down greasy oils and destroy virus coats!' },
        { name: 'Bleach Solution', type: 'base', ph: 12.5, icon: '🧪', color: '#A855F7', fact: 'Bleach is a strong alkaline chemical used for heavy disinfection.' }
    ],

    // PHYSICS: Circuit Conductor Test Materials
    circuitMaterials: [
        { id: 'key', name: 'Iron Key', icon: '🔑', conductor: true, explanation: 'Metals have free electrons that carry electric currents easily!' },
        { id: 'duck', name: 'Rubber Duck', icon: '🦆', conductor: false, explanation: 'Rubber holds tightly to its electrons, acting as a great insulator.' },
        { id: 'gold', name: 'Gold Ring', icon: '💍', conductor: true, explanation: 'Gold is one of the best electrical conductors in the entire universe!' },
        { id: 'ruler', name: 'Plastic Ruler', icon: '📏', conductor: false, explanation: 'Plastic is an insulator used to coat electric wires to keep you safe from shocks!' },
        { id: 'coin', name: 'Silver Coin', icon: '🪙', conductor: true, explanation: 'Silver conducts electricity even better than copper!' },
        { id: 'stick', name: 'Wooden Stick', icon: '🪵', conductor: false, explanation: 'Dry wood does not allow electrons to flow through easily.' },
        { id: 'clip', name: 'Steel Paperclip', icon: '📎', conductor: true, explanation: 'Steel paperclips are made of iron alloys and conduct electricity smoothly.' },
        { id: 'glass', name: 'Glass Marble', icon: '🔮', conductor: false, explanation: 'Glass is an insulator and prevents electrical current from flowing.' }
    ],

    // BIOLOGY: Cell Organelles
    cellParts: [
        {
            id: 'nucleus',
            name: 'Nucleus',
            title: 'Cell Command Center',
            icon: '🧠',
            role: 'Contains DNA and gives instructions to the whole cell.',
            color: '#8B5CF6'
        },
        {
            id: 'mitochondria',
            name: 'Mitochondria',
            title: 'Powerhouse of the Cell',
            icon: '⚡',
            role: 'Converts glucose nutrients into ATP energy for cell activities!',
            color: '#EF4444'
        },
        {
            id: 'chloroplast',
            name: 'Chloroplast',
            title: 'Solar Food Kitchen (Plant Only)',
            icon: '☀️',
            role: 'Contains green chlorophyll to capture sunlight for photosynthesis.',
            color: '#10B981'
        },
        {
            id: 'cell_wall',
            name: 'Cell Wall',
            title: 'Protective Armor (Plant Only)',
            icon: '🧱',
            role: 'Tough outer layer made of cellulose that gives plant cells structure.',
            color: '#059669'
        },
        {
            id: 'membrane',
            name: 'Cell Membrane',
            title: 'Security Gatekeeper',
            icon: '🛡️',
            role: 'Selects which substances can enter or exit the cell.',
            color: '#3B82F6'
        },
        {
            id: 'vacuole',
            name: 'Vacuole',
            title: 'Storage Water Tank',
            icon: '💧',
            role: 'Stores water, sugars, and nutrients to keep cells hydrated and plump.',
            color: '#06B6D4'
        }
    ],

    // BIOLOGY: Food Chain Levels
    foodChains: [
        {
            name: 'Sunny Forest Ecosystem',
            chain: [
                { name: 'Sunlight', icon: '☀️', role: 'Energy Source' },
                { name: 'Oak Tree Leaves', icon: '🍃', role: 'Producer' },
                { name: 'Caterpillar', icon: '🐛', role: 'Primary Consumer (Herbivore)' },
                { name: 'Bluebird', icon: '🐦', role: 'Secondary Consumer' },
                { name: 'Red-Tailed Hawk', icon: '🦅', role: 'Apex Predator' }
            ],
            funFact: 'Energy flows in one direction: from the sun to plants, then up the food chain to predators!'
        },
        {
            name: 'Deep Blue Ocean Ecosystem',
            chain: [
                { name: 'Sunlight', icon: '☀️', role: 'Energy Source' },
                { name: 'Phytoplankton', icon: '🔬', role: 'Producer' },
                { name: 'Tiny Krill', icon: '🦐', role: 'Primary Consumer' },
                { name: 'Atlantic Salmon', icon: '🐟', role: 'Secondary Consumer' },
                { name: 'Great White Shark', icon: '🦈', role: 'Apex Predator' }
            ],
            funFact: 'Ocean phytoplankton produces more than 50% of the world’s oxygen supply!'
        },
        {
            name: 'Wild Desert Oasis',
            chain: [
                { name: 'Sunlight', icon: '☀️', role: 'Energy Source' },
                { name: 'Desert Cactus', icon: '🌵', role: 'Producer' },
                { name: 'Desert Beetle', icon: '🪲', role: 'Herbivore' },
                { name: 'Spotted Lizard', icon: '🦎', role: 'Carnivore' },
                { name: 'Golden Eagle', icon: '🦅', role: 'Apex Predator' }
            ],
            funFact: 'Desert plants have thick waxy skins to trap every drop of moisture in arid heat.'
        }
    ],

    // BIOLOGY: Human Organs Quest
    humanOrgans: [
        {
            id: 'brain',
            name: 'Brain',
            icon: '🧠',
            slot: 'head',
            hint: 'Located in your skull; controls thoughts, senses, and movements.',
            fact: 'Your brain produces about 20 watts of electrical power while awake — enough to power a low-watt LED light bulb!'
        },
        {
            id: 'heart',
            name: 'Heart',
            icon: '❤️',
            slot: 'chest-left',
            hint: 'Located slightly to the left in your chest; pumps blood.',
            fact: 'Your heart beats around 100,000 times every day without ever taking a vacation break!'
        },
        {
            id: 'lungs',
            name: 'Lungs',
            icon: '🫁',
            slot: 'chest-center',
            hint: 'Located inside your ribcage; fills with air when you breathe.',
            fact: 'If you could spread out the entire surface of both lungs, it would cover an entire tennis court!'
        },
        {
            id: 'stomach',
            name: 'Stomach',
            icon: '🫄',
            slot: 'belly',
            hint: 'Located in your upper abdomen; breaks down your food.',
            fact: 'Your stomach lining makes a fresh layer of protective mucus every two weeks to keep stomach acid from digesting itself!'
        },
        {
            id: 'bones',
            name: 'Skeleton',
            icon: '🦴',
            slot: 'limbs',
            hint: 'Supports your entire body and shields your soft organs.',
            fact: 'Babies are born with about 300 bones, which gradually fuse together into 206 bones as adults!'
        }
    ],

    // ALL SCIENCES: Master Science Quiz Questions
    quizQuestions: [
        {
            category: 'Chemistry',
            icon: '🧪',
            question: 'What two elements combine to form ordinary liquid water?',
            options: ['Hydrogen and Oxygen', 'Carbon and Nitrogen', 'Helium and Oxygen', 'Sodium and Chlorine'],
            answer: 0,
            explanation: 'Water is H₂O — two Hydrogen atoms bonded to one Oxygen atom!'
        },
        {
            category: 'Physics',
            icon: '⚡',
            question: 'Which of the following materials is the best electrical conductor?',
            options: ['Rubber eraser', 'Copper metal', 'Dry wooden stick', 'Plastic bottle cap'],
            answer: 1,
            explanation: 'Metals like Copper allow electric current to flow with very little resistance!'
        },
        {
            category: 'Biology',
            icon: '🌱',
            question: 'Which organelle is famously known as the "Powerhouse of the Cell"?',
            options: ['Ribosome', 'Nucleus', 'Mitochondria', 'Vacuole'],
            answer: 2,
            explanation: 'Mitochondria generate ATP chemical energy that fuels cell processes!'
        },
        {
            category: 'Chemistry',
            icon: '🍋',
            question: 'Is lemon juice an Acid or a Base on the pH scale?',
            options: ['Base (pH > 7)', 'Acid (pH < 7)', 'Neutral (pH = 7)', 'None of these'],
            answer: 1,
            explanation: 'Lemon juice has a sour taste and a pH of around 2, making it an Acid!'
        },
        {
            category: 'Physics',
            icon: '🚀',
            question: 'Why do astronauts jump much higher and float on the Moon than on Earth?',
            options: [
                'The Moon has less gravity than Earth',
                'The Moon has thicker air resistance',
                'Spacesuits have built-in spring shoes',
                'The Moon rotates ten times faster'
            ],
            answer: 0,
            explanation: 'The Moon has less mass than Earth, so its gravitational pull is only about 1/6th of Earth’s!'
        },
        {
            category: 'Biology',
            icon: '☀️',
            question: 'What is the ultimate primary source of energy for almost all living food chains on Earth?',
            options: ['Ocean waves', 'Volcanic lava', 'The Sun', 'Underground coal'],
            answer: 2,
            explanation: 'Plants capture sunlight via photosynthesis, which powers herbivores and top predators alike!'
        },
        {
            category: 'Physics',
            icon: '🌈',
            question: 'What happens when white sunlight passes through a glass prism?',
            options: [
                'It turns completely black',
                'It splits into the colors of the rainbow',
                'It turns into electricity',
                'It makes a loud buzzing sound'
            ],
            answer: 1,
            explanation: 'Prisms refract different wavelengths of light at different angles, creating a rainbow spectrum!'
        },
        {
            category: 'Biology',
            icon: '🫀',
            question: 'Which vital organ pumps oxygen-filled blood through your blood vessels?',
            options: ['Stomach', 'Heart', 'Lungs', 'Kidneys'],
            answer: 1,
            explanation: 'Your heart is a muscular pump that keeps blood circulating around your entire body!'
        }
    ]
};

// Export to window
window.SCI_DATA = SCI_DATA;
