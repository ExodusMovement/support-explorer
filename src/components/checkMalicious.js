import existingTabCheck from "./existingTab.js";

const checkMalicious = async (source) => {

let occurrences;
let attackType;
let ticker;
let explorer;


    async function findMessage(keys) {
        occurrences = await malicious[keys][0];
        attackType = await malicious[keys][1];
        ticker = await malicious[keys][2];
        explorer = await malicious[keys][3];

        let message = "🛑 This " + ticker + " hash has been flagged with " + occurrences + " occurrence(s) of " + attackType + " attacks.  Click this dialog to open explorer. Click me to reset.";

        return message;
    }
    // @dev 'Address': ["Instances", "Type", "Ticker", "Explorer"]
    // last update Jan 27, 2023
    const malicious = {
        '0x7bd1ed3adf588a89c392c5c424583c0ffffce145': ["19", "malware", "ETH", "https://debank.com/profile/"],
        '0x4DE23f3f0Fb3318287378AdbdE030cf61714b2f3': ["36", "scam", "ETH", "https://debank.com/profile/"],
        'bc1qr6ra3pr56r5ha37pvz5g5xrk4q66hu86jsptyv': ["2", "undefined", "BTC", "https://blockchair.com/search?q="],
        'bc1q596wathu333nh3rtvypyp7sxzuqqqtua4drk5z': ["37", "malware", "BTC", "https://blockchair.com/search?q="],
        'bc1qy98y22mnqr6pehukzweyz8yqehnf6h4qn97244': ["9", "malware", "BTC", "https://blockchair.com/search?q="],
        'TXaYFNopc8xsjJLtVzvAVQGProbCmsuXYr': ["53", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TVotcWLyia5uAFn5LmhVPcmHoxhbdJCmBd': ["14", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TFkXxSdc7wVvEt6pgs99j655mubwcdcv6s': ["15", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TAR7PijCQUXjCBbpJ8LdadxA1syhVGk1it': ["3", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TN6SSaE6DJGjk2XTCFLwADyDg4hWjJ8vSz': ["20", "scam", "TRX", "https://tronscan.org/#/address/"],
        '0x09eb9ed064594de81c5b95a10ca565147a9e3f32': ["2", "malware", "ETH", "https://debank.com/profile/"],
        '0x91e36fc3f9b7873d618efeae755958bc6ede898e': ["8", "undefined", "ETH", "https://debank.com/profile/"],
        'bc1qhcvsr4lzt0394swq7gu84kmv83gddyxvces7h2': ["12", "undefined", "BTC", "https://blockchair.com/search?q="],
        'rnT25PNPRoGGutThwQtR13DZ9iCn4egnn3': ["4", "undefined", "XRP", "https://blockchair.com/search?q="],
        '0x118A52F44a9a7c8D526436CBbC38bD49C7Db0426': ["3", "malware", "ETH", "https://debank.com/profile/"],
        '34U9ZtH4JpddoZKnmt4ZLaK9aWo5AXWEfU': ["4", "scam", "BTC", "https://blockchair.com/search?q="],
        'bc1qk7xml2px86eg339nh3m94qj84c2mgf48rnw8lz': ["4", "undefined", "BTC", "https://blockchair.com/search?q="],
        '0xAaB910ACDD01AF491179Bb7c91A56080F764c8E1': ["2", "phishing", "ETH", "https://debank.com/profile/"],
        '0x002c16040b2f42fcb23dfecd5566ffbdd9865f6f': ["4", "undefined", "ETH", "https://debank.com/profile/"],
        '0xe64ad42e9ed6135b504f4c29ffe9d3a187bc14e2': ["7", "undefined", "ETH", "https://debank.com/profile/"],
        'TGQHGNuPA5XUX3DoaQHe2JegbZvKDjcrCb': ["1", "malware", "USDTtrx", "https://tronscan.org/#/address/"],
        'bnb1pma22amrcdztf93t4ynp4jzq6llpqlthualgr3': ["1", "undefined", "BNB", "https://binance.mintscan.io/account/"],
        'RMKRCe88sJZxNKPRRBePP6AV2i6Pk2VXfF': ["1", "undefined", "RVN", "https://rvnblockexplorer.com/address/"],
        'addr1q879x08md82k5zn526eleqwfwf6fw0fczctm7ns6h2nl4wmyjerk76a8u422508yut5nqqg6mmgczcygq8yhdvtxsheswvgtnz': ["2", "undefined", "ADA", "https://blockchair.com/search?q="],
        'addr1q9x5m26aup77g3gta8vmd6vqkavlxapyzxg6zdp5wu2ur4nyjerk76a8u422508yut5nqqg6mmgczcygq8yhdvtxshes85s03l': ["3", "undefined", "ADA", "https://blockchair.com/search?q="],
        '0xc663d040146b21fe6dbfa9be228f44ced02c0735': ["5", "phishing", "ETH", "https://debank.com/profile/"],
        'bc1qykyq6ngdne5anch2zypmvgcpxwjrez97yccxe0': ["3", "undefined", "BTC", "https://blockchair.com/search?q="],
        '0.0.985817': ["1", "undefined", "HBAR", "https://hashscan.io/#/mainnet/account/"],
        'AJ1shZYBxnSsuCNE8FoRtvdAT8jtX7ahQJayeHxbKwtk': ["1", "undefined", "SOL", "https://solscan.io/account/"],
        '1e8w1oXJwCx4eFiCFxEFpfu38ne3MG7CuLrJGzUXhYr2tbL': ["1", "undefined", "DOT", "https://blockchair.com/search?q="],
        'bc1q6wusy8vffy03ty8gc3qm9h4ve89k32rnknkla6': ["1", "active", "BTC", "https://blockchair.com/search?q="],
        'bc1qttxylp3g4r248qmv6cwwq82z0a34dmqa3sjjfs': ["1", "undefined", "BTC", "https://blockchair.com/search?q="],
        'addr1q9cush3ruaupkg2tu8xeavpvhmw33c9nh7sgax3nsdma53prdmxc8w7z66sdd685swrr56kv97trmxmzt74gmhh7tqyqsnvtee': ["1", "undefined", "ADA", "https://blockchair.com/search?q="],
        '0x45d59b12221752e65c77b4bde118adb1dca69668': ["2", "undefined", "ETC", "https://blockscout.com/etc/mainnet/address/"],
        'bc1qkc8puvcga4qhqc9gtmy566np4wphlkev93sngq': ["3", "malware", "BTC", "https://blockchair.com/search?q="],
        '0x3be343277d6b3a6733c28c098fef3d64adae5819': ["1", "undefined", "ETH", "https://debank.com/profile/"],
        'GC2UATGZLSKPZ5PA3P2XLNYWD3BW6JTNSZR5IZGLKRZXCM53CHSLFNAS': ["1", "undefined", "XLM", "https://blockchair.com/search?q="],
        'DTZb1xaQac5jsVy8CqWo1T4zzmBVotYtG5': ["1", "undefined", "DOGE", "https://blockchair.com/search?q="],
        '0xbd38643b5077f469ea7b40f151bc385f6abe46b6': ["1", "undefined", "VET", "https://vechainstats.com/account/"],
        'addr1q9yupzxmzyhjwa6993arpfrh7xkjwzvknmdpyyxvul5l295awga34304dayq6mgrzycz8pvd7u0kdscjehgt0vkjjuvselayqx': ["2", "undefined", "ADA", "https://blockchair.com/search?q="],
        '0x29f29f8281e0c9bb5355e365ce698cd08b535fa4': ["2", "undefined", "ETH", "https://debank.com/profile/"],
        '1FdnbsoouVffg8dEqTeYY6ebcLdtMP3PJe': ["1", "undefined", "BTC", "https://blockchair.com/search?q="],
        '0xe65edaeb8fdb554c99987bcf46d984e7b36c8240': ["9", "malware", "ETH", "https://debank.com/profile/"],
        'ltc1qxdq9kas5lfwhqe4mujllck6pygdrpl09nfuuuj': ["4", "malware", "LTC", "https://blockchair.com/search?q="],
        '0x39F6a6C85d39d5ABAd8A398310c52E7c374F2bA3': ["6", "malware", "ETH", "https://debank.com/profile/"],
        'bc1qfx3ewtpkw62f4vnj228phccu7d7decdxpj8kxn': ["2", "undefined", "BTC", "https://blockchair.com/search?q="],
        '13i44XzgjeG7HD24dprX2zdrKkS8CNiJoY': ["2", "phishing", "BTC", "https://blockchair.com/search?q="],
        '0x9c4ab5727c76563f8c386c3e78672b4f9cdbde5b': ["2", "malware", "ETH", "https://debank.com/profile/"],
        '0x91eee58069C61cC9080964616A0Bd54a29e5D74B': ["4", "malware", "ETH", "https://debank.com/profile/"],
        'bc1que35aggdmzaq4khzucczlhqxaqqxrj0nl5qvpt': ["2", "undefined", "BTC", "https://blockchair.com/search?q="],
        'rEXzpuLshGdF8KNcr5GkZihSCJX7yEaJXT': ["2", "undefined", "XRP", "https://blockchair.com/search?q="],
        '1Q2Za34Ub95tNowFTcqV1uUva5ikJhLSak': ["2", "undefined", "BTC", "https://blockchair.com/search?q="],
        'ltc1qxk7dvnv384lvw23wfsm9cptlwjsp2h6zpjls6c': ["2", "malware", "LTC", "https://blockchair.com/search?q="],
        'LdQDaHyKiVwUSXU1ZNynwMCkkYAy4weSDD': ["2", "malware", "LTC", "https://blockchair.com/search?q="],
        'addr1qxddgrnyrk74d6tw8dvzph79mtk6z3uvvf2h7dhskqf889tyjerk76a8u422508yut5nqqg6mmgczcygq8yhdvtxshesc86rd2': ["3", "malware", "ADA", "https://blockchair.com/search?q="],
        '0x9eeae7b71db4885a5b015941f5a14519b02bc0fe': ["4", "malware", "ETH", "https://debank.com/profile/"],
        'addr1qx2t250qf4xmhvtzx9nm4yn49tkg8tyfl74c3tkg7nt02333ram5d6afydpxgefrt05azh3gs2ymcd0jrv6nk6gn60qqkj2p6q': ["2", "malware", "ADA", "https://blockchair.com/search?q="],
        'TYy2d7Wi68W5CM9r13FDRczo4mFd24uenp': ["18", "scam", "TRX", "https://tronscan.org/#/address/"],
        '0xe5a6b9c8086dbe981cb7bc6c1390ff11775e9ac3': ["2", "unknown", "ETH", "https://debank.com/profile/"],
        '0xad77701be0bdab4c6112f761a0ad7dc5de9e9514': ["5", "malware", "ETH", "https://debank.com/profile/"],
        'bc1qfke32e9taum8ad2j7fravrw7hs3s0h5xw4hura': ["2", "scam", "BTC", "https://blockchair.com/search?q="],
        '0x2dd217c15f97b3014c5046b945d9386a43e3a1e8': ["3", "unknown", "ETH", "https://debank.com/profile/"],
        'rNygJCtF4Zh8EqZB7hmVXwNuVyu9Qqr6Yi': ["3", "unknown", "XRP", "https://blockchair.com/search?q="],
        '0xdd0d51a516c1d4b1e26819eef388d0f32d0b9454': ["2", "unknown", "ETH", "https://debank.com/profile/"],
        'bc1qs8x6caxpkns9szm37d8csd6ej4nr67qx3hk732': ["2", "unknown", "BTC", "https://blockchair.com/search?q="],
        'bc1qp4jj29c6wtvfmuvd43huy4wnausdrm8fu958ue': ["3", "malware", "BTC", "https://blockchair.com/search?q="],
        '0x74de5d4fcbf63e00296fd95d33236b9794016631': ["5", "unknown", "ETH", "https://debank.com/profile/"],
        '0x2f62f2b4c5fcd7570a709dec05d68ea19c82a9ec': ["2", "unknown", "ETH", "https://debank.com/profile/"],
        'addr1qymu7tjgzx0pmdeje2hcfzqkq4xyp3age52fth45rkxmg6hrgp92xydlz52kwtnajuulpk630803w3v3gph7fxns0jxsrtxn7l': ["3", "unknown", "ADA", "https://blockchair.com/search?q="],
        'bc1qm0a45r5ew8ue3h93jw6ndrn855wwre7ymc6xv2': ["2", "unknown", "BTC", "https://blockchair.com/search?q="],
        '0x0050b8825e02f06e56c34f7206f4cf935f648558': ["3", "scam", "ETH", "https://debank.com/profile/"],
        '0xd6a89047dd0d47cf30c99fc36265d2266d0614d7': ["2", "malware", "ETH", "https://debank.com/profile/"],
        'TGucfPTopNVFG4CR4wWws9qRWD1RLayiKe': ["42", "scam", "TRX", "https://tronscan.org/#/address/"],
        '0x6c8cf1d3430b925b30a064c171bf01441333a0d5': ["2", "malware", "ETH", "https://debank.com/profile/"],
        'TCNC6GuAmk9ut2D8yAXKfbzxvg5wvcdtWo': ["4", "malware", "TRX", "https://tronscan.org/#/address/"],
        'addr1qx8r3duxqs3neyvytf6vjlj7h77gwhtyvy2m4ky6fs58xv9as6387khu2y2n4j5809dv89m6zw9l945v0uz7xd8aee3slev4lq': ["2", "unknown", "ADA", "https://blockchair.com/search?q="],
        'TC5dBiA4BMuqbMdEDUpj8yvmvg3aLN8HJA': ["225", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TXTk6XF3cdQ1WCs8Ca4NG5e2BGZcHugyLd': ["84", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TLqDfzoMRzmDfcqFc5BrQpzQzRpS4F7Jf8': ["79", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TUZpdyehCxmvKht2pTNPtLYSmTJCsSKYUz': ["39", "scam", "TRX", "https://tronscan.org/#/address/"],
        '0x44dab39ddabeb658e60943f106b41854e6d80cbb': ["2", "unknown", "ETH", "https://debank.com/profile/"],
        'raEGV4CJZNFgJaN6QnHUbptyqpeBjUg8sZ': ["2", "unknown", "XRP", "https://blockchair.com/search?q="],
        'TFpNbc6ruDT3anPmMeMwaimFjocRRGBDDF': ["59", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TJoPKJrSVPko5DisK1riZigj4eY1L3R1YM': ["563", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TNUhTnGfHVGHJ2iQXF8bB1adYJ72QHbtGq': ["6", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TYG3rz7gB8nj7L86BQEWXVja6UaQ4S6N29': ["50", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TKEiStJ1u4CppMHaaBjNfpWi6QdHvgprD5': ["10", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TWXQmViN2X7dmfsUebgw7BC4cd99BE2ZWt': ["51", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TWPzGEW22kUjkguNsWFxHz3skydPtXnPD7': ["80", "scam", "TRX", "https://tronscan.org/#/address/"],
        'TCob5HQQH2A8c4HSeAJ4RZJFMv68A4ofeZ': ["64", "scam", "TRX", "https://tronscan.org/#/address/"]
        'TM6Pc9S17kmYVtm7zwyZdpj9BjQbV7APnw': ["2", "scam", "TRX", "https://tronscan.org/#/address/"]
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
                // eslint-disable-next-line no-loop-func
                async function (){
                    await existingTabCheck(explorer, source);
                }
            );
        }
    }
};


export default checkMalicious;
