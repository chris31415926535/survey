import { For, Show } from "solid-js";
import { produce } from "solid-js/store";
import { useParams, useRouteData } from "solid-start";
import { FormError } from "solid-start/data";
import {
  createServerAction$,
  createServerData$,
  redirect,
} from "solid-start/server";
import RenderItem from "~/components/RenderItem";
import { db } from "~/db";
import { createUserSession, getUser, login, register } from "~/db/session";
import { setState, state, surveyFormat } from "~/db/surveyformat";

function validateUsername(username: unknown) {
  if (typeof username !== "string" || username.length < 3) {
    return `Usernames must be at least 3 characters long`;
  }
}

function validatePassword(password: unknown) {
  if (typeof password !== "string" || password.length < 6) {
    return `Passwords must be at least 6 characters long`;
  }
}

export function routeData() {
  return createServerData$(async (_, { request }) => {
    if (await getUser(request)) {
      throw redirect("/");
    }
    return {};
  });
}

export default function Login() {
  const data = useRouteData<typeof routeData>();
  const params = useParams();

  const [loggingIn, { Form }] = createServerAction$(async (form: FormData) => {
    const loginType = form.get("loginType");
    const username = form.get("username");
    const password = form.get("password");
    const redirectTo = form.get("redirectTo") || "/";
    if (
      typeof loginType !== "string" ||
      typeof username !== "string" ||
      typeof password !== "string" ||
      typeof redirectTo !== "string"
    ) {
      throw new FormError(`Form not submitted correctly.`);
    }

    const fields = { loginType, username, password };
    const fieldErrors = {
      username: validateUsername(username),
      password: validatePassword(password),
    };
    if (Object.values(fieldErrors).some(Boolean)) {
      throw new FormError("Fields invalid", { fieldErrors, fields });
    }

    switch (loginType) {
      case "login": {
        const user = await login({ username, password });
        if (!user) {
          throw new FormError(`Username/Password combination is incorrect`, {
            fields,
          });
        }
        return createUserSession(`${user.id}`, redirectTo);
      }
      case "register": {
        const userExists = await db.user.findUnique({ where: { username } });
        if (userExists) {
          throw new FormError(`User with username ${username} already exists`, {
            fields,
          });
        }
        const user = await register({ username, password });
        if (!user) {
          throw new FormError(
            `Something went wrong trying to create a new user.`,
            {
              fields,
            }
          );
        }
        return createUserSession(`${user.id}`, redirectTo);
      }
      default: {
        throw new FormError(`Login type invalid`, { fields });
      }
    }
  });

  function updateResponses() {
    for (let itemIndex in state.surveyFormat.pages[state.currentPage]) {

      let value;
      let item = state.surveyFormat.pages[state.currentPage][itemIndex];
      console.log(item.type)

      if (item.type === "text_box") {
        let htmlItem = document.getElementById(item.id) as HTMLInputElement;
        value = htmlItem.value;
        setState("surveyFormat", "pages", state.currentPage, Number(itemIndex), "response", value);
        console.log(value)
      }

      // if multiple choice, find out which button is selected
      if (item.type === "multiple_choice") {
        let radioButtons = document.getElementsByName(item.id)!;
        for (let i in radioButtons) {
          if ((radioButtons[i] as HTMLInputElement).checked) {
            value = (radioButtons[i] as HTMLInputElement).value;
            setState("surveyFormat", "pages", state.currentPage, Number(itemIndex), "response", value);
          }
        }

      }
    }

  }


  return (
    <>
      {/* <main>
      <h1>Login</h1>
      <Form>
        <input
          type="hidden"
          name="redirectTo"
          value={params.redirectTo ?? "/"}
        />
        
        <fieldset>
          <legend>Login or Regiter?</legend>
          
          <label>
            <input type="radio" name="loginType" value="login" checked={true} />{" "}
            Login
          </label>
          <label>
            <input type="radio" name="loginType" value="register" /> Register
          </label>
        </fieldset>
        <div>
          <label for="username-input">Username</label>
          <input name="username" placeholder="kody" />
        </div>
        <Show when={loggingIn.error?.fieldErrors?.username}>
          <p role="alert">{loggingIn.error.fieldErrors.username}</p>
        </Show>
        <div>
          <label for="password-input">Password</label>
          <input name="password" type="password" placeholder="twixrox" />
        </div>
        <Show when={loggingIn.error?.fieldErrors?.password}>
          <p role="alert">{loggingIn.error.fieldErrors.password}</p>
        </Show>
        <Show when={loggingIn.error}>
          <p role="alert" id="error-message">
            {loggingIn.error.message}
          </p>
        </Show>
        <button type="submit">{data() ? "Login" : ""}</button>
      </Form>
    </main> */}


      <For each={state.surveyFormat.pages[state.currentPage]}   >
        {(item) => <RenderItem item={item} />}
      </For>

      <Show when={(state.currentPage > 0)} fallback={<button disabled={true}>previous page</button>}>
        <button onClick={() => {

          // update saved responses
          updateResponses();

          if (state.currentPage > 0) {
            setState("currentPage", c => c - 1);
            console.log("page " + state.currentPage)
          }

        }}>
          previous page
        </button>
      </Show>
      <Show when={(state.currentPage < state.maxPages - 1)} fallback={<button disabled={true}>next page</button>}>
        <button onClick={() => {

          // update saved responses
          updateResponses();

          // now change page if we should

          if (state.currentPage < state.maxPages - 1) {

            setState("currentPage", c => c + 1);
            console.log("page " + state.currentPage)
          }

        }}>
          next page
        </button>
      </Show>

    </>
  );
}
