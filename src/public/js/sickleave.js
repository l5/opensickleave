var a1done = false;
var a2done = false;
var a3done = false;

$(document).ready(function() {
	$('form').submit(function() {
		$('#pageForm').css('display', 'none');
		$('#pageWait').css('display', 'inline');
		var myData = $(this).serialize();
		var jsonobj = $.ajax({
			type : "POST",
			url : "index.php",
			data : myData,
			dataType : "json"
		}).done(function(msg) {

			if (msg[0] == 'ERROR') {
				var retText = "";
				jQuery.each(msg[1], function(index, itemData) {
					retText = retText + "\n" + itemData[0];
				});

				alert("Error sending your sick leave notification:\n" + retText);
				$('#pageWait').css('display', 'none');
				$('#pageForm').css('display', 'inline');
			} else {
				$('#pageWait').css('display', 'none');
				$('#pageThankyou').css('display', 'inline');
			}
		});
		return false;
	});
	$('#statussick').click(function() {
		$('#newstatus').val("SICK");
		$('#statusreaction').html('Oh no! Get well soon!');
		$('#statussick').css('background-color', '#c00');
		$('#statuswell').css('background-color', '#ccc');
		$('#statussick').css('border', '2px solid #fff');
		$('#statuswell').css('border', '2px solid #ccc');
		$('#statuswell').css('color', '#888');
		$('#statussick').css('color', '#fff');
		$('#statuswell').hide(300);
		$('#statussick').animate({'margin-left': '125px'})
		mtp2();
	});
	$('#statuswell').click(function() {
		$('#newstatus').val("WELL");
		$('#statusreaction').html('Great! Stay healthy!');
		$('#statussick').css('background-color', '#ccc');
		$('#statuswell').css('background-color', '#0c0');
		$('#statuswell').css('border', '2px solid #fff');
		$('#statussick').css('border', '2px solid #ccc');
		$('#statuswell').css('color', '#fff');
		$('#statussick').css('color', '#888');
		$('#statussick').hide(300);
		$('#statuswell').animate({'margin-left': '125px'})
		mtp2();
	})
	$('#fdatefrom').datepicker({
		"showWeek" : true,
		"firstDay" : 1,
		"dateFormat" : "dd.mm.yy",
		"onSelect" : function() {
			mtp3();
		}
	});
	$('#fdateuntil').datepicker({
		"showWeek" : true,
		"firstDay" : 1,
		"dateFormat" : "dd.mm.yy",
		"onSelect" : function() {
			mtp3();
		}
	});
	$("input:submit").button();

	
	
	(function( $ ) {
		$.widget( "ui.combobox", {
			_create: function() {
				var input,
					self = this,
					select = this.element.hide(),
					selected = select.children( ":selected" ),
					value = selected.val() ? selected.text() : "",
					wrapper = this.wrapper = $( "<span>" )
						.addClass( "ui-combobox" )
						.insertAfter( select );

				input = $( "<input>" )
					.appendTo( wrapper )
					.val( value )
					.addClass( "ui-state-default ui-combobox-input" )
					.autocomplete({
						delay: 0,
						minLength: 0,
						source: function( request, response ) {
							var matcher = new RegExp( $.ui.autocomplete.escapeRegex(request.term), "i" );
							response( select.children( "option" ).map(function() {
								var text = $( this ).text();
								if ( this.value && ( !request.term || matcher.test(text) ) )
									return {
										label: text.replace(
											new RegExp(
												"(?![^&;]+;)(?!<[^<>]*)(" +
												$.ui.autocomplete.escapeRegex(request.term) +
												")(?![^<>]*>)(?![^&;]+;)", "gi"
											), "<strong>$1</strong>" ),
										value: text,
										option: this
									};
							}) );
						},
						select: function( event, ui ) {
							ui.item.option.selected = true;
							self._trigger( "selected", event, {
								item: ui.item.option
							});
						},
						change: function( event, ui ) {
							if ( !ui.item ) {
								var matcher = new RegExp( "^" + $.ui.autocomplete.escapeRegex( $(this).val() ) + "$", "i" ),
									valid = false;
								select.children( "option" ).each(function() {
									if ( $( this ).text().match( matcher ) ) {
										this.selected = valid = true;
										return false;
									}
								});
								if ( !valid ) {
									// remove invalid value, as it didn't match anything
									$( this ).val( "" );
									select.val( "" );
									input.data( "autocomplete" ).term = "";
									return false;
								}
							}
						}
					})
					.addClass( "ui-widget ui-widget-content ui-corner-left" );

				input.data( "autocomplete" )._renderItem = function( ul, item ) {
					return $( "<li></li>" )
						.data( "item.autocomplete", item )
						.append( "<a>" + item.label + "</a>" )
						.appendTo( ul );
				};

				$( "<a>" )
					.attr( "tabIndex", -1 )
					.attr( "title", "Show All Items" )
					.appendTo( wrapper )
					.button({
						icons: {
							primary: "ui-icon-triangle-1-s"
						},
						text: false
					})
					.removeClass( "ui-corner-all" )
					.addClass( "ui-corner-right ui-combobox-toggle" )
					.click(function() {
						// close if already visible
						if ( input.autocomplete( "widget" ).is( ":visible" ) ) {
							input.autocomplete( "close" );
							return;
						}

						// work around a bug (likely same cause as #5265)
						$( this ).blur();

						// pass empty string as value to search for, displaying all results
						input.autocomplete( "search", "" );
						input.focus();
					});
			},

			destroy: function() {
				this.wrapper.remove();
				this.element.show();
				$.Widget.prototype.destroy.call( this );
			}
		});
	})( jQuery );

	$(function() {
		$( "#fboss" ).combobox();
		/*$( "#toggle" ).click(function() {
			$( "#combobox" ).toggle();
		});*/
	});
	
	$('.ui-autocomplete-input').css({fontSize: '2em', width: '300px'});

	
});

function mtp2() {
	if (a1done == false) {
		$('#bubbleStatus:visible').slideUp(250);
		$('#bubbleDates').slideDown(300);

		$('#areaDates').animate({
			'background-color' : '#cfc'
		}, 500);
		$('#areaStatus').animate({
			'background-color' : '#ccc'
		});
		a1done = true;
	}
}

function mtp3() {
	if (a2done == false && a1done == true && $('#fdatefrom').val() != '' && $('#fdateuntil').val() != '') {
		$('#bubbleDates').slideUp(300);
		$('#bubblePersonal').slideDown(300);
		$('#areaDates').animate({
			'background-color' : '#ccc'
		});
		$('#areaPersonal').animate({
			'background-color' : '#cfc'
		}, 500);
		a2done = true;
	}
}

function mtp4() {

}