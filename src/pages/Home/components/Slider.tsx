import React from "react";

import config from "config";

interface ItemShape {
  id: number;
  name?: string;
  title?: string;
  backdrop_path: string;
}
interface Props {
  data: ItemShape[];
}

const Slider: React.FC<Props> = ({ data }) => {
  return (
    <div className="carousel-wrapper">
      <div
        id="home-carousel"
        className="carousel slide carousel-fade"
        data-bs-ride="carousel"
        data-bs-interval="2500"
      >
        <div className="carousel-inner">
          {data?.map(({ id, backdrop_path, name, title }, index) => (
            <div
              className={`carousel-item ${index === 0 ? "active" : ""}`}
              key={id}
            >
              <img
                src={`${config.cdnFullWidth}${backdrop_path}`}
                className="d-block w-100"
                alt={name || title}
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Slider;
