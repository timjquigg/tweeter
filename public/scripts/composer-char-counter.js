const charCount = function() {
  autosize($(this));
  const max = 140;
  const current = $(this).val().length;
  const count = max - current;
  const counter = $(this).parent().next().find(".counter");
  counter.text(count);
  
  count < 0 ? counter.addClass('negative') : counter.removeClass('negative');

};

$(document).ready(function() {
  $('#tweet-text').on('input', charCount);
});