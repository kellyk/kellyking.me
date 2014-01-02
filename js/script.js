$(document).ready(function() {
var cat = "websites";
window.onload = function() {
	loadPortfolioItems(cat);
	displayProject(cat, 0);
}

//Display Portfolio
$.getJSON('data.json', function(data) {

	//Check if category is already part of output string. If not, add it
  	var output = '<ul>';
  	$.each(data, function(key, val){
  		if (output.indexOf(val.category) == -1) 
  			output += '<li>' + val.category + '</li>';
  	});

  	//Display categories
  	output += '</ul>';
  	$('.category-list').html(output);

  	//onclick event for category items
  	$(".category-list li").live('click', function (event) {
  		cat = $(this).text();
    	loadPortfolioItems(cat);
    	displayProject(cat, 0);
	});

  	//onclick event for items
	$(".item-list li").live('click', function (event) {
    	displayProject(cat, $(this).text());
	});

}).fail(function() { $("#portfolio-content").html('<p>JSON Portfolio failed to load. Please visit <a href="http://www.kellyking.me/projects">project directory</a>.</p> ')});


//given a category, load its items into an ul and display first item by default
function loadPortfolioItems(cat) {

	$.getJSON('data.json', function(data) {
		var output = '';

		$.each(data, function(key, val){
			if(val.category == cat)
			{
				output = '<li>' + val.name + '</li>' + output;
			}
		});
		output = '<ul>' + output + '</ul>';
	  	$('.item-list').html(output);
		displayProject(cat, 0);
	});
						
}

//given a category and item id, display pic, title and description
function displayProject(cat, proj) {
	var output = "";
	$.getJSON('data.json', function(data) {
		$.each(data, function(key, val){
			if(val.category == cat)
			{
				var i = 0;
				if(proj == 0)
				{
					if (i == 0) {
						$('.item-title').html("<h4>Project</h4>" + val.name);
						$('.item-image').html("<img src=./images/" + val.imageName + " />");
						$('.item-description').html("<h4>Description</h4>" + val.description + 
							"<br /><h4>Project URL</h4><a href='" + val.link + "'>" + val.link + "</a>");
						return;
					}
					i++;
				}
				else if (val.name == proj)
				{
					$('.item-title').html("<h4>Project</h4>" + val.name);
					$('.item-image').html("<img src=./images/" + val.imageName + " />");
						$('.item-description').html("<h4>Description</h4>" + val.description + 
							"<br /><h4>Project URL</h4><a href='" + val.link + "'>" + val.link + "</a>");
				}
			}
		});
	});
}

/*
 * contactable 1.5 - jQuery Ajax contact form
 *
 * Copyright (c) 2009 Philip Beel (http://www.theodin.co.uk/)
 * Dual licensed under the MIT (http://www.opensource.org/licenses/mit-license.php) 
 * and GPL (http://www.opensource.org/licenses/gpl-license.php) licenses.
 *
 * Revision: $Id: jquery.contactable.min.js 2012-05-26 $
 *
 */
 
(function(jQuery){

	// Define the new for the plugin ans how to call it	
	jQuery.fn.contactable = function(options) {
		// Set default options  
		var defaults = {
			url: 'mail.php',
			name: 'Name',
			email: 'Email',
			dropdownTitle: '',
			dropdownOptions: ['General', 'Recruiter', 'Website Bug'],
			message : 'Message',
			subject : 'A contactable message',
			submit : 'SEND',
			recievedMsg : 'Thank you for your message',
			notRecievedMsg : 'Sorry but your message could not be sent, try again later',
			disclaimer: 'Please feel free to get in touch!',
			hideOnSubmit: true
		};

		var options = jQuery.extend(defaults, options);
		
		return this.each(function() {

			// Create the form and inject it into the DOM
			var dropdown = ''
			,	filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/
			,	dropdownLen = options.dropdownOptions.length
			,	i;

			// Add select option if applicable
			if(options.dropdownTitle) {
				dropdown += '<p><label for="contactable-dropdown">'+options.dropdownTitle+' </label><br /><select name="dropdown" id="contactable-dropdown" class="contactable-dropdown">';

				for(i=0; i < dropdownLen; i++) {
					dropdown += '<option value="'+options.dropdownOptions[i]+'">'+options.dropdownOptions[i]+'</option>';
				}			
				
				dropdown += '</select></p>';
			}
			// Form layout
			/*	
			*	<div id="contactable-inner"></div>
			*	<form id="contactable-contactForm" method="" action="">
			*  		<div id="contactable-loading"></div>
			*		<div id="contactable-callback"></div>
			* 		<div class="contactable-holder">
			* 			<p>
			*				<label for="contactable-name">Name<span class="contactable-green"> * </span></label><br />
			*				<input id="contactable-name" class="contactable-contact contactable-validate" name="name" />
			*			</p>
			*			<p>
			*				<label for="contactable-email"> Email address <span class="contactable-green"> * </span></label><br />
			* 				<input id="contactable-email" class="contactable-contact contactable-validate" name="email" />
			*			</p>
			* 			<p>
			*				<label for="contactable-message"> Message <span class="contactable-green"> * </span></label><br />
			* 				<textarea id="contactable-message" name="message" class="contactable-message contactable-validate" rows="4" cols="30" ></textarea>
			*			</p>
			*			<p>
			*				<input class="contactable-submit" type="submit" value="Submit"/>
			*			</p>
			*			<p class="contactable-disclaimer">Disclaimer</p>
			*		</div>
			*	</form>
			*/

			jQuery(this).html('<div id="contactable-inner"></div><form id="contactable-contactForm" method="" action=""><div id="contactable-loading"></div><div id="contactable-callback"></div><div class="contactable-holder">'
					+'<h3>'+options.disclaimer+'</h3>'
					+'<p><label for="contactable-name">'
					+options.name+'<span class="contactable-green"> * </span></label><br /><input id="contactable-name" class="contactable-contact contactable-validate" name="name" /></p><p><label for="contactable-email">'
					+options.email+' <span class="contactable-green"> * </span></label><br /><input id="contactable-email" class="contactable-contact contactable-validate" name="email" /></p>'
					+dropdown+'<p><label for="contactable-message">'
					+options.message+' <span class="contactable-green"> * </span></label><br /><textarea id="contactable-message" name="message" class="contactable-message contactable-validate" rows="4" cols="30" ></textarea></p><p><input class="contactable-submit" type="submit" value="'
					+options.submit+'"/></p><p class="contactable-disclaimer"></div></form>');
			
			// Toggle the form visibility
			jQuery('#contactable-inner').toggle(function() {
				jQuery('#contactable-overlay').css({display: 'block'});
				jQuery(this).animate({"marginRight": "-=5px"}, "2000"); 
				jQuery('#contactable-contactForm').animate({"marginRight": "-=0px"}, "2000");
				jQuery(this).animate({"marginRight": "+=387px"}, "4000"); 
				jQuery('#contactable-contactForm').animate({"marginRight": "+=390px"}, "4000"); 
			}, 
			function() {
				jQuery('#contactable-contactForm').animate({"marginRight": "-=390px"}, "4000");
				jQuery(this).animate({"marginRight": "-=387px"}, "4000").animate({"marginRight": "+=5px"}, "2000"); 
				jQuery('#contactable-overlay').css({display: 'none'});
			});
			
			// Submit the form
			jQuery("#contactable-contactForm").submit(function() {
				
				// Validate the entries
				var valid = true
				,	params;

				//Remove any previous errors
				jQuery("#contactable-contactForm .contactable-validate").each(function() {
					jQuery(this).removeClass('contactable-invalid');
				});

				// Loop through requigreen field
				jQuery("#contactable-contactForm .contactable-validate").each(function() {
					
					// Check the min length
					if(jQuery(this).val().length < 2) {
						jQuery(this).addClass("contactable-invalid");
						valid = false;
					}

					//Check email is valid
					if (!filter.test(jQuery("#contactable-contactForm #contactable-email").val())) {
						jQuery("#contactable-contactForm #contactable-email").addClass("contactable-invalid");
						valid = false;
					}						
				});

				if(valid === true) {
					submitForm();
				}
				return false;
			});

			function submitForm() {
				// Display loading animation
				jQuery('.contactable-holder').hide();
				jQuery('#contactable-loading').show();
				
				// Trigger form submission if form is valid
				jQuery.ajax({
					type: 'POST',
					url: options.url,
					data: {
						subject:options.subject, 
						name:jQuery('#contactable-name').val(), 
						email:jQuery('#contactable-email').val(), 
						issue:jQuery('#contactable-dropdown').val(), 
						message:jQuery('#contactable-message').val()
					},
					success: function(data) {
						// Hide loading animation
						jQuery('#contactable-loading').css({display:'none'}); 

						// Check for a valid server side response
						if( data.response === 'success') {
							jQuery('#contactable-callback').show().append(options.recievedMsg);
							if(options.hideOnSubmit === true) {
								//hide the tab after successful submition if requested
								jQuery('#contactable-contactForm').animate({dummy:1}, 2000).animate({"marginLeft": "-=450px"}, "slow");
								jQuery('#contactable-inner').animate({dummy:1}, 2000).animate({"marginLeft": "-=447px"}, "slow").animate({"marginLeft": "+=5px"}, "fast"); 
								jQuery('#contactable-overlay').css({display: 'none'});	
							}
						} else {
							jQuery('#contactable-callback').show().append(options.notRecievedMsg);
							setTimeout(function(){
								jQuery('.contactable-holder').show();
								jQuery('#contactable-callback').hide().html('');
							},2000);
						}
					},
					error:function(e){
						jQuery('#contactable-loading').css({display:'none'}); 
						jQuery('#contactable-callback').show().append(options.notRecievedMsg);
					}
				});		
			}
		});
	};
 
})(jQuery);
});