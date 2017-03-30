import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

let nextId=0;

function makeApiCall(){
	var url = "https://gateway.marvel.com/v1/public/characters?apikey=92dde4ac94c721be4feaac337e4b990a"
	return $.get(url)
}


function Header(props){
  return(
    <div className="header">
      <h1>{props.title}</h1>
    </div>
  )
}
Header.propTypes = {
  title: React.PropTypes.string.isRequired,
};

var Application = React.createClass({
  loadData: function(){
      makeApiCall().then(function(data){
        this.setState({data:data.data.results[nextId]});
        nextId += 1;
      })
  },
  getInitialState: function(){
		return{ data: []};
	},
  getImage: function(){
    return this.props.data
  },
  componentWillMount: function(){
		this.loadData();
	},
  propTypes: {
    title: React.PropTypes.string,
    data: React.PropTypes.array,
  },

  getDefaultProps: function() {
    return {
      title: "Marvel Superheroes",
    }
  },

  render: function() {
    return (
      <div className="scoreboard">
        <Header title={this.props.title}/>
        <div className="heroWrapper">
          <img src={this.getImage()}/>
        </div>

      </div>
    );
  }
});
ReactDOM.render(<Application/>, document.getElementById('container'));
