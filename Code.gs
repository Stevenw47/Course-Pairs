/*
 * function generatePairs() - A function that takes input of student requests from a spreadsheet and outputs course pairs with its corresponding number of clashes
 *
 * by Steven Wong
 */
function generatePairs() {
  var sheet = SpreadsheetApp.getActiveSpreadsheet().getSheetByName("Input");
  var data = sheet.getDataRange().getValues();
  var coursePair = [];
  var allCourses = [];
  var coursePairObj = {};
  var output = [["Course Pair", "Num Clashes"]];
  for(var i = 0; i < data.length; i++){
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
