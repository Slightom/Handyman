import React, { useEffect, useState } from "react";
import "./Spinner.css";
import { Labels } from './myGlobal';

const Spinner = (props) => {
  debugger;
  //const [backto, setBackto] = useState(null);
  useEffect(() => {
    if (props.match && props.match.params && props.match.params.backto) {
      props.history.push('/' + props.match.params.backto);
    }
  }, [])

  return <div className="loader">{Labels.Loading}</div>;
};

export default Spinner;
