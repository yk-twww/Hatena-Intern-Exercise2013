// 課題 JS-1: 関数 `parseLTSVLog` を記述してください
function parseLTSVLog (logStr) {
  function parseOneRecord (logRecord) {
    var columns = logRecord.split('\t');
    
    var RecObj = {};
    for ( var i = 0; i < columns.length; i++ ) {
      var oneColumn = columns[i].split(':');
      RecObj[oneColumn[0]] = (oneColumn[0] === 'path')? oneColumn[1] : +oneColumn[1];
    }
    
    return RecObj;
  }
  
  var records = logStr.split('\n');
  
  var logList = [];
  for ( var i = 0, j = 0; i < records.length; i++) {
    if ( records[i] === '' ) {
      continue;
    }
    logList[j] = parseOneRecord(records[i]);
    j++;
  }
  
  return logList;
}

// 課題 JS-2: 関数 `createLogTable` を記述してください
function createLogTable (divElem, LTSVLogList) {
  function createThead () {
    var thead = document.createElement('thead');
    var tr = document.createElement('tr');
    var pathTh = document.createElement('th');
    var reqtimeTh = document.createElement('th');
    
    tr.appendChild(pathTh).textContent = 'path';
    tr.appendChild(reqtimeTh).textContent = 'reqtime_microsec';
    thead.appendChild(tr);
    
    return thead;
  }
  function createTbody (LTSVLogList) {
    var tbody = document.createElement('tbody');
    
    for ( var i = 0; i < LTSVLogList.length; i++ ) {
      var logRecord = LTSVLogList[i];
      var tr = document.createElement('tr');
      var pathTd = document.createElement('td');
      var reqtimeTd = document.createElement('td');
      
      tr.appendChild(pathTd).textContent = logRecord['path'];
      tr.appendChild(reqtimeTd).textContent = logRecord['reqtime_microsec'];
      tbody.appendChild(tr);
    }
    
    return tbody;
  }
  
  var table = document.createElement('table');
  
  table.appendChild(createThead());
  table.appendChild(createTbody(LTSVLogList));
  
  divElem.appendChild(table);
}

