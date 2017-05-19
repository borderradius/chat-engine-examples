var expect = require('expect.js');
var selenium = require('./selenium');

describe('redirect authorize', function () {
  this.timeout(9999999);

  selenium.runTests((clientFactory, webdriver, browser) => {
    var By = webdriver.By;
    var until = webdriver.until;

    it('[token] should result in a successful transaction ' + browser, function () {
      var driver = clientFactory();

      driver.get('https://auth0.github.io/auth0.js/example/test.html');
      driver.wait(until.elementLocated(By.id('loaded')), 10000);
      driver.findElement(By.id('login-response-type')).sendKeys('token');
      driver.findElement(By.className('login-redirect-authorize')).click();
      driver.wait(until.elementLocated(By.id('hlploaded')), 30000);
      driver.findElement(By.id('email')).sendKeys('johnfoo@gmail.com');
      driver.findElement(By.id('password')).sendKeys('1234');
      driver.findElement(By.id('upLogin')).click();
      driver.wait(until.elementLocated(By.id('parsed')), 10000);

      driver.findElement(By.id('err')).getText().then(function(value) {
        console.log('ERR:', value ? value : '-empty-');
        expect(value).to.equal('');
      });
      driver.findElement(By.id('result')).getText().then(function(value) {
        console.log('RESULT:', value);
        expect(value).to.not.equal('');

        var response = JSON.parse(value);

        expect(response.accessToken).to.be.ok();
        expect(response.idToken).to.not.be.ok();
        expect(response.tokenType).to.be.ok();
        expect(response.expiresIn).to.be.ok();
      });

      return driver.quit();
    });

    it('[code] should result in a successful transaction ' + browser, function () {
      var driver = clientFactory();

      driver.get('https://auth0.github.io/auth0.js/example/test.html');
      driver.wait(until.elementLocated(By.id('loaded')), 10000);
      driver.findElement(By.id('login-response-type')).sendKeys('code');
      driver.findElement(By.className('login-redirect-authorize')).click();
      driver.wait(until.elementLocated(By.id('hlploaded')), 30000);
      driver.findElement(By.id('email')).sendKeys('johnfoo@gmail.com');
      driver.findElement(By.id('password')).sendKeys('1234');
      driver.findElement(By.id('upLogin')).click();
      driver.wait(until.elementLocated(By.id('loaded')), 10000);

      driver.getCurrentUrl().then(function(url) {
        console.log('RESULT URL:', url);
        expect(url).to.contain('code=');
      });

      return driver.quit();
    });

    it('[token openid] should result in a successful transaction ' + browser, function () {
      var driver = clientFactory();

      driver.get('https://auth0.github.io/auth0.js/example/test.html');
      driver.wait(until.elementLocated(By.id('loaded')), 10000);
      driver.findElement(By.id('login-scope')).sendKeys('openid');
      driver.findElement(By.id('login-response-type')).sendKeys('token');
      driver.findElement(By.className('login-redirect-authorize')).click();
      driver.wait(until.elementLocated(By.id('hlploaded')), 30000);
      driver.findElement(By.id('email')).sendKeys('johnfoo@gmail.com');
      driver.findElement(By.id('password')).sendKeys('1234');
      driver.findElement(By.id('upLogin')).click();
      driver.wait(until.elementLocated(By.id('parsed')), 10000);

      driver.findElement(By.id('err')).getText().then(function(value) {
        console.log('ERR:', value ? value : '-empty-');
        expect(value).to.equal('');
      });

      driver.findElement(By.id('result')).getText().then(function(value) {
        console.log('RESULT:', value);
        expect(value).to.not.equal('');

        var response = JSON.parse(value);

        expect(response.accessToken).to.be.ok();
        expect(response.idToken).to.be.ok();
        expect(response.tokenType).to.be.ok();
        expect(response.expiresIn).to.be.ok();
      });

      return driver.quit();
    });

    it('[id_token] should result in a successful transaction ' + browser, function () {
      var driver = clientFactory();

      driver.get('https://auth0.github.io/auth0.js/example/test.html');
      driver.wait(until.elementLocated(By.id('loaded')), 10000);
      driver.findElement(By.id('login-response-type')).sendKeys('id_token');
      driver.findElement(By.className('login-redirect-authorize')).click();
      driver.wait(until.elementLocated(By.id('hlploaded')), 30000);
      driver.findElement(By.id('email')).sendKeys('johnfoo@gmail.com');
      driver.findElement(By.id('password')).sendKeys('1234');
      driver.findElement(By.id('upLogin')).click();
      driver.wait(until.elementLocated(By.id('parsed')), 10000);

      driver.findElement(By.id('err')).getText().then(function(value) {
        console.log('ERR:', value ? value : '-empty-');
        expect(value).to.equal('');
      });

      driver.findElement(By.id('result')).getText().then(function(value) {
        console.log('RESULT:', value);
        expect(value).to.not.equal('');

        var response = JSON.parse(value);

        expect(response.accessToken).to.not.be.ok();
        expect(response.idToken).to.be.ok();
        expect(response.tokenType).to.not.be.ok();
        expect(response.expiresIn).to.not.be.ok();
      });

      return driver.quit();
    });

    it('[token id_token] should result in a successful transaction ' + browser, function () {
      var driver = clientFactory();

      driver.get('https://auth0.github.io/auth0.js/example/test.html');
      driver.wait(until.elementLocated(By.id('loaded')), 10000);
      driver.findElement(By.id('login-response-type')).sendKeys('token id_token');
      driver.findElement(By.className('login-redirect-authorize')).click();
      driver.wait(until.elementLocated(By.id('hlploaded')), 30000);
      driver.findElement(By.id('email')).sendKeys('johnfoo@gmail.com');
      driver.findElement(By.id('password')).sendKeys('1234');
      driver.findElement(By.id('upLogin')).click();
      driver.wait(until.elementLocated(By.id('parsed')), 10000);

      driver.findElement(By.id('err')).getText().then(function(value) {
        console.log('ERR:', value ? value : '-empty-');
        expect(value).to.equal('');
      });

      driver.findElement(By.id('result')).getText().then(function(value) {
        console.log('RESULT:', value);
        expect(value).to.not.equal('');

        var response = JSON.parse(value);

        expect(response.accessToken).to.be.ok();
        expect(response.idToken).to.be.ok();
        expect(response.tokenType).to.be.ok();
        expect(response.expiresIn).to.be.ok();
      });

      return driver.quit();
    });
  })
});
