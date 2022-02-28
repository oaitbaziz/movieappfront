import React from "react";

const Loading: React.FC = () => {
  return (
    <div className="loading">
      <div className="container">
        <div className="loading__content">
          <div className="spinner-grow text-danger" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
