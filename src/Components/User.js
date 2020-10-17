import React from "react";

const User = ({ user }) => {
  return (
    <div className="user-info">
      <a href={user.url}>
        <img src={user.avatarUrl} alt="Avatar" />
        <h1>{user.login}</h1>
      </a>
      <a href={`${user.url}/repositories`}>
        <h1>
          Total Repositories <br />
          {user.repositories.totalCount}
        </h1>
      </a>
    </div>
  );
};

export default User;
