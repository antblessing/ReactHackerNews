import React from 'react';
import Button from './Button';
import '../styles/table.css';

const Table = ({ list, onDismiss }) =>
  <div className="table">
    <div className="table-row">
      <span className="large-column">
        Article
      </span>
      <span className="medium-column">Author</span>
      <span className="small-column">Comments</span>
      <span className="small-column">Points</span>
      <span className="small-column">Action</span>
    </div>
  { list.map(item =>
    <div key={item.objectID} className="table-row">
      <span style={{ width: '40%'}}>
        <a href={item.url}>{item.title}</a>
      </span>
      <span style={{ width: '30%'}}>{item.author}</span>
      <span className="small-column-cell">{item.num_comments}</span>
      <span className="small-column-cell">{item.points}</span>
      <span className="small-column-cell">
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

export default Table;