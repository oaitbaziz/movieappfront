import React, { useEffect } from "react";
import Heading from "components/Heading";
import { useHistory } from "react-router-dom";

const Notfound: React.FC = () => {
  const history = useHistory();

  useEffect(() => {
    setTimeout(() => {
      history.push("/");
    }, 5000);
  });

  return (
    <main>
      <div className="container container--pt">
        <Heading text="La page que vous cherchez n'existe pas vous allez être redirigé à la page d'acceuil..." />
      </div>
    </main>
  );
};

export default Notfound;
