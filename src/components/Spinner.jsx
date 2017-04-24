import React from 'react';

export default (props) => (
  <div className="spinner" style={{ display: props.display }}>
    <img className="spinner__img" src="src/components/spinner.gif" />
  </div>
);
