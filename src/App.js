import React from 'react';

const App = (props) => {
  return <div>{props.children}</div>;
};

App.propTypes = {
  children: React.PropTypes.object,
};

export default App;
