//@dev If transaction, then true and tab opened. Currently blocked by CORS, but not neccessary in my opinion.
//@dev (for accounts) api = "https://api.tzstats.com/explorer/account/{account}

import axios from "axios";

//const axios = require('axios').default;

const api = "https://api.tzstats.com/explorer/op/";


let reqInstance = axios.create({
  method: "GET",
  headers: {
        'Accept': "application/json",
        'Access-Control-Allow-Origin': "*",
        'Access-Control-Allow-Credentials': "false",
        'Access-Control-Allow-Methods': "GET, POST, PATCH, PUT, DELETE, OPTIONS",
        'Access-Control-Allow-Headers': "Origin, Content-Type, X-Auth-Token, Authorization, Accept,charset,boundary,Content-Length"
      }
  }
)


const verifyTezTx = async (source) => {
  let tx = source;

  try {
    const response = await reqInstance.get(`${api}${tx}`); 
  
    if (response.id) {
      console.log("Id: ", response.id)
      return true;
    } else {
      throw new Error(`Error! Id: ${response.id}`);
    }
  } catch (err) {
    console.log(err);
  }
};

export default verifyTezTx;