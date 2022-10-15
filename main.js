const axios = require('axios');
const fs = require('fs');
const dotenv = require('dotenv').config();

(async () => {
  let userId = '1439079732784553985';
  let fetchUrl = `https://api.twitter.com/2/users/${userId}/following`; //
  let repetitions = 0;
  let results = [];
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
          pagination_token: token,
        },
            })
      })
      .then((res) => {
          repetitions++
        checkForToken(res);
        results.push(res);
      });
  }

  try {
    if (repetitions <= 13){ // API Call limit 15 per 15 minutes.
        await apiCall();
    } else {
        setTimeout(async () => {
            repetitions = 0;
            await apiCall()
        }, 901000)
    }
  } catch (e) {
    console.log(e);
  }
})();
