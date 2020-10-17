import React, { useState } from "react";
import { graphql } from "@octokit/graphql";
import "./App.css";
import User from "./Components/User";
import Repo from "./Components/Repo";

const { REACT_APP_TOKEN } = process.env;

const App = () => {
  const [login, setLogin] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const first = 100;

  const onSubmit = async (e) => {
    e.preventDefault();
    const { repositoryOwner } = await graphql({
      query: `
        query User($login: String!, $first: Int!) {
          repositoryOwner(login: $login) {
            login
            avatarUrl
            url
            repositories(first: $first) {
              totalCount
              nodes {
                name
                description
                primaryLanguage{
                  name
                  color
                }
                createdAt
                url
              }
            }
          }
        }
      `,
      login,
      first,
      headers: {
        authorization: `token ${REACT_APP_TOKEN}`,
      },
    });
    setUser(repositoryOwner);
    setRepos(
      repositoryOwner.repositories.nodes
        .map((r) => {
          return {
            text: r.description,
            date: r.createdAt.split("T")[0],
            category: {
              tag: r.primaryLanguage ? r.primaryLanguage.name : null,
              color: r.primaryLanguage ? r.primaryLanguage.color : null,
            },
            link: {
              url: r.url,
              text: r.name,
            },
          };
        })
        .reverse()
    );
  };

  return (
    <div className="container">
      <form onSubmit={onSubmit}>
        <input
          onSubmit={onSubmit}
          type="text"
          name="user"
          id="user"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
          placeholder="Type a github username..."
        />
      </form>
      {user && repos && (
        <div className="result">
          <User user={user} />
          <Repo repos={repos} />
        </div>
      )}
    </div>
  );
};

export default App;
