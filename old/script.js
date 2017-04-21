jQuery(document).ready(function() {
  //password-generator



	(function() {

		$("#service").focus();

	})();



	/*

	const getPassword = () => {

		if ( $("#service").val() && $("#salt").val() ) {

			$("#password").val(

				pw($("#service").val(), $("#salt").val(), $("#pwLength").val())

			).select();



			setTimeout(() => {$("#service").val("");}, 2000);

			setTimeout(() => {$("#salt").val("");}, 4000);

			setTimeout(() => {$("#password").val("");}, 6000);

		}

	}



	const pw = (service_, salt_, pwLength) => {

		const pwCharSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //charSet();

		const service = service_.toString();

		const salt = salt_.toString();

		let password = "Zz" + (pwLength % 10);

		for (let i = 3; i < pwLength; i++) {

			let j = i % service.length;

			let k = i % salt.length;



			let el = (

				service[j].charCodeAt() *

				salt[k].charCodeAt() +

				salt[k].charCodeAt()

			);

			//console.log(`${i},${j},${k},${el}`);

			password += pwCharSet[el % pwCharSet.length];

		}

		return password;

	}



	*/







	// Babel.js:

	"use strict";





	getPassword = function() {

		if ($("#service").val() && $("#salt").val()) {
			$("#password").val(pw($("#service").val(), $("#salt").val(), $("#pwLength").val())).select();



			setTimeout(function () {

				$("#service").val("");

			}, 1000);

			setTimeout(function () {

				$("#salt").val("");

			}, 2000);

			setTimeout(function () {

				$("#password").val("");

			}, 3000);

      // This works...
      document.execCommand('copy');

      // But why it doesn't work?!!
      // copy( pw($("#service").val(), $("#salt").val(), $("#pwLength").val()) );

    }

	};





  pw = function(service_, salt_, pwLength) {

		// var pwLength = arguments.length <= 2 || arguments[2] === undefined ? 8 : arguments[2];



		var pwCharSet = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz"; //charSet();

		var service = service_.toString();

		var salt = salt_.toString();

		var password = "Zz" + pwLength % 10;

		for (var i = 3; i < pwLength; i++) {

			var j = i % service.length;

			var k = i % salt.length;



			var el = service[j].charCodeAt() * salt[k].charCodeAt() + salt[k].charCodeAt();

			//console.log(`${i},${j},${k},${el}`);

			password += pwCharSet[el % pwCharSet.length];

		}

		return password;

	};




});
