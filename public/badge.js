/* global chrome */

async function findThreshold(waitTimeThreshold) {
    return new Promise((resolve, reject) => {
        chrome.storage.local.get([waitTimeThreshold], function(result) {
            if (result.waitTimeThreshold === undefined) {
                reject(new Error("No Wait threshold after first install"));
            } else {
                resolve(result.waitTimeThreshold);
            }
        });
    }).catch((error) => {
        console.log(error);
    });
}

async function updateBadge() {

    let waitTimeThreshold = await findThreshold("waitTimeThreshold");
    console.log("waitTimeThreshold is: ", waitTimeThreshold);

    let tickets = await document.querySelector("#folders > div > ul > li.unassigned > a > span.badge");
    

    try {

        if (tickets === null) {
            chrome.runtime.sendMessage({ action: "no_badge" });
            console.log(
                "No tickets in box, extension newly installed or the extension is off. Sending load message"
            );
        } else if (tickets && waitTimeThreshold !== "off") {
            let numberTickets = tickets.innerText;
            console.log("found some tickets " + numberTickets);
            chrome.runtime.sendMessage({
                action: "badge",
                number: numberTickets
            });
        } 
    } catch (error) {
        console.log("Error in checking wait times in badge.js: ", error);
    }
}

updateBadge();