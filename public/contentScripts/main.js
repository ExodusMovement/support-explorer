/* entry point for content scripts */

//inject tookit on refresh/direct load
checkKbArticle()

//inject toolkit on navigation
lastUrl = location.href
new MutationObserver(() => {
  const url = location.href
  if (url !== lastUrl) {
    lastUrl = url
    checkKbArticle()
  }
}).observe(document, { subtree: true, childList: true })