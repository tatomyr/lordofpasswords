import React from 'react';

export default (props) => (
  <form onSubmit={(e) => {e.preventDefault(); props.getPassword(e)}}>
    <div className="input-container">
      <label htmlFor="pwLength">Password length</label>
      <input type="number" min="4" name="pwLength" id="pwLength" placeholder="..." defaultValue={props.pwLength} required />
    </div>
    <div className="input-container">
      <label htmlFor="service">Service (site) name</label>
      <input type="text" name="service" id="service" placeholder="..." />
    </div>
    <div className="input-container">
      <label htmlFor="salt">'Salt'</label>
      <input type="password" name="salt" id="salt" placeholder="..." />
    </div>
    <div className="input-container">
      <input type="submit" value="Get password" />
    </div>
  </form>
);
