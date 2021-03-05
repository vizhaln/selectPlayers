import React, { PureComponent } from "react";
import { connect } from "react-redux";
import { Link } from "react-router-dom";
import data from '../../players.json';
import { defaultPlayer, selectedPlayer } from "../../actions";

export class Home extends PureComponent {
  constructor(props) {
    super(props);
    this.state = {
      list: data,
      selected: [],
      error: false,
    };
  }

  componentDidMount() {
    this.props.defaultPlayer();
  }

  addPlayer = (e, items) => {
    
    e.preventDefault();

    this.state.selected.push(items);
    const newArrId = this.state.selected.filter((item, index) => {
      return this.state.selected.indexOf(item) === index;
    });
    // console.log("==addplayers", newArrId);

    const arrBat = [];
    const newArrBat = newArrId.filter((item) => item.role === "Batsman");
    newArrBat.length <= 3 && arrBat.push(newArrBat);
    // console.log("==newArrBat", arrBat.flat());

    const arrAllRou = [];
    const newArrAllRou = newArrId.filter((item) => item.role === "All-Rounder");
    newArrAllRou.length <= 2 && arrAllRou.push(newArrAllRou);
    // console.log("==newArrAllRou", arrAllRou.flat());

    const arrBowl = [];
    const newArrBowl = newArrId.filter((item) => item.role === "Bowler");
    newArrBowl.length <= 2 && arrBowl.push(newArrBowl);
    // console.log("==newArrBow", arrBowl.flat());

    const shortList = arrBat.flat().concat(arrAllRou.flat(), arrBowl.flat());
    // console.log("===shortList", shortList.length);
    const pointsObj = shortList.reduce((acc, cur) => {
      for (var prop in cur) {
        if (acc.hasOwnProperty(prop)) acc[prop] += cur[prop];
        else acc[prop] = cur[prop];
      }
      return acc;
    }, {});
    if (pointsObj.points <= 75) {
      this.props.selectedPlayer(shortList);
    } else {
      this.setState({ error: true });
    }
  };

  delPlayer = (e, itemId) => {
    e.preventDefault();
    const newList = this.props.list.selected.filter(
      (item) => item.id !== itemId
    );
    this.setState({
      selected: newList,
    });
    this.props.selectedPlayer(newList);
    // console.log('deleted==>', newList);
  };

  render() {
    return (
      <>
        <div>
          Home Page{" "}
          <Link to="/selected">Navigate to selected players page</Link>
        </div>
        <br />
        {this.state.error && <span>Points Exceeded.!</span>}
        <br />
        <div>
          {this.state.list.map((player) => (
              <div>
                <span>{player.name}</span>
                {" - "}
                <span>{player.role}</span>
                {" - "}
                <span>{player.points}</span>{" "}
                <button
                  onClick={(e) => {
                    this.addPlayer(e, player);
                  }}
                >
                  add
                </button>
                <button
                  onClick={(e) => {
                    this.delPlayer(e, player.id);
                  }}
                >
                  delete
                </button>
              </div>
            ))}
        </div>
      </>
    );
  }
}

export default connect(
  ({ list }) => ({ list }),
  (dispatch) => ({
    defaultPlayer() {
      return dispatch(defaultPlayer());
    },
    selectedPlayer(list) {
      return dispatch(selectedPlayer(list));
    },
  })
)(Home);
