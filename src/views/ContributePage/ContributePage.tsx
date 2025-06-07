import React from "react";
import "./ContributePage.css";

const ContributePage: React.FC = () => {
  const handleContribution = (type: "submit" | "report") => {
    const baseUrl =
      "https://github.com/nedlir/worstmovepossible-website/issues/new";
    const params = new URLSearchParams({
      title: `${
        type === "submit" ? "Worst Move Puzzle" : "Puzzle Issue"
      } Report`,
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
            <h3>⚡ Architect New Puzzles</h3>
            <p>
              Design positions where catastrophic moves hide in plain sight.
              Include engine analysis proving the move's objective weakness.
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
            <h3>🚨 Quality Control Patrol</h3>
            <p>
              Flag puzzles where alternative solutions exist or the "worst move"
              lacks catastrophic consequences. Be our accuracy watchdog.
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
              <strong> Puzzle Hall of Fame</strong>
            </em>{" "}
            🏆
          </p>
        </div>
      </div>
    </div>
  );
};

export default ContributePage;
