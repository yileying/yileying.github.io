
AR.js allows the preset markers (e.g. hiro and kanji), custom markers and barcode markers.

----Preset Markers
The default marker is the 'Hiro' marker when <a-marker>, <a-anchor> or <a-marker-camera> is used.

The 'Hiro' marker can be replaced by the 'Kanji' marker while the following line is included:
	marker.setAttribute('preset','kanji')
	(or <a-marker preset='kanji'></a-marker> in html)
	
	
	
----Custom Pattern Markers---	
To use custom pattern marker, set preset='custom', type='pattern', and include the url of the '*.patt' file by url='https://.../*.patt'. E.g.
	marker.setAttribute('preset','custom')
	marker.setAttribute('type','pattern')
	marker.setAttribute('url','https://nmrtech.scps.vuw.ac.nz/~yile/custommarker-pattern.patt')
	(or <a-marker preset='custom' type='pattern' url='https://nmrtech.scps.vuw.ac.nz/~yile/custommarker-pattern.patt'></a-marker> )

The custom marker image and the '*.patt' file can be generated from: https://jeromeetienne.github.io/AR.js/three.js/examples/marker-training/examples/generator.html

A turorial for using the above MarkerGenerator to generat your own marker:
https://medium.com/arjs/how-to-create-your-own-marker-44becbec1105 

Useful advise on designing good custom markers given by https://medium.com/chialab-open-source/ar-js-the-simpliest-way-to-get-cross-browser-ar-on-the-web-8f670dd45462
	The maximum resolution of a marker is 16x16 pixels
	They must be square in shape
	They cannot have white/transparent areas, only light grey (e.g. #F0F0F0)
	They cannot contain colors, only black and light grey
	They have to contain simple text, like one letter, a number, or a symbol.

An interesting user case of custom markers:
https://www.womenwhocode.com/blog/building-an-augmented-reality-treasure-hunt-with-a-frame-and-ar-js 
	
	
----Barcode Markers---
see: https://medium.com/chialab-open-source/ar-js-the-simpliest-way-to-get-cross-browser-ar-on-the-web-8f670dd45462