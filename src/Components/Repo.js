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

  const lightenColor = (color, percent) => {
    var num = parseInt(color.replace("#", ""), 16),
      amt = Math.round(2.55 * percent),
      R = (num >> 16) + amt,
      B = ((num >> 8) & 0x00ff) + amt,
      G = (num & 0x0000ff) + amt;

    return (
      "#" +
      (
        0x1000000 +
        (R < 255 ? (R < 1 ? 0 : R) : 255) * 0x10000 +
        (B < 255 ? (B < 1 ? 0 : B) : 255) * 0x100 +
        (G < 255 ? (G < 1 ? 0 : G) : 255)
      )
        .toString(16)
        .slice(1)
    );
  };

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
                  style={{
                    background: (function () {
                      return lightenColor(repo.category.color, 20);
                    })(),
                  }}
                >
                  {repo.category.tag}
                </span>
              )}
              <time>{formatted_date}</time>
              <p>
                {repo.isFork && (
                  <i>
                    <b>(Forked) </b>
                  </i>
                )}
                {repo.text}
              </p>
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
