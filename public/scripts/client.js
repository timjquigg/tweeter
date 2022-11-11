/*
 * Client-side JS logic goes here
 * jQuery is already loaded
 * Reminder: Use (and do all your DOM work in) jQuery's document ready function
 */

// Fake data taken from initial-tweets.json

const renderTweets = function(tweets) {
// loops through tweets
  for (const tweet in tweets) {
  // calls createTweetElement for each tweet
    const tweetElement = createTweetElement(tweets[tweet]);
    // takes return value and appends it to the tweets container
    $('#tweets-container').prepend(tweetElement);
  }
};

const getLatestTweet = function(tweets) {
  const keys = Object.keys(tweets);
  const lastTweet = tweets[keys[keys.length - 1]];
  const tweetElement = createTweetElement(lastTweet);
  $('#tweets-container').prepend(tweetElement);
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
  const $tweetBody = $('<p></p>');
  $tweetBody.text(tweet.content.text);

  // Footer
  const $footer = $('<footer></footer>');

  // Date
  const $date = $(`<p>${timeago.format(tweet.created_at)}</p>`);

  // Flag, Retweet, Heart
  const $iconsDiv = $('<div class="icons"></div>');
  const $flag = $('<i class="fa-solid fa-flag"></i>');
  const $reTweet = $('<i class="fa-solid fa-retweet"></i>');
  const $heart = $('<i class="fa-solid fa-heart"></i>');

  $iconsDiv.append($flag).append($reTweet).append($heart);

  // Complete Footer
  $footer.append($date).append($iconsDiv);

  // Complete Article
  $tweet.append($header).append($tweetBody).append($footer);

  return $tweet;
};

const handleSubmit = function(event) {
  event.preventDefault();
  const tweet = $(this).find('#tweet-text');
  const error = $(this).find('.error');

  error.hide();

  if (tweet.val() === '') {
    const message = 'CANNOT SUBMIT AN EMPTY TWEET!';
    error.find('h5').text(message);
    error.slideDown();
    return;
  }

  if (tweet.val().length > 140) {
    const message = 'TWEET LENGTH CANNOT EXCEED 140 CHARACTERS!';
    error.find('h5').text(message);
    error.slideDown();
    return;
  }

  $.ajax({
    data: $(this).serialize(),
    url: '/tweets',
    method: 'POST',
    success: ()=>{
      $(tweet).val('');
      $('.new-tweet').find('.counter').val('140');
      loadTweets(getLatestTweet);
    }
  });

};

const loadTweets = function(callback) {
  $.ajax({
    url: '/tweets',
    method: 'GET',
  }).then(callback);
};



$(document).ready(function() {
 
  loadTweets(renderTweets);

  $('.new-tweet > form').on('submit', handleSubmit);

});
