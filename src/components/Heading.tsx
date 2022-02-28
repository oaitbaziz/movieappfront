import React from "react";

interface Props {
  text: string;
}
const Heading: React.FC<Props> = ({ text }) => {
  return (
    <div className="heading">
      <p className="h1 pb-5">{text}</p>
    </div>
  );
};

export default Heading;
