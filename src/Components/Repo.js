import React from "react";

const Repo = ({ repos }) => {
  return (
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
  );
};

export default Repo;
