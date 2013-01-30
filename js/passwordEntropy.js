/* passwordEntropy.js 
   http://code.xero.nu/passwordEntropy.js
   (cc) xero harrison MMXIII 
   http://creativecommons.org/licenses/by-sa/3.0/ 
*/
(function( $ ) {
	$.fn.passwordEntropy = function(options) {
		//---default settings
		var settings = $.extend( {
			'display'	: '#results',
			'colorize'	: true,
			'showBits'	: true,
			'strengths'	: ['very-weak', 'weak', 'medium', 'strong', 'very-strong']
		}, options);

		return this.each(function() {
			//---bind to keyboard input
			$(this).bind('keyup', function() {
				var pass,
					len,
					lowerCount,
					upperCount,
					numCount,
					symbolCount,
					upper=0,
					lower=0,
					number=0,
					symbol=0,
					total,
					a,
					b,
					entropy,
					strength,
					result;

				//---calculate weight
				pass = $(this).val();
				len = pass.length;
				lowerCount = pass.match(/[a-z]/) ? pass.match(/[a-z]/g).length : 0;
				upperCount = pass.match(/[A-Z]/) ? pass.match(/[A-Z]/g).length : 0;
				numCount = pass.match(/[0-9]/) ? pass.match(/[0-9]/g).length : 0;
				symbolCount = len - (lowerCount + upperCount + numCount);
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
				//---calculate entropy
				total = upper + lower + number + symbol;
				a = total.toFixed(2);
				b = len.toFixed(2);
				entropy = (b * Math.log(a) / Math.log(2)).toFixed(0);
				if(isNaN(entropy)) {
					entropy = 0;
				}
				//---calculate strength
				if(entropy >= 75) {
					strength = 4;
				} else if(entropy >= 50) {
					strength = 3;
				} else if(entropy >= 25) {
					strength = 2;
				} else if(entropy >= 5) {
					strength = 1;
				} else {
					strength = 0;
				}
				//---display results
				if(settings.colorize) {
					$(settings.display).removeClass(settings.strengths.join(' ')).addClass(settings.strengths[strength]);					
				}
				$(settings.display).html(settings.showBits ? entropy+' bits = '+settings.strengths[strength].replace('-',' ') : settings.strengths[strength].replace('-',' '));
			});
		});
	};
})(jQuery);