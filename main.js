const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv').config();

(async () => {
  let userId = '1439079732784553985';
  let fetchUrl = `https://api.twitter.com/2/users/${userId}/following`; //

  try {
    await axios
      .get(fetchUrl, {
        headers: {
          Authorization: `Bearer ${process.env.BEARER_TOKEN}`,
        },
        // params: {
        //   pagination_token: tokenArr[i - 1],
        // },
      })
      .then((res) => {
        console.log(checkForToken(res));
      });
  } catch (e) {
    console.log(e);
  }

  let checkForToken = (res) => {
    if (res.data.meta.next_token) {
      return res.data.meta.next_token;
    }
  };
})();
