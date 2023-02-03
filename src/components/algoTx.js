//@dev CSP allows CORs self source. Sometimes this matches non-tx strings and produces valid response. Edge case. 

import axios from 'axios';

const getAlgoData = async (source) => {

let api = 'https://algoindexer.algoexplorerapi.io/v2/transactions?txid=';
let tx = source;

  try {
    const response = await axios.get(`${api}${tx}`, {
      method: 'GET',
      headers: {
        accept: 'application/json',
      },
    });

    if (response.status === 200) {
      console.log("status: ", response.status)
      return true;
    } 
  } catch (err) {
    console.log("Error in Algo tx: ", err);
  }
}

export default getAlgoData;

