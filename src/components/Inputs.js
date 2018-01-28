import React from 'react';
import PropTypes from 'prop-types';

const Inputs = ({ handleSubmit, pwLength }) => (
  <form
    onSubmit={e => {
      e.preventDefault();
      handleSubmit(e);
    }}
  >
    <div className="input-container">
      <label htmlFor="pwLength">
        Password length
        <input
          type="number"
          min="4"
          name="pwLength"
          id="pwLength"
          placeholder="..."
          defaultValue={pwLength}
          required
        />
      </label>
    </div>

    <div className="input-container">
      <label htmlFor="service">
        Public service (site) name
        <input
          type="text"
          name="service"
          id="service"
          placeholder="..."
        />
      </label>
    </div>

    <div className="input-container">
      <label htmlFor="salt">
        'Salt'
        <input type="password" name="salt" id="salt" placeholder="..." />
      </label>
    </div>

    <div className="input-container">
      <input type="submit" value="Get password" />
    </div>
  </form>
);

Inputs.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  pwLength: PropTypes.number.isRequired,
};

export default Inputs;
