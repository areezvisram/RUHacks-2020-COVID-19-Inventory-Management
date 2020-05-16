document.getElementById("button1").addEventListener('click', check)
document.getElementById("quiz2").style.visibility = "hidden";
document.getElementById("quiz3").style.visibility = "hidden";
var covid_check = 0;

var messages = ["You do not show symptoms of COVID-19. Please continue to social distance.", "You show symptoms of COVID-19. Please get tested as soon as possible and continue to self-isolate."];
var covid_result;

function check() {

	document.getElementById("quiz2").style.visibility = "visible";



	var question1 = document.getElementById("quiz1").getElementsByClassName("mc")


	var i;
	for (i = 0; i < question1.length; i++) {
		if (question1[i].checked == true) {
			covid_check++;
		}
	}

	if (covid_check > 8) {
		covid_result = messages[1];
	} else {
		covid_result = messages[0];
	}

	console.log(covid_result);	




	document.getElementById("quiz1").remove();

}







document.getElementById("button2").addEventListener('click', check2)

function check2() {

	

	var question2 = document.getElementById("quiz2").getElementsByClassName("mc")

	for (i = 0; i < question2.length; i++) {
		if (question2[i].checked == true) {
			covid_check++;
		}
	}

	if (covid_check > 8) {
		covid_result = messages[1];
	} else {
		covid_result = messages[0];
	}

	console.log(covid_result);	


	document.getElementById("quiz2").remove();
	document.getElementById("quiz3").style.visibility = "visible";
}



document.getElementById("button3").addEventListener('click', check3)

function check3() {

	




	var question3 = document.getElementById("quiz3").getElementsByClassName("mc");

	for (i = 0; i < question3.length; i++) {
		if (question3[i].checked == true) {
			covid_check++;
		}
	}

	if (covid_check > 8) {
		covid_result = messages[1];
	} else {
		covid_result = messages[0];
	}
	console.log(covid_result);	

	document.getElementById("after_submit").style.visibility = "visible";

	document.getElementById("message").innerHTML = covid_result;	

	document.getElementById("quiz3").remove();


}



