function injectHTML(data) {
  const doc = document.getElementsByTagName('textarea')[0]
  const txt = doc.value
  const curPos = doc.selectionStart

  const newTxt = txt.slice(0, curPos) + data + txt.slice(curPos)

  document.getElementsByTagName('textarea')[0].value = newTxt
  updateCursor(curPos, data)
}

const updateCursor = function (curPos, text) {
  // update cursor to be at the end of insertion
  const doc = document.getElementsByTagName('textarea')[0]
  doc.selectionStart = curPos + text.length
  doc.selectionEnd = curPos + text.length
  doc.focus()
}

//elements
function injectKbBold() {
  const data = `<strong></strong>`

  injectHTML(data)
}

function injectKbItalic() {
  const data = `<em></em>`

  injectHTML(data)
}

function injectKbBoldAndItalic() {
  const data = `<strong><em></em></strong>`

  injectHTML(data)
}

//elements
function injectKbParagraph() {
  const data = `<p>
        XXX
</p>`

  injectHTML(data)
}

function injectKbListItem() {
  const data = '<li>XXX</li>'

  injectHTML(data)
}

function injectKbListLink() {
  const data = '<li><a href="XXX">XXX</a></li>'

  injectHTML(data)
}

function injectKbUnorderedList() {
  const data = `<ul>
        <li><a href="XXX">XXX</a></li>
        <li><a href="XXX">XXX</a></li>
</ul>`

  injectHTML(data)
}

function injectKbDescriptionList() {
  const data = `<dl>
        <dt>
        1
        </dt>
        <dd>
                XXX
        </dd>
        <dd>
        <center>
        <p>
                IMG
        </p>
        </center>
        </dd>
</dl>`

  injectHTML(data)
}

function injectKbDescriptionStep() {
  const data = `<dt>
        0
        </dt>
        <dd>
                XXX
        </dd>
        <dd>
        <center>
        <p>
                IMG
        </p>
        </center>
        </dd>`

  injectHTML(data)
}

function injectKbLoomVideo() {
  const data = `<hr>
<h3 id="XXX">Tutorial video: XXX </h3>
<center>
<iframe src="https://www.loom.com/embed/XXX" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="560" height="315" frameborder="0">
</iframe>
</center>`

  injectHTML(data)
}

function injectKbYouTube() {
  const data = `<hr>
<h3 id="XXX">Tutorial video: XXX </h3>
<div class="embed-container">
        <center>
        <iframe src="https://www.youtube.com/embed/XXX" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen="" width="560" height="315" frameborder="0">
        </iframe>
        </center>
</div>`

  injectHTML(data)
}

function injectKbH2() {
  const data = `<hr>
<h2 id="XXX">XXX</h2>`

  injectHTML(data)
}

function injectKbH3() {
  const data = `<hr>
<h3 id="XXX">XXX</h3>`

  injectHTML(data)
}

function injectKbH4() {
  const data = `<hr>
<h4 id="XXX">XXX</h4>`

  injectHTML(data)
}

// carry on with cursor positions

function injectKbDeviceList() {
  const data = `<ul>
        <li><a href="XXX">Web3 Wallet</a></li>
        <li><a href="XXX">Desktop</a></li>
        <li><a href="XXX">Mobile</a></li>
</ul>`

  injectHTML(data)
}

function injectKbTable() {
  const data = `<table>
<tbody>
<tr>
        <th>
                HEADER 1
        </th>
        <th>
                HEADER 2
        </th>
</tr>
<tr>
        <td>
                DATA 2
        </td>
        <td>
                DATA 2
        </td>
</tr>
</tbody>
</table>`

  injectHTML(data)
}

function injectKbImage() {
  const data = `<dd>
<center>
<p>
        IMG
</p>
</center>
</dd>`

  injectHTML(data)
}

function injectKbCalloutYellow() {
  const data = `<p class="callout-yellow">
        XXX
</p>`

  injectHTML(data)
}

function injectKbCalloutRed() {
  const data = `<p class="callout-red">
        XXX
</p>`

  injectHTML(data)
}

function injectKbCalloutGreen() {
  const data = `<p class="callout-green">
        XXX
</p>`

  injectHTML(data)
}

function injectKbCalloutBlue() {
  const data = `<p class="callout-blue">
        XXX
</p>`

  injectHTML(data)
}

function injectKbCallout12Words() {
  const data = `<p class="callout-red">
        <strong>Please be very careful with your 12-word secret recovery phrase and private keys</strong>, because they control access to your funds. Never share them with anyone, and only import them into platforms that you trust 100%. If you choose to import your 12-word phrase or private keys into a third-party platform, you do so at your own risk. To find out more, check out this article from our Knowledge Base: <a href="https://support.exodus.com/article/767-how-do-i-keep-my-money-safe">How do I keep my money safe?</a>
</p>`

  injectHTML(data)
}

function injectKbCalloutPrKeys() {
  const data = `<p class="callout-red">
        <strong>Please be very careful with your private keys</strong>, because they control access to your funds. Never share them with anyone, and only import them into platforms that you trust 100%. If you choose to import your private keys into a third-party platform, you do so at your own risk. To find out more, check out this article from our Knowledge Base: <a href="https://support.exodus.com/article/767-how-do-i-keep-my-money-safe">How do I keep my money safe?</a>
</p>`

  injectHTML(data)
}

function injectKbToc() {
  const data = `<p>
        ARTICLE INTRO
</p>
<hr>
<h2>In this article:</h2>
<ul>
        <li><a href="#XXX">HEADING (H2)</a></li>
        <ul>
                <li><a href="#XXX">HEADING (H3)</a></li>
                <ul>
                        <li><a href="#XXX">HEADING (H4)</a></li>
                </ul>
        </ul>
</ul>`

  injectHTML(data)
}

function injectKbSpanishLink() {
  const data = `<hr>
<center>
<p>
        <a href="XXX">Lee este artículo en Español | Read this article in Spanish</a>
</p>
</center>`

  injectHTML(data)
}

function injectKbClassMobile() {
  const data = `class="mobileImg"`

  injectHTML(data)
}

const toolkitUi = `
<div id='kbToggler' style='width: 100%; display:flex; justify-content:center;'>
  <button id='kbTogglerButton' style='position:fixed; bottom:15px; width:200px; color:white; background-color:#0771e3; border-radius:5px;'>Open KB Toolkit</button>

  <div id='kbToolkitContainer' style='width:250px; height:680px; padding:5px; border-radius:5px; border:1px solid #0771e3; background-color:#fafafa; display:none; position:fixed; bottom:50px; z-index:999; box-shadow:4px 4px 7px #888888'>
    <div id='kbToolkitTitle' style='margin-left:10px; margin-bottom:10px; margin-top:10px;'>
      <h2>KB Toolkit</h2>
    </div>

    <div id='textTitle' style='margin-top:15px; margin-left:10px;'>
      <h5>Text</h5>
    </div>
    <div style='padding-left:5px; padding-top:10px;'>
      <button id='kb-b' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#209bab; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Bold</button>
      <button id='kb-i' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#122080; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Italic</button>
      <button id='kb-bi' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#601280; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Bold and Italic</button>
    </div>

    <div id='elementsTitle' style='margin-top:15px; margin-left:10px;'>
      <h5>Elements</h5>
    </div>
    <div style='padding-left:5px; padding-top:10px;'>
      <button id='kb-p' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#eb4034; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Paragraph</button>
      <button id='kb-li' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#32a852; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>List item</button>
      <button id='kb-ll' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#8132a8; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>List link</button>
      <button id='kb-ul' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#a88132; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Unordered list</button>
      <button id='kb-device' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#209bab; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Device list</button>
      <button id='kb-table' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#fcba03; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Table</button>
      <button id='kb-spanish' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#300fbf; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Spanish link</button>
    </div>

    <div id='descriptionListTitle' style='margin-top:15px; margin-left:10px'>
      <h5>Description list</h5>
    </div>
    <div style='padding-left:5px; padding-top:10px;'>
    <button id='kb-dl' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#1e4b75; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Description list</button>
    <button id='kb-ds' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#eb4034; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>New Step</button>
    </div>

    <div id='mediaTitle' style='margin-top:15px; margin-left:10px'>
      <h5>Media</h5>
    </div>
    <div style='padding-left:5px; padding-top:10px;'>
      <button id='kb-img' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#300fbf; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Image</button>
      <button id='kb-loom' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#8132a8; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Loom video</button>
      <button id='kb-youtube' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#ed0000; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>YouTube video</button>
      <button id='kb-class-mobile' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#209bab; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Mobile img class</button>
    </div>

    <div id='sectionTitle' style='margin-top:15px; margin-left:10px'>
      <h5>Sections</h5>
    </div>
    <div style='padding-left:5px; padding-top:10px;'>
      <button id='kb-toc' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#a88132; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>TOC</button>
      <button id='kb-h2' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#0771e3; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>H2</button>
      <button id='kb-h3' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#eb4034; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>H3</button>
      <button id='kb-h4' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#32a852; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>H4</button>
    </div>

    <div id='calloutTitle' style='margin-top:15px; margin-left:10px'>
      <h5>Callouts</h5>
    </div>
    <div style='padding-left:5px; padding-top:10px;'>
      <button id='kb-cy' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#d4ce2f; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Yellow</button>
      <button id='kb-cr' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#d62a1e; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Red</button>
      <button id='kb-cg' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#77c276; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Green</button>
      <button id='kb-cb' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#76a1c2; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Blue</button>
      <button id='kb-12-word' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#d62a1e; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>12-word phrase</button>
      <button id='kb-pr-keys' class='sidebar-button' style='margin:0px 0px 5px 5px; background-color:#d62a1e; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:3px;'>Private keys</button>
    </div>

    <div id='errorsContainer' style='background-color:#ededed; width:100%; padding:10px 0px 10px 0px; border-radius:5px; margin-top:20px;'>
      <div id='errorsTitle' style='margin-left:10px; margin-bottom:10px;'>
        <h5>Errors</h5>
      </div>
      <div id='errors' style='margin-left:10px'>
        <div style='margin-bottom:5px; color:gray'>Keychainify's: <span id='keychains' style='color:red'></span></div>
        <div style='margin-bottom:5px; color:gray'>Nbsp's: <span id='nbsps' style='color:red'></span></div>
      </div>
      <button id='docCleaner' class='sidebar-button' style='margin-left:10px; background-color:#4287f5; color:white; border:none; box-shadow:2px 2px 2px #888888; border-radius:5px;'>Clean HTML</button>
    </div>

  </div>
</div>
`