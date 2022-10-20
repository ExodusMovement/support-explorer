//@dev On install notification helps folks get started using the timer and clears any alarms if updating the extension. 

chrome.runtime.onInstalled.addListener(() => {
    console.log("Installed background script.");
    chrome.alarms.clear("startScraping");
    notifyExo("EXO", `${getTimeTitle()}`, "Install/refresh complete ✅ Open extension and (re)select the drop down to start notifications.");
});

//@dev This function helps populate the time in the install listener and is just some cool UI. 

function getTimeTitle() {
    let title;
    var today = new Date();
    var date = today.getFullYear() + '-' + (today.getMonth() + 1) + '-' + today.getDate();
    var time = today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds();
    if (time >= "12:00:00" && time <= "17:00:00") {
        title = "Afternoon! ☕ Exodude says:";
    } else if (time >= "17:00:01" && time <= "23:59:59") {
        title = "Evening! 🌙 Exodude says:";
    } else {
        title = "GM! 🌤️ Exodude says:"
    }
    return title;
}

//@dev These variables help define actions in functions below. They do get inactivated from time to time as service workers are not persisent. 
//@dev Unassigned urls is self explanitory, unassignedTabId is used to call the API on the correct tab, the alarmOn is used to determine messaging as well as the connectionAlive
//@dev The unassigned tab array collects tabs that match citeria in the unassignedTabFinder method below. This helps in debugging as well as is used to match criteria in functions. 
//@dev connectionAlive is used to determine if a tab should reload (service worker deactivated), if a certain message is in notification while the alarm is running and in a console event. 
//@dev alarmOn is used to determine whether a tab should reload or if a certain message is in notification while the alarm is running and in a console event. Can be us

const UNASSIGNED_URLS = ["https://secure.helpscout.net/mailbox/4c021305e6c95617/", "https://secure.helpscout.net/mailbox/4c021305e6c95617/1536311/"];
let unassignedTabId = false;
let alarmOn = false;
let connectionAlive = false;
let unassignedTabsArray = [];


//@dev How a browser notification is structured. Framework to add messages to in the activate method. 

function notifyExo(id, title, message, requireInteraction = false) {
    chrome.notifications.clear("HS_SOS_" + id, wasCleared => {
        chrome.notifications.create("HS_SOS_" + id, {
            type: "basic",
            iconUrl: "fella.png",
            title: title,
            message: message,
            priority: 0,
            requireInteraction: requireInteraction
        });
    });
}

//@dev When a notice is clicked, openUnassgned is triggered. Queries the unassigned URL (not focused conversations). 
//@dev If tab matching URL is open, the notice will focus on that tab (regardless of window). Else, it will open new unassigned tab. 

async function openUnassigned() {
    let query = { url: 'https://secure.helpscout.net/mailbox/4c021305e6c95617/*' };
    let tabs = await chrome.tabs.query(query);

    //@dev you can put the unassigned tab finder method and use the array in conditions to replace the else statement condition. 

    try {
        if (tabs.length === 0) {
            console.log("No helpscout tabs open, opening unassigned folder.")
            chrome.tabs.create({ active: true, url: "https://secure.helpscout.net/mailbox/4c021305e6c95617/" });
            chrome.notifications.clear("HS_SOS_OFF");
            chrome.notifications.clear("HS_SOS_EXO");
            chrome.notifications.clear("HS_SOS_Custy");
            await unassignedTabFinder();
            activate(unassignedTabsArray[0]);
        } else {
            chrome.notifications.clear("HS_SOS_OFF");
            chrome.notifications.clear("HS_SOS_EXO");
            chrome.notifications.clear("HS_SOS_Custy");
            let tabId = tabs[0].id;
            chrome.tabs.update(tabId, { highlighted: true });
            activate(tabId);
            console.log("Found a tab with helpscout open, the id is: ", tabId);
        }
    } catch (error) {
        console.log("Error in openUnassigned method: ", error);
    }
}

//@dev This function sets the unassignedTabID global variable used for other functions and sends a notification that directs users to open the extension to activate notifications.
//@dev ran on install after opening the tab and whenever connection is lost to the service worker (global variables unassigned), but tab is still open. Needed for scripting event. 

async function activate(tabId) {

    if (tabId === undefined) {
        console.log("Activate called but tabId was: ", tabId);
        return;
    } else if (!unassignedTabId || unassignedTabId === false) {
        unassignedTabId = tabId;
        await chrome.notifications.clear("HS_SOS_OFF");
        await chrome.notifications.clear("HS_SOS_Custy");
        notifyExo("EXO", "Mailbox opened 📬 Exodude says:", "Check all windows & folders. Open Unassigned & the extension and select an urgency from the drop down to start notifications.");
        console.log("Unassigned opened 1. Tab ID: " + unassignedTabId);
        connectionAlive = true;
    }
}

//@dev Run on closing a tab with matching criteria defined by methods where it is called. Target is to notify when a helpscout inbox tab is closed with or without the alarm set. 
//@dev This function also resets global variables in order to stop trigger a different condition when the scripting event is firing. See listener for checkUnassignedAlarm which is what calls injected script. 

async function deactivate(tabId) {
        try {
            if (alarmOn == false) {
                await chrome.notifications.clear("HS_SOS_EXO");
                await chrome.notifications.clear("HS_SOS_Custy");
                notifyExo("OFF", "Goodbye 😴 Exodude says:", "Going to sleep. Open Unassigned and select urgency dropdown to reactivate notifications.", true);
                console.log("Unassigned closed. Tab ID: " + unassignedTabId);
                unassignedTabsArray.pop(unassignedTabId);
                connectionAlive = false;
                unassignedTabId = false;
                console.log("now the unassigned tab id is: ", unassignedTabId)
            } else if (connectionAlive == true && alarmOn == true) {
                await chrome.notifications.clear("HS_SOS_EXO");
                await chrome.notifications.clear("HS_SOS_Custy");
                notifyExo("OFF", "Alert Deactivated 🛑 Exodude says:", "Open Unassigned and select urgency dropdown to reactivate notifications.", true);
                console.log("Unassigned closed. Tab ID: " + unassignedTabId);
                unassignedTabsArray.pop(unassignedTabId);
                connectionAlive = false;
                unassignedTabId = false;
                console.log("now the unassigned tab id is: ", unassignedTabId)
            } else if (!connectionAlive && alarmOn == true) {
                await chrome.notifications.clear("HS_SOS_EXO");
                await chrome.notifications.clear("HS_SOS_Custy");
                notifyExo("OFF", "Alert Deactivated 🛑 Exodude says:", "Open Unassigned and select urgency dropdown to reactivate notifications.", true);
                console.log("Unassigned closed. Tab ID: " + unassignedTabId);
                unassignedTabsArray.pop(unassignedTabId);
                connectionAlive = false;
                unassignedTabId = false;
                console.log("Closed box but not on unassigned, gives deactivate because it was right tab, alarm on and connected.");
                }
            } catch (e) {
                console.log("Error in Deactivate: ", e);
            }
        }

        //@dev importantly, this function reestablishes connection and a unassignedTabId when a certain message is received from the injected script and the service worker is alarming. 
        //@dev, what this mean spractically is that you will begin to receive notifications again of unassigned and unread tickets. 
        //@dev If deactivate turns off notifications by unassigning global vars, this function resumes them by reassigning global vars based on inbox matching criteria. 
        //@dev Similar crieria as noted above is called in the listener for the checkUnassignedAlarm, which triggers on alarm and injects a script to scrap for a badge text or a badge text and send notification. 

        async function checkSender(tabId, tabUrl, tabTitle) {
            let isUnassignedUrl = await UNASSIGNED_URLS.includes(tabUrl);
            let inTabsArray = await unassignedTabsArray.includes(tabId);
            let correctTitle = await tabTitle.includes("Unassigned");

            try {
                if (isUnassignedUrl && correctTitle && !unassignedTabId || (unassignedTabId !== tabId && inTabsArray && correctTitle)) {
                    unassignedTabId = tabId;
                    console.log("Connection reestablished. Tab ID: " + unassignedTabId);
                } else if (!correctTitle || !isUnassignedUrl || (unassignedTabId && !unassignedTabsArray.includes(tabId))) {
                    console.log("Not community inbox url or not active unasigned. Tab ID was: " + tabId + " | Existing Unassigned Tab ID: " + unassignedTabId);
                    return false;
                }
                connectionAlive = true;
                console.log("Connection is alive.");
                return true;
            } catch (e) {
                console.log("Error in check sender: ", e);
            }

        }

        // @dev Alarm listening for message from popup to start and stop pulling data via the injected script. 

        chrome.runtime.onMessage.addListener((request) => {

            if (request.action == "3" || request.action == "6" || request.action == "8") {
                let numberValue = parseInt(request.action);
                chrome.alarms.clearAll(() => {
                    chrome.alarms.create("startScraping", { periodInMinutes: 0.25 })
                    console.log("Turned on the scraping alarm.")
                })
                alarmOn = true;
            }

            if (request.action == "off") {
                chrome.alarms.clear("startScraping");
                alarmOn = false;
                chrome.action.setBadgeText({ text: '' });
                console.log("Alarms off");

            }
        })

        //@dev Listener for the alarm above, and will call checkUnassignedAlarm

        chrome.alarms.onAlarm.addListener(checkUnassignedAlarm);

        //@dev A function to match URLs against regex of boxes to determine if it should send notification and update badge (if unassigned box open/not focused) or just update the badge, or not, in reverse order. 
        //@dev The scripting event that injects the unassigned.js or badge.js to scrape the page. 

        async function checkUnassignedAlarm() {
            let tabUnassigned = false;
            let otherBox = false;
            let otherBoxTabId;

            let query = { url: 'https://secure.helpscout.net/*' };
            let regex = /.*1536311$|.*4749068|.*1536312|.*1536313|.*1536314|.*1536316|.*1536315|.*6983227|.*5314577|.*4698597|.*4375066|.*6999883|.*4685953|.*4727189|.*4684856/g;

            let unassignedRegex = /.*4c021305e6c95617/g;
            let tabs = await chrome.tabs.query(query);
            console.log("tabs are: ", tabs);

            //@dev call unassignedTabFinder to ensure tab array global variable is updated 
            await unassignedTabFinder();

            //@dev Loop through queried array and find any tabs that match the community inbox, whether on the right folder or not. 

            for (var i = 0; i < tabs.length; i++) {
                let unassignedRegexTest = await unassignedRegex.test(tabs[i].url);
                let otherBoxRegexTest = await regex.test(tabs[i].url);

                if (unassignedRegexTest && !otherBoxRegexTest) {
                    tabUnassigned = tabs[i].id;
                    console.log("tab unassigned: ", tabUnassigned);
                } else if (otherBoxRegexTest) {
                    otherBox = true;
                    otherBoxTabId = tabs[i].id;
                    console.log("otherbox regex test found tab.")
                }
            }
            console.log("Seeking to execute script, so far the actionable tabs are: ", tabUnassigned, otherBox);
            //@dev Execute two different scripts based on whether the unassigned box is open or not to send a notification (called in SOS listner below), or to update only the badge text with the number of unread emails. 

            try {

                if (tabs.length === 0) {
                    console.log("No helpscout tabs open or API call response too slow.")
                    deactivate();

                } else if (!tabUnassigned && otherBox) {
                    let tabId = otherBoxTabId
                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        files: ['badge.js'],
                    })

                    console.log("Alarm fired for otherbox")
                } else if (tabUnassigned) {
                    let tabId = tabUnassigned;

                    chrome.scripting.executeScript({
                        target: { tabId: tabId, allFrames: true },
                        files: ['unassigned.js'],
                    })
                    console.log("Alarm fired, tab id was: ", tabId);
                }
            } catch (error) {
                console.log("Error in execute script: ", error);
            }
        }

        //@dev Listener for a message from the injected script, each time it's injected. 

        chrome.runtime.onMessage.addListener(sosListener);

        //@dev The listener method for different messages depending on the script injected. The first two actions simply update global variables and send the notification that data scraped returned a number (ie. unread emails).
        //@dev 

        async function sosListener(request, sender) {

            let queryInbox = { active: true, currentWindow: true }; //@dev, Used in the 2nd else_if statement in try block. Does not fire notification if focused folder. This is already accounted for in checkUnassignedAlarm method above. 
            //@dev call unassigned finder because the checkSender method relies on a current array of unassigned tabs matching criteria. This enables the notification. 
            await unassignedTabFinder();
            let tabs = await chrome.tabs.query(queryInbox);


            try {
                //@dev Rate limit pruning. Just to clear the badge text if closing tickets from unassigned. >>
                if (request.action == "load") {
                    chrome.action.setBadgeText({ text: '' });
                    unassigned = sender.tab.id;
                    console.log("Clearing Badge text now. No emails in unassigned. Unassigned is: ", unassignedTabId);
                } else if (alarmOn == false && unassignedTabId) {
                    console.log("Alarm is: " + alarmOn + " and connection is: " + connectionAlive + " and the unassigned tab is: " + unassignedTabId);
                } else if (request.action == "sos" && checkSender(sender.tab.id, sender.tab.url, sender.tab.title)) {
                    console.log("sender tab is: ", sender.tab);

                    let message = request.customersWaiting + " ticket(s) unattended for " + (request.oldTickets ? "over an hour" : request.longestWaitTime + " min");
                    //@dev Notify if active window/tab is not Unassigned ticket and you've recieved an SOS message from the injected script after it was injected on alarm. 
                    //@dev Your notification will likely always trigger here since tabs.length will be < 0 and the folder is accounted for prior. 
                    if (tabs.length === 0 || !tabs[0].url.match(/.*\?folderId=1536311$/g)) {
                        chrome.notifications.clear("HS_SOS_OFF");
                        chrome.notifications.clear("HS_SOS_EXO");
                        notifyExo("Custy", "Custys need help in Unassigned!", message);
                        // @dev helpful to have badge text if notifications not in user-focused window. Alert is still visible if extension pinned. 
                        if (request.customersWaiting == undefined) {
                            chrome.action.setBadgeText({ text: '' });
                        } else if (request.customersWaiting > 2) {
                            chrome.action.setBadgeBackgroundColor({ color: "#f25252" })
                            chrome.action.setBadgeText({ text: String(request.customersWaiting) });
                        } else {
                            chrome.action.setBadgeBackgroundColor({color: "#ACCEF7"});
                            chrome.action.setBadgeText({ text: String(request.customersWaiting) });
                        }
                    }
                    console.log("SOS: " + request.customersWaiting + " unattended tickets. Alarm is: ", alarmOn);
                    //@dev Set the badge text only is called if no Unassigned folder is open. badge.js is script injected to send this and following message. 
                } else if (request.action == "badge") {
                    if (request.number == undefined) {
                        chrome.action.setBadgeText({ text: '' });
                    } else if (request.number > 2) {
                        chrome.action.setBadgeBackgroundColor({ color: "#f25252" });
                        chrome.action.setBadgeText({ text: String(request.number) });
                    } else {
                        chrome.action.setBadgeBackgroundColor({color: "#ACCEF7"});
                        chrome.action.setBadgeText({ text: String(request.number) });
                    }
                } else if (request.action == "no_badge") {
                    chrome.action.setBadgeText({ text: '' });
                }
            } catch (e) {
                console.log("Error in sosListener: ", e);
            }
        };

        //@dev Listen for a tab matching the tab array is removed. Trigger deactivate to let users know to open the inbox if they want alerts. 

        chrome.tabs.onRemoved.addListener(removingTab);

        //@dev unassigndTabFinder ensures array is up to date so that the deactivation method will work trigger and array are the tabs checked, rather than the wrong mailbox. 

        async function removingTab(tabId, removeInfo) {
            //let query = { url: 'https://secure.helpscout.net/mailbox/69f176a183caf9f4/*' };
            //let tabs = await chrome.tabs.query(query);
            await unassignedTabFinder(); //@dev updates array

            console.log("Closed tab id is: " + tabId + " and array is: " + unassignedTabsArray);
            try {
                if (unassignedTabId === tabId) {
                    deactivate(tabId);
                    chrome.action.setBadgeText({ text: '' });
                    unassignedTabsArray.pop(tabId);
                } 
                // else if (unassignedTabsArray.length === 0) {
                //     deactivate();
                //     chrome.action.setBadgeText({ text: '' });
                //     console.log("No helpscout tabs open, was looking for tab.");
                // } 
                else if (unassignedTabsArray.includes(tabId)) {
                    deactivate(tabId);
                    chrome.action.setBadgeText({ text: '' });
                    await unassignedTabFinder();
                    console.log("Closed a tab, sending Deactivate")
                }
            } catch (e) {
                console.log("Error in removing tab: ", e);
            }
        };

        //@dev Populates the global variable storing arrays matching the regex. Useful for calling conditions to trigger based on whether they match a community inbox url. 
        //@dev This is called in several functions to ensure the tab array is updated. 

        async function unassignedTabFinder() {

            let tabUnassigned;
            let otherBox = false;
            let otherBoxTabId;

            let query = { url: 'https://secure.helpscout.net/*' };
            let regex = /.*1536311$|.*4749068|.*1536312|.*1536313|.*1536314|.*1536316|.*1536315|.*6983227|.*5314577|.*4698597|.*4375066|.*6999883|.*4685953|.*4727189|.*4684856/g;

            let tabs = await chrome.tabs.query(query);
            console.log("tabs are: ", tabs);

            try {
                if (tabs.length === 0) {
                    console.log("No helpscout tabs open, was looking for tab.")
                } else {
                    for (var i = 0; i < tabs.length; i++) {
                        if (unassignedTabsArray.includes(tabs[i].id)) {
                            continue;
                        } else if (regex.test(tabs[i].url)) {
                            unassignedTabsArray.push(tabs[i].id)
                        }
                    }
                    console.log("Unassigned tab array: ", unassignedTabsArray);
                }
            } catch (error) {
                console.log("Error in finding tabs for array: ", error);
            }
        }

        //@dev Listens for tabs opened that match criteria. 
        chrome.tabs.onActivated.addListener(getCurrentTab);

        //@dev Listens based on query for inbox and reloads page. This is also used to reset the unassignedTabId, badge and connection via activate method if service worker goes inactive and invalidates global vars here. 
        //@dev can be set to reload the tab each time you click it, or modified to reload every time you open any inbox and revisit a tab. For now, commented out to reduce rate of calling API. 

        async function getCurrentTab(activeInfo) {
            let queryOptions = { active: true, currentWindow: true, url: 'https://secure.helpscout.net/mailbox/4c021305e6c95617/*' };
            let [tab] = await chrome.tabs.query(queryOptions);

            try {
                if ([tab][0] === undefined) {
                    return;
                } else if ([tab][0].id == activeInfo.tabId && [tab][0].title.search("Unassigned - Help Scout") > -1) {
                    if (connectionAlive === false) {
                        chrome.tabs.reload([tab][0].id);
                        chrome.action.setBadgeText({ text: '' });
                        unassignedTabId = [tab][0].id;
                        console.log("Reloaded the tab when active. Tab in active position or correct folder title.", unassignedTabId, [tab][0].id);
                    }
                    //@dev This reloads the tab if it's active and unassigned tab, alarm or not. Useful, but not neccessary. Rate limit pruning, so commented out. Plus activation notice not neccessary. 
                    // else if(!alarmOn) {
                    //     //currentTab == true;
                    //     chrome.tabs.reload([tab][0].id);
                    //     chrome.action.setBadgeText({ text: '' });
                    //     //activate not called because unassigned is not !unassigned.
                    //     activate([tab][0].id);
                    //     console.log("Reloaded active tab")
                    // } 

                }
            } catch (error) {
                console.log("Error in getCurrentTab method: ", error);
            }
        }

        //@dev This is what allows all the notifications to act as a link to open tabs or a new tab. 

        chrome.notifications.onClicked.addListener(notificationId => openUnassigned());