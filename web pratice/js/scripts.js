

myNameSpace = {
	defHeader: "Header",
	defParag:  "Content Paragraph"
   

 

};



//Auto start functions

//This function sets up the event handlers
(function () {
	
	//Creates an event handler for editing existing elements
	$("#editPH").click(function () {

 
		//variables
		var $h1 = $("h1");
		var $p  = $("p");
		var flag = $h1.is(".editable");		
		
		//toggle the h1
		$h1.prop("contenteditable",!flag).toggleClass("editable");
		
		
	
		//set new flag
		flag = $p.is(".editable");

		//toggle the p
		$p.prop("contenteditable",!flag).toggleClass("editable");

		});

	//Creates an event handler for the deleting of the most recent element
	$("#deleteEntry").click(function () { 
		
		//variables
		var $h1 = $("h1").last();
		 $h1.remove();
		
		var $p = $("p").last();
		 $p.remove();			

} );

	//Creates an event handler for adding a new element
	$("#addEntry").click(function () {

	//variables
	$mBox = $(".mainContentBox");
	$mBox.append("<h1>" + myNameSpace.defHeader + "</h1>") ;
	$mBox.append("<p>" + myNameSpace.defParag + "</p>") ;

	} );
})()
