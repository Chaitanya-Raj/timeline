import React, { useState } from "react";
import { graphql } from "@octokit/graphql";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./App.css";
import User from "./Components/User";
import Repo from "./Components/Repo";

const REACT_APP_TOKEN = process.env.REACT_APP_TOKEN;

const App = () => {
  const [login, setLogin] = useState("");
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState(null);
  const first = 100;

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
                isFork
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

  // return (
  //   <>
  //     <ToastContainer />

  //     <div className="container">
  //       <form onSubmit={onSubmit}>
  //         <input
  //           onSubmit={onSubmit}
  //           type="text"
  //           name="user"
  //           id="user"
  //           value={login}
  //           onChange={(e) => setLogin(e.target.value)}
  //           placeholder="Type a github username..."
  //           autoFocus
  //         />
  //       </form>
  //       {user && repos && (
  //         <div className="result">
  //           <User user={user} />
  //           <Repo repos={repos} />
  //         </div>
  //       )}
  //     </div>
  //   </>
  // );

  return (
    <div className="maintenance">
      <h1>Down for Maintenance</h1>
      <p>We'll be back soon.</p>
    </div>
  );
};

export default App;
