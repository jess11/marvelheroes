import React from "react";
import ReactDOM from "react-dom";

let PLAYERS = [
  {
    name: "Jim Hoskins",
    score: 31,
    id:1,
  },
  {
    name: "Andrew Chalkey",
    score: 35,
    id:2,
  },
  {
    name: "Alena Holligan",
    score:30,
    id:3,
  }
]

let nextId=4;

let Stopwatch = React.createClass({
  getInitialState: function(){
    return {
      running: false,
      elapsedTime: 0,
      previousTime: 0,
    }
  },

  componentDidMount: function(){
    this.interval = setInterval(this.onTick,1000);
  },
  //Must unmount component, otherwise will get a memory leak!!!
  componentWillUnmount: function(){
    clearInterval(this.interval);
  },

  onTick: function(){
    if(this.state.running){
      var now = Date.now();
      this.setState({
        previousTime: now,
        elapsedTime: this.state.elapsedTime + (now - this.state.previousTime),
      });
    }
    console.log('onclick');
  },

  onStart: function(){
    this.setState({
      running: true,
      previousTime: Date.now(),
    });

  },
  onStop: function(){
    this.setState({ running: false});
  },
  onReset: function(){
    this.setState({
      elapsedTime: 0,
      previousTime: Date.now(),
    })
  },

  render: function(){
    let seconds = Math.floor(this.state.elapsedTime/1000);
    // let startStop;
    // if (this.state.running){
    //   startStop = <button>Stop</button>;
    // } else {
    //   startStop = <button>Start</button>;
    // }
    return (
      <div className = "stopwatch">
        <h2>Stopwatch</h2>
        <div className="stopwatch-time">{seconds}</div>
        {this.state.running ?
          <button onClick ={this.onStop}>Stop</button>
          :
          <button onClick ={this.onStart}>Start</button>
        }
        <button onClick ={this.onReset}>Reset</button>
      </div>
    )
  }
})

let AddPlayerForm = React.createClass({
  propTypes: {
    onAdd: React.PropTypes.func.isRequired,
  },
  getInitialState: function(){
    return{
      name: "",
    };
  },
  onNameChange: function(e){
    console.log('onNameChange', e.target.value)
    this.setState({name: e.target.value})
  },
  onSubmit: function(e){
    e.preventDefault();
    this.props.onAdd(this.state.name);
    this.setState({name:""})
  },

  render: function(){
    return(
      <div className = "add-player-form">
        <form onSubmit={this.onSubmit}>
          <input type ="text" value={this.state.name} onChange = {this.onNameChange}/>
          <input type="submit" value= "Add Player"/>
        </form>
      </div>
    )
  }
})

function Stats(props){
  let totalPlayers = props.players.length;
  let totalPoints = props.players.reduce(function(total,player){
    return total + player.score;
  },0)

  return(
    <table className = "stats">
      <tbody>
        <tr>
          <td>Players:</td>
          <td>{totalPlayers}</td>
        </tr>
        <tr>
          <td>Total Points:</td>
          <td>{totalPoints}</td>
        </tr>
      </tbody>
    </table>
  )
}
Stats.propTypes = {
  players: React.PropTypes.array.isRequired,

};

function Header(props){
  return(
    <div className="header">
      <Stats players={props.players}/>
      <h1>{props.title}</h1>  {/* if using regular JS put it in between curly braces, but you can't use if/else statements*/}
      <Stopwatch/>
    </div>
  )
}
Header.propTypes = {
  title: React.PropTypes.string.isRequired,
  players: React.PropTypes.array.isRequired,
};



function Counter(props){
  return(
    <div className="counter">
      <button className= "counter-action decrement" onClick = {function(){props.onChange(-1)}}> - </button>
      <div className = "counter-score"> {props.score} </div>
      <button className= "counter-action increment"onClick = {function(){props.onChange(+1)}}> + </button>
    </div>
  )
}

Counter.propTypes = {
  score: React.PropTypes.number.isRequired,
  onChange: React.PropTypes.func.isRequired,
}

function Player(props){
  return(
    <div className= "player">
      <div className="player-name">
        <a className= "remove-player" onClick={props.onRemove}>x</a>
        {props.name}
      </div>
      <div className="player-score">
        <Counter score={props.score} onChange ={props.onScoreChange}/>
      </div>
    </div>
  )
}
Player.propTypes = {
  name: React.PropTypes.string.isRequired,
  score: React.PropTypes.number.isRequired,
  onScoreChange: React.PropTypes.func.isRequired,
  onRemove: React.PropTypes.func.isRequired,
}

let Application = React.createClass({
  propTypes: {
    title: React.PropTypes.string,
    initialPlayers: React.PropTypes.arrayOf(React.PropTypes.shape({
      name: React.PropTypes.string.isRequired,
      score: React.PropTypes.number.isRequired,
      id: React.PropTypes.number.isRequired,
    })).isRequired,
  },

  getDefaultProps: function(){
    return{
      title: "Scoreboard",
    }
  },

  getInitialState: function(){
    return{
      players:this.props.initialPlayers,
    };
  },

  onScoreChange: function (index, delta){
    console.log('onScoreChange',index, delta);
    this.state.players[index].score += delta;
    this.setState(this.state);
  },

  onPlayerAdd: function(name){
    console.log('Player added: ', name);
    this.state.players.push({
        name:name,
        score:0,
        id: nextId,
    });
    this.setState(this.state);
    nextId +=1;
  },

  onRemovePlayer: function(index){
    this.state.players.splice(index,1);
    this.setState(this.state)
  },

  render: function(){
    return(
      <div className="scoreboard">
        {/*classnames are used for styling not retrieving elements*/}
        <Header title={this.props.title} players={this.state.players}/>
        <div className="players">
          {this.props.initialPlayers.map(function(player,index){
            return (
              <Player
              onScoreChange= {function(delta){this.onScoreChange(index,delta)}.bind(this)}
                onRemove= {function(){this.onRemovePlayer(index)}.bind(this)}
                name ={player.name}
                score={player.score}
                key={player.id}/>
            )
            {/* a key allows for react to know to move items around instead of replacing them all*/}

        }.bind(this))}
          {/*<Player name ="Jim Hoskins" score={31}/>
          <Player name ="Andrew Chalkey" score={33}/>*/}
        </div>

        <AddPlayerForm onAdd={this.onPlayerAdd}/>
      </div>
    );
  }

})


//Application has a self closing tag as it has no children
ReactDOM.render(<Application initialPlayers = {PLAYERS}/>, document.getElementById('container'));
