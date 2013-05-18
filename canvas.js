$(document).ready(function(){
	
	
	$("#canvas").canvas({
		width	: 	650,
		height 	: 	650
	});
	
});

$.fn.canvas = function(options){
	
	var defaults = {
		width 	: 100,
		height	: 800
	};
	
	var options = $.extend(defaults,options);
	
	return this.each(function(){
		

		var jcanvas 	= $(this);
		var canv     	= this;
		var controls 	= $(".controls");
		
		//setting width and height
		jcanvas.attr("width",options.width);
		jcanvas.attr("height",options.height);
		
		//set context
		var canvas = canv.getContext("2d"); 
		
		//set default options
		canvas.lineWidth 	= 5;
		options.color		= "#000";
		canvas.strokeStyle 	= options.color;//line colour
		canvas.lineCap 		= "round"; 		
		canvas.lineJoin		= "round";		
		
		
		//This will change the line colour
		controls.find(".color").click(function(){
			var color 			= $(this).css("background-color");
			options.color		= color;
			canvas.strokeStyle 	= color;
		});
		
		//This will change the line width
		controls.find(".width").click(function(){
			var width 			= parseFloat($(this).text());
			canvas.lineWidth 	= width;
		});
		
		//Clearing the doodle
		controls.find(".reset").click(function(){
			canvas.clearRect(0,0,options.width,options.height);
		});
		
		//Bucket
		controls.find(".bucket").click(function(){
			if(options.fill){
				options.fill = false;
			}else{
				options.fill = true;
			}
		});
		
		//save as image
		//var img = $("#canvasImg");

		controls.find(".save").click(function(){
			var dataURL = canv.toDataURL();
			document.getElementById('canvasImg').src = dataURL;
		});
		
		//Drawing
		
		$("body").mousedown(function(e){
			options.mousedown = true;
			canvas.beginPath();
			var offset = jcanvas.offset();
			canvas.moveTo(e.pageX-offset.left,e.pageY-offset.top);
		});
		
		
		$("body").mouseup(function(e){
			options.mousedown = false;
			canvas.closePath();
		});
		
		//drawing the path
		jcanvas.mousemove(function(e){
			if(options.mousedown){
				var offset = jcanvas.offset();
				canvas.lineTo(e.pageX-offset.left,e.pageY-offset.top);
				if(options.fill){
					canvas.fillStyle = options.color;
					canvas.fill();
				}
				canvas.stroke();
			}
		});

	});


}
