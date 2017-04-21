import React from 'react';
import ReactDOM from 'react-dom';

import Inputs from './components/Inputs.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  componentDidMount() {
    console.log('refs--->',document.getElementById('service'))
    document.getElementById('service').focus();
  }

  getPassword(e) {
    console.log(this, e);

    const service = e.target.service.value.toString();
    const salt = e.target.salt.value.toString();
    const pwLength = e.target.pwLength.value;

    console.log(service, salt, pwLength);

    if (service && salt && pwLength) {
      this.setState({ password: this.pw(service, salt, pwLength) });
      setTimeout(() => {
        this.refs.password.select();
      }, 0);
      setTimeout(() => {
        this.setState({ password: '' });
        console.log('refs--->',document.getElementById('service'))
        document.getElementById('service').focus();
        // setTimeout.
      }, 3000);
    }
  }

  pw(service_, salt_, pwLength) {
    const pwCharSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    const service = service_.toString();
    const salt = salt_.toString();
    let password = "Zz" + (pwLength % 10);
    for (let i = 3; i < pwLength; i++) {
      let j = i % service.length;
      let k = i % salt.length;

      let el = (
        service[j].charCodeAt() *
        salt[k].charCodeAt() +
        salt[k].charCodeAt()
      );
      //console.log(`${i},${j},${k},${el}`);
      password += pwCharSet[el % pwCharSet.length];
    }
    return password;
  }

  render() {
    return (
      <div className="container-fluid">
        <div className="page-header">
    			<h1>Password Generator</h1>
    			<h6>keep in mind one 'salt'</h6>
        </div>

    		{!this.state.password && (<Inputs getPassword={this.getPassword.bind(this)} />) ||
        (<div className="input-container">
          <input type="text" ref="password" value={this.state.password} readOnly />
        </div>)}
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
