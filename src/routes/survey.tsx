import { For, Show, createSignal } from "solid-js";
import RenderItem from "~/components/RenderItem";
import RenderItemContext from "~/components/RenderItemContext";
import { SurveyComponent } from "~/components/surveyComponent";
import { SurveyProvider, useSurveyContext } from "~/components/surveyStateContext";
// import { setState, state } from "~/db/surveyformat";


export default function Survey() {


    return (
    <main>
        <SurveyProvider>
            <SurveyComponent />
      </SurveyProvider>     
    </main>
  );
}