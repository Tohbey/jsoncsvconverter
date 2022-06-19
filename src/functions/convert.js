let convertToCSV = (objArray) => {
  let array = typeof objArray != 'object' ? JSON.parse(objArray) : objArray;
  let str = '';

  for (let i = 0; i < array.length; i++) {
      let line = '';
      for (let index in array[i]) {
          if (line != '') line += ','

          line += array[i][index];
      }

      str += line + '\r\n';
  }

  return str;
}

let exportCSVFile = (headers, jsonData, filename) => {
  if (headers) {
    jsonData.unshift(headers);
  }

  // Convert Object to JSON
  let jsonObject = JSON.stringify(jsonData);
  // let jsonObject = jsonData

  let csv = convertToCSV(jsonObject);

  let exportedFilenmae = filename + '.csv' || 'export.csv';

  let blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
  if (navigator.msSaveBlob) { // IE 10+
      navigator.msSaveBlob(blob, exportedFilenmae);
  } else {
      let link = document.createElement("a");
      if (link.download !== undefined) { // feature detection
          // Browsers that support HTML5 download attribute
          let url = URL.createObjectURL(blob);
          link.setAttribute("href", url);
          link.setAttribute("download", exportedFilenmae);
          link.style.visibility = 'hidden';
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
      }
  }
}

export default exportCSVFile;