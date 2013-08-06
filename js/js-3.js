function describeTable () {
  var describeArea = document.getElementById('table-container');
  var textArea = document.getElementById('log-input');
  var logStr = textArea.value;
  
  createLogTable(describeArea, parseLTSVLog(logStr));
  textArea.value = '';
}

addEventListener('load', function () {
  document.getElementById('submit-button').addEventListener('click', describeTable, false);
  }, false);
