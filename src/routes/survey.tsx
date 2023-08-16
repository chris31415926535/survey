import { SurveyComponent } from "~/components/surveyComponent";
import { SurveyProvider } from "~/components/surveyStateContext";

export default function Survey() {

  return (
    <main>
      <SurveyProvider>
        <SurveyComponent />
      </SurveyProvider>
    </main>
  );
}