document.getElementById("button1").addEventListener('click', check)
document.getElementById("quiz2").style.visibility = "hidden";
document.getElementById("quiz3").style.visibility = "hidden";
var covid_check = 0;

var messages = ["You do not show symptoms of COVID-19. Please continue to social distance", "You show symptoms of COVID-19. Please get tested as soon as possible and continue to self-isolate"];
var covid_result;

function check() {

	document.getElementById("quiz1").style.visibility = "hidden";
	document.getElementById("quiz2").style.visibility = "visible";

	var question1 = document.quiz1.question1.value;



	if (question1 == "difficulty_breathing" || question1 == "Severe_chestpain" || question1 == "waking_up" || question1 == "confused" || question1 == "consciousness") {
		covid_check++;
	}

}







document.getElementById("button2").addEventListener('click', check2)

function check2() {

	document.getElementById("quiz2").style.visibility = "hidden";
	document.getElementById("quiz3").style.visibility = "visible";

	var question2 = document.quiz2.question2.value;



	if (question2 == "difficulty_breathing" || question1 == "Severe_chestpain" || question1 == "waking_up" || question1 == "confused" || question1 == "consciousness") {
		covid_check++;
	}



} 



document.getElementById("button3").addEventListener('click', check3)

function check3() {

	document.getElementById("quiz3").style.visibility = "hidden";
	
	var question3 = document.quiz3.question3.value;



	if (question3 == "difficulty_breathing" || question1 == "Severe_chestpain" || question1 == "waking_up" || question1 == "confused" || question1 == "consciousness") {
		covid_check++;
	}


	if (covid_check == 0) {
		covid_result = messages[0]

	}


	document.getElementById("after_submit").style.visibility = "visible";
	document.getElementById("message").innerHTML = "Hello";

	

} 
