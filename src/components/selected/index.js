import React from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";

function Selected(props) {
  return (
    <div>
      <span>
        Selected component <Link to="/">Go to Home Page</Link>
      </span>
      <br />
      {props.list.selected &&
        props.list.selected.map((player) => (
          <div>
            <span>{player.name}</span>
            {" - "}
            <span>{player.role}</span>
            {" - "}
            <span>{player.points}</span>
          </div>
        ))}
    </div>
  );
}

export default connect(({ list }) => ({ list }))(Selected);
