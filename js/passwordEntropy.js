(function( $ ) {
	$.fn.passwordEntropy = function(options) {

		var settings = $.extend( {
			'display' : '#results'
		}, options);

		return this.each(function() {
			$(this).bind('keyup', function() {
				var pass,
					len,
					lowerCount,
					upperCount,
					numCount,
					symbolCount,
					upper,
					lower,
					number,
					symbol,
					total,
					a,
					b,
					strength,
					color;

				pass = $(this).val();
				len = pass.length;
				lowerCount = pass.match(/[a-z]/) ? pass.match(/[a-z]/g).length : 0;
				upperCount = pass.match(/[A-Z]/) ? pass.match(/[A-Z]/g).length : 0;
				numCount = pass.match(/[0-9]/) ? pass.match(/[0-9]/g).length : 0;
				symbolCount = len - (lowerCount + upperCount + numCount);
				upper = 0;
				lower = 0;
				number = 0;
				symbol = 0;
				if(upperCount > 0) {
					upper = (26 - upperCount) + upperCount;
				}
				if(lowerCount > 0) {
					lower = (26 - lowerCount) + lowerCount;
				}
				if(numCount > 0) {
					number = (10 - numCount) + numCount;
				}
				if(symbolCount > 0) {
					symbol = (33 - symbolCount) + symbolCount;
				}
				total = upper + lower + number + symbol;
				a = total.toFixed(2);
				b = len.toFixed(2);
				strength = (b * Math.log(a) / Math.log(2)).toFixed(0);
				if(isNaN(strength)) {
					strength = 0;
				}
				if(strength > 75) {
					color = 'very-strong';
				} else if(strength <= 75 && strength > 50) {
					color = 'strong';
				} else if(strength <= 50 && strength > 25) {
					color = 'medium';
				} else if(strength <= 25 && strength > 5) {
					color = 'weak';
				} else {
					color = 'very-weak';
				}
				$(settings.display).html('<span class="'+color+'">'+strength+' bits = '+color.replace('-',' ')+'</span>');
			});
		});
	};
})( jQuery );