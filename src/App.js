import React, { useEffect, useState } from "react";
import { graphql } from "@octokit/graphql";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import User from "./Components/User";
import Repo from "./Components/Repo";
import logo from "./github_logo.png";

const CLIENT_ID = "f989a2362def54e6d959";
const REDIRECT_URI = "https://chaitanya-raj.github.io/timeline/";

const App = () => {
  const [token, setToken] = useState(null);
  const [username, setUsername] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const first = 100;

  useEffect(() => {
    const code =
      window.location.href.match(/\?code=(.*)/) &&
      window.location.href.match(/\?code=(.*)/)[1];
    console.log(code);
    if (code) {
      fetch(`https://timeline-github.herokuapp.com/authenticate/${code}`)
        .then((response) => response.json())
        .then(({ token }) => {
          console.log(token);
          setToken(token);
        });
    }
  }, []);

  const notify = () =>
    toast("User does not exist", {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
    });

  const onSubmit = async (e) => {
    e.preventDefault();
    try {
      const { repositoryOwner } = await graphql({
        query: `
        query User($username: String!, $first: Int!) {
          repositoryOwner(login: $username) {
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
                isFork
                createdAt
                url
              }
            }
          }
        }
      `,
        username,
        first,
        headers: {
          authorization: `token ${token}`,
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
              isFork: r.isFork,
              link: {
                url: r.url,
                text: r.name,
              },
            };
          })
          .reverse()
      );
    } catch (error) {
      notify();
    }
  };

  console.log("token : ", token);

  return (
    <>
      <ToastContainer />

      {!token && (
        <div className="login">
          <img src={logo} alt="GitHub" />
          <a
            href={`https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&scope=user&redirect_uri=${REDIRECT_URI}`}
          >
            <button>login</button>
          </a>
        </div>
      )}

      {token && (
        <div className="container">
          <form onSubmit={onSubmit}>
            <input
              onSubmit={onSubmit}
              type="text"
              name="user"
              id="user"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Type a github username..."
              autoFocus
            />
          </form>
          {user && repos && (
            <div className="result">
              <User user={user} />
              <Repo repos={repos} />
            </div>
          )}
        </div>
      )}
    </>
  );
};

export default App;
