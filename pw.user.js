// ==UserScript==
// @name        PasswordGenerator
// @namespace		novhna
// @description	Generating of secure passwords for sites
// @include     https://*
// @include     http://*
// @version     0.0.1
// @grant       GM_getValue
// @grant       GM_setValue
// ==/UserScript==

const pwStyle = `
  position: fixed !important;
  display: inline-block !important;
  bottom: 10px !important;
  left: 10px !important;
  /* width: 100px !important; */
  /* height: 100px !important; */
  border-radius: 5px !important;
  /* background-color: rgba(255, 100, 100, 0.75) !important; */
  /* text-align: center !important; */
  /* line-height: 50px !important; */
  color: rgba(255,255,255,1) !important;
  font-size: 8px !important;
  padding: 0 5px !important;
  margin: 0 !important;
  height: ;
  min-height: ;

  z-index: 99999;
`;

const elementsStyle = `
  font-family: Arial !important;
  font-size: 10px !important;
  padding: inherit !important;
  height: inherit !important;
  min-height: inherit !important;
`;

const pwStart = () => {
  if (window === window.top) {
    const pwFrame = document.createElement('div');
    pwFrame.id = 'pw-frame';
    pwFrame.innerHTML = `<button id="pw-button" style="${elementsStyle}">PW →</button>`;
    pwFrame.style = pwStyle;

    document.body.appendChild(pwFrame);

    document.getElementById('pw-button').addEventListener('click', () => {
      const service = location.hostname.split('.');
      pwFrame.innerHTML = `<input id="pw-length" type="number" value="8" placeholder="password length" style="${elementsStyle} width: 50px;" />&nbsp;` +
        `<input id="pw-salt" type="password" placeholder="salt" style="${elementsStyle} width: 50px;" />&nbsp;` +
        service.map(item => `<button class="pw-submit" style="${elementsStyle}">${item} ⇒</button>`).join('&nbsp;') +
        '&nbsp;' +
        `<input id="pw-service" placeholder="service" style="${elementsStyle} width: 50px;" />&nbsp;` +
        `<button id="pw-manual-submit" style="${elementsStyle}">⇒</button>&nbsp;` +
        `<button id="pw-close" style="${elementsStyle}">⨯</button>`;

      for (const item of document.getElementsByClassName('pw-submit')) {
        item.addEventListener('click', (event) => {
          getPassword(event.target.textContent);
        });
      }

      document.getElementById('pw-manual-submit').addEventListener('click', () => {
        getPassword(document.getElementById('pw-service').value);
      });

      document.getElementById('pw-salt').focus();
    });
  }
}

(() => {
  pwStart();
})();

const getPassword = (service) => {
  console.log(service);

  const salt = document.getElementById('pw-salt').value;
  const pwLength = document.getElementById('pw-length').value;

  document.getElementById('pw-frame').innerHTML = `<input id="pw-password" value="${pw(service, salt, pwLength)}" style="${elementsStyle}" />`;
  document.getElementById('pw-password').select();
  document.execCommand('copy');
  setTimeout(() => {
    document.getElementById('pw-frame').remove();
    pwStart();
  }, 1000);
}

const pw = (service_, salt_, pwLength) => {
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
