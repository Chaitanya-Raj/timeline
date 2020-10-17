import React, { useState } from "react";
import { graphql } from "@octokit/graphql";
import { Chrono } from "react-chrono";
import "./App.css";

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
        authorization: `token 1e707e8a4fde638ace80907e2661fc9608756e40`,
      },
    });
    console.log(repositoryOwner);
    setUser(repositoryOwner);
    setRepos(
      repositoryOwner.repositories.nodes
        .map((r) => {
          return {
            title: r.createdAt,
            contentTitle: <a href={r.url}>{r.name}</a>,
            contentText: r.description,
          };
        })
        .reverse()
    );
    setTimeout(() => {
      document.querySelector(".result").scrollIntoView();
    }, 1500);
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
        />
      </form>
      {user && repos && (
        <div className="result">
          <div className="user-info">
            <img src={user.avatarUrl} alt="Avatar" />
            <h1>
              <a href={user.url}>{user.login}</a>
            </h1>
            <h1>
              Total Repositories <br />
              {user.repositories.totalCount}
            </h1>
          </div>
          <div style={{ width: "80vw", height: "65vh" }}>
            <Chrono
              items={repos}
              mode="TREE"
              cardHeight={300}
              slideShow
              slideItemDuration={2000}
              theme={{ primary: "#c6ac8f", secondary: "#323031" }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
