import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

let nextId=0;

// function makeApiCall(){
// 	var url = "https://gateway.marvel.com/v1/public/characters?apikey=92dde4ac94c721be4feaac337e4b990a"
// 	return $.get(url)
// }

let Image = React.createClass({
  render: function(){
    // imageURL = this.props.searchResults.thumbnail.path + "." + this.props.searchResults.thumbnail.extension;
    return(
      <img  />
    )
  }
})


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
    return {searchResults: []}
	},
  showResults: function(response){
    this.setState({
      searchResults: response.data.results[nextId]
    })
    console.log(response.data.results[nextId]);
  },
  search: function(URL){
    $.ajax({
      type: "GET",
      dataType: 'jsonp',
      url: URL,
      success: function(response){
        this.showResults(response);
      }.bind(this)
    })
  },
  // getImage: function(){
  //   return this.props.data.thumbnail.path + "." + this.props.data.thumbnail.extension
  // },

  loadData: function(){
      makeApiCall().then(function(data){
        this.setState({data:data.data.results[nextId]}.bind(this));
      });
  },

  componentDidMount: function(){
		this.search("https://gateway.marvel.com/v1/public/characters?apikey=92dde4ac94c721be4feaac337e4b990a");
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
    return (
      <div className="scoreboard">
        <Header title={this.props.title}/>
        <div className="heroWrapper">
          <Image searchResults= {this.state.searchResults}/>
        </div>
      </div>
    );
  }
});
ReactDOM.render(<Application/>, document.getElementById('container'));
