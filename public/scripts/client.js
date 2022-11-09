/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const convertDate = (date) => {
  const minute = 1000 * 60;
  const hour = minute * 60;
  const day = hour * 24;
  const year = day * 365;

  const now = new Date().getTime();
  const difference = now - date;
  
  if (difference > 2 * year) {
    return `${Math.floor(difference / year)} years ago`;
  }

  if (difference > year) {
    return '1 year ago';
  }

  if (difference > 2 * day) {
    return `${Math.floor(difference / day)} days ago`;
  }

  if (difference > day) {
    return '1 day ago';
  }

  if (difference > 2 * hour) {
    return `${Math.floor(difference / hour)} hours ago`;
  }

  if (difference > hour) {
    return '1 hour ago';
  }

  if (difference > 2 * minute) {
    return `${Math.floor(difference / hour)} minutes ago`;
  }

  if (difference > minute) {
    return '1 minute ago';
  }

  return `${Math.floor(difference / 1000)} seconds ago`;

};

const data = [
  {
    "user": {
      "name": "Newton",
      "avatars": "https://i.imgur.com/73hZDYK.png"
      ,
      "handle": "@SirIsaac"
    },
    "content": {
      "text": "If I have seen further it is by standing on the shoulders of giants"
    },
    "created_at": 1461116232227
  },
  {
    "user": {
      "name": "Descartes",
      "avatars": "https://i.imgur.com/nlhLi3I.png",
      "handle": "@rd" },
    "content": {
      "text": "Je pense , donc je suis"
    },
    "created_at": 1461113959088
  }
];

const renderTweets = function(tweets) {
// loops through tweets
  for (const tweet in tweets) {
  // calls createTweetElement for each tweet
    const tweetElement = createTweetElement(tweets[tweet]);
    // takes return value and appends it to the tweets container
    $('#tweets-container').append(tweetElement);
  }
};

const createTweetElement = function(tweet) {
  // Main article
  const $tweet = $(`<article class="tweet"></>`);
  
  // Header for tweet
  const $header = $('<header></>');
  
  // Username & avatar
  const $userDiv = $('<div class="user"></div>');
  const $userAvatar = $(`<img src="${tweet.user.avatars}"/>`);
  const $userName = $(`<p>${tweet.user.name}</p>`);

  $userDiv.append($userAvatar).append($userName);
  const $userHandle = $(`<p>${tweet.user.handle}</p>`);

  // Complete header
  $header.append($userDiv).append($userHandle);

  // Tweet content
  const $tweetBody = $(`<p>${tweet.content.text}</p>`);

  // Footer
  const $footer = $('<footer></footer>');

  
  const $date = $(`<p>${convertDate(tweet.created_at)}</p>`);

  const $iconsDiv = $('<div class="icons"></div>');
  const $flag = $('<i class="fa-solid fa-flag"></i>');
  const $reTweet = $('<i class="fa-solid fa-retweet"></i>');
  const $heart = $('<i class="fa-solid fa-heart"></i>');

  $iconsDiv.append($flag).append($reTweet).append($heart);

  $footer.append($date).append($iconsDiv);

  $tweet.append($header).append($tweetBody).append($footer);

  return $tweet;
};

$(document).ready(function() {

  renderTweets(data);
});
