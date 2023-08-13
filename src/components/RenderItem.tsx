import { For, JSXElement } from "solid-js";
import { SurveyItem } from "../db/surveyformat"

export default function RenderItem(props: {item : SurveyItem}){

    let questionHTML: JSXElement = <></>;

    if (props.item.type == "multiple_choice"){
        questionHTML = <div id = {props.item.id}>
            <For each = {props.item.choices} fallback={<div>No items</div>}>
                {(item) => (<div>
                    <input type="radio" name = {props.item.id} id = {props.item.id + item} value = {item} checked = {props.item.response === item}/>
                    <label for={props.item.id + item}>{item}</label>
                </div>)}
            </For>
        </div>;
    }

    if (props.item.type == "text_box") {
        questionHTML = <div>
            <input type = "text" id = {props.item.id} name = {props.item.id} value = {props.item.response || ""} />
        </div>;
    }

    return(<>
    <div innerHTML = {props.item.text}></div>
    {questionHTML} 
    <hr/>
    </>
    )

}