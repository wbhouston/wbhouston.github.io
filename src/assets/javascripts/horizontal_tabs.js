function change_active_tab(event) {
  var target = event.currentTarget;
  var active_classes = target.dataset.activeColumns.split(' ');
  var inactive_classes = target.dataset.inactiveColumns.split(' ');

  var triggers = document.querySelectorAll('.js-tabs-trigger');
  triggers.forEach( element => {
    element.classList.remove(...active_classes);
    element.classList.add(...inactive_classes);
  });

  target.classList.remove(...inactive_classes);
  target.classList.add(...active_classes);
}

function initialize_horizontal_tabs() {
  var triggers_list = document.querySelectorAll('.js-tabs-trigger');
  triggers_list.forEach( element => {
    element.addEventListener('click', change_active_tab);
  });
  triggers_list[0].click();
}

export { initialize_horizontal_tabs };
