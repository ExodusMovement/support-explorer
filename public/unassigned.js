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

async function checkCustomerWaitTimes() {
    let customersWaiting = [];
    let customersWaitingLong = [];
    let oldTickets = false;

    let waitTimeThreshold = await findThreshold("waitTimeThreshold");
    console.log("waitTimeThreshold is: ", waitTimeThreshold);

    let ticketRows = await Array.from(
        document.querySelectorAll("#convos #tblTickets > tbody > tr")
    ).filter(function(ticketRow) {
        return (
            !ticketRow.classList.contains("replying") &&
            !ticketRow.classList.contains("viewing")
        );
    });

    try {
        ticketRows.forEach(function(el) {
            let waitingSince =
                el.querySelectorAll("abbr.waitingSince")[0].innerText;

            if (
                waitingSince.indexOf("min") !== -1 ||
                waitingSince.indexOf("Now") !== -1
            ) {
                // XX min ago || Just Now
                customersWaiting.push(
                    parseInt(waitingSince.split(" ")[0].replace("Just", "0"))
                );
            } else {
                // X hours ago || XX:XX || Month DD
                customersWaiting.push(60);
                oldTickets = true;
            }
        });

        customersWaiting.forEach((waitTime) => {
            if (waitTimeThreshold == "off") {
                return;
            } else if (waitTime >= waitTimeThreshold) {
                customersWaitingLong.push(waitTime);
            }
        });

        if (customersWaiting.length && waitTimeThreshold !== "off") {
            console.log("found some tickets " + customersWaiting.length);
            chrome.runtime.sendMessage({
                action: "sos",
                customersWaiting: customersWaiting.length,
                longestWaitTime: customersWaitingLong.reduce(
                    (a, b) => Math.max(a, b),
                    -Infinity
                ),
                oldTickets: oldTickets,
            });
        } else {
            chrome.runtime.sendMessage({ action: "load" });
            console.log(
                "No tickets in box, extension newly installed or the extension is off. Sending load message"
            );
        }
    } catch (error) {
        console.log("Error in checking wait times in unassigned.js: ", error);
    }
}

checkCustomerWaitTimes();
