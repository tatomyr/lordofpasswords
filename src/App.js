import React from 'react';
import Inputs from './components/Inputs';
import Banner from './components/Banner';
import Spinner from './components/Spinner';

class App extends React.Component {
  static pwChar(code) {
    const pwCharSet = '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'; // 62 symbols
    return pwCharSet[code % pwCharSet.length];
  }

  static pw3(service_, salt_, pwLength) {
    let service = service_.toString();
    if (service.length === 1) {
      service += App.pwChar(service.charCodeAt());
    }
    let salt = salt_.toString();
    if (!((salt.length + 1) % service.length && service.length % (salt.length + 1))) {
      salt += App.pwChar((salt.length + service.length));
    }

    let sum = 0;
    /* // Mobile IE doesn't support this
    for (let item of service) {
      sum += item.charCodeAt();
    }
    for (let item of salt) {
      sum += item.charCodeAt();
    }
    /* */
    for (let j = 0; j < service.length; j++) {
      sum += service.charCodeAt(j);
    }
    for (let k = 0; k < salt.length; k++) {
      sum += salt.charCodeAt(k);
    }
    /* */

    const jOffset = sum % service.length;
    const kOffset = sum % (salt.length + 1);

    // I don't know why, but Array(pwLength).fill(0) doesn't create an array properly
    const pwArr = [];

    for (let i = 0; !(i >= pwLength && i >= service.length && i >= (salt.length + 1)); i++) {
      const innerSalt = salt + App.pwChar(i);

      // Service & salt offsets:
      const j = (i + jOffset) % service.length;
      const k = (i + kOffset) % innerSalt.length;

      pwArr[i % pwLength] = (pwArr[i % pwLength] || 0) +
        i + (service.charCodeAt(j) ** 2) + (innerSalt.charCodeAt(k) ** 2);
    }

    const password = pwArr.reduce((prev, item) => prev + App.pwChar(item), '');
    return password;
  }

  constructor(props) {
    super(props);

    this.state = {
      password: '',
      displaySpinner: 'none',
    };
  }

  componentDidMount() {
    document.getElementById('service').focus();
  }

  getRecurrPw(service, salt, pwLength, callback) {
    const password = App.pw3(service, salt, pwLength);

    let upperCasedCount = 0;
    let lowerCasedCount = 0;
    let numbersCount = 0;
    /* // Mobile IE doesn't support this
    for (let val of password) {
      numbersCount += !isNaN(+val) && 1 || 0;
      upperCasedCount += val.toUpperCase() === val && isNaN(+val) && 1 || 0;
      lowerCasedCount += val.toLowerCase() === val && isNaN(+val) && 1 || 0;
    }
    /* */
    for (let index = 0; index < password.length; index++) {
      const val = password[index];
      numbersCount += !isNaN(+val) && 1 || 0;
      upperCasedCount += val.toUpperCase() === val && isNaN(+val) && 1 || 0;
      lowerCasedCount += val.toLowerCase() === val && isNaN(+val) && 1 || 0;
    }
    /* */

    if (numbersCount >= 2 && upperCasedCount >= 1 && lowerCasedCount >= 1) {
      this.setState({ displaySpinner: 'none' });
      return callback(password);
    }

    return this.getRecurrPw(password, salt, pwLength, callback);
  }

  handleSubmit(e) {
    const service = e.target.service.value.toString();
    const salt = e.target.salt.value.toString();
    const pwLength = e.target.pwLength.value;
    localStorage.pwLength = pwLength;

    if (service && salt && pwLength) {
      this.setState({ displaySpinner: 'block' });
      setTimeout(() => {
        this.getRecurrPw(service, salt, pwLength, password => {
          this.setState({ password });
          this.password.select();

          if (document.execCommand('copy')) {
            // Doesn't work in Firefox
            setTimeout(() => {
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

  handleClick() {
    // This works for Firefox:
    this.password.select();
    document.execCommand('copy');
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
            (
              <Inputs
                handleSubmit={e => this.handleSubmit(e)}
                pwLength={+localStorage.getItem('pwLength') || 10}
              />
            ) :
            (
              <div>
                <div className="input-container">
                  <label htmlFor="password">
                    Your password
                    <input
                      type="text"
                      ref={ref => { this.password = ref; }}
                      value={this.state.password}
                      readOnly
                    />
                  </label>
                </div>
                <div className="input-container">
                  <input
                    type="button"
                    onClick={() => this.handleClick()}
                    value="Copy to Clipboard"
                  />
                </div>
              </div>
            )
          }
        </div>
        <Banner />
        <Spinner display={this.state.displaySpinner} />
      </div>
    );
  }
}

export default App;
