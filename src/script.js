

function reverseDate(date){
    var splitDate = date.split('');
    var reverseSplitDate = splitDate.reverse();
    var reverseDate = reverseSplitDate.join('');
    return reverseDate;
}

function checkPalindrome(string){
    var palString = reverseDate(string);
    if(string === palString) return true;
    else return false;
}

function convertDateToStr(date){
	var dateStr = {day:'', month:'',year:''};
	if (date.day < 10) {
    dateStr.day = "0" + date.day;
  } else {
    dateStr.day = date.day.toString();
  }

  if (date.month < 10) {
    dateStr.month = "0" + date.month;
  } else {
    dateStr.month = date.month.toString();
  }

  dateStr.year = date.year.toString();
  return dateStr;
}

function getDateInAllFormats(date) {
    var ddmmyyyy = date.day + date.month + date.year;
    var mmddyyyy = date.month + date.day + date.year;
    var yyyymmdd = date.year + date.month + date.day;
    var ddmmyy = date.day + date.month + date.year.slice(-2);
    var mmddyy = date.month + date.day + date.year.slice(-2);
    var yyddmm = date.year.slice(-2) + date.day + date.month;
    var dateArray = [ddmmyyyy, mmddyyyy, yyyymmdd, ddmmyy, mmddyy, yyddmm];
  return dateArray;
}


function checkPalindromeForAllDateFormats(date) {
  var dateFormatList = getDateInAllFormats(date);
  var palindromeList = [];

  for (var i = 0; i < dateFormatList.length; i++) {
    var result = checkPalindrome(dateFormatList[i]);
    palindromeList.push(result);
  }
  return palindromeList;
}

function isLeapYear(year) {
  if (year % 400 === 0) return true;

  if (year % 100 === 0) return false;

  if (year % 4 === 0) return true;

  return false;
}

function getNextDate(date) {
  var day = date.day + 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (month === 2) {
    if (isLeapYear(year)) {
      if (day > 29) {
        day = 1;
        month = 3;
      }
    } else {
      if (day > 28) {
        day = 1;
        month = 3;
      }
    }
  } else {
    if (day > daysInMonth[month - 1]) {
      day = 1;
      month++;
    }
  }

  if (month > 12) {
    month = 1;
    year++;
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getNextPalindromeDate(date) {
  var nextDate = getNextDate(date);
  var counter = 0;

  while (true) {
    counter++;
    var dateStr = convertDateToStr(nextDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (var i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, nextDate];
      }
    }
    nextDate = getNextDate(nextDate);
  }
}

function getPreviousDate(date) {
  var day = date.day - 1;
  var month = date.month;
  var year = date.year;

  var daysInMonth = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  if (day === 0) {
    month--;

    if (month === 0) {
      month = 12;
      day = 31;
      year--;
    } else if (month === 2) {
      if (isLeapYear(year)) {
        day = 29;
      } else {
        day = 28;
      }
    } else {
      day = daysInMonth[month - 1];
    }
  }

  return {
    day: day,
    month: month,
    year: year,
  };
}

function getPreviousPalindromeDate(date) {
  var previousDate = getPreviousDate(date);
  var counter = 0;

  while (true) {
    counter++;
    var dateStr = convertDateToStr(previousDate);
    var resultList = checkPalindromeForAllDateFormats(dateStr);

    for (var i = 0; i < resultList.length; i++) {
      if (resultList[i]) {
        return [counter, previousDate];
      }
    }
    previousDate = getPreviousDate(previousDate);
  }
}

function clickHandler(e) {
    // if(!inputDate.value) {
    //     alert("Please input a date.");
    //     return;
    // }
    console.log("Hello");
    var inputString = inputDate.value;  
    var date = inputString.split("-");
    var yyyy = date[0];
    var mm = date[1];
    var dd = date[2];

    var date = {
      day: Number(dd),
      month: Number(mm),
      year: Number(yyyy),
    }

    var dateStr = convertDateToStr(date);
    var list = checkPalindromeForAllDateFormats(dateStr);
    var isPalindrome = false;

    for (var i = 0; i < list.length; i++) {
      if (list[i] == true) {
        isPalindrome = true;
        break;
      }
    }

    if (!isPalindrome) {
    var [counter1, nextDate] = getNextPalindromeDate(date);
    var [counter2, prevDate] = getPreviousPalindromeDate(date);
    var message="";
    if (counter1 > counter2) {
        message = "The nearest palindrome date is " + prevDate.day + " - "+prevDate.month+" - "+ prevDate.year+", you missed by "+counter2;
        if(counter2 === 1) message = message + " day.";
        else  message = message + " days.";
    } else {
        message = "The nearest palindrome date is " + nextDate.day + " - "+nextDate.month+" - "+ nextDate.year+", you missed by "+counter1;
        if(counter1 === 1) message = message + " day.";
        else  message = message + " days.";
        }
    } else {
        message = "Your birthday is a palindrome! Congratulations🥳🥳🥳";
  }

  displayMessage(message);

}

function displayMessage(message){
    console.log(message);
    finalOP.innerHTML = message;
}

var inputDate = document.querySelector("#input-date");
var checkProfitButton = document.querySelector("#check-palindrome");
var finalOP = document.querySelector("#final-result");

checkProfitButton.addEventListener("click", clickHandler);


