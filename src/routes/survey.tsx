import { For, Show, createSignal } from "solid-js";
// import RenderItem from "~/components/RenderItem";
import RenderItemContext from "~/components/RenderItemContext";
import { SurveyComponent } from "~/components/surveyComponent";
import { SurveyProvider, useSurveyContext } from "~/components/surveyStateContext";

export default function Survey() {


    return (
    <main>
        <SurveyProvider>
            <SurveyComponent />
      </SurveyProvider>     
    </main>
  );
}