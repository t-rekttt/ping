const request = require('request-promise');
const async = require('async');

getUrls = () => request('https://gist.githubusercontent.com/t-rekttt/55b4e5fc6bb049344701512c6d6c9b77/raw/742843aa08afbaefe2981113d2234c5746080df1/ping_list.txt').then(resp => resp.trim().split('\n'))

setInterval(() => {
  try {
    getUrls().then(urls => {
      async.eachLimit(urls, 5, (url, cb) => {
        request(url)
          .then(console.log(`Fetched ${url}`))
          .catch(err => cb(err));
      }, (err) => {
        console.log(err);
      });
    });
  } catch (err) {
    console.log(err);
  }
}, 60*5*1000)