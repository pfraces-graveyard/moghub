function makeExpandingArea(container) {
  var area = container.querySelector('textarea');
  var span = container.querySelector('span');
  area.addEventListener('input', function() {
    span.textContent = area.value;
  }, false);
  span.textContent = area.value;

  // Enable extra CSS
  container.className += ' active';
}

makeExpandingArea(document.querySelector('.expandingArea'));
