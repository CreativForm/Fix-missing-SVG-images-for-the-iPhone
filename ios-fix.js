/* Fix missing SVG images for the iPhone
 * @version         1.0.0
 * @author          Ivijan-Stefan Stipić <creativform@gmail.com>
 * @website         https://infinitumform.com/
=======================================================*/
;(function(DOC, WIN, NAV){
	// Find user agent
	const agent = NAV.userAgent.toLowerCase(); 
	var isSafari = false,
		isChrome = false;

	if (agent.indexOf('safari') != -1) { 
		if (agent.indexOf('chrome') > -1) {
			// Chrome
			isChrome = true;
		} else {
			// Safari
			isSafari = true;
		}
	}
	
	if(!isSafari){
		isSafari = /iPad|iPhone|iPod/i.test(agent) && !WIN.MSStream;
		if(isSafari){
			isChrome = false;
		}
	}
	
	/* Is Chrome - TO DO */
	if(isChrome)
	{
		DOC.body.classList.add("is-chrome");
	}
	
	/* Is Safari on the iOS */
	if(isSafari)
	{
		// Append to body  is-ios class
		DOC.body.classList.add("is-ios");
		
		// Loop all images
		var images = DOC.querySelectorAll('img');
		images.forEach(function(image){
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
				if(/[\?\&]/.test(object.src))
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
		});
	}
}( document, window, navigator ));
