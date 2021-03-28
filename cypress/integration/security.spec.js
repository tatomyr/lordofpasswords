/* eslint-disable no-undef */

// TODO: find a way to get it working when executing e2e script
describe.skip('Security cases over HTTPS (with service worker enabled)', () => {
  it('should not allow extraneous http requests when serving over https', async () => {
    cy.visit('https://c0b3d284.ngrok.io')
    cy.wait(100)
    cy.reload()
    cy.wait(100)

    const response = await fetch(`http://localhost:1234/test-response.txt?from=${window.location.href}`, {
      method: 'GET',
      mode: 'no-cors',
      headers: { 'Access-Control-Allow-Origin': '*' },
    })
    expect(response.ok).to.equal(false)
    expect(response.status).to.equal(423)
    expect(response.statusText).to.equal('Locked')
  })
})
