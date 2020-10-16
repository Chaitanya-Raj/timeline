import React, { useState } from "react";
import { graphql } from "@octokit/graphql";
import "./App.css";

const App = () => {
  const [login, setLogin] = useState("Chaitanya-Raj");
  const first = 50;

  const onSubmit = async (e) => {
    e.preventDefault();
    const { repositoryOwner } = await graphql({
      query: `
        query User($login: String!, $first: Int!) {
          repositoryOwner(login: $login) {
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
  };

  return (
    <div>
      <form onSubmit={onSubmit}>
        <input
          type="text"
          name="user"
          id="user"
          value={login}
          onChange={(e) => setLogin(e.target.value)}
        />
      </form>
    </div>
  );
};

export default App;
