import { For, JSXElement, createEffect } from "solid-js";
import { SurveyItem } from "../db/surveyformat"
//import { setgetState, state } from "~/db/surveyformat";
import { SurveyProvider, useSurveyContext } from "./surveyStateContext";
import { setDefaultResultOrder } from "dns";

export default function RenderItem(props: { item: SurveyItem }) {

    // get our global context values
    const context = useSurveyContext();
    console.log(context)
    if (!context) throw new Error("useSurveyContext: cannot find a SurveyContext")

    const [surveyFormat, getState, setState] = context;

    let questionHTML: JSXElement = <></>;

    if (props.item.type == "multiple_choice") {

        // get English values for internal DOM value property 
        const englishChoices = (props.item.choices || { lang: "EN", choicesLocalized: ["No choices found"] }).filter((e: any) => e.lang === "EN")[0].choicesLocalized;


        questionHTML = <div id={props.item.id}>
            <For each={props.item.choices.filter((e: any) => e.lang === getState.userLanguage)[0].choicesLocalized} fallback={<div>No items</div>}>
                {(item, index) => (

                    <div style={"flex-direction:row"}>

                        <input
                            type="radio"
                            name={props.item.id}
                            id={props.item.id + englishChoices[index()]}
                            value={englishChoices[index()]}
                            checked={getState.responses[props.item.id] === englishChoices[index()]}
                            //onClick = {() => props.item.response = englishChoices[index()]} 
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


    // if (props.item.type == "multiple_choice") {
    //     questionHTML = <div id={props.item.id}>
    //         <For each={props.item.choices} fallback={<div>No items</div>}>
    //             {(item) => (
    //                 <div>
    //                     <input type="radio" name={props.item.id} id={props.item.id + item} value={item} checked={props.item.response === item} />
    //                     <label for={props.item.id + item}>{item}</label>
    //                 </div>
    //             )}
    //         </For>
    //     </div>;
    // }

    if (props.item.type == "text_box") {
        questionHTML = <div>
            <input type="text" 
            id={props.item.id} 
            name={props.item.id} 
            value={props.item.response || ""} 
            onChange = {(e) => setState("responses", props.item.id, e.target.value)}
            />
        </div>;
    }

    // get localized language text in derived signal
    const itemText = () => {
        const result = props.item.text!.filter((i) => i.lang === getState.userLanguage)[0];
        console.log(props.item)
        return (result.textLocalized);
    }

    //let itemText = props.item.text!.filter((i) => i.lang === getState.userLanguage)[0] ;
    // console.log(itemText())
    //props.item.text!.map((i) => console.log(i))// Object.keys(i) === [state.userLanguage]) ;
    //<div innerHTML = {props.item.text}></div>
    return (
        <div style={"flex-direction:column"}>
            <div innerHTML={itemText()}></div>
            {questionHTML}
            <hr />
        </div>
    )

}