/* global chrome */

// async function storeLinkStateOne() {
//     return new Promise((resolve, reject) => {
//         chrome.storage.local.set({ links: "block" }, () => {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//             } else {
//                 resolve("block");
//             }
//         });
//     })
// }

// async function storeLinkStateTwo() {
//     return new Promise((resolve, reject) => {
//         chrome.storage.local.set({ links: "none" }, () => {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//             } else {
//                 resolve("none");
//             }
//         });
//     })
// }

// async function storeSwitchState(e) {
//     return new Promise((resolve, reject) => {
//         chrome.storage.local.set({ switchForm: e.target.checked }, () => {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//             } else {
//                 resolve(e.target.checked);
//             }
//         });
//     })
// }

// async function findLinkState(links) {
//     return new Promise((resolve, reject) => {
//         chrome.storage.local.get([links], function(result) {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//             } else {
//                 resolve(result.links);
//             }
//         });
//     })
// }


// async function findSwitchState(switchForm) {
//     return new Promise((resolve, reject) => {
//         chrome.storage.local.get([switchForm], function(result) {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//             } else {
//                 resolve(result.switchForm);
//             }
//         });
//     })
// }

// async function findWaitTime(waitTimeThreshold) {
//     return new Promise((resolve, reject) => {
//         chrome.storage.local.get([waitTimeThreshold], function(result) {
//             if (chrome.runtime.lastError) {
//                 reject(chrome.runtime.lastError);
//             } 
//             // else if (result.waitTimeThreshold === undefined) {
//             //     reject(new Error("Link state error"));
//             // } 
//             else {
//                 resolve(result.waitTimeThreshold);

//             }
//         });
//     })
// }

document.addEventListener('DOMContentLoaded', async () => {

    getTimeTitle();

    let waitTimeThresholdEl = document.getElementById('waitTimeThreshold');

    chrome.storage.local.get(['waitTimeThreshold'], result => waitTimeThresholdEl.value = result.waitTimeThreshold);
    waitTimeThresholdEl.onchange = changeWaitTimeThreshold;

    // let link = document.getElementById("links");

    // let linkDisplay = await findLinkState('links');

    // if(linkDisplay === undefined){
    //     link.style.display = "none"
    // } else {
    //     link.style.display = linkDisplay;
    // }


    // let switchEl = document.getElementById('switchForm');

    // let switchDisplay = await findSwitchState('switchForm');

    // if(switchDisplay === undefined){
    //     switchEl.checked = true;
    // } else {
    //    switchEl.checked = switchDisplay;
    // }

    //@dev this is just for reference. Another way to do it. >> chrome.storage.local.get(['switchForm'], result => switchEl.checked = result.switchForm);

    const goToInbox = document.getElementById("inboxLink");
    goToInbox.addEventListener("click", openInbox);

    // let goHighFive = document.getElementById("highFive");
    // goHighFive.addEventListener("click", openHighFive);

    // let goHandbook = document.getElementById("handbook");
    // goHandbook.addEventListener("click", openHandbook);

    // let goForm = document.getElementById("feedbackForm");
    // goForm.addEventListener("click", openForm);

    // let goForecast = document.getElementById("dailyForecast");
    // goForecast.addEventListener("click", openForecast);

    // document.getElementsByTagName('button')[0].focus();

    // switchEl.onclick = await changeSwitch;


})

function getTimeTitle() {
    var snackbar = document.getElementById("snackbar");
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (time >= "12:00:00" && time <= "17:00:00") {
        snackbar.innerText = "Good Afternoon! 🚀";
    } else if (time >= "17:00:01" && time <= "23:59:59") {
        snackbar.innerText = "Good Evening! 🌙";
    } else {
        snackbar.innerText = "GM! 🌤️"
    }

    snackbar.className = "show";
    setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 1000);

}


// async function changeSwitch(e) {
//     var link = document.getElementById("links");

//     if (link.style.display === "none") {
//         link.style.display = "block";
//         await storeLinkStateOne();
//     } else {
//         link.style.display = "none";
//         await storeLinkStateTwo();
//     }

//     await storeSwitchState(e);

// }

function changeWaitTimeThreshold(e) {
    chrome.storage.local.set({ waitTimeThreshold: e.target.value }, () => console.log('New waitTimeThreshold: ' + e.target.value));
    chrome.runtime.sendMessage({ action: e.target.value });
    var snackbar = document.getElementById("snackbar");

    if (e.target.value == "off") {
        snackbar.innerText = "Ok, I've turned the alert " + e.target.value
    } else {
        snackbar.innerText = "Ok, I'll alert you for wait times over " + e.target.value + " minutes"
    }

    snackbar.className = "show";
    setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 2500);

}

// function tellMeUrgency(e) {
//     var snackbar = document.getElementById("snackbar");

//     try {
//         snackbar.innerText = "Right now the urgency is not set, select an option plz.";
//         snackbar.className = "show";
//         setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 2000);

//     } catch (error) {
//         console.log("Error in tell urgency method:", error);
//     }
// }



// To do: Link dictionary and combine url match functions into one or make class. 

// let dialyForecast = "https://coda.io/d/Support-Handbook_d7lplUJJ931/Daily-Forecast_su-BB#";
// let inboxLink = "https://secure.helpscout.net/mailbox/69f176a183caf9f4/";
// let highFive = "https://coda.io/form/SMSA-High-Five-Submission_dJKe5OcBBBi";
// let handbook = "https://coda.io/d/_dZd1uul9q6g/Social-Media_su8j2";
// let feedbackForm = "https://docs.google.com/forms/d/e/1FAIpQLSeshx0WxsZkSWjIIUPlba1zLX_dL_vLCXA0aPkvtQQezjE-PQ/viewform";

//let buttonArray = [dialyForecast, inboxLink, highFive, handbook, feedbackForm];

function openInbox() {
    var found = false;
    var tabId;
    
    chrome.windows.getAll({ populate: true }, function(windows) {
        windows.forEach(function(window) {
            window.tabs.forEach(function(tab) {
                if (tab.url.search("https://secure.helpscout.net/mailbox/4c021305e6c95617/") > -1) {
                    found = true;
                    tabId = tab.id;
                }
            })
        })
        if (found == false) {
            chrome.tabs.create({ active: true, url: "https://secure.helpscout.net/mailbox/4c021305e6c95617/" });
        } else {
            chrome.tabs.update(tabId, { selected: true });
            var snackbar = document.getElementById("snackbar");
            snackbar.innerText = `Unassigned inbox is now open in your other window ${getRandomEmoji()}`;
            snackbar.className = "show";
            setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 1500);
        }
    });
}

// function openForm() {
//     let found = false;
//     let tabId;

//     chrome.windows.getAll({ populate: true }, function(windows) {
//         windows.forEach(function(window) {
//             window.tabs.forEach(function(tab) {
//                 if (tab.url.search("https://docs.google.com/forms/d/e/1FAIpQLSeshx0WxsZkSWjIIUPlba1zLX_dL_vLCXA0aPkvtQQezjE-PQ/") > -1 || tab.url.search("https://docs.google.com/forms/u/0/d/e/1FAIpQLSeshx0WxsZkSWjIIUPlba1zLX_dL_vLCXA0aPkvtQQezjE-PQ/") > -1) {
//                     found = true;
//                     tabId = tab.id;
//                 }
//             })
//         })
//         if (found == false) {
//             chrome.tabs.create({ active: true, url: "https://docs.google.com/forms/d/e/1FAIpQLSeshx0WxsZkSWjIIUPlba1zLX_dL_vLCXA0aPkvtQQezjE-PQ/viewform" });
//         } else {
//             chrome.tabs.update(tabId, { selected: true });
//             var snackbar = document.getElementById("snackbar");
//             snackbar.innerText = `Feedback form is now open in your other window ${getRandomEmoji()}`;
//             snackbar.className = "show";
//             setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 1500);
//         }
//     });
// }

// function openHighFive() {
//     var found = false;
//     var tabId;
    
//     chrome.windows.getAll({ populate: true }, function(windows) {
//         windows.forEach(function(window) {
//             window.tabs.forEach(function(tab) {
//                 if (tab.url.search("https://coda.io/form/SMSA-High-Five-Submission_dJKe5OcBBBi") > -1) {
//                     found = true;
//                     tabId = tab.id;
//                 }
//             })
//         })
//         if (found == false) {
//             chrome.tabs.create({ active: true, url: "https://coda.io/form/SMSA-High-Five-Submission_dJKe5OcBBBi" });
//         } else {
//             var snackbar = document.getElementById("snackbar");
//             snackbar.innerText = `High five form is now open in your other window ${getRandomEmoji()}`;
//             snackbar.className = "show";
//             setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 1500);
//         }
//     });
// }

// function openForecast() {
//     var found = false;
//     var tabId;
    

//     chrome.windows.getAll({ populate: true }, function(windows) {
//         windows.forEach(function(window) {
//             window.tabs.forEach(function(tab) {
//                 if (tab.url.search("https://coda.io/d/Support-Handbook_d7lplUJJ931/") > -1) {
//                     found = true;
//                     tabId = tab.id;
//                 }
//             })
//         })
//         if (found == false) {
//             chrome.tabs.create({ active: true, url: "https://coda.io/d/Support-Handbook_d7lplUJJ931/Daily-Forecast_su-BB" });
//         } else {
//             var snackbar = document.getElementById("snackbar");
//             snackbar.innerText = `Daily Forecast is now open in your other window ${getRandomEmoji()}`;
//             snackbar.className = "show";
//             setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 1500);
//         }
//     });
// }


// function openHandbook() {
//     var found = false;
//     var tabId;
    

//     chrome.windows.getAll({ populate: true }, function(windows) {
//         windows.forEach(function(window) {
//             window.tabs.forEach(function(tab) {
//                 if (tab.url.search("https://coda.io/d/Support-Handbook_d7lplUJJ931/") > -1) {
//                     found = true;
//                     tabId = tab.id;
//                 }
//             })
//         })
//         if (found == false) {
//             chrome.tabs.create({ active: true, url: "https://coda.io/d/Support-Handbook_d7lplUJJ931/Greetings_su-0a#_ludUv" });
//         } else {
//             var snackbar = document.getElementById("snackbar");
//             snackbar.innerText = `Support handbook is now open in your other window ${getRandomEmoji()}`;
//             snackbar.className = "show";
//             setTimeout(function() { snackbar.className = snackbar.className.replace("show", ""); }, 1500);
//         }
//     });

// }

const emojis = ['✌️', '💯', '🦾', '🚀', '🤙', '🖖', '👋', '👾', '🌤', '🌈', '✨', '💫', '💎', '🫶', '🫵'];
const getRandomEmoji = () => {
    return emojis[~~(Math.random() * emojis.length)]
};