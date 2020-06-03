# Fix missing SVG images for the iPhone

This small JavaScript code fix problem with the hidden SVG images because of Safari bad rendering. This is simple solution and you only need to adapt your CSS to `embed` HTML tag.

The `ios-fix.js` is best to place before closed `</body>` tag and will finish job for you.

You can see demo here: https://codepen.io/InfinitumForm/pen/PoZoovz

## How this work?

When someone come to website from the iPhone, JavaScript recognize device using `navigator` and replace `<img>` HTML tag what contain SVG images to `<object>` HTML tag. Also this code append image `width` and `height` attributes to `<object>` tag to Safari can easly render this images. Image id, class, dataset, inline css, alt, title, all will be transfered from `img` to `object` tags.

*NOTE:* If you not use classes for the your images inside CSS, you must add rules for the `object` same like your images have, otherwise your images will lost style for the mobile phone.

## License

This code is open source and you can use use it anywhere just please push some update if you find any bug or improve.
