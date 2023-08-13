import { createStore } from "solid-js/store";

// items are the basic building blocks of surveys
export type SurveyItem = {
    id: string;
    type: string;
    text?: string;
    choices?: string[];
    required?: string;
    validationType?: string;
    response?: string;
}

// a page is an array of items
export type SurveyPage = SurveyItem[];

// a survey is an array of pages and some metadata
export type SurveyFormat = {
    title?: string;
    pages: SurveyPage[];
}



export const surveyFormat: SurveyFormat = {
    "pages": [
        [{
                "id": "Q0",
                "type": "html_text",
                "text": "<p><em>Welcome</em> to this amazing stupid demo!</p>"
            }, {
                "id": "Q1",
                "type": "multiple_choice",
                "text": "How often do you imagine writing your own survey software?",
                "choices": ["Never", "Sometimes", "Always"],
                "required": "true"
            }, {
                "id": "Q2",
                "type": "text_box",
                "text": "Say something nice",
                "choices": ["Super great", "Bad", "Okay"],
                "required": "true"
            }, {
                "id": "Q3",
                "type": "multiple_choice",
                "text": "how well did this work?",
                "choices": ["Super great", "Bad", "Okay"],
                "required": "true"
            }, {
                "id": "Q4",
                "type": "text_box",
                "text": "please enter a number",
                "validationType": "numeric",
                "required": "true"
            }
        ],
        [{
                "id": "Q5",
                "type": "multiple_choice",
                "text": "how well did this work?!! We are on a new page!",
                "choices": ["Super great", "Bad", "Okay"],
                "required": "true"
            }, {
                "id": "Q6",
                "type": "text_box",
                "text": "If you go back a page, your results will be saved. how doe sthat make you feel?",
                "required": "true"
            }
        ]

    ]
};

export const [state, setState] = createStore(
    {
        currentPage: 0,
        surveyFormat: surveyFormat,
        maxPages: surveyFormat.pages.length

    }
)