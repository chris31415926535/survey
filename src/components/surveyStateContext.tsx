import { ParentComponent, createContext, useContext } from "solid-js";
import { SetStoreFunction, createStore } from "solid-js/store";


// this is for arbitrary {["EN" : "text", "FR" : "text"]} etc
//export type LanguageText = {[id:string]: string}[]
export type LanguageText = {
    lang: string;
    textLocalized: string;
}[]

// type for multiple choice
export type ChoicesText = {
    lang: string;
    choicesLocalized: string[];
}[]

// items are the basic building blocks of surveys
export type SurveyItem = {
    id: string;
    type: string;
    //text?: string;
    text?: LanguageText;
    choices?: ChoicesText;
    required?: string;
    validationType?: string;
    response?: string; // TODO: consider removing, to separate hard-coded survey features from user responses
}

// a page is an array of items
export type SurveyPage = SurveyItem[];

// type for responses, key/value pair
export type Response = {
    id: string;
    value: string;
}

// a survey is an array of pages and some metadata
export type SurveyFormat = {
    title?: string;
    languages: string[];
    //    userLanguage: string;
    pages: SurveyPage[];
}

export type SurveyState = {
    currentPage: number;
    surveyFormat: SurveyFormat;
    maxPages: number;
    userLanguage: string;
    responses: Record<string, string>;
}

export const surveyFormat: SurveyFormat = {
    "languages": ["EN", "FR", "ES"],
    "pages": [
        [{
            "id": "Q0",
            "type": "html_text",
            "text": [{ lang: "EN", textLocalized: "<p><em>Welcome</em> to this amazing stupid demo!</p>" },
            { lang: "FR", textLocalized: "<p>Bienvenue!</p>" },
            { lang: "ES", textLocalized: "<p>¡Bienvenido a esta asombrosa y estúpida demostración!</p>" }]
        }, {
            "id": "Q1",
            "type": "multiple_choice",
            "text": [{ lang: "EN", textLocalized: "How often do you imagine writing your own survey software?" },
            { lang: "FR", textLocalized: "Combien de fois avez-vous imaginé écrire votre propre logiciel d'enquête ?" },
            { lang: "ES", textLocalized: "¿Con qué frecuencia se imagina escribiendo su propio software de encuestas?" }],

            "choices": [
                { lang: "EN", choicesLocalized: ["Never", "Sometimes", "Always"] },
                { lang: "FR", choicesLocalized: ["Jamais", "De temps en temps", "Toujours"] },
                { lang: "ES", choicesLocalized: ["Nunca", "A veces", "Siempre"] }
            ],
            "required": "true"
        }, {
            "id": "Q2",
            "type": "text_box",
            "text": [{ lang: "EN", textLocalized: "Say something nice!" },
            { lang: "FR", textLocalized: "Disez quelque-choise de gentil!" },
            { lang: "ES", textLocalized: "¡Di algo agradable!" }],

            "required": "true"
        }
        ],
        [{
            "id": "Q3",
            "type": "html_text",
            "text": [{ lang: "EN", textLocalized: "<p>This is the second page!</p>" },
            { lang: "FR", textLocalized: "<p>Voici la deuxieme page!</p>" },
            { lang: "ES", textLocalized: "<p>¡Esta es la segunda página!</p>" }]
        }, {
            "id": "Q4",
            "type": "multiple_choice",
            "text": [{ lang: "EN", textLocalized: "Did you think this would work?" },
            { lang: "FR", textLocalized: "Pensait-vous que ça marcherait?" },
            { lang: "ES", textLocalized: "¿Pensaste que esto funcionaría?" }],

            "choices": [
                { lang: "EN", choicesLocalized: ["Never", "Sometimes", "Always"] },
                { lang: "FR", choicesLocalized: ["Jamais", "De temps en temps", "Toujours"] },
                { lang: "ES", choicesLocalized: ["Nunca", "A veces", "Siempre"] }
            ],
            "required": "true"
        }, {
            "id": "Q5",
            "type": "text_box",
            "text": [{ lang: "EN", textLocalized: "Your responses are saved between pages and language changes! How do you feel about that?" },
            { lang: "FR", textLocalized: "Vos réponses sont enregistrées entre les pages et les changements de langue ! Comment te sens tu à propos de ça?" },
            { lang: "ES", textLocalized: "¡Tus respuestas se guardan entre páginas y cambios de idioma! ¿Cómo te sientes sobre eso?" }],

            "required": "true"
        }
        ]
    ]
};

// define the props we will be sharing across components for our survey state
type ContextProps = [
    surveyFormat: SurveyFormat,
    getState: SurveyState,
    setState: SetStoreFunction<SurveyState>
];


const initialResponses: Record<string, string> = {};
for (const page of surveyFormat.pages) {
    for (const item of page) {
        if (item.type !== "html_text") initialResponses[`${item.id}`] = ""
    }
}


const initialState: SurveyState = {
    currentPage: 0,
    surveyFormat: surveyFormat,
    maxPages: surveyFormat.pages.length,
    userLanguage: "EN",
    responses: initialResponses
}

const SurveyContext = createContext<ContextProps>();

export const SurveyProvider: ParentComponent = (props) => {

    const [getState, setState] = createStore(initialState);

    return (
        <SurveyContext.Provider value={[surveyFormat, getState, setState]}>
            {props.children}
        </SurveyContext.Provider>
    )
}

export const useSurveyContext = () => { return useContext(SurveyContext); }