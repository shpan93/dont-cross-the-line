import React from 'react';
import serialize from 'serialize-javascript';
import ReactDOM from 'react-dom/server';

const isLocal = process.env.NODE_ENV === 'development';

function renderJsFiles() {
  const res = [];
  if (isLocal) {
    res.push('../build/js/main.js');
  } else {
    res.push('../build/js/vendor.bundle.js');
    res.push('../build/js/main.min.js');
  }
  return res;
}

const Html = (props) => {
  const content = props.component ? ReactDOM.renderToString(props.component) : '';
  const state = props.store.getState();
  return (<html>
    <head />
    <body>
      <div dangerouslySetInnerHTML={{ __html: content }} id="app" />
      <script dangerouslySetInnerHTML={{ __html: `window.App=${serialize(state)};` }} />
      {renderJsFiles().map((file, key) => {
        return <script key={key} type="text/javascript" src={file} />;
      })}
    </body>
  </html>);
};

Html.propTypes = {
  component: React.PropTypes.object,
  store: React.PropTypes.object,
};

export default Html;
