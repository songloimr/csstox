import React from "react";

// Custom hook to consume the global state
import { useOutputType } from "../../AppContext";

import "./header.scss";
import Select from "./select/Select";

const Header = () => {
  const { outputType } = useOutputType();

  return (
    <header>
      <div className="header-wrapper">
        <div>
          <h1>
            CSS to &nbsp;
            <Select />
          </h1>
          <br />
        </div>
        <div>
          <p data-testid="header-message">
            Easily convert CSS text to {outputType} stylesheet objects.
          </p>
        </div>
      </div>
    </header>
  );
};

export default Header;
