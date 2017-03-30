import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

let nextId=0;

// function makeApiCall(){
// 	var url = "https://gateway.marvel.com/v1/public/characters?apikey=92dde4ac94c721be4feaac337e4b990a"
// 	return $.get(url)
// }

// let Image = React.createClass({
//   render: function(){
//     console.log(this.props.searchResults === true);
//     return(
//       <img src={this.props.searchResults.thumbnail.path + "." + this.props.searchResults.thumbnail.extension} />
//     )
//   }
// })


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
  getInitialState: function(){
    return {searchResults: [],
            getImage: "" }
	},
  showResults: function(response){
    this.setState({
      searchResults: response.data.results[0]
    })
    console.log(response.data.results[0]);
  },
  search: function(URL){
    $.get("https://gateway.marvel.com/v1/public/characters?apikey=92dde4ac94c721be4feaac337e4b990a").then(function(response){
      this.showResults(response);
    }.bind(this))
  },
  getImage: function(){
    this.setState({
      pullImage: this.state.searchResults.thumbnail.path + "." + this.state.searchResults.thumbnail.extension
    })
  },

  // loadData: function(){
  //     makeApiCall().then(function(data){
  //       this.setState({data:data.data.results[nextId]}.bind(this));
  //     });
  // },

  componentDidMount: function(){
		this.search("https://gateway.marvel.com/v1/public/characters?apikey=92dde4ac94c721be4feaac337e4b990a")
	},

  propTypes: {
    title: React.PropTypes.string,
  },

  getDefaultProps: function() {
    return {
      title: "Marvel Superheroes",
    }
  },

  render: function() {
    if(this.state.pullImage == true){
      return (
        <div className="scoreboard">
          <Header title={this.props.title}/>
          <div className="heroWrapper">

            <img src={this.state.pullImage}/>
          </div>
        </div>
      );
    }
    return (<div>Loading...</div>);
  }
});
ReactDOM.render(<Application/>, document.getElementById('container'));
