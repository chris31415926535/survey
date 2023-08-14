import { For, Show } from "solid-js";
import { SurveyProvider, useSurveyContext } from "./surveyStateContext";
import RenderItemContext from "./RenderItemContext";



export const SurveyComponent = () => {

    // get our global context values
    const context = useSurveyContext();
    console.log(context)
    if (!context) throw new Error("useSurveyContext: cannot find a SurveyContext")

    const [surveyFormat, getState, setState] = context;

    function updateResponses() {
        console.log(getState)
        for (let itemIndex in getState.surveyFormat.pages[getState.currentPage]) {

            let value;
            let item = getState.surveyFormat.pages[getState.currentPage][itemIndex];
            console.log(item.type)

            if (item.type === "text_box") {
                let htmlItem = document.getElementById(item.id) as HTMLInputElement;
                value = htmlItem.value;
                setState("surveyFormat", "pages", getState.currentPage, Number(itemIndex), "response", value);
            }

            // if multiple choice, find out which button is selected
            if (item.type === "multiple_choice") {
                let radioButtons = document.getElementsByName(item.id)!;
                for (let i in radioButtons) {
                    if ((radioButtons[i] as HTMLInputElement).checked) {
                        value = (radioButtons[i] as HTMLInputElement).value;
                        setState("surveyFormat", "pages", getState.currentPage, Number(itemIndex), "response", value);
                    }
                }

            }
        }

    }

    return (<>
        <select name="languages" id="language-select" onChange={
            (e) => {
                //console.log(e.target.value);
                setState("userLanguage", e.target.value);
                //console.log(getState)
            }}>
            <For each={getState.surveyFormat.languages} >
                {(language) => <option value={language}>{language}</option>}
            </For>
        </select>

        <div>
            The page is {getState.currentPage}
        </div>
        <div>
            The language is { getState.userLanguage}
        </div>

        <For each={getState.surveyFormat.pages[getState.currentPage]}   >
            {(item) => <RenderItemContext item={item} />}
        </For>

        
             <Show when={(getState.currentPage > 0)} fallback={<button disabled={true}>previous page</button>}>
                 <button onClick={() => {

                     // update saved responses
                     updateResponses();

                     if (getState.currentPage > 0) {
                         setState("currentPage", c => c - 1);
                         console.log("page " + getState.currentPage)
                     }

                 }}>
                     previous page
                 </button>
             </Show>

             <Show when={(getState.currentPage < getState.maxPages - 1)} fallback={<button disabled={true}>next page</button>}>
                 <button onClick={() => {

                     // update saved responses
                     updateResponses();

                     // now change page if we should

                     if (getState.currentPage < getState.maxPages - 1) {

                         setState("currentPage", c => c + 1);
                         console.log("page " + getState.currentPage)
                     }

                 }}>
                     next page
                 </button>
             </Show>

             <button onClick={() => console.log(getState)}>log state</button>
    </>)

}


// export const SurveyComponent = () => {

//     // get our global context values
//     const context = useSurveyContext();
//     console.log(context)
//     if (!context) throw new Error("useSurveyContext: cannot find a SurveyContext")

//     const [surveyFormat, getState, setState] = context;


//     function updateResponses() {
//         console.log(getState)
//         for (let itemIndex in getState.surveyFormat.pages[getState.currentPage]) {

//             let value;
//             let item = getState.surveyFormat.pages[getState.currentPage][itemIndex];
//             console.log(item.type)

//             if (item.type === "text_box") {
//                 let htmlItem = document.getElementById(item.id) as HTMLInputElement;
//                 value = htmlItem.value;
//                 setState("surveyFormat", "pages", getState.currentPage, Number(itemIndex), "response", value);
//                 console.log(value)
//             }

//             // if multiple choice, find out which button is selected
//             if (item.type === "multiple_choice") {
//                 let radioButtons = document.getElementsByName(item.id)!;
//                 for (let i in radioButtons) {
//                     if ((radioButtons[i] as HTMLInputElement).checked) {
//                         value = (radioButtons[i] as HTMLInputElement).value;
//                         setState("surveyFormat", "pages", getState.currentPage, Number(itemIndex), "response", value);
//                     }
//                 }

//             }
//         }

//     }

// // return(<div>hello!</div>)


//     return (
//         <div>
//             <select name="languages" id="language-select" onChange={(e) => { console.log(e.target.value); setState("userLanguage", e.target.value); console.log(getState) }}>
//                 <For each={getState.surveyFormat.languages} >
//                     {(language) => <option value={language}>{language}</option>}
//                 </For>
//             </select>

//             <For each={getState.surveyFormat.pages[getState.currentPage]}   >
//                 {(item) => <RenderItemContext item={item} />}
//             </For>

//             <Show when={(getState.currentPage > 0)} fallback={<button disabled={true}>previous page</button>}>
//                 <button onClick={() => {

//                     // update saved responses
//                     updateResponses();

//                     if (getState.currentPage > 0) {
//                         setState("currentPage", c => c - 1);
//                         console.log("page " + getState.currentPage)
//                     }

//                 }}>
//                     previous page
//                 </button>
//             </Show>

//             <Show when={(getState.currentPage < getState.maxPages - 1)} fallback={<button disabled={true}>next page</button>}>
//                 <button onClick={() => {

//                     // update saved responses
//                     updateResponses();

//                     // now change page if we should

//                     if (getState.currentPage < getState.maxPages - 1) {

//                         setState("currentPage", c => c + 1);
//                         console.log("page " + getState.currentPage)
//                     }

//                 }}>
//                     next page
//                 </button>
//             </Show>
//         </div>
//     )
// }