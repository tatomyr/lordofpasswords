import {test, expect} from "@playwright/test"

// Collects every dialog the page opens and closes it.
const collectDialogs = page => {
  const dialogs = []
  page.on("dialog", async dialog => {
    dialogs.push({
      type: dialog.type(),
      message: dialog.message(),
      defaultValue: dialog.defaultValue(),
    })
    await dialog.dismiss()
  })
  return dialogs
}

const fillForm = async (page, {length, service, masterpassword}) => {
  await page.locator("#passwordlength").fill(String(length))
  await page.locator("#service").fill(service)
  await page.locator("#masterpassword").fill(masterpassword)
}

test.describe("Modern Password Generator", () => {
  let dialogs
  test.beforeEach(async ({page}) => {
    dialogs = collectDialogs(page)
    await page.goto("/")
  })
  test("passes all the flow", async ({page}) => {
    await fillForm(page, {
      length: 6,
      service: "Service",
      masterpassword: "salt",
    })
    await page.locator("#special").check()
    await page.locator("[name=showpassword]").click()
    await expect
      .poll(() => dialogs)
      .toEqual([{type: "alert", message: "6Bt$70", defaultValue: ""}])
    await expect(page.locator("#service")).toBeFocused()
    await expect(page.locator("#service")).toHaveValue("")
  })
  test("passes the case sensitive flow", async ({page}) => {
    await fillForm(page, {
      length: 6,
      service: "Service",
      masterpassword: "salt",
    })
    await page.locator("#casesensitive").check()
    await page.locator("[name=showpassword]").click()
    await expect
      .poll(() => dialogs)
      .toEqual([{type: "alert", message: "THkT33", defaultValue: ""}])
  })
  test("steps the password length up from 0 to the minimal length 6", async ({
    page,
  }) => {
    await fillForm(page, {
      length: 0,
      service: "service",
      masterpassword: "salt",
    })
    await page.locator("#passwordlength").press("ArrowUp")
    await expect(page.locator("#passwordlength")).toHaveValue("6")
    await page.locator("#special").check()
    await page.locator("[name=showpassword]").click()
    await expect
      .poll(() => dialogs)
      .toEqual([{type: "alert", message: "6Bt$70", defaultValue: ""}])
  })
  test("contains a link to the repository with documentation", async ({
    page,
  }) => {
    await expect(page.getByRole("link", {name: "GitHub"})).toHaveAttribute(
      "href",
      "https://github.com/tatomyr/lordofpasswords#lord-of-passwords"
    )
  })
})

test.describe("Copy password to clipboard", () => {
  test("shows a notification after the password is copied", async ({page}) => {
    await page.addInitScript(() => {
      navigator.clipboard.writeText = () => Promise.resolve()
    })
    await page.goto("/")
    await fillForm(page, {
      length: 6,
      service: "service",
      masterpassword: "salt",
    })
    await page.locator("[name=copypassword]").click()
    await expect(page.locator(".notification")).toHaveText(
      "Copied to clipboard"
    )
  })
  test("shows a prompt with the password when the clipboard write fails", async ({
    page,
  }) => {
    const dialogs = collectDialogs(page)
    await page.addInitScript(() => {
      navigator.clipboard.writeText = () => Promise.reject(new Error())
    })
    await page.goto("/")
    await fillForm(page, {
      length: 6,
      service: "service",
      masterpassword: "salt",
    })
    await page.locator("[name=copypassword]").click()
    await expect
      .poll(() => dialogs)
      .toEqual([
        {
          type: "prompt",
          message: "Could not copy the password. Please do it manually:",
          defaultValue: "9Kb6vH",
        },
      ])
  })
})
