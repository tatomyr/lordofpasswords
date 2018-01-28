import React from 'react';
import PropTypes from 'prop-types';

const Spinner = ({ display }) => (
  <div className="spinner" style={{ display }}>
    <img className="spinner__img" src="/spinner.gif" alt="loading..." />
  </div>
);

Spinner.propTypes = {
  display: PropTypes.string.isRequired,
};

export default Spinner;
