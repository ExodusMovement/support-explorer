const KB_TEST_ARTICLE_URL =
  "https://secure.helpscout.net/docs/5c2ba7d504286304a71dc91f/article/"
const KB_PUBLIC_ARTICLE_URL =
  "https://secure.helpscout.net/docs/59907fe3042863033a1bf150/article/"

function waitForElm(selector) {
  return new Promise((resolve) => {
    if (document.querySelector(selector)) {
      return resolve(document.querySelector(selector))
    }

    const observer = new MutationObserver((mutations) => {
      if (document.querySelector(selector)) {
        resolve(document.querySelector(selector))
        observer.disconnect()
      }
    })

    observer.observe(document.body, {
      childList: true,
      subtree: true,
    })
  })
}

const checkKbArticle = async () => {
  let url = location.href
  const sidebarButtons = await waitForElm("#sidebar-rt")
  const txt = await waitForElm("textarea")

  if (
    (url.includes(KB_TEST_ARTICLE_URL) ||
      url.includes(KB_PUBLIC_ARTICLE_URL)) &&
    !document.getElementById("docCleaner") &&
    sidebarButtons &&
    txt
  ) {
    const injectKbToolkit = document.createElement("div")
    injectKbToolkit.innerHTML = toolkitUi

    sidebarButtons.appendChild(injectKbToolkit)

    //open and close toolkit button
    document
      .getElementById("kbTogglerButton")
      .addEventListener("click", toggleKbToolkit)

    //elements
    document.getElementById("kb-p").addEventListener("click", injectKbParagraph)
    document.getElementById("kb-link").addEventListener("click", injectKbLink)
    document.getElementById("kb-li").addEventListener("click", injectKbListItem)
    document.getElementById("kb-ll").addEventListener("click", injectKbListLink)
    document
      .getElementById("kb-ul")
      .addEventListener("click", injectKbUnorderedList)
    document
      .getElementById("kb-device")
      .addEventListener("click", injectKbDeviceList)
    document.getElementById("kb-table").addEventListener("click", injectKbTable)
    document
      .getElementById("kb-spanish")
      .addEventListener("click", injectKbSpanishLink)

    //description list
    document
      .getElementById("kb-dl")
      .addEventListener("click", injectKbDescriptionList)
    document
      .getElementById("kb-ds")
      .addEventListener("click", injectKbDescriptionStep)

    //media
    document.getElementById("kb-img").addEventListener("click", injectKbImage)
    document
      .getElementById("kb-list-img")
      .addEventListener("click", injectKbListImage)
    document
      .getElementById("kb-loom")
      .addEventListener("click", injectKbLoomVideo)
    document
      .getElementById("kb-youtube")
      .addEventListener("click", injectKbYouTube)
    document
      .getElementById("kb-class-mobile")
      .addEventListener("click", injectKbClassMobile)

    //sections
    document.getElementById("kb-toc").addEventListener("click", injectKbToc)
    document.getElementById("kb-h2").addEventListener("click", injectKbH2)
    document.getElementById("kb-h3").addEventListener("click", injectKbH3)
    document.getElementById("kb-h4").addEventListener("click", injectKbH4)

    //callouts
    document
      .getElementById("kb-cy")
      .addEventListener("click", injectKbCalloutYellow)
    document
      .getElementById("kb-cr")
      .addEventListener("click", injectKbCalloutRed)
    document
      .getElementById("kb-cg")
      .addEventListener("click", injectKbCalloutGreen)
    document
      .getElementById("kb-cb")
      .addEventListener("click", injectKbCalloutBlue)
    document
      .getElementById("kb-12-word")
      .addEventListener("click", injectKbCallout12Words)
    document
      .getElementById("kb-pr-keys")
      .addEventListener("click", injectKbCalloutPrKeys)

    //text
    document.getElementById("kb-b").addEventListener("click", injectKbBold)
    document.getElementById("kb-i").addEventListener("click", injectKbItalic)
    document
      .getElementById("kb-bi")
      .addEventListener("click", injectKbBoldAndItalic)

    //clean html
    document.getElementById("docCleaner").addEventListener("click", cleanKbDoc)
    //document.getElementById('replaceUrl').addEventListener('click', replaceUrl)
    document.getElementById("scrollTop").addEventListener("click", scrollTop)

    checkDocErrors()
  }
}

const checkDocErrors = async function () {
  // Get article textarea
  const text = await document.getElementsByTagName("textarea")[0].value

  // Check errors
  const keychainCount = (text.match(/class="keychainify-checked"/g) || [])
    .length
  const nbspCount = (text.match(/&nbsp;/g) || []).length
  const urlCount = (text.match(/support.exodus.com/g) || []).length

  // Insert error count in Toolkit
  const keychains = document.getElementById("keychains")
  const nbsps = document.getElementById("nbsps")
  const urls = document.getElementById("oldUrls")
  keychains.innerHTML = keychainCount
  nbsps.innerHTML = nbspCount
  urls.innerHTML = urlCount
}

const cleanKbDoc = function () {
  const text = document.getElementsByTagName("textarea")[0].value

  let removedKeychain = text.replace(/class="keychainify-checked"/g, "")
  let removedNbsp = removedKeychain.replace(/&nbsp;/g, " ")
  document.getElementsByTagName("textarea")[0].value = removedNbsp
}

const replaceUrl = function () {
  const text = document.getElementsByTagName("textarea")[0].value

  let repUrl = text.replace(/support.exodus.com/g, "exodus.com/support")
  document.getElementsByTagName("textarea")[0].value = repUrl
}

const scrollTop = function () {
  window.scrollTo(0, 0)
}

const toggleKbToolkit = function () {
  const toolkitDiv = document.getElementById("kbToolkitContainer")
  const toolkitButton = document.getElementById("kbTogglerButton")

  console.log(toolkitDiv.style.display)

  if (toolkitDiv.style.display === "none") {
    toolkitDiv.style.display = "block"
    toolkitButton.innerHTML = "Close Toolkit"
  } else {
    toolkitDiv.style.display = "none"
    toolkitButton.innerHTML = "Open Toolkit"
  }
}
