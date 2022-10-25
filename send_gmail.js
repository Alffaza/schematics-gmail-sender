// const puppeteer = require('puppeteer'); // v13.0.0 or later
const puppeteer = require('puppeteer-extra');
const StealthPlugin = require('puppeteer-extra-plugin-stealth');
const csvToJson = require("convert-csv-to-json");
const fs = require('file-system');
puppeteer.use(StealthPlugin());
require("dotenv").config();

let pesertas = csvToJson.fieldDelimiter(",").getJsonFromCsv('peserta.csv');



var subject_msg = fs.readFileSync("template/subject.txt").toString();
var body_msg = fs.readFileSync("template/body.txt").toString();

function replacename(original_text, name){
  let result = original_text.replace(/#nama#/g, name);
  return result;
}


function replacetags(original_text, row){
  cols = Object.keys(pesertas[0]);
  var result = original_text;
  for (let i = 0; i < cols.length; i++) {
    var reg = new RegExp("#"+cols[i]+"#", "g");
    result = result.replace(reg, row[cols[i]]);
  }
  return result;
}

const konfigbrowser = {
  headless: false,
  args: [
    "--log-level=3", // fatal only

    "--no-default-browser-check",
    "--disable-infobars",
    "--disable-web-security",
    "--disable-site-isolation-trials",
    "--no-experiments",
    "--ignore-gpu-blacklist",
    "--ignore-certificate-errors",
    "--ignore-certificate-errors-spki-list",
    "--mute-audio",
    "--disable-extensions",
    "--no-sandbox",
  ],
  disablejavascript: true,
  ignoreHTTPSErrors: true,
  incognito: true,
  disablegpu: true,
};

(async () => {
    const browser = await puppeteer.launch(konfigbrowser);
    const page = await browser.newPage();
    const timeout = 50000;
    page.setDefaultTimeout(timeout);


    {
        const targetPage = page;
        await targetPage.setViewport({"width":1212,"height":601})
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.goto("https://www.google.com/intl/id/gmail/about/");
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        const element = await waitForSelectors([["aria/Login"],["body > header > div > div > div > a.button.button--medium.button--mobile-before-hero-only"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 58.13885498046875,
            y: 32.5,
          },
        });
        await Promise.all(promises);
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Email or phone"],["#identifierId"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        await element.click({
          offset: {
            x: 173,
            y: 22.212493896484375,
          },
        });
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Email or phone"],["#identifierId"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        const type = await element.evaluate(el => el.type);
        if (["select-one"].includes(type)) {
          await element.select(process.env.USEREMAIL);
        } else if (["textarea","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type(process.env.USEREMAIL);
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, process.env.USEREMAIL);
        }
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Enter");
    }
    {
        const targetPage = page;
        await targetPage.keyboard.up("Enter");
    }
    {
        const targetPage = page;
        const element = await waitForSelectors([["aria/Enter your password"],["#password > div.aCsJod.oJeWuf > div > div.Xb9hP > input"]], targetPage, { timeout, visible: true });
        await scrollIntoViewIfNeeded(element, timeout);
        const type = await element.evaluate(el => el.type);
        if (["select-one"].includes(type)) {
          await element.select(process.env.PASSWORD);
        } else if (["textarea","text","url","tel","search","password","number","email"].includes(type)) {
          await element.type(process.env.PASSWORD);
        } else {
          await element.focus();
          await element.evaluate((el, value) => {
            el.value = value;
            el.dispatchEvent(new Event('input', { bubbles: true }));
            el.dispatchEvent(new Event('change', { bubbles: true }));
          }, process.env.PASSWORD);
        }
    }
    {
        const targetPage = page;
        await targetPage.keyboard.down("Enter");
    }
    {
        const targetPage = page;
        const promises = [];
        promises.push(targetPage.waitForNavigation());
        await targetPage.keyboard.up("Enter");
        await Promise.all(promises);
    }
    for (let i = 0; i < pesertas.length; i++) {
      let peserta = pesertas[i];
      console.log("start: " + peserta["email"]);
      {
          const targetPage = page;
          const element = await waitForSelectors([["aria/Compose"],["body > div:nth-child(20) > div.nH > div > div.nH.aqk.aql.bkL > div.aeN.WR.nH.oy8Mbf > div.aic > div > div"]], targetPage, { timeout, visible: true });
          await scrollIntoViewIfNeeded(element, timeout);
          await element.click({
            offset: {
              x: 10,
              y: 10,
            },
          });
      }
      {
          const targetPage = page;
          const element = await waitForSelectors([["aria/Search Field","aria/[role=\"combobox\"]"],["#\\:tp"]], targetPage, { timeout, visible: true });
          await scrollIntoViewIfNeeded(element, timeout);
          const type = await element.evaluate(el => el.type);
          if (["select-one"].includes(type)) {
            await element.select(peserta['email']);
          } else if (["textarea","text","url","tel","search","password","number","email"].includes(type)) {
            await element.type(peserta['email']);
          } else {
            await element.focus();
            await element.evaluate((el, value) => {
              el.value = value;
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
            }, peserta['email']);
          }
      }
      {
          const targetPage = page;
          const element = await waitForSelectors([["aria/Subject"],["#\\:pt"]], targetPage, { timeout, visible: true });
          await scrollIntoViewIfNeeded(element, timeout);
          await element.click({
            offset: {
              x: 4,
              y: 6.399993896484375,
            },
          });
      }
      {
          s_msg = replacetags(subject_msg, peserta);
          const targetPage = page;
          const element = await waitForSelectors([["aria/Subject"],["#\\:pt"]], targetPage, { timeout, visible: true });
          await scrollIntoViewIfNeeded(element, timeout);
          const type = await element.evaluate(el => el.type);
          if (["select-one"].includes(type)) {
            await element.select(s_msg);
          } else if (["textarea","text","url","tel","search","password","number","email"].includes(type)) {
            await element.type(s_msg);
          } else {
            await element.focus();
            await element.evaluate((el, value) => {
              el.value = value;
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
            }, s_msg);
          }
      }
      {
          let b_msg = replacetags(body_msg, peserta);
          const targetPage = page;
          const element = await waitForSelectors([["aria/Message Body"]], targetPage, { timeout, visible: true });
          await scrollIntoViewIfNeeded(element, timeout);
          const type = await element.evaluate(el => el.type);
          if (["select-one"].includes(type)) {
            await element.select(b_msg);
          } else if (["textarea","text","url","tel","search","password","number","email"].includes(type)) {
            await element.type("b_msg");
          } else {
            await element.focus();
            await element.evaluate((el, value) => {
              el.value = value;
              el.dispatchEvent(new Event('input', { bubbles: true }));
              el.dispatchEvent(new Event('change', { bubbles: true }));
            }, b_msg);
          }

          await targetPage.keyboard.type(b_msg);
      }

      {
        const targetPage = page;
        await targetPage.keyboard.down("Control");
    }   
    {
      const targetPage = page;
      await targetPage.keyboard.down("Enter");
      
  }
  {
      const targetPage = page;
      await targetPage.keyboard.up("Enter");
  }
  {
    const targetPage = page;
    await targetPage.keyboard.up("Control");
}
  }
    
    console.log("done");
    // await browser.close();

    async function waitForSelectors(selectors, frame, options) {
      for (const selector of selectors) {
        try {
          return await waitForSelector(selector, frame, options);
        } catch (err) {
          console.error(err);
        }
      }
      throw new Error('Could not find element for selectors: ' + JSON.stringify(selectors));
    }

    async function scrollIntoViewIfNeeded(element, timeout) {
      await waitForConnected(element, timeout);
      const isInViewport = await element.isIntersectingViewport({threshold: 0});
      if (isInViewport) {
        return;
      }
      await element.evaluate(element => {
        element.scrollIntoView({
          block: 'center',
          inline: 'center',
          behavior: 'auto',
        });
      });
      await waitForInViewport(element, timeout);
    }

    async function waitForConnected(element, timeout) {
      await waitForFunction(async () => {
        return await element.getProperty('isConnected');
      }, timeout);
    }

    async function waitForInViewport(element, timeout) {
      await waitForFunction(async () => {
        return await element.isIntersectingViewport({threshold: 0});
      }, timeout);
    }

    async function waitForSelector(selector, frame, options) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to waitForSelector');
      }
      let element = null;
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (element) {
          element = await element.waitForSelector(part, options);
        } else {
          element = await frame.waitForSelector(part, options);
        }
        if (!element) {
          throw new Error('Could not find element: ' + selector.join('>>'));
        }
        if (i < selector.length - 1) {
          element = (await element.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
        }
      }
      if (!element) {
        throw new Error('Could not find element: ' + selector.join('|'));
      }
      return element;
    }

    async function waitForElement(step, frame, timeout) {
      const count = step.count || 1;
      const operator = step.operator || '>=';
      const comp = {
        '==': (a, b) => a === b,
        '>=': (a, b) => a >= b,
        '<=': (a, b) => a <= b,
      };
      const compFn = comp[operator];
      await waitForFunction(async () => {
        const elements = await querySelectorsAll(step.selectors, frame);
        return compFn(elements.length, count);
      }, timeout);
    }

    async function querySelectorsAll(selectors, frame) {
      for (const selector of selectors) {
        const result = await querySelectorAll(selector, frame);
        if (result.length) {
          return result;
        }
      }
      return [];
    }

    async function querySelectorAll(selector, frame) {
      if (!Array.isArray(selector)) {
        selector = [selector];
      }
      if (!selector.length) {
        throw new Error('Empty selector provided to querySelectorAll');
      }
      let elements = [];
      for (let i = 0; i < selector.length; i++) {
        const part = selector[i];
        if (i === 0) {
          elements = await frame.$$(part);
        } else {
          const tmpElements = elements;
          elements = [];
          for (const el of tmpElements) {
            elements.push(...(await el.$$(part)));
          }
        }
        if (elements.length === 0) {
          return [];
        }
        if (i < selector.length - 1) {
          const tmpElements = [];
          for (const el of elements) {
            const newEl = (await el.evaluateHandle(el => el.shadowRoot ? el.shadowRoot : el)).asElement();
            if (newEl) {
              tmpElements.push(newEl);
            }
          }
          elements = tmpElements;
        }
      }
      return elements;
    }

    async function waitForFunction(fn, timeout) {
      let isActive = true;
      setTimeout(() => {
        isActive = false;
      }, timeout);
      while (isActive) {
        const result = await fn();
        if (result) {
          return;
        }
        await new Promise(resolve => setTimeout(resolve, 100));
      }
      throw new Error('Timed out');
    }
})();
