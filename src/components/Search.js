import React from 'react';
import '../styles/search.css';

const Search = ({ value, onChange, children, onSubmit }) =>
  <form onSubmit={onSubmit}>
    <input
      className="glowing-border"
      type="text"
      value={value}
      onChange={onChange}
    />
    <button type="submit" className="mui-btn mui-btn--primary">
      {children}
    </button>
  </form>

export default Search;