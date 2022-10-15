const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv').config();

(async () => {
  let userId = '1439079732784553985';
  let fetchUrl = `https://api.twitter.com/2/users/${userId}/following`; //
  
  let checkForToken = (res) => {
    if (res.data.meta.next_token) {
      apiCall(res.data.meta.next_token)
    }
  };

  let apiCall = async (token) => {
    await axios
      .get(fetchUrl, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
        ...(token && {
          params: {
          pagination_token: tokenArr,
        },
            })
      })
      .then((res) => {
        return res;
      });
  }

  try {
    console.log(apiCall())
  } catch (e) {
    console.log(e);
  }
})();
