import React from 'react';
import ReactDOM from 'react-dom';

import Inputs from './components/Inputs.jsx';
import Banner from './components/Banner.jsx';
import Spinner from './components/Spinner.jsx';

class App extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      password: '',
      displaySpinner: 'none'
    };
  }

  componentDidMount() {
    document.getElementById('service').focus();
  }

  handleSubmit(e) {
    // console.clear();

    document.getElementById('progress').innerHTML += ` 1 `;

    const service = e.target.service.value.toString();
    const salt = e.target.salt.value.toString();
    const pwLength = e.target.pwLength.value;
    localStorage.pwLength = pwLength;

    if (service && salt && pwLength) {
      document.getElementById('progress').innerHTML += ` 2 `;
      console.log('1>----------');
      this.setState({ displaySpinner: 'block' });
      console.log('2>----------');
      setTimeout(() => {
        document.getElementById('progress').innerHTML += ` 3 `;
        this.getRecurrPw(service, salt, pwLength, (password) => {
          this.setState({ password });
          document.getElementById('progress').innerHTML += ` 4 `;
          this.refs.password.select();
          console.log('copied:',document.execCommand('copy'));

          if (document.execCommand('copy')) {
            // Doesn't work in Firefox
            document.getElementById('progress').innerHTML += ` 5 `;
            setTimeout(() => {
              document.getElementById('progress').innerHTML += ` 6 `;
              this.setState({ password: '' });
              document.getElementById('service').focus();
            }, 1000);
          }
        });
      }, 10);
    }

    if (service && !salt) document.getElementById('salt').focus();
    if (!service) document.getElementById('service').focus();
  }

  getRecurrPw(service, salt, pwLength, callback) {
    const password = this.pw3(service, salt, pwLength);

    let upperCasedCount = 0;
    let lowerCasedCount = 0;
    let numbersCount = 0;
    for (let val of password) {
      numbersCount += !isNaN(+val) && 1 || 0;
      upperCasedCount += val.toUpperCase() === val && isNaN(+val) && 1 || 0;
    	lowerCasedCount += val.toLowerCase() === val && isNaN(+val) && 1 || 0;
    }
    console.log('--->',  numbersCount,upperCasedCount, lowerCasedCount,)
    if (numbersCount >= 2 && upperCasedCount >= 1 && lowerCasedCount >= 1) {
      this.setState({ displaySpinner: 'none' });

      return callback(password);
    } else {
      return this.getRecurrPw(password, salt, pwLength, callback);
    }
  }

  pw3(service_, salt_, pwLength) {
    let service = service_.toString();
    if (service.length === 1) {
      service += this.pwChar(service.charCodeAt());
    }
    let salt = salt_.toString();
    if (!((salt.length + 1) % service.length && service.length % (salt.length + 1))) {
      salt += this.pwChar((salt.length + service.length));
    }

    let sum = 0;
    for (let item of service) {
      sum += item.charCodeAt();
    }
    for (let item of salt) {
      sum += item.charCodeAt();
    }
    const jOffset = sum % service.length;
    const kOffset = sum % (salt.length + 1);

    // I don't know why, but Array(pwLength).fill(0) doesn't create an array properly (??)
    const pwArr = [];
    console.log(service, jOffset, salt, kOffset, pwArr, pwLength);


    for (let i = 0; !(i >= pwLength && i >= service.length && i >= (salt.length + 1)); i++) {
      let innerSalt = salt + this.pwChar(i);

      // Service & salt offsets:
      let j = (i + jOffset) % service.length;
      let k = (i + kOffset) % innerSalt.length;

      console.log(pwArr[i % pwLength] );
      pwArr[i % pwLength] = (pwArr[i % pwLength] || 0) +
        i + Math.pow(service.charCodeAt(j), 2)  + Math.pow(innerSalt.charCodeAt(k), 2);


      console.log(
        i,
        service[j],
        `${innerSalt[k]}=${innerSalt}[${k}]`,
        pwArr[i % pwLength], pwArr[i % pwLength] % 62, this.pwChar(pwArr[i % pwLength]), i % pwLength,
        // i >= pwLength && i >= service.length && i >= innerSalt.length
      );

    }
    const password = pwArr.reduce((prev, item) => prev + this.pwChar(item), '');
    console.log(password);
    return password;
  }

  pwChar(code) {
    const pwCharSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // 62 symbols
    return pwCharSet[code % pwCharSet.length];
  }

  handleClick() {
    // This works for Firefox:
    console.log('created password:', this.refs.password.value);
    this.refs.password.select();
    document.execCommand('copy')
    this.setState({ password: '' });
    setTimeout(() => {
      document.getElementById('service').focus();
    }, 0);
  }

  render() {
    return (
      <div>
        <div className="container-fluid">
          <div className="page-header">
      			<h1>Password Generator</h1>
      			<h6>keep in mind one 'salt'</h6>
          </div>

      		{!this.state.password ?
            (<Inputs handleSubmit={this.handleSubmit.bind(this)} pwLength={localStorage.pwLength || 10} />) :
            (<div>
              <div className="input-container">
                <label htmlFor="password">Your password</label>
                <input type="text" ref="password" value={this.state.password} readOnly />
              </div>
              <div className="input-container">
                <input type="button" onClick={this.handleClick.bind(this)} value="Copy to Clipboard" />
              </div>
            </div>)}
        </div>
        <Banner />
        <Spinner display={this.state.displaySpinner} />
        <div id="progress">=</div>
      </div>
    );
  }
}

ReactDOM.render(<App />, document.getElementById('react-root'));
