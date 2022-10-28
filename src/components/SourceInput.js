/* global chrome */
import { useRef, useEffect, useState } from "react";
import "../styles/App.css";
import logo from "./fella.png";
import searchIcon from "./magnifying-glass-solid.svg";
import validateSolAddress from "./solana.js";
import validateSignature from "./solSignature.js";
import existingTabCheck from "./existingTab.js";
import gear from "./gear-solid.svg";
import Results from "./Results.js";
import getAlgoData from "./algoTx.js";
import hsIcon from "./help-scout-logo-square.png";
//import verifyTezTx from './tezTx.js'; //@dev Not neccessary at the moment.

function SourceInput() {
    const ref = useRef(null); //@dev Used in use effect to designate the iframe as the ref so no new tab/window opens on link click in iframe.
    const [showResults, setShowResults] = useState(); //@dev Used to hide or show results in popup. Inactive until search activated.
    const [frameSource, setFrameSource] = useState(); //@dev Used to set the URL for the iframe depending on regex match. Where to search the transaction hash.

    //@dev Set's the tooltip text for the options page icon. Next four consts.
    const [hover, setHover] = useState(false);
    const [hoverHS, setHoverHS] = useState(false);

    const blacklistArray =["bc1qlp2dqp59093lpasjlua08nsnrj2a5u5ud2clws", "TSVSgu1PLt2o6ihFvjrhvoDrU6AYmJ2XdJ", "0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3", "637c3eec12d605f60f09c7c5b4ed81819b8e108fccb36a17f60857f7bd940944", "cc9933b430740d8024664bb142deeb849f03e05fd44b81b17361301f97ea498d", "0x7bd1ed3adf588a89c392c5c424583c0ffffce145", "0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3", "bc1q596wathu333nh3rtvypyp7sxzuqqqtua4drk5z", "bc1qy98y22mnqr6pehukzweyz8yqehnf6h4qn97244", "TXaYFNopc8xsjJLtVzvAVQGProbCmsuXYr", "TVotcWLyia5uAFn5LmhVPcmHoxhbdJCmBd", "TFkXxSdc7wVvEt6pgs99j655mubwcdcv6s", "TAR7PijCQUXjCBbpJ8LdadxA1syhVGk1it", "TN6SSaE6DJGjk2XTCFLwADyDg4hWjJ8vSz", "0x91e36fc3f9b7873d618efeae755958bc6ede898e", "bc1qhcvsr4lzt0394swq7gu84kmv83gddyxvces7h2", "0xe65edaeb8fdb554c99987bcf46d984e7b36c8240"];

    const onHover = (e) => {
        e.preventDefault();
        setHover(true);
    };

    const onHoverHS = (e) => {
        e.preventDefault();
        setHoverHS(true);
    };

    const onHoverOver = (e) => {
        e.preventDefault();
        setHover(false);
    };

    const onHoverOverHS = (e) => {
        e.preventDefault();
        setHoverHS(false);
    };
    const HoverData = "Options Page";
    const HoverDataTwo = "Go to Inbox";

    //@dev Used for populating UI response from Exodude image on popup when empty string is searched.
    const emojis = [
        "✌️ Enter query",
        "🤔 I'm listening",
        "🦾 I find things",
        "🚀 To the moon!",
        "🤙 Query vibez",
        "🖖 Search ser",
        "👋 Hi there",
        "👾 Can I help?",
        "🧠 Query me",
        "🌈 Enter search",
        "✨ Shiny searches",
        "💫 Find a tx here",
    ];
    const getRandomEmoji = () => {
        return emojis[~~(Math.random() * emojis.length)];
    };

    //@dev This function gives the dialogue pause before opening a new window with multiple matching explorers. Informs users 2nd time of minimized window.
    const lookUpText = async (source) => {
        var snackbar = await document.getElementById("snackbar");
        snackbar.innerText =
            "This could be a few chains 🔍 Click this dialogue to open a new window for multiple ⛓ explorers. Or click me to reset.";
        snackbar.className = "showMulti";
        snackbar.style.right = "15px";

        snackbar.addEventListener(
            "click",
            function (event) {
                let urlArray = [
                    "https://blockchair.com/search?q=" + source,
                    "https://tronscan.org/#/transaction/" + source,
                    "https://binance.mintscan.io/txs/" + source,
                    "https://atomscan.com/transactions/" + source,
                    "https://xrpscan.com/tx/" + source,
                    "https://cardanoscan.io/transaction/" + source,
                ];
                chrome.windows.create({
                    focused: false,
                    state: "minimized",
                    url: urlArray,
                });
                snackbar.innerText = "I opened a new, minimized window 👀";
                snackbar.className = snackbar.className.replace(
                    "showMulti",
                    "show"
                );
                snackbar.style.right = "40%";
                setTimeout(function () {
                    snackbar.className = snackbar.className.replace("show", "");
                    snackbar.style.right = snackbar.style.right.replace(
                        "40%",
                        "60%"
                    );
                }, 1500);
            },
            { once: true }
        );
    };

    const moneroText = async (source) => {
        var snackbar = await document.getElementById("snackbar");
        snackbar.innerText =
            "This looks like a Monero address, which you cannot view on an explorer ususally 🔍 Click this dialogue to open a new tab anyways.";
        snackbar.className = "showMulti";
        snackbar.style.right = "15px";

        snackbar.addEventListener(
            "click",
            function (event) {
                let URL = "https://localmonero.co/blocks/search/" + source;
                chrome.tabs.create({ active: true, url: URL });
            },
            { once: true }
        );
    };


     const blacklistText = async (source) => {
        var snackbar = await document.getElementById("snackbar");
        snackbar.innerText =
            "This looks like a black-listed address/TX 🛑 Click this dialogue to proceed with new window. Click me to reset.";
        snackbar.className = "showMulti";
        snackbar.style.right = "15px";

        snackbar.addEventListener(
            "click",
            function (event) {
                let urlArray = [
                    "https://blockchair.com/search?q=" + source,
                    "https://tronscan.org/#/transaction/" + source,
                    "https://tronscan.org/#/address/" + source,
                    "https://etherscan.io/address/" + source
                ];
                chrome.windows.create({
                    focused: false,
                    state: "minimized",
                    url: urlArray,
                });
                snackbar.innerText = "I opened a new, minimized window 👀";
                snackbar.className = snackbar.className.replace(
                    "showMulti",
                    "show"
                );
                snackbar.style.right = "45%";
                setTimeout(function () {
                    snackbar.className = snackbar.className.replace("show", "");
                    snackbar.style.right = snackbar.style.right.replace(
                        "45%",
                        "60%"
                    );
                }, 1500);
            },
            { once: true }
        );
    };

    //@dev Opens options page from gear icon.
    const optionsPage = (event) => {
        chrome.runtime.openOptionsPage();
    };

    const hsPage = async (event) => {
        var found = false;
        var tabId;
        let focusedTab;
        let currentTab;

        chrome.tabs.query(
            { active: true, currentWindow: true },
            function (tabs) {
                currentTab = tabs[0];
                if (
                    currentTab.url.search("https://secure.helpscout.net/") > -1
                ) {
                    focusedTab = currentTab;
                }
            }
        );

        chrome.windows.getAll({ populate: true }, function (windows) {
            windows.forEach(function (window) {
                window.tabs.forEach(function (tab) {
                    if (tab.url.search("https://secure.helpscout.net/") > -1) {
                        found = true;
                        tabId = tab.id;
                    }
                });
            });
            if (found == false) {
                chrome.tabs.create({
                    active: true,
                    url: "https://secure.helpscout.net/mailbox/4c021305e6c95617/",
                });
            } else if (focusedTab == currentTab) {
                var snackbar = document.getElementById("snackbar");
                snackbar.innerText = "You're currently on HelpScout 😎";
                snackbar.style.right = "30%";
                snackbar.className = "show";
                setTimeout(function () {
                    snackbar.className = snackbar.className.replace("show", "");
                    snackbar.style.right = snackbar.style.right.replace(
                        "30%",
                        "60%"
                    );
                }, 1500);
            } else {
                chrome.tabs.update(tabId, { selected: true });
                var snackbar = document.getElementById("snackbar");

                snackbar.innerText =
                    "HelpScout is now open in your other window 👀";
                snackbar.style.right = "30%";
                snackbar.className = "show";
                setTimeout(function () {
                    snackbar.className = snackbar.className.replace("show", "");
                    snackbar.style.right = snackbar.style.right.replace(
                        "30%",
                        "60%"
                    );
                }, 1500);
            }
        });
    };

    const noCoinText = async () => {
        var snackbar = await document.getElementById("snackbar");
        snackbar.innerText = "🤔 No results found. Click me to reset.";
        snackbar.className = "show";
        snackbar.style.right = "40%";
        setTimeout(function () {
            snackbar.className = snackbar.className.replace("show", "");
            snackbar.style.right = snackbar.style.right.replace("40%", "60%");
        }, 1500);
        console.log("Not a valid address or transaction ID");
    };

    function loading() {
        var snackbar = document.getElementById("snackbar");
        snackbar.innerText = "🔍 Searching now...";
        snackbar.className = "show";
    }

    function getTimeTitle() {
        var snackbar = document.getElementById("snackbar");
        var today = new Date();
        var time =
            today.getHours() +
            ":" +
            today.getMinutes() +
            ":" +
            today.getSeconds();
        if (time >= "12:00:00" && time <= "17:00:00") {
            snackbar.innerText = "Good Afternoon! 🚀";
        } else if (time >= "17:00:01" && time <= "23:59:59") {
            snackbar.innerText = "Good Evening! 🌙";
        } else {
            snackbar.innerText = "GM! 🌤️";
        }
        snackbar.className = "show";
        setTimeout(function () {
            snackbar.className = snackbar.className.replace("show", "");
        }, 900);
    }

    const search = async () => {
        let source = await document.getElementById("sourceInput").value;
        console.log(source.length);

        loading();

        if (source === null || source === undefined || !source) {
            var snackbar = await document.getElementById("snackbar");
            snackbar.innerText = `${getRandomEmoji()}`;
            snackbar.className = "show";
            setTimeout(function () {
                snackbar.className = snackbar.className.replace("show", "");
            }, 800);
        } else if (blacklistArray.indexOf(source) > -1) {
            await blacklistText(source);
        } else if (/^\s*[0-9a-z\sA-Z]{3,9}\s*$/gi.test(source)) {
            //@dev Match asset ticker or crypto name search to populate iframe.
            let noSpaceSource = await source.replace(/\s/g, "");
            let address = "https://coinranking.com/?search=" + noSpaceSource;
            await setFrameSource(address);
            setShowResults(true);
        } else if (/^tz[a-z0-9]{34}$|^o[a-z0-9]{50}$/gi.test(source)) {
            //@dev Tezos address or transaction respectively.
            await existingTabCheck("https://tzstats.com/", source);
        } else if (/^[A-Z2-7]{58}$/g.test(source)) {
            //@dev Placeholder for Algo address
            await existingTabCheck("https://algoexplorer.io/address/", source);
        } else if (await getAlgoData(source)) {
            //@dev Placeholder for Algo TX. Regex -> /^[A-Z2-7]{52}$/g.test(source)
            await existingTabCheck("https://algoexplorer.io/tx/", source);
        } else if (/^0x[a-fA-F0-9]{40}$/g.test(source)) {
            //@dev EVM address
            await existingTabCheck("https://debank.com/profile/", source);
        } else if (/^0x([A-Fa-f0-9]{64})$/g.test(source)) {
            //@dev EVM transaction
            await existingTabCheck("https://blockscan.com/tx/", source);
        } else if (/^r[1-9A-HJ-NP-Za-km-z]{25,33}$/g.test(source)) {
            //@dev XRP address
            await existingTabCheck("https://xrpscan.com/account/", source);
        } else if ((await validateSolAddress(source)) === true) {
            //@dev SOL address
            await existingTabCheck("https://solscan.io/account/", source);
        } else if (await validateSignature(source)) {
            //@dev SOL TX
            await existingTabCheck("https://solscan.io/tx/", source);
        } else if (/^(cosmos)[a-z0-9]{39}$/g.test(source)) {
            //@dev Atom Address
            await existingTabCheck("https://atomscan.com/accounts/", source);
        } else if (/^(bnb1)[a-z0-9]{38}$/g.test(source)) {
            //@dev BNB Beacon Address
            await existingTabCheck(
                "https://binance.mintscan.io/account/",
                source
            );
        } else if (/^T[A-Za-z1-9]{33}$/g.test(source)) {
            //@dev TRX address
            await existingTabCheck("https://tronscan.org/#/address/", source);
        } else if (
            /^(0|(?:[1-9]\d*))\.(0|(?:[1-9]\d*))\.(0|(?:[1-9]\d*))(?:-([a-z]{5}))?$/.test(
                source
            )
        ) {
            //@dev HBAR address
            await existingTabCheck(
                "https://hashscan.io/#/mainnet/account/",
                source
            );
        } else if (
            /^(0|(?:[1-9]\d*))\.(0|(?:[1-9]\d*))\.(0|(?:[1-9]\d*))(?:-([a-z]{5}))?@?/.test(
                source
            )
        ) {
            //@dev HBAR TXID
            const hbarID = source.replace(/[^a-zA-Z0-9]/g, "");
            await existingTabCheck(
                "https://hashscan.io/#/mainnet/transaction/",
                hbarID
            );
        } else if (/4[0-9AB][1-9A-HJ-NP-Za-km-z]{93}$/g.test(source)) {
            //@dev Monero Address identify and warn it's not viewable on blockchain.
            await moneroText(source);
        } else if (
            /^[1-9A-HJ-NP-Za-km-z]{59}$|^(addr1)[a-z0-9]+/g.test(source)
        ) {
            //@dev Ada addresses
            await existingTabCheck("https://cardanoscan.io/address/", source);
        } else if (
            /^grs[a-zA-Z0-9]{5,88}$|^F[a-km-zA-HJ-NP-Z1-9]{26,33}$|^G[A-Z0-9]{55}$|^ltc[a-zA-Z0-9]{5,88}$|^[LM][a-km-zA-HJ-NP-Z1-9]{26,33}$|^[7X][a-km-zA-HJ-NP-Z1-9]{26,33}$|^[9AD][a-km-zA-HJ-NP-Z1-9]{26,33}$|^([qp][qpzry9x8gf2tvdw0s3jn54khce6mua7l]{40,120}|(bitcoincash)?[qp][qpzry9x8gf2tvdw0s3jn54khce6mua7l]{40,120})$|^bc(0([ac-hj-np-z02-9]{39}|[ac-hj-np-z02-9]{59})|1[ac-hj-np-z02-9]{8,87})$|^1[a-km-zA-HJ-NP-Z1-9]{25,34}(?!\/)$|^3[a-km-zA-HJ-NP-Z1-9]{25,34}$/g.test(
                source
            )
        ) {
            //@dev Most chains addresses. Needs to stay last so other regex's work. Includes LTC, XLM, DASH, DOGE, XMR, BCH and BTC derivations.
            await existingTabCheck("https://blockchair.com/search?q=", source);
        } else if (/^\s*[0-9a-fA-F]{64}\s*$/g.test(source)) {
            //@dev Transaction Window for Multiple chains (So far: Tron, ATOM, UTXOs, BNB beacon chain, XRP, ADA)
            let noSpaceSourceM = await source.replace(/\s/g, "");
            lookUpText(noSpaceSourceM);
        } else {
            noCoinText();
        }
    };

    //@dev Calls the onload listener to populate the snackbar with a GM or the time greeting from Exodude.
    useEffect(() => {
        document.addEventListener("DOMContentLoaded", getTimeTitle());

        const handleClick = (event) => {
            const a = event.target.closest("a[href]");
            if (a) {
                event.preventDefault();
                chrome.tabs.create({ url: a.href, active: false });
            }
        };

        const element = ref.current;
        if (element) {
            element.addEventListener("click", handleClick);
        } else {
            console.log("No element");
        }
        return () => {
            element.removeEventListener("click", handleClick);
        };
    }, []);

    return (
        <div class="wrapper">
            {hover && (
                <p id="belowCorner" className={hover}>
                    {HoverData}
                </p>
            )}
            <img
                id="corner"
                onClick={optionsPage}
                onMouseEnter={(e) => onHover(e)}
                onMouseLeave={(e) => onHoverOver(e)}
                src={gear}
                alt="Options"
                tite="Options page link"
            />
            {hoverHS && (
                <p id="belowCornerTwo" className={hoverHS}>
                    {HoverDataTwo}
                </p>
            )}
            <img
                id="cornerTwo"
                onClick={hsPage}
                onKeyPress={hsPage}
                onFocus={(e) => onHoverHS(e)}
                onBlur={(e) => onHoverOverHS(e)}
                onMouseEnter={(e) => onHoverHS(e)}
                onMouseLeave={(e) => onHoverOverHS(e)}
                src={hsIcon}
                alt="HelpScout"
                tite="HelpScout link"
                tabindex="3"
            />
            <form
                class="flex"
                action="https://blockchair.com/search"
                method="get"
                id="ExplorerAppForm"
            >
                <a
                    href=""
                    class="extension__logo animated bounce"
                    id="logo"
                    tabindex="-1"
                >
                    {" "}
                    <img
                        class="extension__logo--image"
                        src={logo}
                        alt="Exodude of course!"
                        tite="exodude loves you"
                    />
                </a>
                <input
                    autoFocus
                    id="sourceInput"
                    class="extension__input"
                    placeholder="Search a Ticker, Transaction or Address on 50+ chains"
                    data-toggle="tooltip"
                    title="Search a Ticker, Transaction or Address on 50+ chains."
                    tabindex="1"
                ></input>
                <button
                    onClick={search}
                    class="extension__search-btn"
                    data-toggle="tooltip"
                    place="embeded"
                    title="Search for transactions, addresses, tickers, and even contracts."
                    tabindex="2"
                >
                    <img
                        class="landing__search-icon"
                        alt="A magnifying glass"
                        src={searchIcon}
                    />
                </button>
            </form>

            {showResults && (
                <div>
                    {" "}
                    <Results URL={frameSource} />{" "}
                </div>
            )}

            <div id="snackbar"></div>
        </div>
    );
}

export default SourceInput;