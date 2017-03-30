import React from "react";
import ReactDOM from "react-dom";
import $ from "jquery";

let nextId=0;
let fetchedData;

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

var Cell = React.createClass({
    getInitialState: function() {
        return { name: "", descriptions: "", thumbnail: ""};
    },

    render: function() {
        return (
            <div>
                <h2>{this.props.title}</h2>
                <p>{this.props.description}</p>
                <img src={this.props.thumbnail} alt={this.props.description} />
            </div>
        );
    }
});

var Application = React.createClass({
  getInitialState: function(){
    return {data: fetchedData || []}
	},

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
