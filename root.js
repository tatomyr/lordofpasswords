import {init, render} from "https://tatomyr.github.io/purity/purity.js"
import {ls} from "https://tatomyr.github.io/purity/ls.js"
import {getRecurrPw, inputAdapter} from "./app.js"

const {put, get} = ls("lordofpasswords")

const {mount, getState, setState} = init({
  ...get({passwordlength: 12}),
  showNotification: false,
})

// Visual effects
const onSuccessfullCopy = () => {
  setState(() => ({showNotification: true}))

  setTimeout(() => {
    setState(() => ({showNotification: false}))
  }, 10000)
}

// Handlers
const copyPassword = async (password) => {
  try {
    navigator.clipboard.writeText(password)
    onSuccessfullCopy()
  } catch (err) {
    window.prompt(
      `Could not copy the password. Please do it manually:`,
      password
    )
  }
}

const handleSubmit = (e) => {
  e.preventDefault()
  const passwordlength = +e.target.passwordlength.value
  put({passwordlength})
  setState(() => ({passwordlength}))
  getRecurrPw(inputAdapter(e.target), (password) => {
    e.target.reset()
    if (e.submitter.name === "showpassword") {
      setTimeout(() => window.alert(password), 300)
    } else {
      copyPassword(password)
    }
    e.target.service.focus()
  })
}

const root = () => render`
  <main id="root">
    <form 
      ::submit=${handleSubmit} 
      ::input=${() => {
        setState(() => ({showNotification: false}))
      }}
    >
      <section class="form-group">
        <label for="service">
          <div class="field-name">Public service (site) name</div>
          <input
            class="field-value" 
            name="service" 
            id="service"
            placeholder="service[@behalf][:year][:season]" 
            required
            autofocus
          />
        </label>
      </section>

      <section class="form-group">
        <label for="masterpassword">
          <div class="field-name">Masterpassword</div>
          <input 
            class="field-value"
            name="masterpassword"
            id="masterpassword"
            type="password"
            required 
          />
        </label>
      </section>

      <section class="form-group dual">
        <label for="special" class="inline left">
          <section class="checkbox-wrapper">
            <input name="special" id="special" type="checkbox" />
          </section>
          <div class="">Specials</div>
        </label>

        <label for="passwordlength" class="inline right">
          <div class="">Length</div>
          <input
            name="passwordlength"
            id="passwordlength"
            type="number"
            min="6"
            max="256"
            value="${getState().passwordlength}"
            required
          />
        </label>
      </section>

      <section id="copy" class="form-group buttons">
        ${
          getState().showNotification
            ? render`
              <div 
                class="notification button-like"
              >
                Copied to clipboard
              </div>
            `
            : render`
              <button name="copypassword" id="submit">
                Copy password to clipboard
              </button>
              <button name="showpassword">
                Show password
              </button>
            `
        }
      </section>
    </form>
  </main>
`

mount(root)

if ("serviceWorker" in navigator && window.location.protocol !== "http:") {
  navigator.serviceWorker
    .register("./lordofpasswords.sw.generated.js")
    .then((registration) => {
      // eslint-disable-next-line no-console
      console.info(
        "[lordofpasswords.sw] Registration successful, scope is:",
        registration.scope
      )
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.info(
        "[lordofpasswords.sw] Service worker registration failed, error:",
        error
      )
    })
}
