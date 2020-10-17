import React, { useState } from "react";
import { graphql } from "@octokit/graphql";
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
        authorization: `token 1e707e8a4fde638ace80907e2661fc9608756e40`,
      },
    });
    console.log(repositoryOwner);
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
          <div className="timeline-container">
            {repos.map((repo) => {
              return (
                <div className="timeline-item" key={repo.link.url}>
                  <div className="timeline-item-content">
                    {repo.category.tag && (
                      <span
                        className="tag"
                        style={{ background: repo.category.color }}
                      >
                        {repo.category.tag}
                      </span>
                    )}
                    <time>{repo.date}</time>
                    <p>{repo.text}</p>
                    {repo.link && (
                      <a
                        href={repo.link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        {repo.link.text}
                      </a>
                    )}
                    <span className="circle" />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
