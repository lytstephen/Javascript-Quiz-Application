var questions = [
	{
		question: 'You are in a race. You just passed the person who were 2nd. Which place are you in?',
		choices: ["1st place", "2nd place", "3rd place", "none of the above"],
		correct: 1,
		explain: 'Just think about it.'
	},
	{
		question: 'You are in a race. The person who was first place just passed you. Which place are you in?',
		choices: ["1st place", "2nd place", "3rd place", "none of the above"],
		correct: 3,
		explain: 'There is no one in front of first, so you must be last. After he passed you, you will still be last.'
	},
	{
		question: 'There are 3 frogs on the bridge. 2 has just now decided to jump off the bridge. How many frogs are left on the bridge now?',
		choices: ['3', '2', '1', 'None of the above'],
		correct: 0,
		explain: 'They just NOW decided, you cannot have decided to do something and have done it at the same time. They have not jumped yet.'
	}
]

$(document).ready(function() {

	var answers = [];
	var currentAnswer;
	var questionCount = 1;


	var generateQuestion = function(questionNum) {
		var questionIndex = questionNum - 1

		// question choices
		$('#questionNum').text('Question ' + questionNum + ':');
		$('#question').text(questions[questionIndex].question);
		$.each(questions[questionIndex].choices, function(index, choice) {
			$('#choices').append('<input type="radio" name="answer" id= "' + index + '" value="' + index + '"> ' 
				+ '<label for="' + index + '">' + choice + "</label><br>");
		})

		// click to change answer
		$('input:radio[name=answer]').click(function() {
			currentAnswer = $(this).val();
		})
	}

	// submit to next question
	$('#response').on('submit', function(e) {
		e.preventDefault();
		if (currentAnswer === null || currentAnswer === undefined) {
			alert('Please choose an answer');
			return;
		}
		answers.push(currentAnswer);
		currentAnswer = null;
		questionCount++;
		$('#choices').empty();

		if (questionCount < 4) {
			generateQuestion(questionCount)
		} else {
			// quiz finishes
			var score = 0;
			$.each(answers, function(index, answer){
				if (answer == questions[index].correct) {
					score++;
				}
			});
			$('#questionNum').text('Your Score: ' + score);
			$('#question').text('You have answered ' + score + ' out of 3 correct.');
			$('#response').hide();

			// answers explanations
			$('#showexplain').show();
			$('#showexplain').click(function() {
				$('#explanation').slideToggle();
			});
			$.each(questions, function(index, question) {
				var questionText = question.question;
				var correctAnswerIndex = question.correct;
				var correctAnswerText = question.choices[correctAnswerIndex];
				var yourAnswerIndex = answers[index];
				var yourAnswerText = question.choices[yourAnswerIndex];
				var explainText = question.explain;

				var correctIcon;
				var correctAnswerHtml;
				if (yourAnswerIndex == correctAnswerIndex) {
					correctIcon = '<span class="glyphicon glyphicon-ok" aria-hidden="true"></span>';
					correctAnswerHtml = "";
				} else {
					correctIcon = '<span class="glyphicon glyphicon-remove" aria-hidden="true"></span>'
					correctAnswerHtml = '<p><b>Correct Answer:</b> ' + correctAnswerText + '</p>'
				}

				$('#explanation').append(
					'<hr>' +
					'<h3>Question ' + (index+1) + ':</h3>' +
					'<p>' + questionText + '</p>' +
					'<p><b>Your Answer:</b> ' + yourAnswerText + ' ' + correctIcon + '</p>' +
					correctAnswerHtml + 
					'<p><b>Explanation:</b> ' + explainText
				);
			})
		}
	})

	generateQuestion(questionCount);

});




