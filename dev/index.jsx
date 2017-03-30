import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

let nextId=0;
let fetchedData;

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

var cell = React.createClass({
    getInitialState: function() {
        return { name: "", descriptions: "", thumbnail: ""};
    },
    loadCommentsFromServer: function() {
    },
    /**
     * componentDidMount is a method called automatically by React when a component is rendered.
     */
    componentDidMount: function() {
    },
    render: function() {
        return (
            <div className="col-md-4 col-md-4">
                <h2>{this.props.title}</h2>
                <p className="pCell descriptionCell">{this.props.description}</p>
                <img className="img-responsive" src={this.props.thumbnail} alt={this.props.description} />
            </div>
        );
    }
});

var Application = React.createClass({
  getInitialState: function(){
    return {data: fetchedData || []}
	},
  // showResults: function(response){
  //   this.setState({
  //     searchResults: response.data.results[0]
  //   })
  //   console.log(response.data.results[0]);
  // },
  loadAPI: function(){
    $.ajax({
      url: "https://gateway.marvel.com/v1/public/characters?apikey=92dde4ac94c721be4feaac337e4b990a",
      dataType: 'json',
      cache: true,
      success: function(data){
        fetchedData= data.data.results;
        this.setState({data: data.data.results});
        }.bind(this),
            error: function(xhr, status, err) {
                console.error(this.props.url, status, err.toString());
            }.bind(this)
    })
  },

  // getImage: function(){
  //   this.setState({
  //     pullImage: this.state.searchResults.thumbnail.path + "." + this.state.searchResults.thumbnail.extension
  //   })
  // },

  // loadData: function(){
  //     makeApiCall().then(function(data){
  //       this.setState({data:data.data.results[nextId]}.bind(this));
  //     });
  // },

  componentDidMount: function(){
		if(!fetchedData){
      this.loadAPI();
    }
	},

  // propTypes: {
  //   title: React.PropTypes.string,
  // },

  getDefaultProps: function() {
    return {
      title: "Marvel Superheroes",
    }
  },

  render: function() {
    var rows=[];
    this.state.data.forEach(function(hero) {
      var thumbnail = hero.thumbnail.path + "." + hero.thumbnail.extension;

      rows.push(<Cell title={hero.name} description={hero.description} thumbnail={thumbnail} />);
  });
      return (
         <div className="row">
             {rows}
         </div>
     );
  }
});
ReactDOM.render(<Application/>, document.getElementById('container'));
