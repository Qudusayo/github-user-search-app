import "./scss/App.scss";
import React, { useEffect, useRef, useState } from "react";
import { Octokit } from "@octokit/core";
import Navbar from "./components/Navbar";
import SearchInput from "./components/SearchInput";
import CardDisplay from "./components/CardDisplay";

function App() {
  const [userData, setUserData] = useState({});
  const [invalidName, setInvalidName] = useState(false);
  const [githubUsername, setGithubUsername] = useState("octocat");

  const usernameInputRef = useRef<HTMLInputElement>(null);

  const usernameSubmitHandler = (event: React.FormEvent) => {
    event.preventDefault();
    const enteredUsername = usernameInputRef.current!.value;
    setGithubUsername(enteredUsername);
    // usernameInputRef.current!.value = "";
  };
  const octokit = new Octokit({
    auth: "",
  });

  useEffect(() => {
    const controller = new AbortController();
    const signal = controller.signal;

    const fetch = async () => {
      try {
        let response = await octokit.request("GET /users/{username}", {
          username: githubUsername,
          request: {
            signal,
          },
        });
        const {
          avatar_url,
          name,
          created_at,
          bio,
          public_repos,
          followers,
          following,
          location,
          twitter_username,
          blog,
          company,
        } = response.data;
        setUserData({
          avatar_url,
          name,
          created_at,
          bio,
          public_repos,
          followers,
          following,
          location,
          twitter_username,
          blog,
          company,
          githubUsername,
        });
      } catch (error: any) {
        if (error.name === "AbortError") {
          console.log("Request Aborted");
        }
        if (error?.response?.status === 404) {
          console.log("User not found");
          setInvalidName(true);
        }
      }
    };
    fetch();

    return () => {
      controller.abort();
    };
  }, [githubUsername]);

  return (
    <div className="App">
      <Navbar />
      <SearchInput
        invalidUsername={invalidName}
        usernameInputRef={usernameInputRef}
        usernameSubmitHandler={usernameSubmitHandler}
      />
      <CardDisplay userData={userData} />
    </div>
  );
}

export default App;
