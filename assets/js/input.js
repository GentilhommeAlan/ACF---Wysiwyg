(function($){
	
	
	/**
	*  initialize_field
	*
	*  This function will initialize the $field.
	*
	*  @date	30/11/17
	*  @since	5.6.5
	*
	*  @param	n/a
	*  @return	n/a
	*/
	
	function initialize_field( $field ) {
		const elementHML = $($field[0]).find('textarea')[0];
		const key = $(elementHML).attr('id');
		console.log(key)
		// const key = $($field[0]).attr('data-key');
		var toolbarOptions = [];
		
		// ADD STYLE
		if($('#editor_' + key).data('style')){
			toolbarOptions.push(['bold', 'italic', 'underline', 'strike', 'link', 'size']);
		}

		var quill = new Quill('#editor_' + key , {
			theme: 'snow',
			modules: {
				toolbar: toolbarOptions
			}
		});

		// ADD Style title
		if($('#editor_' + key).data('title')){
			quill.format('header', '1');
		}
		var editor_content = quill.root.innerHTML;
		quill.on('text-change', function(delta, oldDelta, source) {
			var new_content = quill.root.innerHTML;

			// Remove HTML
			new_content = new_content.replaceAll('<p>', '');
			new_content = new_content.replaceAll('<h1>', '');
			new_content = new_content.replaceAll('<h2>', '');
			new_content = new_content.replaceAll('<h3>', '');
			new_content = new_content.replaceAll('<h4>', '');
			new_content = new_content.replaceAll('<h5>', '');
			new_content = new_content.replaceAll('<h6>', '');

			// Replace by BR
			new_content = new_content.replaceAll('</p>', '</br>');
			new_content = new_content.replaceAll('</h1>', '</br>');
			new_content = new_content.replaceAll('</h2>', '</br>');
			new_content = new_content.replaceAll('</h3>', '</br>');
			new_content = new_content.replaceAll('</h4>', '</br>');
			new_content = new_content.replaceAll('</h5>', '</br>');
			new_content = new_content.replaceAll('</h6>', '</br>');


			console.log(new_content);
			$("." + key).val(new_content);
		})		
	}
	
	
	if( typeof acf.add_action !== 'undefined' ) {
	
		/*
		*  ready & append (ACF5)
		*
		*  These two events are called when a field element is ready for initizliation.
		*  - ready: on page load similar to $(document).ready()
		*  - append: on new DOM elements appended via repeater field or other AJAX calls
		*
		*  @param	n/a
		*  @return	n/a
		*/
		
		acf.add_action('ready_field/type=wysiwyg_azerty', initialize_field);
		acf.add_action('append_field/type=wysiwyg_azerty', initialize_field);
		
		
	} else {
		
		/*
		*  acf/setup_fields (ACF4)
		*
		*  These single event is called when a field element is ready for initizliation.
		*
		*  @param	event		an event object. This can be ignored
		*  @param	element		An element which contains the new HTML
		*  @return	n/a
		*/
		
		$(document).on('acf/setup_fields', function(e, postbox){
			// find all relevant fields
			$(postbox).find('.field[data-field_type="wysiwyg_azerty"]').each(function(){
				
				// initialize
				initialize_field( $(this) );
				
			});
		
		});
	
	}


})(jQuery);
