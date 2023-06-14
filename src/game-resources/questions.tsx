const questions = [
    {
        id: 1,
        question: "You have a friend who has a speech impairment and not sure what he said. To make things easier, you should pretend that you understand",
        answers: [
            {
                text: "Never pretend you understand what someone is saying if you dont. Instead, ask your friend to repeat himself. Ocassionly, your friend might to write stuff down",
                correct: true,
                
            },
            {
                text: "You should not annoy your friend and just guess their words and move on",
                correct: false,
                
            },
            {
                text: "You should yell at your friend and tell them they are used and cant speak ",
                correct: false,
            },
            {
                text: "You dont care about what your friend has to say",
                correct: false,
            }
        ],

    },
    {
        id: 2,
        question: "How can you tell as a driver if your passenger suffers with visual impairment",
        answers: [
            {
                text: "Watering of eyes",
                correct: false,
            },
            {
                text: "Recurrent Redness",
                correct: false,
            },
            {
                text: "Frequent blinking",
                correct: false,
            },
            {
                text: "Any of the above symptoms",
                correct: true,
            }
        ],

    },
    {
        id: 3,
        question: "When driving or guiding a person that is visually impaired what is a critical thing you should do",
        answers: [
            {
                text: "You should give specfic direction and a clear word picture like,\"go straight, turn left, etc.\" ",
                correct: true,
            },
            {
                text: "You should shout while speaking to them. If they have one disability, they might have more and may alse be deaf",
                correct: false,
            },
            {
                text: "Constantly offer to pet,feed, and help the person in any way possible. They are like your pets and should be handled with extreme care",
                correct: false,
            },
            {
                text: "You should simply tell the the person where to go and ignore them",
                correct: false,
            },
        ],
    },
    {
        id: 4,
        question: "When handling an individual with hearing loss what should you do",
        answers: [
            {
                text: "Slow down your speech and speak at a reasonable volume",
                correct: true,
            },
            {
                text: "You should shout while speaking to them. If they have one disability, they might have more and may alse be deaf",
                correct: false,
            },
            {
                text: "Constantly offer to pet,feed, and help the person in any way possible. They are like your pets and should be handled with extreme care",
                correct: false,
            },
            {
                text: "You should simply tell the the person where to go and ignore them",
                correct: false,
            },
        ],

    },
    {
        id: 5,
        question: "What are some common misconceptions about people with visual impairments?",
        answers: [
            {
                text: "Visually impaired individuals have the same needs",
                correct: false,
            },
            {
                text: "All visually impaired individuals are completely blind",
                correct: false,
            },
            {
                text: "All of these answers",
                correct: true,
            },
            {
                text: "Visually impaired individuals cannot function independently",
                correct: false,
            },
        ],

    },
    {
        id: 6,
        question: "Which of the following is a common characteristic of motor function disabilities?",
        answers: [
            {
                text: "Impaired vision",
                correct: false,
            },
            {
                text: "Impaired hearing",
                correct: false,
            },
            {
                text: "Impaired speech",
                correct: false,
            },
            {
                text: "Impaired movement control",
                correct: true,
            },
        ],
    },
    {
        id: 7,
        question: "What percentage of adults over the age of 65 have some degree of hearing loss?",
        answers: [
            {
                text: "26%",
                correct: false,
            },
            {
                text: "50%",
                correct: true,
            },
            {
                text: "42%",
                correct: false,
            },
            {
                text: "20%",
                correct: false,
            },
        ],
    },
    {
        id: 8,
        question: "Which of the following is an example of an assistive technology device for individuals with motor function disabilities?",
        answers: [
            {
                text: "A wheelchair",
                correct: true,
            },
            {
                text: "A hearing aid",
                correct: false,
            },
            {
                text: "A prosthetic leg",
                correct: false,
            },
            {
                text: "All of the above",
                correct: false,
            },
        ],
    },
    {
        id: 9,
        question: "Which among these is the most common cause of visual impairment",
        answers: [
            {
                text: "Glaucoma",
                correct: true,
            },
            {
                text: "Head trauma",
                correct: false,
            },
            {
                text: "Excessive use of screen devices",
                correct: false,
            },
            {
                text: "Not eating enough carrots",
                correct: false,
            },
        ],
    },
    {
        id: 10,
        question: "How many types of color-blindnesses are there?",
        answers: [
            {
                text: "4",
                correct: false,
            },
            {
                text: "2",
                correct: false,
            },
            {
                text: "3",
                correct: true,
            },
            {
                text: "6",
                correct: false,
            },
        ],
    },
    {
        id: 11,
        question: "Which of the following is a common symptom of motor function disabilities?",
        answers: [
            {
                text: "Seizures",
                correct: false,
            },
            {
                text: "Chronic pain",
                correct: true,
            },
            {
                text: "Vision loss",
                correct: false,
            },
            {
                text: "All of the above",
                correct: false,
            },
        ],
    },
    {
        id: 12,
        question: "What is a communication strategy that can be used when interacting with someone with hearing loss?",
        answers: [
            {
                text: "Speaking in a monotone voice to make it easier to lip-read",
                correct: false,
            },
            {
                text: "Speak into the person's ear",
                correct: false,
            },
            {
                text: "Face the person when speaking",
                correct: true,
            },
            {
                text: "Ignoring the person and communicating with others instead",
                correct: false,
            },
        ],
    },
    {
        id: 13,
        question: "What is an assistive listening device?",
        answers: [
            {
                text: "A device used to convert text to speech for individuals with hearing loss.",
                correct: false,
            },
            {
                text: "A device used to transmit text messages over phone lines for individuals with hearing loss.",
                correct: false,
            },
            {
                text: "A device used to connect hearing aids to other electronic devices.",
                correct: false,
            },
            {
                text: "A device used to amplify sound for individuals with hearing loss.",
                correct: true,
            },
        ],
    },
    {
        id: 14,
        question: "What are some common signs and symptoms of hearing loss?",
        answers: [
            {
                text: "Difficulty hearing in noisy environments",
                correct: false,
            },
            {
                text: "Frequently asking others to repeat themselves",
                correct: false,
            },
            {
                text: "Trouble understanding speech, particularly in high-pitched voices",
                correct: false,
            },
            {
                text: "All of the above",
                correct: true,
            },
        ],
    },
    {
        id: 15,
        question: "What is the difference between a hearing aid and a cochlear implant?",
        answers: [
            {
                text: "A hearing aid amplifies sound, while a cochlear implant directly stimulates the auditory nerve.",
                correct: true,
            },
            {
                text: "A hearing aid directly stimulates the auditory nerve, while a cochlear implant amplifies sound.",
                correct: false,
            },
            {
                text: "A hearing aid and a cochlear implant are the same thing.",
                correct: false,
            },
            {
                text: "Both hearing aids and cochlear implants are surgical procedures.",
                correct: false,
            },
        ],
    },
    {
        id: 16,
        question: "Which of these characteristics are the most important for you to have in order to deal with disabled individuals?",
        answers: [
            {
                text: "Empathy",
                correct: false,
            },
            {
                text: "Patience",
                correct: false,
            },
            {
                text: "No specific characteristic. All of these are equally important and required",
                correct: true,
            },
            {
                text: "Flexibility (in terms of providing accomodations)",
                correct: false,
            },
        ],
    },
    {
        id: 17,
        question: "What amongst these is something that visually impaired individuals struggle with?",
        answers: [
            {
                text: "Depth perception",
                correct: false,
            },
            {
                text: "Peripheral vision",
                correct: false,
            },
            {
                text: "Recognizing obstacles",
                correct: false,
            },
            {
                text: "All of these answers",
                correct: true,
            },
        ],
    },
    {
        id: 18,
        question: "What are some common types of assistive technology devices that you may need to be familiar with when transporting motor function disabled passengers?",
        answers: [
            {
                text: "Wheelchairs, walkers, and prosthetic limbs.",
                correct: false,
            },
            {
                text: "Hearing aids, cochlear implants, and speech-to-text devices.",
                correct: false,
            },
            {
                text: "Braille displays, screen readers, and magnification software.",
                correct: false,
            },
            {
                text: "Adaptive car controls, transfer seats, and lift systems.",
                correct: true,
            },
        ],
    },
    {
        id: 19,
        question: "What is the difference between a white cane and a guide dog?",
        answers: [
            {
                text: "A white cane is a guide dog that has been trained to detect obstacles.",
                correct: false,
            },
            {
                text: "A white cane is a mobility tool that can detect obstacles, while a guide dog provides visual cues and guidance.",
                correct: true,
            },
            {
                text: "A white cane is a type of guide dog that is used specifically for individuals with visual impairments.",
                correct: false,
            },
            {
                text: "A white cane and a guide dog are the same thing.",
                correct: false,
            },
        ],
    },
    {
        id: 20,
        question: "What is a good way of supporting an individual with hearing impairments?",
        answers: [
            {
                text: "Raise your speaking volume as the individual may have a higher threshold of the lowest volume they can hear",
                correct: false,
            },
            {
                text: "Ensure you're always in their field of vision so they can always see you.",
                correct: false,
            },
            {
                text: "Use various types of effective communication strategies",
                correct: true,
            },
            {
                text: "Cup their ears when speaking to them so that your voice can resonate better in their ears",
                correct: false,
            },
        ],
    },
    {
        id: 21,
        question: "Which of these tasks cannot be performed by individuals with visual impairments",
        answers: [
            {
                text: "Cooking",
                correct: false,
            },
            {
                text: "Driving",
                correct: false,
            },
            {
                text: "Reading",
                correct: false,
            },
            {
                text: "None of these",
                correct: true,
            },
        ],
    },
    {
        id: 22,
        question: "Which of the following is a type of assistive technology device that can help individuals with motor function disabilities with communication?",
        answers: [
            {
                text: "Augmentative and alternative communication (AAC) devices",
                correct: true,
            },
            {
                text: "Wheelchairs",
                correct: false,
            },
            {
                text: "Prosthetic limbs",
                correct: false,
            },
            {
                text: "Hearing aids",
                correct: false,
            },
        ],
    },
    {
        id: 23,
        question: "What is the impact of untreated hearing loss on mental health?",
        answers: [
            {
                text: "Hearing loss has no impact on mental health.",
                correct: false,
            },
            {
                text: "People with hearing loss are more likely to experience depression, anxiety, and social isolation.",
                correct: true,
            },
            {
                text: "People with hearing loss are less likely to experience mental health issues due to their increased resilience.",
                correct: false,
            },
            {
                text: "Hearing loss only affects physical health, not mental health.",
                correct: false,
            },
        ],
    },
    {
        id: 24,
        question: "How can you ensure the safety and comfort of a motor function disabled passenger while driving?",
        answers: [
            {
                text: "By providing clear communication, using assistive devices, and making accommodations for their needs.",
                correct: true,
            },
            {
                text: "By ignoring their needs and driving as usual.",
                correct: false,
            },
            {
                text: "By assuming that they don't need any assistance or accommodations.",
                correct: false,
            },
            {
                text: "By only providing minimal assistance if absolutely necessary.",
                correct: false,
            },
        ],
    },
    {
        id: 25,
        question: "Which among the following is not a name of a visual impairment",
        answers: [
            {
                text: "Myopia",
                correct: false,
            },
            {
                text: "Cognia",
                correct: true,
            },
            {
                text: "Hyperopia",
                correct: false,
            },
            {
                text: "Presbyopia",
                correct: false,
            },
        ],
    },

];

export {questions};