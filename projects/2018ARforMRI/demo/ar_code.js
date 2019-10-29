
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
//		Please specify the values in this area before running!
//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
	
	
	//The markers used. Valid inputs: 'hiro', 'kanji', 'custom'. Please see the ReadMe file in the 'markers' folder for more infomation on markers
	var markers = ['hiro','custom']
	var marker_urls = ['','markers/custommarker-pattern.patt']//leave the corresponding element blank ('') if the marker is not customed
	var marker_images = ['https://jeromeetienne.github.io/AR.js/data/images/HIRO.jpg','markers/custommarker.png']


	
	//Assume the files are already named as PrefixObject.obj/mtl, eg. humanbrain.obj, and uploaded to the same folder 
	//The prefix in the names of the files, e.g. patient name, experiment date, magnet name
	var prefix = ['human','box']
	//The folder where the object files are
	var obj_folder = ['humanobj/','box/']
	//Specify the names of the objects (including 2Dimages as they are actually 3D planes with super thin thickness).
	var ar_objects = ['brain','head','fiducial','image1','sample1']
	
	//Specify which marker each ar_object appends to. 1 means the first marker defined in the variable 'markers' earlier.
	var which_marker = [1,1,1,1,2]
	//Specify which prefix each file has. 1 means the first prefix defined in the variable 'prefix' earlier.
	var which_prefix = [1,1,1,1,2]
	//Specify where folder each file is. 1 means the first folder defined in the variable 'obj_folder' earlier.
	var which_folder = [1,1,1,1,2]
	
	
	//Specify the position of the objects in the second folder with respect to the marker
	var fsize='0.02 0.02 0.02'//converting a real size 3D model to AR suitable size: real length/marker side length(mm), e.g. model size*0.02 when the marker side lendth is 50mm
	var fposition='2.4 -2.5 0'//'moveright moveforward movedownward'
	var frotation='0 0 0'

/////////////////////////////////////////////////////////////////////////////////////
//		Creat the text showing the names of models and markers used in the WebApp
/////////////////////////////////////////////////////////////////////////////////////
	var aboutdiv = document.getElementById("aboutdiv");
		aboutdiv.innerHTML = '3D Models Displayed: <font color="red">' + prefix + '</font>;  Markers Used: ';
	
		function MarkersUsed(markerIdx){
			if (n==0){
			aboutdiv.innerHTML = aboutdiv.innerHTML + '<a href=' + marker_images[markerIdx] + '>' + markers[markerIdx] + '</a>'
			}else{
			aboutdiv.innerHTML = aboutdiv.innerHTML + ' & ' + '<a href=' + marker_images[markerIdx] + '>' + markers[markerIdx] + '</a>'
			}
		}			
	for (var n=0; n < markers.length; n++ ) {
		MarkersUsed(n);
	}
/////////////////////////////////////////////////////////////////////////////////////
//		Create the checkboxes to determine which objects to display
/////////////////////////////////////////////////////////////////////////////////////

		//Define the function to adjust the visibilidy for the object with id=elementId
		function CreateCheckbox(elementId) {
			var checkboxdiv = document.getElementById("optiondiv");
			checkboxdiv.innerHTML = checkboxdiv.innerHTML + ' ' +elementId+"<input type='checkbox' id="+elementId+"check  onclick='Setfunction()' checked> "
		}
	
	//Adust the visibility for all the elements
	for (const w of ar_objects) {
		CreateCheckbox(w);
	}

/////////////////////////////////////////////////////////////////////////////////////
//		Define the function for the Hide/Show button
/////////////////////////////////////////////////////////////////////////////////////

	function showhideProperties() {	
		//Hide or Show the whole 'propertydiv' when the botton is clicked
		document.getElementById('propertydiv').style.display = (document.getElementById('propertydiv').style.display == "none") ? "block" : "none" ; //()?'';'' is an equivalent expression for if(){}else{}
	}

	
//////////////////////////////////////////////////////////////////////////////////////////	
//		Define the function for the 'Apply' button
////////////////////////////////////////////////////////////////////////////////////////
	
		//Define the function to adjust the property for the element with id=elementId
		function SetProperties(elementId) {
			
			var element = document.getElementById(elementId)// The Aframe documentation suggests to use document.querySelector('#'+elementId) instead of document.getElementById(elementId). In our case these two are interchangeble and getElementById(elementId) is believed to be faster.
			
			
			//Hide or Show the object according to its checkbox state
			element.setAttribute('visible', document.getElementById(''+elementId+'check').checked);
			
				
				
				//grab the values for all the 3D objects
				var x = document.getElementById("obsize").value;
				var rx = document.getElementById("obrotationx").value;
				var ry = document.getElementById("obrotationy").value;
				var rz = document.getElementById("obrotationz").value;
				var px = document.getElementById("obpositionx").value;
				var py = document.getElementById("obpositiony").value;
				var pz = document.getElementById("obpositionz").value;
				
				
				
				//grab the values for the image 
				var ix = document.getElementById("imsizex").value;
				//as the image is diplayed as 2D images, we don't need the dimension describes the thickness of the plane
				//var iy = document.getElementById("imsizey").value;
				var iz = document.getElementById("imsizez").value;
				var irx = document.getElementById("imrotationx").value;
				var iry = document.getElementById("imrotationy").value;
				var irz = document.getElementById("imrotationz").value;
				var ipx = document.getElementById("impositionx").value;
				var ipy = document.getElementById("impositiony").value;
				var ipz = document.getElementById("impositionz").value;
				
				//As the input elements of the image contain values relative to 3D models, we need to convert them.
				ix=parseFloat(ix)*parseFloat(x);
				iy=1; //any non-zero value
				iz=parseFloat(iz)*parseFloat(x);
				irx = parseFloat(irx)+parseFloat(rx);
				iry = parseFloat(iry)+parseFloat(ry);
				irz = parseFloat(irz)+parseFloat(rz);
				ipx = parseFloat(ipx)+parseFloat(px);
				ipy = parseFloat(ipy)+parseFloat(py);
				ipz = parseFloat(ipz)+parseFloat(pz);
				
					
				
				var size=''+x/10+' '+x/10+' '+x/10 
				var position=''+px+' '+py+' '+pz 
				var rotation=''+rx+' '+ry+' '+rz 
					
					
				var isize=''+ix/10+' '+iy/10+' '+iz/10
				var iposition=''+ipx+' '+ipy+' '+ipz
				var irotation=''+irx+' '+iry+' '+irz
				
				
			
			
			//Apply the settings to the objects and images accordingly
			if(elementId == 'image1'){	
			element.setAttribute('scale', isize)
			element.setAttribute('position', iposition) 
			element.setAttribute('rotation', irotation)
			console.log(isize,irotation)       
			}else{
				if(elementId == 'sample1'){	
				element.setAttribute('scale', fsize)
				element.setAttribute('position', fposition) 
				element.setAttribute('rotation', frotation)
				console.log(isize,irotation)       
				}else{
				element.setAttribute('scale', size)
				element.setAttribute('position', position)
				element.setAttribute('rotation', rotation) 
				console.log(element) //for debug...
				}
			}
		}

		
	//Run the SetProperties function for all the objects 
	function Setfunction() {
		for (const w of ar_objects) {
		  SetProperties(w);
		  //console.log(w);
		}	
	}




////////////////////////////////////////////////////////////////////////////////////////////
//		Create the scene
//---------------------------------------------------------------------------------------
//          scene (parent) - markers (child) - objects (grandchild)
//                         - camera (child)    
////////////////////////////////////////////////////////////////////////////////////////////

	//The following 3 lines of code are equivalent to the html code usually seen in examples of ar.js: <a-scene embedded arjs='debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;'>. (Basic JavaScript and html knowledge...)
	var sceneEl = document.createElement('a-scene')
		sceneEl.setAttribute('embedded', 'true')
		//The following line explicitly tells the program what type of marker to detect. This line can be omitted as they are the default setups.	 
		sceneEl.setAttribute('arjs', 'debugUIEnabled: false; detectionMode: mono_and_matrix; matrixCodeType: 3x3;')
	document.body.appendChild(sceneEl)
	
	
	//////////////////////////////////////////////////////////////////////////////
	//		Create markers
	//////////////////////////////////////////////////////////////////////////////
		
		//Create a variable to hold all the markers created later
		var entity_markers = {} 
		
			//Define the function to create a marker
			function CreateMarker(markerIdx) {
				
				//In our case, 'a-anchor' is interchangeble with 'a-marker'. For more info about the difference between 'a-anchor', 'a-marker', (and 'a-marker-camera'), please see: https://github.com/jeromeetienne/AR.js/blob/master/aframe/src/component-anchor.js
				entity_markers[markerIdx] = document.createElement('a-anchor')
					
					entity_markers[markerIdx].setAttribute('preset',markers[markerIdx])//The default marker is the hiro marker.
					entity_markers[markerIdx].setAttribute('type','pattern')//'hiro','kanji' and the custom marker generated by the MarkerGenerator are all 'pattern' type markers. To use barcode type markers, please check the documentation of artoolkit or see: https://medium.com/chialab-open-source/ar-js-the-simpliest-way-to-get-cross-browser-ar-on-the-web-8f670dd45462:
			
					//import the '*.patt' file for customed markers
					if(markers[markerIdx]=='custom'){
					entity_markers[markerIdx].setAttribute('url',marker_urls[markerIdx])
					}
					
				sceneEl.appendChild(entity_markers[markerIdx])
			}
		
		//Create all the markers
		for (var n=0; n < markers.length; n++ ){
			CreateMarker(n);
		}
		
		


	//////////////////////////////////////////////////////////////////////////////
	//		Create all the objects
	//////////////////////////////////////////////////////////////////////////////
		
		//Create a variable to hold all the objects created later
		var entity_objects = {} 
		
			//Define the function to create objects and append them to the marker
			//Here we use <a-entity> which can include multiple types of 3D models, see:https://aframe.io/docs/0.8.0/core/entity.html 
			//If only obj models are used, one can also use <a-obj-model>, see: https://github.com/aframevr/aframe/blob/master/docs/primitives/a-obj-model.md
			function CreateObject(elementIdx) {
				entity_objects[elementIdx] = document.createElement('a-entity')
					
					//import obj with mtl. The file names should obey the rules specified in the following line: 
					object_url='obj: url('+obj_folder[which_folder[elementIdx]-1]+prefix[which_prefix[elementIdx]-1]+ar_objects[elementIdx]+'.obj); mtl: url('+obj_folder[which_folder[elementIdx]-1]+prefix[which_prefix[elementIdx]-1]+ar_objects[elementIdx]+'.mtl);'
					entity_objects[elementIdx].setAttribute('obj-model', object_url) 
					
					entity_objects[elementIdx].setAttribute('id', ar_objects[elementIdx])
				
				entity_markers[which_marker[elementIdx]-1].appendChild(entity_objects[elementIdx]) //append to the marker element instead of the scene to have the smooth effect
			}
		
			
			
		//Create all the objects
		for (var n=0; n < ar_objects.length; n++ ){
			CreateObject(n);
		}
		
		
	//////////////////////////////////////////////////////////////////////////////
	//		Create the camera
	//////////////////////////////////////////////////////////////////////////////
	
		//If we used <a-marker-camera> instead of <a-marker> or <a-anchor> when creating the marker before, we do not need to create the camera separately. However, in the current version of Ar.js, <a-marker> or <a-anchor> works better than <a-marker-camera>, as they can utilise the smooth effect of the movement of the object introduced to artoolkit recently, while <a-marker-camera> can result in  vigorously wiggling objects when the camera or marker is not 100% steady.
		var cameraEl = document.createElement('a-entity')
			cameraEl.setAttribute('camera', '')
			sceneEl.appendChild(cameraEl)

		
//Apply the initial set-ups
Setfunction()


//Hide the DebugUI in the bottom of the page. As the DebugUI is loaded in the end, the following line has to be in a function executed after the whole page is loaded. 
//window.onload=function(){
//document.getElementById('arjsDebugUIContainer').style.display = "none" ;
//}

	