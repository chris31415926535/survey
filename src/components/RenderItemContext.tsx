import { For, JSXElement, createEffect } from "solid-js";
import { SurveyItem, SurveyProvider, useSurveyContext } from "./surveyStateContext";
import { setDefaultResultOrder } from "dns";

export default function RenderItem(props: { item: SurveyItem }) {

    // get our global context values
    const context = useSurveyContext();
    // console.log(context)
    if (!context) throw new Error("useSurveyContext: cannot find a SurveyContext")

    const [surveyFormat, getState, setState] = context;

    let questionHTML: JSXElement = <></>;

    if (props.item.type == "multiple_choice") {
        if (props.item.choices === undefined) return (<div>Invalid multiple choice</div>);


        // get English values for internal DOM value property 
        const englishChoices = (props.item.choices || [{ lang: "EN", choicesLocalized: ["No choices found"] }]).filter((e) => e.lang === "EN")[0].choicesLocalized;


        questionHTML = <div id={props.item.id}>
            <For each={props.item.choices.filter((e) => e.lang === getState.userLanguage)[0].choicesLocalized} fallback={<div>No items</div>}>
                {(item, index) => (

                    <div style={"flex-direction:row"}>

                        <input
                            type="radio"
                            name={props.item.id}
                            id={props.item.id + englishChoices[index()]}
                            value={englishChoices[index()]}
                            // to look into: consider making respones an array of objects so we can filter()
                            // and potentially fix that type error
                            // although that might make it more awkward to setState()
                            checked={getState.responses[props.item.id] === englishChoices[index()]}
                            onClick={(e) => setState("responses", props.item.id, englishChoices[index()])}
                        />

                        <label
                            for={props.item.id + englishChoices[index()]}
                            onClick={(e) => setState("responses", props.item.id, englishChoices[index()])}>
                            {item}
                        </label>
                    </div>
                )}
            </For>
        </div>;
    }


    if (props.item.type == "text_box") {
        questionHTML = <div>
            <input type="text"
                id={props.item.id}
                name={props.item.id}
                value={getState.responses[props.item.id] || ""}
                onChange={(e) => setState("responses", props.item.id, e.target.value)}
            />
        </div>;
    }

    // get localized language text in derived signal
    const itemText = () => {
        const result = props.item.text!.filter((i) => i.lang === getState.userLanguage)[0];
        return (result.textLocalized);
    }

    return (
        <div style={"flex-direction:column"}>
            <div innerHTML={itemText()}></div>
            {questionHTML}
            <hr />
        </div>
    )

}