import React from "react";
import "./Now.scss"

interface NowProps {
  onClick: () => void;
}

const Now: React.FC<NowProps> = ({onClick}) => {
  return (
    <div className="now">
      <button type="button" className="now__button button button--now" onClick={onClick}>Set now date</button>
    </div>
  );
};

export default Now;
