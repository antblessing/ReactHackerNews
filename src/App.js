import React, { Component } from 'react';
import './App.css';

const list = [
  {
    title: 'React',
    url: 'https://facebook.github.io/react/',
    author: 'Jordan Walke',
    num_comments: 3,
    points: 4,
    objectID: 0
  },
  {
    title: 'Redux',
    url: 'https://github.com/reactjs/redux',
    author: 'Dan Abramov, Andrew Clark',
    num_comments: 2,
    points: 5,
    objectID: 1
  },
];

const DEFAULT_QUERY = 'redux';
const PATH_BASE = 'https://hn.algolia.com/api/v1';
const PATH_SEARCH = '/search';
const PARAM_SEARCH = 'query=';

class App extends Component {

  constructor(props) {
   super(props);

   this.state = {
     searchTerm: DEFAULT_QUERY,
     result: null,
   }

   this.setSearchTopStories = this.setSearchTopStories.bind(this);
   this.fetchSearchTopStories = this.fetchSearchTopStories.bind(this);
   this.onDismiss = this.onDismiss.bind(this);
   this.onSearchSubmit = this.onSearchSubmit.bind(this);
   this.onSearchChange = this.onSearchChange.bind(this);
  }

  setSearchTopStories(result) {
    this.setState({result});
  }

  fetchSearchTopStories(searchTerm) {
    fetch(`${PATH_BASE}${PATH_SEARCH}?${PARAM_SEARCH}${searchTerm}`)
    .then(response => response.json())
    .then(result => this.setSearchTopStories(result));
  }

  componentDidMount() {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
  }

  onDismiss(id) {
    function isNotId(item) {
      return item.objectID !== id;
    }

    const updatedHits = this.state.result.hits.filter(isNotId);
    this.setState({
      result: {...this.state.result, hits: updatedHits}
    });
  }

  onSearchSubmit(event) {
    const { searchTerm } = this.state;
    this.fetchSearchTopStories(searchTerm);
    // Prevent page reload
    event.preventDefault();
  }

  onSearchChange(event) {
    this.setState({searchTerm: event.target.value});
  }

  render() {
    const { searchTerm, result } = this.state;

    return (
      <div className="page">
        <div className="interactions">
          <Search
          value={searchTerm}
          onChange={this.onSearchChange}
          onSubmit={this.onSearchSubmit}
          >   
          Search
          </Search>
        </div>
        { result ? 
          <Table 
            list={result.hits}
            onDismiss={this.onDismiss}
          />
          : null
        }
      </div>
    );
  }
}

const Search = ({ value, onChange, children, onSubmit }) =>
  <form onSubmit={onSubmit}>
    <input 
      className="glowing-border"
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit">
      {children}
    </button>
  </form>

const Table = ({ list, onDismiss }) =>
  <div className="table">
  { list.map(item => 
    <div key={item.objectID} className="table-row">
      <span style={{ width: '40%'}}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%'}}>{item.author}</span>
      <span style={{ width: '10%'}}>{item.num_comments}</span>
      <span style={{ width: '10%'}}>{item.points}</span>
      <span style={{ width: '10%'}}>
        <Button
        onClick={() => onDismiss(item.objectID)}
        className="button-inline"
        >
        Dismiss
        </Button> 
      </span>
    </div>
  )}
  </div>

const Button = ({ onClick, className = '', children}) =>

  <button
  onClick={onClick}
  className={className}
  type="button"
  >
  {children}
  </button>


function isSearched(searchTerm) {
  return function(item) {
    return !searchTerm || item.title.toLowerCase().includes(searchTerm.toLowerCase());
  }
}

export default App;
