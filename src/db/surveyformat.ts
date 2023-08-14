// import { createStore } from "solid-js/store";

// // this is for arbitrary {["EN" : "text", "FR" : "text"]} etc
// //export type LanguageText = {[id:string]: string}[]
// export type LanguageText = {
//     lang: string;
//     textLocalized: string;
// }[]

// // type for multiple choice
// export type ChoicesText = {
//     lang: string;
//     choicesLocalized: string[];
// }[]

// // items are the basic building blocks of surveys
// export type SurveyItem = {
//     id: string;
//     type: string;
//     //text?: string;
//     text?: LanguageText;
//     choices?: ChoicesText;
//     required?: string;
//     validationType?: string;
//     response?: string;
// }

// // a page is an array of items
// export type SurveyPage = SurveyItem[];

// // a survey is an array of pages and some metadata
// export type SurveyFormat = {
//     title?: string;
//     languages: string[];
//     //    userLangage: string;
//     pages: SurveyPage[];
// }

// export type SurveyState = {
//     currentPage: number;
//     surveyFormat: SurveyFormat;
//     maxPages: number;
//     userLangage: string;
// }

// export const surveyFormat: SurveyFormat = {
//     "languages": ["EN", "FR"],
//     "pages": [
//         [{
//             "id": "Q0",
//             "type": "html_text",
//             "text": [{ lang: "EN", textLocalized: "<p><em>Welcome</em> to this amazing stupid demo!</p>" },
//             { lang: "FR", textLocalized: "<p>Bienvenue!</p>" }]
//         }, {
//             "id": "Q1",
//             "type": "multiple_choice",
//             "text": [
//                 { lang: "EN", textLocalized: "How often do you imagine writing your own survey software?" },
//                 { lang: "FR", textLocalized: "Combien de fois avez-vous imaginé écrire votre propre logiciel d'enquête ?" }
//             ],

//             "choices": [
//                 { lang: "EN", choicesLocalized: ["Never", "Sometimes", "Always"] },
//                 { lang: "FR", choicesLocalized: ["Jamais", "De temps en temps", "Toujours"] }
//             ],
//             "required": "true"
//         }
//         ]
//     ]
// };
// // export const surveyFormat: SurveyFormat = {
// //     "languages": [ "EN" ],
// //     "pages": [
// //         [{
// //                 "id": "Q0",
// //                 "type": "html_text",
// //                 "text": [{lang: "EN", textLocalized : "<p><em>Welcome</em> to this amazing stupid demo!</p>"},
// //                          {lang: "FR", textLocalized : "<p><em>Bienvenue!</p>"}]
// //             }, {
// //                 "id": "Q1",
// //                 "type": "multiple_choice",
// //                 "text": "How often do you imagine writing your own survey software?",
// //                 "choices": ["Never", "Sometimes", "Always"],
// //                 "required": "true"
// //             }, {
// //                 "id": "Q2",
// //                 "type": "text_box",
// //                 "text": "Say something nice",
// //                 "choices": ["Super great", "Bad", "Okay"],
// //                 "required": "true"
// //             }, {
// //                 "id": "Q3",
// //                 "type": "multiple_choice",
// //                 "text": "how well did this work?",
// //                 "choices": ["Super great", "Bad", "Okay"],
// //                 "required": "true"
// //             }, {
// //                 "id": "Q4",
// //                 "type": "text_box",
// //                 "text": "please enter a number",
// //                 "validationType": "numeric",
// //                 "required": "true"
// //             }
// //         ],
// //         [{
// //                 "id": "Q5",
// //                 "type": "multiple_choice",
// //                 "text": "how well did this work?!! We are on a new page!",
// //                 "choices": ["Super great", "Bad", "Okay"],
// //                 "required": "true"
// //             }, {
// //                 "id": "Q6",
// //                 "type": "text_box",
// //                 "text": "If you go back a page, your results will be saved. how does that make you feel?",
// //                 "required": "true"
// //             }
// //         ]

// //     ]
// // };

// export const [state, setState] = createStore(
//     {
//         currentPage: 0,
//         surveyFormat: surveyFormat,
//         maxPages: surveyFormat.pages.length,
//         "userLangage": "FR"

//     }
// )