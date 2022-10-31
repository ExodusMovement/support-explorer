/* global chrome */

const checkMalicious = async (source) => {

    async function findMessage(keys) {
        let occurrences = await malicious[keys][0];
        let attackType = await malicious[keys][1];
        let ticker = await malicious[keys][2];

        let message = "🛑 This " + ticker + " hash has been flagged with " + occurrences + " occurrence(s) of " + attackType + " attacks.  Click this dialog to open a new minimized window. Click me to reset.";

        return message;
    }

    const malicious = {
        '0x7bd1ed3adf588a89c392c5c424583c0ffffce145': ["19", "malware", "ETH"],
        '0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3': ["36", "scam", "ETH"],
        'bc1qr6ra3pr56r5ha37pvz5g5xrk4q66hu86jsptyv': ["2", "undefined", "BTC"],
        'bc1q596wathu333nh3rtvypyp7sxzuqqqtua4drk5z': ["37", "malware", "BTC"],
        'bc1qy98y22mnqr6pehukzweyz8yqehnf6h4qn97244': ["9", "malware", "BTC"],
        'TXaYFNopc8xsjJLtVzvAVQGProbCmsuXYr': ["53", "scam", "TRX"],
        'TVotcWLyia5uAFn5LmhVPcmHoxhbdJCmBd': ["14", "scam", "TRX"],
        'TFkXxSdc7wVvEt6pgs99j655mubwcdcv6s': ["15", "scam", "TRX"],
        'TAR7PijCQUXjCBbpJ8LdadxA1syhVGk1it': ["3", "scam", "TRX"],
        'TN6SSaE6DJGjk2XTCFLwADyDg4hWjJ8vSz': ["20", "scam", "TRX"],
        '0x09eb9ed064594de81c5b95a10ca565147a9e3f32': ["2", "malware", "ETH"],
        '0x91e36fc3f9b7873d618efeae755958bc6ede898e': ["8", "undefined", "ETH"],
        'bc1qhcvsr4lzt0394swq7gu84kmv83gddyxvces7h2': ["12", "undefined", "BTC"],
        'rnT25PNPRoGGutThwQtR13DZ9iCn4egnn3': ["4", "undefined", "XRP"],
        '0x118A52F44a9a7c8D526436CBbC38bD49C7Db0426': ["3", "malware", "ETH"],
        '34U9ZtH4JpddoZKnmt4ZLaK9aWo5AXWEfU': ["4", "scam", "BTC"],
        'bc1qk7xml2px86eg339nh3m94qj84c2mgf48rnw8lz': ["4", "undefined", "BTC"],
        '0xAaB910ACDD01AF491179Bb7c91A56080F764c8E1': ["2", "phishing", "ETH"],
        '0x002c16040b2f42fcb23dfecd5566ffbdd9865f6f': ["4", "undefined", "ETH"],
        '0xe64ad42e9ed6135b504f4c29ffe9d3a187bc14e2': ["7", "undefined", "ETH"],
        'TGQHGNuPA5XUX3DoaQHe2JegbZvKDjcrCb': ["1", "malware", "USDTtrx"],
        'bnb1pma22amrcdztf93t4ynp4jzq6llpqlthualgr3': ["1", "undefined", "BNB"],
        'RMKRCe88sJZxNKPRRBePP6AV2i6Pk2VXfF': ["1", "undefined", "RVN"],
        'addr1q879x08md82k5zn526eleqwfwf6fw0fczctm7ns6h2nl4wmyjerk76a8u422508yut5nqqg6mmgczcygq8yhdvtxsheswvgtnz': ["2", "undefined", "ADA"],
        'addr1q9x5m26aup77g3gta8vmd6vqkavlxapyzxg6zdp5wu2ur4nyjerk76a8u422508yut5nqqg6mmgczcygq8yhdvtxshes85s03l': ["3", "undefined", "ADA"],
        '0xc663d040146b21fe6dbfa9be228f44ced02c0735': ["5", "phishing", "ETH"],
        'bc1qykyq6ngdne5anch2zypmvgcpxwjrez97yccxe0': ["3", "undefined", "BTC"],
        '0.0.985817': ["1", "undefined", "HBAR"],
        'AJ1shZYBxnSsuCNE8FoRtvdAT8jtX7ahQJayeHxbKwtk': ["1", "undefined", "SOL"],
        '1e8w1oXJwCx4eFiCFxEFpfu38ne3MG7CuLrJGzUXhYr2tbL': ["1", "undefined", "DOT"],
        'bc1q6wusy8vffy03ty8gc3qm9h4ve89k32rnknkla6': ["1", "active", "BTC"],
        'bc1qttxylp3g4r248qmv6cwwq82z0a34dmqa3sjjfs': ["1", "undefined", "BTC"],
        'addr1q9cush3ruaupkg2tu8xeavpvhmw33c9nh7sgax3nsdma53prdmxc8w7z66sdd685swrr56kv97trmxmzt74gmhh7tqyqsnvtee': ["1", "undefined", "ADA"],
        '0x45d59b12221752e65c77b4bde118adb1dca69668': ["2", "undefined", "ETC"],
        'bc1qkc8puvcga4qhqc9gtmy566np4wphlkev93sngq': ["3", "malware", "BTC"],
        '0x3be343277d6b3a6733c28c098fef3d64adae5819': ["1", "undefined", "ETH"],
        'GC2UATGZLSKPZ5PA3P2XLNYWD3BW6JTNSZR5IZGLKRZXCM53CHSLFNAS': ["1", "undefined", "XLM"],
        'DTZb1xaQac5jsVy8CqWo1T4zzmBVotYtG5': ["1", "undefined", "DOGE"],
        '0xbd38643b5077f469ea7b40f151bc385f6abe46b6': ["1", "undefined", "VET"],
        'addr1q9yupzxmzyhjwa6993arpfrh7xkjwzvknmdpyyxvul5l295awga34304dayq6mgrzycz8pvd7u0kdscjehgt0vkjjuvselayqx': ["2", "undefined", "ADA"],
        '0x29f29f8281e0c9bb5355e365ce698cd08b535fa4': ["2", "undefined", "ETH"],
        '1FdnbsoouVffg8dEqTeYY6ebcLdtMP3PJe': ["1", "undefined", "BTC"],
        '0xe65edaeb8fdb554c99987bcf46d984e7b36c8240': ["9", "malware", "ETH"],
        'ltc1qxdq9kas5lfwhqe4mujllck6pygdrpl09nfuuuj': ["4", "malware", "LTC"],
        '0x39F6a6C85d39d5ABAd8A398310c52E7c374F2bA3': ["6", "malware", "ETH"],
        'bc1qfx3ewtpkw62f4vnj228phccu7d7decdxpj8kxn': ["2", "undefined", "BTC"],
        '13i44XzgjeG7HD24dprX2zdrKkS8CNiJoY': ["2", "phishing", "BTC"],
        '0x9c4ab5727c76563f8c386c3e78672b4f9cdbde5b': ["2", "malware", "ETH"],
        '0x91eee58069C61cC9080964616A0Bd54a29e5D74B': ["4", "malware", "ETH"],
        'bc1que35aggdmzaq4khzucczlhqxaqqxrj0nl5qvpt': ["2", "undefined", "BTC"],
        'rEXzpuLshGdF8KNcr5GkZihSCJX7yEaJXT': ["2", "undefined", "XRP"],
        '1Q2Za34Ub95tNowFTcqV1uUva5ikJhLSak': ["2", "undefined", "BTC"],
        'ltc1qxk7dvnv384lvw23wfsm9cptlwjsp2h6zpjls6c': ["2", "malware", "LTC"],
        'LdQDaHyKiVwUSXU1ZNynwMCkkYAy4weSDD': ["2", "malware", "LTC"],
        'addr1qxddgrnyrk74d6tw8dvzph79mtk6z3uvvf2h7dhskqf889tyjerk76a8u422508yut5nqqg6mmgczcygq8yhdvtxshesc86rd2': ["3", "malware", "ADA"],
        'bc1qlp2dqp59093lpasjlua08nsnrj2a5u5ud2clws': ["1", "undefined", "BTC"],
        'TSVSgu1PLt2o6ihFvjrhvoDrU6AYmJ2XdJ': ["1", "undefined", "TRX"],
        '637c3eec12d605f60f09c7c5b4ed81819b8e108fccb36a17f60857f7bd940944': ["1", "undefined", "BTC"],
        'cc9933b430740d8024664bb142deeb849f03e05fd44b81b17361301f97ea498d': ["1", "undefined", "BTC"]
    }

    for (let keys in malicious) {

        let regex = new RegExp(keys, 'gi');

        if (regex.test(source)) {
            var snackbar = await document.getElementById("snackbar");
            snackbar.innerText = await findMessage(source);
            snackbar.className = "showMultiScam";
            snackbar.style.right = "15px";

            snackbar.addEventListener(
                "click",
                function(event) {
                    let urlArray = [
                        "https://blockchair.com/search?q=" + source,
                        "https://tronscan.org/#/transaction/" + source,
                        "https://tronscan.org/#/address/" + source,
                        "https://etherscan.io/address/" + source,
                        "https://vechainstats.com/account/" + source,
                        "https://solscan.io/account/" + source,
                        "https://hashscan.io/mainnet/account/" + source
                    ];
                    chrome.windows.create({
                        focused: false,
                        state: "minimized",
                        url: urlArray,
                    });
                    snackbar.innerText = "I opened a new, minimized window 👀";
                    snackbar.className = snackbar.className.replace(
                        "showMultiScam",
                        "show"
                    );
                    snackbar.style.right = "40%";
                    setTimeout(function() {
                        snackbar.className = snackbar.className.replace("show", "");
                        snackbar.style.right = snackbar.style.right.replace(
                            "40%",
                            "60%"
                        );
                    }, 1500);
                }, { once: true }
            );
        }
    }
};


export default checkMalicious;