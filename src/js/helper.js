import { TIMEOUT_TIME } from './config';

//--> Preventing very long loading time with slow internet connection (It will reject the promise after some time).
const timeout = function (s) {
  return new Promise(function (_, reject) {
    setTimeout(function () {
      reject(new Error(`Request took too long! Timeout after ${s} second`));
    }, s * 1000);
  });
};

export const fetchData = async function (url) {
  try {
    const res = await Promise.race([fetch(url), timeout(TIMEOUT_TIME)]);

    const data = await res.json();

    if (!res.ok) throw new Error(`Status: ${res.status}, ${data.message})`);

    return data;
  } catch (err) {
    throw err;
  }
};

export const sendData = async function (url, uploadData) {
  try {
    const res = await Promise.race([
      fetch(url, {
        method: 'post',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(uploadData),
      }),
      timeout(TIMEOUT_TIME),
    ]);

    const data = await res.json();

    if (!res.ok) throw new Error(`Status: ${res.status}, ${data.message})`);

    return data;
  } catch (err) {
    throw err;
  }
};
