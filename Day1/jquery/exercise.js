var phrases = [
	"We are all born ignorant, but one must work hard to remain stupid.",
	"Any girl can be glamorous. All you have to do is stand still and look stupid.",
	"An intelligent hell would be better than a stupid paradise.",
	"I think a lot of times we don't pay enough attention to people with a positive attitude because we assume they are naive or stupid or unschooled."
	];

function randomize(array, element) {
	var random = Math.floor((Math.random() * array.length));
	$(element).html('<p>' + array[random] + '</p>');
}

function refresh() {
	$('.refresh-button').on('click', function() {
		randomize(phrases, '.phrase');
	});
}

function enterSubmit() {
	$('form').submit(function (event) {
		event.preventDefault();
		phrases.push($('input').val());
		$('input').val("");
		showPhrases();
    });
}

function hideShow() {
	$('.list').hide();
	$('.show').click(function () {
		$('.list').toggle();
		($('.show').text() === "Show") ? $(".show").text("Hide") : $(".show").text("Show");
	});
}

function showPhrases() {
	$('.list').html('');
	phrases.forEach(function(phrase) {
		$('.list').append('<li>' + phrase + '<a data-id ="my_id" href="#"><img src= "http://seamap.env.duke.edu/seamap3.0/icons/icon_delete.png"></a></li>');
	})
}

function removePhrase() {
	$('.container').on('click', '.list li a', function(event) {
		console.log(event);
		// debugger;
		var li = $(this).parent().text(); 
		var index = phrases.indexOf(li);
		if (index > -1) {
    		phrases.splice(index, 1);
    	}
    	showPhrases();
    });
}

    	

randomize(phrases, '.phrase');
refresh();
enterSubmit();
showPhrases();
hideShow();
removePhrase();
