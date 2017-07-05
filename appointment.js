'use strict';

$(document).ready(function($){

	$('.datepicker').datepicker({
	    startDate: '+1d'
	});

	function formValidation(){
		var name = $('#name').val(), contact = $('#contact').val(), ptime = $('select#ptime option:selected').val(), apDate = $('#apDate').val(), appointmentfor = $('#appointmentfor option:selected').val();
		if(name != ''){
			$('#name').css('border', '1px solid #ccc').next().text('');
			if(contact.length == 10){
				$('#contact').css('border', '1px solid #ccc').next().text('');
				if(ptime != ''){
					$('select#ptime').css('border', '1px solid #ccc').next().text('');
					if(apDate != ''){
						$('#apDate').css('border', '1px solid #ccc').next().text('');
						if(appointmentfor != ''){
							$('#appointmentfor').css('border', '1px solid #ccc').next().text('');
							return true;
						} else {
							$('#appointmentfor').css('border', '1px solid #cf0000').next().text('Select appointment type');
							return false;
						}
					} else {
						$('#apDate').css('border', '1px solid #cf0000').next().text('Choose appointment date');
						return false;
					}
				} else {
					$('select#ptime').css('border', '1px solid #cf0000').next().text('Select appointment time');
					return false;
				}
			} else {
				$('#contact').css('border', '1px solid #cf0000').next().text('Contact field must have 10 digits');
				return false;
			}
		} else {
			$('#name').css('border', '1px solid #cf0000').next().text('Name field cannot be blank');
			return false;
		}
	}

	function blankCheck(){
		var checkContact = $('#checkContact').val(), checkApDate = $('#checkApDate').val();
		if(checkContact == '' || checkApDate == ''){
			$('.search-err').html('<p class="req">Enter value in any one field</p>');
			return false;
		} else {
			$('.search-err').html('');
			return true;
		}
	}

	$('#datainput').submit(function(event) {
		var name = $('#name').val(), email = $('#email').val(), contact = $('#contact').val(), ptime = $('select#ptime option:selected').val(), apDate = $('#apDate').val(), appointmentfor = $('#appointmentfor option:selected').val();
		
		if(formValidation()){
			setTimeout(function(){ $('#resetdata').trigger('click'); }, 1000);
			$.ajax({
				url: 'process.php',
				type: 'post',
				cache: false,
				async: true,
				data: {
					name: name,
					email: email,
					contact: contact,
					ptime: ptime,
					apDate: apDate,
					appointmentfor: appointmentfor
				},
				success: function(data){
					//console.log(data)
					data = data.replace(/\\s+/g, "");
					if(data != 'Connection Failure'){
						$('.qc-errmsg').show().empty().html("<span style='display: block; padding: 10px 15px; color: #2E6A00; border: 2px solid #2E6A00;'>Appointment Added</span>");
		                //$('#datainput').hide();
		                setTimeout(function(){ $('.qc-errmsg').hide().empty(); }, 2000);
					} else {
						$('#datainput').show(function(){
							$('.qc-errmsg').html(data);
							$('.qc-errmsg').fadeIn(500);
						});
						$('.qc-errmsg').hide();
					}
				},
				error: function(XMLHttpRequest, textStatus, errorThrown) {
		            alert(textStatus);
		        }
			});
		}

		return false;
	});

	$('#checkdatainput').submit(function(event) {
		var checkContact = $('#checkContact').val(), checkApDate = $('#checkApDate').val();
		setTimeout(function(){ $('#resetfld').trigger('click'); }, 1000);
		//if(blankCheck()){
			$.ajax({
				url: 'search.php',
				type: 'post',
				cache: false,
				async: true,
				data: {
					checkContact: checkContact,
					checkApDate: checkApDate
				},
				success: function(html){
					console.log(html);
					$('.result-block').html(html);
				},
				error: function(XMLHttpRequest, textStatus, errorThrown, data) {
		            $('.result-block').html('<p>No appointment found!</p>');
		        }
			});
		//}

		return false;
	});

});