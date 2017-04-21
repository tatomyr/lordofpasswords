import React from 'react';

export default (props) => (
  <form onSubmit={(e) => {e.preventDefault(); props.getPassword(e)}}>
    <div className="input-container">
      <label htmlFor="pwLength">Password length</label>
      <input type="number" name="pwLength" id="pwLength" placeholder="Password length..." defaultValue="8" />
    </div>
    <div className="input-container">
      <label htmlFor="service">Service</label>
      <input type="text" name="service" id="service" placeholder="Service (site) name..." />
    </div>
    <div className="input-container">
      <label htmlFor="salt">Salt</label>
      <input type="password" name="salt" id="salt" placeholder="'Salt'..." />
    </div>
    <div className="input-container">
      <input type="submit" value="Get password" />
    </div>
  </form>
);
