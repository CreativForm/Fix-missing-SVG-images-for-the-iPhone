/* Fix missing SVG images for the iPhone
 * @version         1.0.0
 * @author          Ivijan-Stefan Stipić <creativform@gmail.com>
 * @website         https://infinitumform.com/
=======================================================*/
(function(DOC, WIN, NAV){
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
		
	if(isChrome)
	{
		DOC.body.classList.add("is-chrome");
	}
	
	if(isSafari)
	{
		DOC.body.classList.add("is-ios");
		
		var images = DOC.querySelectorAll('img');
		images.forEach(function(image){
						
			if(image.src.indexOf('.svg') > -1){
				var object = document.createElement("embed");
				
				if(/[\?\&]/.test(object.src))
					object.src = image.src;
				else {
					var cache = (image.width*image.height);
					if(cache < 1) cache = new Date().getTime();
					object.src = image.src + '?' + cache;
				}
				
				object.type = "image/svg+xml";
				if(image.classList.length > 0)
					object.classList = image.classList;
				if(image.id)
					object.id = image.id;
				if(image.dataset > 0)
					object.dataset = image.dataset;
				if(image.style.length > 0)
					object.style = image.style;
				if(image.width != '')
					object.width = image.width;
				if(image.height != '')
					object.height = image.height;
				
				image.parentNode.replaceChild(object, image);
			}
		});
	}
}( document, window, navigator ));
