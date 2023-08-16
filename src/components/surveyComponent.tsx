import { For, Show } from "solid-js";
import { useSurveyContext } from "./surveyStateContext";
import RenderItemContext from "./RenderItemContext";

import { AddRandomQuestion } from "./AddRandomQuestion";


export const SurveyComponent = () => {

    // get our global context values
    const context = useSurveyContext();
    if (!context) throw new Error("useSurveyContext: cannot find a SurveyContext")

    const [surveyFormat, getState, setState] = context;

    return (<>
        <select name="languages" id="language-select" onChange={
            (e) => {
                setState("userLanguage", e.target.value);
            }}>
            <For each={getState.surveyFormat.languages} >
                {(language) => <option value={language}>{language}</option>}
            </For>
        </select>

        <div>
            The page is {getState.currentPage}
        </div>
        <div>
            The language is {getState.userLanguage}
        </div>

        <For each={getState.surveyFormat.pages[getState.currentPage]}   >
            {(item) => <RenderItemContext item={item} />}
        </For>


        <Show when={(getState.currentPage > 0)} fallback={<button disabled={true}>previous page</button>}>
            <button onClick={() => {

                // update saved responses
                // updateResponses();

                // now change the page if we should
                if (getState.currentPage > 0) {
                    setState("currentPage", c => c - 1);
                }

            }}>
                previous page
            </button>
        </Show>

        <Show when={(getState.currentPage < getState.maxPages - 1)}
            fallback={
                <button disabled={true}>
                    Submit
                </button>}>
            <button onClick={() => {

                // TODO: validation

                // TODO: update saved responses to external storage
                //updateResponses();

                // TODO: display logic (e.g. should we skip the next page? which page are we going to?)

                // now change page if we should
                if (getState.currentPage < getState.maxPages - 1) {
                    setState("currentPage", c => c + 1);
                }

            }}>
                next page
            </button>
        </Show>

        <AddRandomQuestion />

        <button onClick={() => console.log(getState)}>log state</button>
    </>)

}