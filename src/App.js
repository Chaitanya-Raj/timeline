import React, { useState } from "react";
import { graphql } from "@octokit/graphql";
import "./App.css";

const App = () => {
  const [login, setLogin] = useState("");
  const [user, setUser] = useState(null);
  const first = 50;

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
      {user && (
        <div className="result">
          <div className="user-info">
            <img
              src={user.avatarUrl}
              alt="Avatar"
              width="100px"
              height="100px"
            />
            <h1>
              <a href={user.url}>{user.login}</a>
            </h1>
          </div>
          <ul>
            {user.repositories.nodes.map((n) => (
              <li className="repo" key={n.name}>
                <p>{n.name}</p>
                <p>{n.description}</p>
                <p>{n.createdAt}</p>
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default App;
