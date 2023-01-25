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
import checkMalicious from './checkMalicious.js';
//import verifyTezTx from './tezTx.js'; //@dev Not neccessary at the moment.

function SourceInput() {
    const ref = useRef(null); //@dev Used in use effect to designate the iframe as the ref so no new tab/window opens on link click in iframe.
    const [showResults, setShowResults] = useState(); //@dev Used to hide or show results in popup. Inactive until search activated.
    const [frameSource, setFrameSource] = useState(); //@dev Used to set the URL for the iframe depending on regex match. Where to search the transaction hash.

    //@dev Set's the tooltip text for the options page icon. Next four consts.
    const [hover, setHover] = useState(false);
    const [hoverHS, setHoverHS] = useState(false);


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

    const maliciousArray = [
        '0x7bd1ed3adf588a89c392c5c424583c0ffffce145',
        '0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3',
        'bc1qr6ra3pr56r5ha37pvz5g5xrk4q66hu86jsptyv',
        'bc1q596wathu333nh3rtvypyp7sxzuqqqtua4drk5z',
        'bc1qy98y22mnqr6pehukzweyz8yqehnf6h4qn97244',
        'TXaYFNopc8xsjJLtVzvAVQGProbCmsuXYr',
        'TVotcWLyia5uAFn5LmhVPcmHoxhbdJCmBd',
        'TFkXxSdc7wVvEt6pgs99j655mubwcdcv6s',
        'TAR7PijCQUXjCBbpJ8LdadxA1syhVGk1it',
        'TN6SSaE6DJGjk2XTCFLwADyDg4hWjJ8vSz',
        '0x09eb9ed064594de81c5b95a10ca565147a9e3f32',
        '0x91e36fc3f9b7873d618efeae755958bc6ede898e',
        'bc1qhcvsr4lzt0394swq7gu84kmv83gddyxvces7h2',
        'rnT25PNPRoGGutThwQtR13DZ9iCn4egnn3',
        '0x118A52F44a9a7c8D526436CBbC38bD49C7Db0426',
        '34U9ZtH4JpddoZKnmt4ZLaK9aWo5AXWEfU',
        'bc1qk7xml2px86eg339nh3m94qj84c2mgf48rnw8lz',
        '0xAaB910ACDD01AF491179Bb7c91A56080F764c8E1',
        '0x002c16040b2f42fcb23dfecd5566ffbdd9865f6f',
        '0xe64ad42e9ed6135b504f4c29ffe9d3a187bc14e2',
        'TGQHGNuPA5XUX3DoaQHe2JegbZvKDjcrCb',
        'bnb1pma22amrcdztf93t4ynp4jzq6llpqlthualgr3',
        'RMKRCe88sJZxNKPRRBePP6AV2i6Pk2VXfF',
        'addr1q879x08md82k5zn526eleqwfwf6fw0fczctm7ns6h2nl4wmyjerk76a8u422508yut5nqqg6mmgczcygq8yhdvtxsheswvgtnz',
        'addr1q9x5m26aup77g3gta8vmd6vqkavlxapyzxg6zdp5wu2ur4nyjerk76a8u422508yut5nqqg6mmgczcygq8yhdvtxshes85s03l',
        '0xc663d040146b21fe6dbfa9be228f44ced02c0735',
        'bc1qykyq6ngdne5anch2zypmvgcpxwjrez97yccxe0',
        '0.0.985817',
        'AJ1shZYBxnSsuCNE8FoRtvdAT8jtX7ahQJayeHxbKwtk',
        '1e8w1oXJwCx4eFiCFxEFpfu38ne3MG7CuLrJGzUXhYr2tbL',
        'bc1q6wusy8vffy03ty8gc3qm9h4ve89k32rnknkla6',
        'bc1qttxylp3g4r248qmv6cwwq82z0a34dmqa3sjjfs',
        'addr1q9cush3ruaupkg2tu8xeavpvhmw33c9nh7sgax3nsdma53prdmxc8w7z66sdd685swrr56kv97trmxmzt74gmhh7tqyqsnvtee',
        '0x45d59b12221752e65c77b4bde118adb1dca69668',
        'bc1qkc8puvcga4qhqc9gtmy566np4wphlkev93sngq',
        '0x3be343277d6b3a6733c28c098fef3d64adae5819',
        'GC2UATGZLSKPZ5PA3P2XLNYWD3BW6JTNSZR5IZGLKRZXCM53CHSLFNAS',
        'DTZb1xaQac5jsVy8CqWo1T4zzmBVotYtG5',
        '0xbd38643b5077f469ea7b40f151bc385f6abe46b6',
        'addr1q9yupzxmzyhjwa6993arpfrh7xkjwzvknmdpyyxvul5l295awga34304dayq6mgrzycz8pvd7u0kdscjehgt0vkjjuvselayqx',
        '0x29f29f8281e0c9bb5355e365ce698cd08b535fa4',
        '1FdnbsoouVffg8dEqTeYY6ebcLdtMP3PJe',
        '0xe65edaeb8fdb554c99987bcf46d984e7b36c8240',
        'ltc1qxdq9kas5lfwhqe4mujllck6pygdrpl09nfuuuj',
        '0x39F6a6C85d39d5ABAd8A398310c52E7c374F2bA3',
        'bc1qfx3ewtpkw62f4vnj228phccu7d7decdxpj8kxn',
        '13i44XzgjeG7HD24dprX2zdrKkS8CNiJoY',
        '0x9c4ab5727c76563f8c386c3e78672b4f9cdbde5b',
        '0x91eee58069C61cC9080964616A0Bd54a29e5D74B',
        'bc1que35aggdmzaq4khzucczlhqxaqqxrj0nl5qvpt',
        'rEXzpuLshGdF8KNcr5GkZihSCJX7yEaJXT',
        '1Q2Za34Ub95tNowFTcqV1uUva5ikJhLSak',
        'ltc1qxk7dvnv384lvw23wfsm9cptlwjsp2h6zpjls6c',
        'LdQDaHyKiVwUSXU1ZNynwMCkkYAy4weSDD',
        'addr1qxddgrnyrk74d6tw8dvzph79mtk6z3uvvf2h7dhskqf889tyjerk76a8u422508yut5nqqg6mmgczcygq8yhdvtxshesc86rd2',
        '0x9eeae7b71db4885a5b015941f5a14519b02bc0fe',
        'addr1qx2t250qf4xmhvtzx9nm4yn49tkg8tyfl74c3tkg7nt02333ram5d6afydpxgefrt05azh3gs2ymcd0jrv6nk6gn60qqkj2p6q',
        'TYy2d7Wi68W5CM9r13FDRczo4mFd24uenp',
        '0xe5a6b9c8086dbe981cb7bc6c1390ff11775e9ac3',
        '0xad77701be0bdab4c6112f761a0ad7dc5de9e9514',
        'bc1qfke32e9taum8ad2j7fravrw7hs3s0h5xw4hura',
        '0x2dd217c15f97b3014c5046b945d9386a43e3a1e8',
        'rNygJCtF4Zh8EqZB7hmVXwNuVyu9Qqr6Yi',
        '0xdd0d51a516c1d4b1e26819eef388d0f32d0b9454',
        'bc1qs8x6caxpkns9szm37d8csd6ej4nr67qx3hk732',
        'bc1qp4jj29c6wtvfmuvd43huy4wnausdrm8fu958ue',
        '0x74de5d4fcbf63e00296fd95d33236b9794016631',
        '0x2f62f2b4c5fcd7570a709dec05d68ea19c82a9ec',
        'addr1qymu7tjgzx0pmdeje2hcfzqkq4xyp3age52fth45rkxmg6hrgp92xydlz52kwtnajuulpk630803w3v3gph7fxns0jxsrtxn7l',
        'bc1qm0a45r5ew8ue3h93jw6ndrn855wwre7ymc6xv2',
        '0x0050b8825e02f06e56c34f7206f4cf935f648558',
        '0xd6a89047dd0d47cf30c99fc36265d2266d0614d7',
        'TGucfPTopNVFG4CR4wWws9qRWD1RLayiKe',
        '0x6c8cf1d3430b925b30a064c171bf01441333a0d5',
        'TCNC6GuAmk9ut2D8yAXKfbzxvg5wvcdtWo',
        'addr1qx8r3duxqs3neyvytf6vjlj7h77gwhtyvy2m4ky6fs58xv9as6387khu2y2n4j5809dv89m6zw9l945v0uz7xd8aee3slev4lq',
        'TC5dBiA4BMuqbMdEDUpj8yvmvg3aLN8HJA',
        'TXTk6XF3cdQ1WCs8Ca4NG5e2BGZcHugyLd',
        'TLqDfzoMRzmDfcqFc5BrQpzQzRpS4F7Jf8',
        'TUZpdyehCxmvKht2pTNPtLYSmTJCsSKYUz',
        '0x44dab39ddabeb658e60943f106b41854e6d80cbb',
        'raEGV4CJZNFgJaN6QnHUbptyqpeBjUg8sZ',
        'TFpNbc6ruDT3anPmMeMwaimFjocRRGBDDF',
        'TJoPKJrSVPko5DisK1riZigj4eY1L3R1YM',
        'TNUhTnGfHVGHJ2iQXF8bB1adYJ72QHbtGq',
        'TYG3rz7gB8nj7L86BQEWXVja6UaQ4S6N29',
        'TKEiStJ1u4CppMHaaBjNfpWi6QdHvgprD5',
        'TWXQmViN2X7dmfsUebgw7BC4cd99BE2ZWt',
        'TWPzGEW22kUjkguNsWFxHz3skydPtXnPD7',
        'TCob5HQQH2A8c4HSeAJ4RZJFMv68A4ofeZ'
    ];

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
        "🍗 Feed me queries",
        "🔎 Searching?"
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
                    "https://finder.terra.money/classic/tx/" + source,
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
            "This looks like a Monero address, which you cannot view on an explorer usually 🔍 Click this dialogue to open a new tab anyways.";
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
            if (found === false) {
                chrome.tabs.create({
                    active: true,
                    url: "https://secure.helpscout.net/mailbox/4c021305e6c95617/",
                });
            } else if (focusedTab === currentTab) {
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
        setTimeout(function (){
            snackbar.className = snackbar.className.replace("show", "");
        }, 60000);
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

        let inputValue = await document.getElementById("sourceInput").value;

        let source = await inputValue.trim();

        console.log(source.length);

        loading();

        if (source === null || source === undefined || !source) {
            var snackbar = await document.getElementById("snackbar");
            snackbar.innerText = `${getRandomEmoji()}`;
            snackbar.className = "show";
            setTimeout(function () {
                snackbar.className = snackbar.className.replace("show", "");
            }, 800);
        } else if (maliciousArray.indexOf(source) > -1) {
            await checkMalicious(source);
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
        } else if (await getAlgoData(source) && source.length === 52) {
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
        } else if (/^(terra1)[a-z0-9A-Z]{38}$/g.test(source)) {
            //@dev Lunc address search.
            await existingTabCheck("https://finder.terra.money/classic/address/", source);
        } else if (/^R[A-Z0-9a-z]{33}$/g.test(source)){
            //@dev RVN address search
            await existingTabCheck("https://rvnblockexplorer.com/address/", source);
        } else if (
            /^grs[a-zA-Z0-9]{5,88}$|^F[a-km-zA-HJ-NP-Z1-9]{26,33}$|^G[A-Z0-9]{55}$|^ltc[a-zA-Z0-9]{5,88}$|^[LM][a-km-zA-HJ-NP-Z1-9]{26,33}$|^[7X][a-km-zA-HJ-NP-Z1-9]{26,33}$|^[9AD][a-km-zA-HJ-NP-Z1-9]{26,33}$|^([qp][qpzry9x8gf2tvdw0s3jn54khce6mua7l]{40,120}|(bitcoincash)?[qp][qpzry9x8gf2tvdw0s3jn54khce6mua7l]{40,120})$|^bc(0([ac-hj-np-z02-9]{39}|[ac-hj-np-z02-9]{59})|1[ac-hj-np-z02-9]{8,87})$|^1[a-km-zA-HJ-NP-Z1-9]{25,34}(?!\/)$|^3[a-km-zA-HJ-NP-Z1-9]{25,34}$/g.test(
                source
            )
        ) {
            //@dev Most chains addresses. Needs to stay last so other regex's work. Includes LTC, XLM, DASH, DOGE, XMR, BCH and BTC derivations.
            await existingTabCheck("https://blockchair.com/search?q=", source);
        } else if (/^\s*[0-9a-fA-F]{64}\s*$/g.test(source)) {
            //@dev Transaction Window for Multiple chains (So far: Tron, ATOM, UTXOs, BNB beacon chain, XRP, ADA, LUNC)
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
