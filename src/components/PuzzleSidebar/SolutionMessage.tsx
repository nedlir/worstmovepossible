import React from "react";
import CheckmarkIcon from "../../assets/Icons/CheckmarkIcon";
import "./SolutionMessage.css";

type SolutionMessageProps = {
  description: string;
};

const SolutionMessage: React.FC<SolutionMessageProps> = ({ description }) => (
  <div className="solution-message">
    <div className="solution-header">
      <div className="solution-icon">
        <CheckmarkIcon width={20} height={20} />
      </div>
      <span className="solution-title">Puzzle Solved!</span>
    </div>
    <span className="solution-description">{description}</span>
  </div>
);

export default SolutionMessage;
