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
    <div className="content-section">
      <div className="cta-header">
        <div className="contribute-grid">
          <div
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
          </div>

          <div
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
          </div>
        </div>
        <div className="contribute-footer">
          <p>
            <em>
              Every verified submission earns you a spot in our
              <strong> Puzzle Hall of Fame</strong> (aka the readme file in
              github)
            </em>{" "}
            🏆
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributePage;
