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

    //block duplicate players
    const newArrId = this.state.selected.filter((item, index) => {
      return this.state.selected.indexOf(item) === index;
    });
    //   console.log('added==>', newArrId);

    //condition for Batsman should be less than or equal to 3
    const arrBatsman = [];
    const newArrBatsman = newArrId.filter((item) => item.role === "Batsman");
    newArrBatsman.length <= 3 && arrBatsman.push(newArrBatsman);
    console.log('batsman==>', arrBatsman);

    //condition for All-Rounder should be less than or equal to 2
    const arrAllRounder = [];
    const newArrAllRounder = newArrId.filter(
      (item) => item.role === "All-Rounder"
    );
    newArrAllRounder.length <= 2 && arrAllRounder.push(newArrAllRounder);
    console.log('allrounder==>', arrAllRounder);

    //condition for Bowler should be less than or equal to 2
    const arrBowler = [];
    const newArrBowler = newArrId.filter((item) => item.role === "Bowler");
    newArrBowler.length <= 2 && arrBowler.push(newArrBowler);
    console.log('Bowler==>', arrBowler);

    // combine 3 results in one array
    const shortList = arrBatsman
      .flat()
      .concat(arrAllRounder.flat(), arrBowler.flat());
    console.log("shortlist", shortList);

    // check total points of players
    const pointTotal = shortList.reduce((acc, cur) => {
      for (var prop in cur) {
        if (acc.hasOwnProperty(prop)) acc[prop] += cur[prop];
        else acc[prop] = cur[prop];
      }
      return acc;
    }, {});
    // console.log('pointTotal', pointTotal);

    if(pointTotal.points <= 75){
        this.props.selectedPlayer(shortList);
    } else {
        this.setState({ error: true});
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
