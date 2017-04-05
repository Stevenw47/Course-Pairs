/*
 * function generatePairs() - A function that takes input of student requests from spreadsheet and outputs course pairs and number of requests / clashes
 *
 * by Steven Wong and Jeffrey Kam Ho Yin
 */
function generatePairs() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input");
  var data = sheet.getDataRange().getValues();
  var allCourses = [];
  var output = [["Course 1", "Course 2", "Num Clashes"]];
  for(var i = 0; i < data.length; i++){
    var numOfCourses = data[i][0];
    for(var j = 0; j < data[i].length; j++){
      var coursesString = data[i][1];
      for(var k = 0; k < numOfCourses; k++){
        if(allCourses.indexOf(coursesString.toString().substring(k*5, (k+1)*5)) == -1){
          allCourses.push(coursesString.toString().substring(k*5, (k+1)*5));  
        }
      }
    }
  }
  allCourses.sort();
  var pairsUsed = [];
  for(var i = 0; i < allCourses.length; i++){
    var numOfClashes = 0;
    for(var j = 0; j < allCourses.length; j++){
      if(allCourses[i] != allCourses[j]){
        var pair = [allCourses[i], allCourses[j]];
        pair.sort();
        var pairAsString = pair.toString();
        if(pairsUsed.indexOf(pair.toString()) == -1){
          pairsUsed.push(pairAsString);
          var match = 0;
          for(var e = 0; e < data.length; e++){
            var numOfCourses = data[e][0];
            var coursesString = data[e][1];
            for(var k = 0; k < numOfCourses; k++){
              if(coursesString.toString().substring(k*5, (k+1)*5)==allCourses[i] || 
                coursesString.toString().substring(k*5, (k+1)*5)==allCourses[j]){
                match++;
              }
            }
          }
          if(match == 2){
            numOfClashes++; 
          }
          output.push([allCourses[i], allCourses[j], numOfClashes]);
        } 
      }
    }
  }
  error
  SpreadsheetApp.getActiveSpreadsheet().insertSheet().getRange(1, 1, output.length, output[0].length).setValues(output);
  error
}


function generatePairsV2() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input");
  var data = sheet.getDataRange().getValues();
  var coursePair = [];
  var allCourses = [];
  var coursePairObj = {};
  var output = [["Course Pair", "Num Clashes"]];
  for(var i = 0; i < data.length; i++){ //for each row in data
    var numOfCourses = data[i][0];
    var coursesString = data[i][1];
    for(var j = 0; j < numOfCourses; j++){
      if(allCourses.indexOf(coursesString.toString().substring(j*5, (j+1)*5)) == -1){
        allCourses.push(coursesString.toString().substring(j*5, (j+1)*5));
      }      
      for(var k = j + 1; k < numOfCourses; k++){
        var pairStringArray = [];
        pairStringArray.push(coursesString.toString().substring(j*5, (j+1)*5));
        pairStringArray.push(coursesString.toString().substring(k*5, (k+1)*5));
        pairStringArray.sort();
        var pairString = pairStringArray.toString();
        if(!coursePairObj.hasOwnProperty(pairString)){
          coursePairObj[pairString] = 1;
          coursePair.push(pairString);
        } else{
          var num = coursePairObj[pairString];
          num++;
          coursePairObj[pairString] = num;
        }
      }
    }
  }
  for(var i = 0; i < allCourses.length; i++){
    for(var j = i + 1; j < allCourses.length; j++){
      var pair = [];
      pair.push(allCourses[i]);
      pair.push(allCourses[j]);
      pair.sort();
      var pairString = pair.toString();
      if(!coursePairObj.hasOwnProperty(pairString)){
        coursePairObj[pairString] = 0;
      }
    }
  }
  for(var key in coursePairObj){
    if(coursePairObj.hasOwnProperty(key)){
      output.push([key, coursePairObj[key]]);  
    }
  }
  SpreadsheetApp.getActiveSpreadsheet().insertSheet().getRange(1, 1, output.length, output[0].length).setValues(output);
}
