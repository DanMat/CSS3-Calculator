/*
 * A JavaScript implementation of a simple calculator
 * Version 1.0 Copyright (C) Danny Sundaresan
 * Developed for CS 6301.008, Web Programming Languages
 */
$(document).ready(function() {

//Variables to display result, to record the operand and operator
var display = '';
var secDigit = '';
var operator = '';
	$(document).keypress(function(event) {
	/*Detect keypress and enable the respective functionalities*/
		switch (event.charCode) {
			case 67: 
			case 99: //Capture small and capitalized 'c'
					clearScreen();
					$("input[type=button][value=c]").toggleClass( "clearActive" );
					break;
			case 46: 
			case 48: 
			case 49:
			case 50:
			case 51:
			case 52:
			case 53:
			case 54:
			case 55:
			case 56:
			case 57: //Capture keyboard numbers
					if(String.fromCharCode(event.charCode) != '.')
					$('input[type=button][value='+String.fromCharCode(event.charCode)+']').toggleClass( "numActive" );
					else $('input[type=button][value=\\.]').toggleClass( "numActive" ); //Trigger keypress animation
					displayScreen(String.fromCharCode(event.charCode)); 
					break;
			case 42:
			case 120:
			case 88: //Capture the 'X' sign
					$('input[type=button][value=X]').toggleClass( "symActive" );
					arith("*");
					break;
			case 47://Capture the '/' sign
					$('input[type=button][value=\\/]').toggleClass( "symActive" );
					arith("/");
					break;
			case 43://Capture the '+' sign
					$('input[type=button][value=\\+]').toggleClass( "symActive" );
					arith("+");
					break;
			case 45://Capture the '-' sign
					$('input[type=button][value=\\-]').toggleClass( "symActive" );
					arith("-");
					break;
			case 13:
			case 32:
			case 61://Capture the '=' sign
					$('input[type=button][value=\\=]').toggleClass( "symActive" );
					compute();
					break;
		}
	});
	
	/*On digit click*/
	$( ".calcPanel input:not(.symbol):not(.clearScreen)" ).click(function() {
		displayScreen($(this).val());
	});
	
	/*On symbols click*/
	$( ".symbol" ).click(function() {
		switch ($(this).val()) {
            case 'X':
                arith("*");
                break;
            case '/':
            case '+':
            case '-':
                arith($(this).val());
                break;
			case '=':
				compute();
				break;
        }
	});
	
	/*On clear screen click*/
	$( ".clearScreen" ).click(function() {
		clearScreen();
	});
	
/*This method displays the digits in the screen*/	
function displayScreen(digit) {
	//Button press animation
	if(digit != '.') setTimeout(function () { $('input[type=button][value='+digit+']').toggleClass( "numActive", false); }, 100);
	else setTimeout(function () { $('input[type=button][value=\\.]').toggleClass( "numActive", false);}, 100);
	//Clear screen if 'c' is pressed
	if(display == 'clear') {
	$("#screen").html("");
	display = '';
	}
	if(secDigit == 'clear') display = secDigit = '';
	//Display adjustments
	if(digit == '1') digit = '  1';
	if(display == '' && digit == '.') digit = '0.';
    if(display.indexOf(".") == -1 || digit != '.')	display = display + digit; //Prevent multiple dots
	if($("#screen").text().replace(/ /g,'').replace(/\./,'').length < 9) $("#screen").html(display); //Restrict the display numbers
}

/*This method initializes the  variables when 'c' is pressed*/
function clearScreen() {
	display = '';
	secDigit = '';
	operator = '';
	$("#screen").html("0");
	setTimeout(function () { $("input[type=button][value=c]").toggleClass( "clearActive", false); }, 100);
}

/*This method calls the compute function whenever the symbols are pressed*/
function arith(op) {
	$("#screen").hide();
	setTimeout(function () { $("#screen").show();}, 100); //Blink screen animation
	if(op == '*') temp = "X"; else if(op == '+') temp = '\\+'; else if(op == '-') temp = '\\-'; else temp = '\\/';
	setTimeout(function () { $("input[type=button][value="+temp+"]").toggleClass( "symActive", false); }, 100); //Symbol keypress animation
	if(operator != '') compute();
	operator = op; //Push the operator pressed into the stack
	secDigit = $("#screen").text();
	display = 'clear';
}

/*This method does the actual computation*/
function compute() {
	$("#screen").hide();
	setTimeout(function () { $("#screen").show();}, 100);
	if(display == 'clear') display = '0';
	//Compute based on operator
	switch (operator) {
		case '*':
			$("#screen").html(parseFloat(secDigit) * parseFloat(display));
			break;
		case '/':
			$("#screen").html(((parseFloat(secDigit) / parseFloat(display)).toString()).substr(0, 9));
			break;
		case '+':
			$("#screen").html(parseFloat(secDigit) + parseFloat(display));
			break;
		case '-':
			$("#screen").html(parseFloat(secDigit) - parseFloat(display));
			break;
    }
	operator = '';
	secDigit = 'clear';
	$(".hid").val($("#screen").text());
	//Display the result in the screen
	setTimeout(function () { $("input[type=button][value=\\=]").toggleClass( "symActive", false); $("#screen").html($(".hid").val());}, 100);
}
});

