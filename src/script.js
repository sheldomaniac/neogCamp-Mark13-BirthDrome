var dateOfBirth = document.querySelector("#date-of-birth");
var luckyNumber = document.querySelector("#lucky-number");
var luckyNumberButton = document.querySelector("#lucky-number-button");
var finalOP = document.querySelector("#final-result");
var cookiePopup = document.querySelector("#privacy-message");
var cookieButton = document.querySelector("#cookie-acceptance");


function calculateSum(date){
    date = date.replaceAll("-","");
    var sum = 0;
    for(let i = 0; i < date.length; i++)sum += (date[i]-'0');
    return sum;
}

function calculateLucky(){
    
    var dob = dateOfBirth.value;
    var sum = calculateSum(dob);
    if(sum % luckyNumber.value == 0) return true;
    return false;
}

cookieButton.addEventListener("click", function hidePopup(){
    cookiePopup.style.display="none";
});

luckyNumberButton.addEventListener("click", function calculateLuckButton(){
    var luckBool = calculateLucky(dateOfBirth);
    if(luckBool){
        finalOP.classList.remove("bad-news");
        finalOP.classList.add("good-news");
        finalOP.innerHTML = "Yayyyy!!! You seem to be lucky 🥳🥳🥳🥳";
    }else{
        finalOP.classList.remove("good-news");
        finalOP.classList.add("bad-news");
        finalOP.innerHTML = "You may not be so lucky😥😥😥.....";
    }
});