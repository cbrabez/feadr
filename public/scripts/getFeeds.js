let Parser = require('rss-parser');
let parser = new Parser();
var cron = require('node-cron');


async function parseFeed(feedUrl){
 
  let feed = await parser.parseURL('https://www.reddit.com/.rss');
  console.log(feed.title);
 
  feed.items.forEach(item => {
    console.log(item.title + ':' + item.link);
  });
}

exports.getEntries = function(){
   console.log("from getEntries");
var task = cron.schedule('*/2 * * * *', () => {
  parseFeed();
  //console.log('stoped task');
}, {
  scheduled: false
});
 
task.start();
}