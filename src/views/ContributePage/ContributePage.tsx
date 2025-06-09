import React from "react";
import "./ContributePage.css";

type Contribution = "submit" | "report";

const ContributePage: React.FC = () => {
  const handleContribution = (type: Contribution) => {
    const baseUrl = "https://github.com/nedlir/worstmovepossible/issues/new";
    const params = new URLSearchParams({
      title: `${
        type === "submit"
          ? "Worst Move Puzzle Addition Suggestion"
          : "Puzzle Issue Report"
      }`,
      labels: type,
      template: `${type}_puzzle.yml`,
    });

    window.location.href = `${baseUrl}?${params.toString()}`;
  };

  return (
    <div className="content-container">
      <h1 className="page-title">Hey I wanna help too!</h1>
      <section className="content-section">
        <div className="contribute-grid">
          <article
            className="contribute-card"
            style={{ "--animation-order": 1 } as React.CSSProperties}
          >
            <h3>Add Puzzles</h3>
            <p>
              Design positions where catastrophic moves hide in plain sight.
              (Please include engine analysis proving the move's objective
              weakness, and confirm there are no alternative moves of equivalent
              evaluation)
            </p>
            <button
              className="action-button"
              onClick={() => handleContribution("submit")}
            >
              Propose Puzzle Challenge
            </button>
          </article>

          <article
            className="contribute-card"
            style={{ "--animation-order": 2 } as React.CSSProperties}
          >
            <h3>Quality Control</h3>
            <p>
              Flag puzzles if alternative solutions are objectively equivalent,
              or if the "worst move" lacks a clearly detrimental impact. (Please
              include analysis explaining why the move isn't decisively
              inferior, and why no significantly worse alternatives exist)
            </p>
            <button
              className="action-button"
              onClick={() => handleContribution("report")}
            >
              Report Puzzle Anomaly
            </button>
          </article>
        </div>

        <footer className="contribute-footer">
          <p>
            <em>
              Every verified submission earns you a spot in our
              <strong> Puzzle Hall of Fame</strong> (aka the readme on github)
            </em>
            🏆
          </p>
        </footer>
      </section>
    </div>
  );
};

export default ContributePage;
