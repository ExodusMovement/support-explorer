/* global chrome */

//@dev Checks for tab open matching the URL or source (as part of the URL). Redirects/focuses on to that tab if opened, regardless of window.

const existingTabCheck = async (url, source) => {
    var found = false;
    var tabId;
    let focusedTab;
    let currentTab;
    let snackbar = await document.getElementById("snackbar");
    let host =  await new URL(url).hostname;
    let path = await new URL(url).href;


    try {
        await chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                currentTab = tabs[0];
                if (
                    currentTab.url.search(source) > -1 || 
                    currentTab.url.search(host) > -1
                ) {
                    focusedTab = currentTab;
                }
            }
        );

        await chrome.windows.getAll({ populate: true }, function (windows) {
            windows.forEach(function (window) {
                window.tabs.forEach(function (tab) {
                    if (
                        tab.url.search(source) > -1 || 
                        tab.url.search(host) > -1
                    ) {
                        found = true;
                        tabId = tab.id;
                    }
                });
            });
            if (found === false) {
                chrome.tabs.create({ active: true, url: path + source });
            } else if (focusedTab === currentTab) {
                snackbar.innerText = "You're currently there ✅";
                snackbar.className = "show";
                snackbar.style.right = "50%";
                setTimeout(function () {
                    snackbar.className = snackbar.className.replace("show", "");
                    snackbar.style.right = snackbar.style.right.replace(
                        "50%",
                        "60%"
                    );
                }, 1500);
            } else {
                chrome.tabs.update(tabId, { selected: true });
                snackbar.innerText =
                    "The explorer is now open/focused in your other window 👀";
                snackbar.className = "show";
                snackbar.style.right = "15%";
                setTimeout(function () {
                    snackbar.className = snackbar.className.replace("show", "");
                    snackbar.style.right = snackbar.style.right.replace(
                        "15%",
                        "60%"
                    );
                }, 2500);
            }
        });
    } catch (e) {
        console.log(e);
    }
};

export default existingTabCheck;