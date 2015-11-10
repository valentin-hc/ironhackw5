// $('.btn-mushrooms').on('click', function() {
// 	$('.mushroom').toggle();
// });

function toggleToppings(button, topping, price, change) {
	$(button).on('click', function() {
		var getButton = $(button)
		if (change !== undefined) {
			$(topping).toggleClass(change);
		} else {
			$(topping).toggle();
		}
		getButton.toggleClass('active');
		var total = $('.price').find('strong').text().split('$')[1];
		var total = parseInt(total);
		var getPrice = $('.price');
		if (getButton.hasClass('active')) {
			getPrice.find('ul').append('<li>$'+ price + ' ' + getButton.text() + '</li>');
			total += price;
		} else {
			getPrice.find("li:contains('"+ getButton.text() +"')").remove();
			total -= price;			
		}
		getPrice.find('strong').html('$' + total)
	});
}

toggleToppings('.btn-pepperonni', '.pep', 1);
toggleToppings('.btn-mushrooms', '.mushroom', 1);
toggleToppings('.btn-green-peppers', '.green-pepper', 1);
toggleToppings('.btn-crust', '.crust', 5, 'crust-gluten-free');
toggleToppings('.btn-sauce', '.sauce', 3, 'sauce-white');



