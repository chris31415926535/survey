// @refresh reload
import { Suspense } from "solid-js";
import {
  A,
  Body,
  ErrorBoundary,
  FileRoutes,
  Head,
  Html,
  Meta,
  Routes,
  Scripts,
  Title,
} from "solid-start";
import "./root.css";
import { SurveyProvider } from "./components/surveyStateContext";


export default function Root() {
  return (
    <Html lang="en">
      <Head>
        <Title>SolidStart - With Auth</Title>
        <Meta charset="utf-8" />
        <Meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Body>
      
        <ErrorBoundary>
        
          <Suspense fallback={<div>Loading</div>}>
          
            <A href="/Survey">Survey</A>
            <Routes>
            <SurveyProvider>

              <FileRoutes />
              </SurveyProvider>
            </Routes>
            
          </Suspense>
          
        </ErrorBoundary>
        
        <Scripts />
      </Body>
    </Html>
  );
}
