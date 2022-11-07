# CSE Hackathon Support Explorer 

The first ever Customer Support (CS) dept. hackathon, and the very first CS department hackathon project that involves code. This project showcases the multi-talented department that is one of the important customer facing teams here at Exodus. While this tool is internal, it allows the team, as top leadership has mentioned, `to deliver value to our customers faster`.

This project creates an internal tool. A block explorer extension designed to fit the needs of a 100+ person team and reduce support latency. Search a transaction or address and the tool will match that address/TX with the correct chain out of 61 chains for searching addresses and 31 chains for searching transactions. More will/can be added.  


![Support Explorer Icon](https://github.com/AngelLozan/Block-Explorer-Hackathon-Idea-2/blob/main/public/SearchExo.png?raw=true)

## Installation

Run `npm install` upon cloing to your desired local directory.

Build with `npm run build`

*With the current version, please do not run an audit force fix. This demands different permissions to be set in order to comply with the CSP.*

(After build) Open chrome://extensions or brave://extension and upload the unpacked extension. 


## Updating malicious address array: 

- Utilize this spreadsheet to pull new addresses: https://docs.google.com/spreadsheets/d/1aAAPyrZgfJcWelhLr3RgGU5qS5Epwa2HhBbGNXrfh74/edit#gid=0
  
- Update the `checkMalicious.js` component under `src` > `components` and update the dictionary found there. 
- Update the `SourceInput.js` array `maliciousArray` with the same address, without details. 


## Use Case

See this section of Coda for reference: https://coda.io/d/Customer-Support-Hackathon_deARNEw7ms9/Browser-Extension-Support-Tool_suYtf#_luH-i.


## Features

### Address & Transaction Explorer

Opening the extension UI with Cmd+Shift+k (ctrl+shift+k on Windows), CSE's can quickly search for addresses on 61 blockchains and transactions on 31.

If a valid address/transaction has been entered, a new tab will be opened with the correct block explorer and address/transaction information.

### KB Toolkit

Injected into the Help Scout Docs editor sidebar, the Kb Toolkit scrapes documents for errors and provides quick eliement injection links for team members.

Currently, KB team member either need to write HTML manually or copy paste from another source, risking syntax errors and loss of valuable time on repetitve tasks.

This toolkit offers a 1-click solutions for injecting 26 of the most commonly used HTML elements, and cleaning the document of unwanted HTML code like &nbsps and unused classes.

### Help Scout SOS v2

A new and improved version of the Help Scout SOS extension.

Can be configured within the Support Explorer options page and now displays a count of pending Unassigned Inbox tickets below the extension icon.



## Authors

- Jamie M.
- Scott L. 

## Chains and Assets Searchable:

Assets searchable: All supported on Coinranking. 

EVM Address (DeBank) - 37 Chains

	Ethereum
	BNB Smart Chain
	Polygon
	Gnosis
	Fantom
	OKC
	HECO
	Avalanche
	Arbitrum
	Optimism
	Celo
	Moonriver
	Cronos
	Boba
	Metis
	BTTC
	Aurora
	Moonbeam
	smartBCH
	Harmony
	Fuse
	Astar
	Palm
	Shiden
	Klaytn
	RSK
	IoTeX
	KCC
	Wanchain
	Songbird
	Evmos
	DFK
	Telos
	Swimmer
	Arbitrum Nova
	Canto
	Dogechain
	
	
	
EVM Transactions (Blockscan) - 12 chains
	
	Ethereum
	Beacon Chain
	BNB Smart Chain
	Fantom
	Optimism
	Polygon
	Arbitrum
	Moonbeam
	Moonriver
	Avalanche
	Cronos
	BTTC
	
Layer 1 Address & Transactions (Blockchair) - 17 chains
	
	Bitcoin
	Litecoin
	Cardano
	XRP
	Polkadot
	Dogecoin
	Bitcoin Cash
	Stellar
	Monero
	EOS
	Kusama
	Bitcoin SV
	eCash
	Zcash
	Dash
	Mixin
	Groestlcoin
	
	
	Other L1’s identified through regex or direct interface with blockchain:
	
	Addresses - Algo, Tezos, Solana, Tron, Hedera, Atom, BNB Beacon 
	
	Transactions - Algo, Tezos, Solana, Tron, Hedera, Atom, BNB Beacon, 
	
	
	
Running total:
	
Addresses - 
		37 @ Debank (EVMs)
		17 @ Blockchair
		7 Individual
		—---
		61
	
Transactions - 
		12 @ Blockscan (EVMs)
		17 @ Blockchair
		7 Individual
		—---
		36
