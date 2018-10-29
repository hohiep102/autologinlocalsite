import HeadlessChrome from 'simple-headless-chrome';

const {
  USERNAME,
  PASSWORD,
  SITE = 'social,github,docs,media'
} = process.env

const URL_MAPPING = {
  github: 'http://github.harveynash.vn.local/',
  social: 'http://social.harveynash.vn.local/',
  docs: 'http://docs.harveynash.vn.local/',
  media: 'http://media.harveynash.vn.local/',
}
const browser = new HeadlessChrome({
  headless: false,
  chrome: {
    flags: [
      '--ignore-certificate-errors'
    ]
  }
})

const autoInput = async (url) => {
  await browser.init()

  const mainTab = await browser.newTab({
    privateTab: false
  })

  await mainTab.goTo(url, {
    timeout: 60000
  })

  await mainTab.wait(1000)

  await mainTab.click('body > div.main > div:nth-child(3) > form > input[type="button"]:nth-child(1)')

  await mainTab.wait(1000)

  await mainTab.type('body > div.main > div:nth-child(3) > form > table > tbody > tr:nth-child(1) > td:nth-child(2) > input[type="text"]', USERNAME)
  await mainTab.type('body > div.main > div:nth-child(3) > form > table > tbody > tr:nth-child(2) > td:nth-child(2) > input[type="password"]', PASSWORD)
  await mainTab.click('body > div.main > div:nth-child(3) > form > table > tbody > tr:nth-child(3) > td > input[type="submit"]:nth-child(5)')

  console.log(`duyet xong trang ${url}`)
}

const arrayURL = SITE && SITE.toLowerCase().split(',')

arrayURL.forEach(url => {
  const realURL = URL_MAPPING[url]

  if (realURL) {
    autoInput(realURL)
  }
})
