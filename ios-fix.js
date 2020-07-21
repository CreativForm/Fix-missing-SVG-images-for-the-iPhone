/* Fix missing SVG images for the iPhone
 * @version         1.1.0
 * @author          Ivijan-Stefan Stipić <creativform@gmail.com>
 * @website         https://infinitumform.com/
 * @source          https://github.com/CreativForm/Fix-missing-SVG-images-for-the-iPhone
=======================================================*/
;(function(DOC, WIN, NAV){
	// Find user agent
	const agent = NAV.userAgent.toLowerCase();
	// Cache control
	const cache_control = true;
	
	var browser, image;

	if (/edge|edg\/[0-9.]+/i.test(agent)) {
		// Chrome
		browser = 'edge';
	} else if (/(\.net|\.net[0-9.]+|msie|ie|trident)/i.test(agent)) {
		// Chrome
		browser = 'ie';
	} else if (/(opera|opr)/i.test(agent)) {
		// Chrome
		browser = 'opera';
	} else if (/(gecko|firefox)\/[0-9.]+/i.test(agent)) {
		// Mozilla
		browser = 'mozilla';
	} else if (/chrome\/[0-9.]+/i.test(agent)) {
		// Chrome
		browser = 'chrome';
	} else {
		// Safari
		browser = 'safari';
	}

	if(browser != 'safari'){
		if(/iPad|iPhone|iPod/i.test(agent) && !WIN.MSStream){
			browser = 'safari';
		}
	}
	
	/* Set classes to body */
	if(browser)
	{
		DOC.body.classList.add('is-' + browser);
	}

	/* Is Safari on the iOS */
	if(browser == 'safari')
	{
		// Append to body  is-ios class
		DOC.body.classList.add("is-ios");
		
		// Loop all images
		var images = DOC.querySelectorAll('img');
		for(i = 0; i<images.length; i++){
			image = images[i];
			// Find only SVG images
			if(image.src.indexOf('.svg') > -1){
				var object = document.createElement("object");
				
				// If image missing, we can use alt tag to display text
				if(image.alt){
					object.appendChild(document.createTextNode(image.alt));
				}
				
				// Set object type
				object.type = "image/svg+xml";
				
				// Append classes
				if(image.classList.length > 0)
					object.classList = image.classList;
				
				// Append title
				if(image.title)
					object.title = image.title;
				
				// Append ID
				if(image.id)
					object.id = image.id;
				
				// Append dataset
				if(image.dataset > 0)
					object.dataset = image.dataset;
				
				// Append inline CSS
				if(image.style.length > 0)
					object.style = image.style;
				
				// Append width
				if(image.width != '')
					object.width = image.width;
				
				// Append height
				if(image.height != '')
					object.height = image.height;
				
				// Replace element
				image.parentNode.replaceChild(object, image);
				
				// Append SRC with caching control
				if(/[\?\&]/.test(object.src) || !cache_control)
					object.data = image.src;
				else {
					var cache = (image.width*image.height);
					if(cache < 1) cache = new Date().getTime();
					object.data = image.src + '?' + cache;
				}
				
				// Destroy variables
				delete image;
				delete object;
			}
		}
	}
}( document, window, navigator ));
