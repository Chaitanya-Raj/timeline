import React from "react";

const Repo = ({ repos }) => {
  const days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  const months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];

  return (
    <div className="timeline-container">
      {repos.map((repo) => {
        const date = new Date(repo.date);
        let formatted_date = `${days[date.getDay()]}, ${date.getDate()} ${
          months[date.getMonth()]
        } ${date.getFullYear()}`;
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
              <time>{formatted_date}</time>
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
