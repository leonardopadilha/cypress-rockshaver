const cypress = require('cypress')
const tesults = require('cypress-tesults-reporter');

cypress.run({
  // specs to run here
  browser: 'chrome'
})
.then((results) => {
  const args = {
    target: 'token',
  }
  tesults.results(results, args);
})
.catch((err) => {
 console.error(err)
})