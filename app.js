var main = function() {
  var x = -1;
  var y = -1;
  var targetX = -1;
  var targetY = -1;
  var color = "green";
  var isSelected = false;
  var target;
  var origin;
  var origin1;
  var target1;
  
$('#startBtn').click(function() {
  $(this).addClass("hidden");
  $('#board').removeClass("hidden");
}); 
$("td").on("click",".piece", function() {
  origin = $(this); //needed because you cant use .html() on a DOM element taken from $(this).get(0)
  origin1 = $(this).get(0);	//use $(this).get(0) to get the actual DOM element that is $(this)
  var originRow = $("tr").parent().children().index($(origin).parent().parent()); //equivalent to commented code below
//var originRow = $(this).parent().parent().parent().children().index($(this).parent().parent());
  var originCol = $(origin).parent().parent().children().index($(origin).parent());
  
  if(!isSelected) {
    if($(this).hasClass("blue")) 
	 $(origin).data("color","blue");
    else  
	 $(origin).data("color","red");
 
    $(origin).data("x", originCol); //for comparison if another piece is clicked
    $(origin).data("y", originRow);
    isSelected = true; 
    $(this).addClass("active");
  } //a piece has already been selected
   else {
    if((x == originCol) && (y == originRow)) { //is this piece the selected piece?
      $(this).removeClass("active"); 
      isSelected = false;
    }
   }
 }); 
$("td").click(function() {
   target = $(this);	//used solely to move pieces with .html()
   target1 = $(this).get(0);	//target is the TD element, not div inside
   var targetCol = $(target).parent().children().index($(target));
   var targetRow = $(target).parent().parent().children().index($(target).parent());
   $(target).data("x", targetCol);
   $(target).data("y", targetRow);
  if(isSelected) //if a piece is selected             
   checkValid(target, origin) //was valid move made?
})
var checkValid = function(target, origin) {
    if(isAdjacent(target,origin)) {//can you even move there?
      if(!($(target).html())) { //no piece at target, can move there
        movePiece(target,origin);
        return true;
      }
      else if(checkTarget(target,origin))  //if target is same color, do nothing 
        return true;
        else return false; 
    }
}    
var checkTarget = function(target,origin) { //so target has piece, which color?
  var t_x = $(target).data("x");
  var t_y = $(target).data("y");
  var o_x = $(origin).data("x");
  var o_y = $(origin).data("y"); 
  if($(target).children().hasClass($(origin).data("color"))); //if has same color, do nothing
    return false;
  //computing ID of next diagnoal
  var newX = (2 * t_x) - o_x;
  if($(origin.data("color")) == "blue") 
    var newY = t_y - 1;
  else //color is red
    var newY = t_y + 1; 
  var newTarget = $("#" + newX + newY); 	//need to access newX,newY using jQuery's .index(), instead of using <td> id... can i use .get() again?
  if(!($(newTarget).html())) { //is there a piece at (newX,newY)?
  console.log("newTarget test");
    movePiece(newTarget,origin);
   $(target).children().remove(); 
  }
  else return false;
}
var isAdjacent = function(target,origin) {   //can you even move there?
  var t_x = $(target).data("x");
  var t_y = $(target).data("y");
  var o_x = $(origin).data("x");
  var o_y = $(origin).data("y"); 
  if((t_x == (o_x + 1)) || (t_x == (o_x - 1))) {	
    switch($(origin).data("color")) {
      case "blue":
		return(t_y == (o_y - 1));
      case "red":
		return(t_y == (o_y + 1));
    }
  } else return false;  
}
var movePiece = function(target,origin) { //given clicked squares ID, move selected piece to it
  target.html(origin);
  isSelected = false;
  $(origin).removeClass("active");
}
}
 $(document).ready(main);
