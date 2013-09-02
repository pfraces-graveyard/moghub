var ui = {
  edit: function () {
    document.location.replace(
      document.location.pathname.replace(/\/read\//, '/update/')
    );
  },
  save: function () {
    var editor = document.forms['editor'];
    editor.action = document.location;
    editor.method = 'post';
    editor.submit();
  }
}
