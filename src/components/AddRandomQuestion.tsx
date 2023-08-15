import { useSurveyContext } from "./surveyStateContext";


const questionBank = [
    {
        id: "initialvalue",
        "type": "multiple_choice",
        "text": [{ lang: "EN", textLocalized: "How often do you imagine writing your own survey software?" },
        { lang: "FR", textLocalized: "Combien de fois avez-vous imaginé écrire votre propre logiciel d'enquête ?" },
        { lang: "ES", textLocalized: "¿Con qué frecuencia se imagina escribiendo su propio software de encuestas?" }],

        "choices": [
            { lang: "EN", choicesLocalized: ["Never", "Sometimes", "Always"] },
            { lang: "FR", choicesLocalized: ["Jamais", "De temps en temps", "Toujours"] },
            { lang: "ES", choicesLocalized: ["Nunca", "A veces", "Siempre"] }
        ],
    }, {
        id: "initialvalue",
        "type": "text_box",
        "text": [{ lang: "EN", textLocalized: "Say something nice!" },
        { lang: "FR", textLocalized: "Disez quelque-choise de gentil!" },
        { lang: "ES", textLocalized: "¡Di algo agradable!" }],
    },
    {
        id: "initialvalue",
        "type": "multiple_choice",
        "text": [{ lang: "EN", textLocalized: "Did you think this would work?" },
        { lang: "FR", textLocalized: "Pensait-vous que ça marcherait?" },
        { lang: "ES", textLocalized: "¿Pensaste que esto funcionaría?" }],

        "choices": [
            { lang: "EN", choicesLocalized: ["Never", "Sometimes", "Always"] },
            { lang: "FR", choicesLocalized: ["Jamais", "De temps en temps", "Toujours"] },
            { lang: "ES", choicesLocalized: ["Nunca", "A veces", "Siempre"] }
        ]
    }, {
        id: "initialvalue",
        "type": "text_box",
        "text": [{ lang: "EN", textLocalized: "This question was added randomly and procedurally! How do you feel about that?" },
        { lang: "FR", textLocalized: "This question was added randomly and procedurally! Comment te sens tu à propos de ça?" },
        { lang: "ES", textLocalized: "This question was added randomly and procedurally! ¿Cómo te sientes sobre eso?" }],
        "required": "true"
    },
    {
        id: "initialvalue",
        "type": "multiple_choice",
        "text": [{ lang: "EN", textLocalized: "Do you like dogs?" },
        { lang: "FR", textLocalized: "Aimez-vous les chiens?" },
        { lang: "ES", textLocalized: "¿Te gustan los perros?" }],

        "choices": [
            { lang: "EN", choicesLocalized: ["Never", "Sometimes", "Always"] },
            { lang: "FR", choicesLocalized: ["Jamais", "De temps en temps", "Toujours"] },
            { lang: "ES", choicesLocalized: ["Nunca", "A veces", "Siempre"] }
        ]
    },
    {
        id: "initialvalue",
        "type": "multiple_choice",
        "text": [{ lang: "EN", textLocalized: "Can you fly?" },
        { lang: "FR", textLocalized: "Pouvez-vous voler?" },
        { lang: "ES", textLocalized: "¿Puedes volar?" }],

        "choices": [
            { lang: "EN", choicesLocalized: ["Never", "Sometimes", "Always"] },
            { lang: "FR", choicesLocalized: ["Jamais", "De temps en temps", "Toujours"] },
            { lang: "ES", choicesLocalized: ["Nunca", "A veces", "Siempre"] }
        ]
    },
    {
        id: "initialvalue",
        "type": "multiple_choice",
        "text": [{ lang: "EN", textLocalized: "How often do you feel sparkly?" },
        { lang: "FR", textLocalized: "À quelle fréquence vous sentez-vous brillant?" },
        { lang: "ES", textLocalized: "¿Con qué frecuencia te sientes brillante?" }],

        "choices": [
            { lang: "EN", choicesLocalized: ["Never", "Sometimes", "Always"] },
            { lang: "FR", choicesLocalized: ["Jamais", "De temps en temps", "Toujours"] },
            { lang: "ES", choicesLocalized: ["Nunca", "A veces", "Siempre"] }
        ]
    }
]


export const AddRandomQuestion = () => {

    // get our global context values
    const context = useSurveyContext();
    // console.log(context)
    if (!context) throw new Error("useSurveyContext: cannot find a SurveyContext")
    const [surveyFormat, getState, setState] = context;




    const addRandomQuestion = () => {

        // pick a random question from our question bank (array of structured questions)
        // and append it to our SolidJS store of interactive procedural survey questions

        const numQuestions = questionBank.length;
        const index = Math.floor(Math.random() * numQuestions);

        // try many ways to get a deep copy of a random question that we
        // can manipulate without changing either the original question bank 
        // or the signal store

        // older way, didn't work!
        // let newQuestionBank = questionBank.slice();

        // ES6 way, didn't work!
        // let newQuestionBank = [...questionBank];

        //Array way, didn't work!
        //let newQuestionBank = Array.from(questionBank);

        // stupid for loop way, didn't work!
        // let newQuestionBank: any[] = [];
        // for (let i in questionBank) {
        //     newQuestionBank[i] = questionBank[i];
        // }

        // even stupider json way, the only way that worked!! so stupid!!
        let newQuestionBank = JSON.parse(JSON.stringify(questionBank));

        let newQuestion = newQuestionBank[index];

        // give it a random id that we will use for DOM id etc.
        newQuestion.id = String(Math.random());

        // update our interactive store
        setState("surveyFormat", "pages", getState.currentPage, [...getState.surveyFormat.pages[getState.currentPage], newQuestion]);

    }

    return (
        <div>
            <button onClick={addRandomQuestion}>Add a random question to this page</button>

        </div>
    )

}