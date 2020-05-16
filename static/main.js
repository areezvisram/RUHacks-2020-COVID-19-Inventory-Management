document.getElementById("button").addEventListener('click', check)

console.log("hello")

function check(){
	console.log("bye")
    

	var question1 = document.quiz.question1.value;
	var covid_check = 0;


	if (question1 == "difficulty_breathing" || question1 == "Severe_chestpain" || question1 == "waking_up" || question1 == "confused" || question1 == "consciousness") {
		covid_check++;
}

    
	

	var messages = ["You do not show symptoms of COVID-19. Please continue to social distance", "That's just okay", "You really need to do better"];
	var covid_result;

	if (covid_check == 0) {
		covid_result = messages[0]


	document.getElementById("after_submit").style.visibility = "visible";

    document.getElementById("message").innerHTML = covid_result;
    
	
	
    } 
}