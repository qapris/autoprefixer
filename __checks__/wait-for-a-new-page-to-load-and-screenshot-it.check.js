const expect = require("expect")
const { chromium } = require("playwright")

;(async () => {
  const browser = await chromium.launch()
  const page = await browser.newPage()

  // Change checklyhq.com to your site's URL,
  // or, even better, define a SITE_URL environment variable
  // to reuse it across your browser checks
  await page.goto(process.env.YOUR_SITE_URL || "https://www.checklyhq.com/")

  // Locate the documentation link
  const docsLink = page.locator("nav >> text='Docs'")

  // Attach an event listener to wait for a page navigation
  // and click the link
  await Promise.all([page.waitForNavigation(), docsLink.click()])

  // Test that you're on the correct page
  expect(await page.url()).toContain("/docs")

  // Take a screenshot of the current page
  await page.screenshot({ path: "screenshot.jpg" })

  // Close the browser and end the session
  await browser.close()
})()