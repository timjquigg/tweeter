const toggleNewTweet = function() {
  if ($('.new-tweet').is(':hidden')) {
    $('.new-tweet').slideDown();
    $('.new-tweet').find('#tweet-text').focus();
    return;
  }
  $('.new-tweet').slideUp();
};

const showToTop = function() {
  if ($(this).scrollTop()) {
    $('#to-top').fadeIn();
    $('#show-new-tweet').fadeOut();
  } else {
    $('#to-top').fadeOut();
    $('#show-new-tweet').fadeIn();
  }
};

const toTop = function() {
  $("html, body").animate({scrollTop: 0}, 1000);
  $('.new-tweet').slideDown();
  $('#tweet-text').focus();
};

$(document).ready(function() {

  $('.navbar-menu').on('click', toggleNewTweet);
  $(document).on('scroll', showToTop);
  $('#to-top').on('click', toTop);
});