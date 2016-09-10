var main = function(){
  var x = -1;
  var y = -1;
  var targetX = -1;
  var targetY = -1;
  var color = "green";
  var isSelected = false;
  var target;
  var origin;
  var colorTurn = "green";
 // var board = [5][5]; //was going to dynamically create board using only JS... eventually
  //for(var i = 0; i < 5; i++) {} 
$('#startBtn').click(function() {
  $(this).hide();
  $('#t01').show();
}); 
  
  /* selecting a piece */
$("td").on("click",".piece", function() {
  var originRow = $("tr").parent().children().index($(this).parent().parent()); //equivalent to commented code below
//var originRow = $(this).parent().parent().parent().children().index($(this).parent().parent());
  var originCol = $(this).parent().parent().children().index($(this).parent());
  if(isSelected == false) {
    origin = $(this);
    if($(this).hasClass("blue")) 
      color = "blue";
    else color = "red";
    x = originCol; //for comparison if another piece is clicked
    y = originRow;
    isSelected = true; 
    $(this).addClass("clicked");
  } //a piece has already been selected
   else {
    if((x == originCol) && (y == originRow)) { //is this piece the selected piece?
      $(this).removeClass("clicked"); 
      isSelected = false;
    }
   }
 }); 
  /* selecting a square to move to */
$("td").click(function() {
   var targetCol = $(this).parent().children().index($(this));
   var targetRow = $(this).parent().parent().children().index($(this).parent());
  if(isSelected == true) {//if a piece is selected         
    target = $(this);     //target is the TD element, not div inside
    if(checkValid(targetCol, targetRow, x, y, color, target, origin)) {//was valid move made?
      if(color == "blue")
        colorTurn = "red";
      else colorTurn = "blue";
    }
  }
})
var checkValid = function(t_x, t_y, o_x, o_y, color, target, origin) {
    if(isAdjacent(t_x,t_y,o_x,o_y,color)) {//can you even move there?
      if(!($(target).html())) { //no piece at target, can move there
        movePiece(target,origin);
        return true;
      }
      else if(checkTarget(t_x,t_y,o_x,o_y,color))  //if target is same color, do nothing 
        return true;
        else return false; 
    }
}    
var checkTarget = function(t_x,t_y,o_x,o_y,color) { //so target has piece, which color?
  if($(target).children().hasClass(color)) //if has same color, do nothing
    return false;
  //check if we can jump
  var newX = (2 * t_x) - o_x;
  if(color == "blue") 
    var newY = t_y - 1;
  else //color is red
    var newY = t_y + 1;  
  var newTarget = $("#" + newX + newY);
  if(!($(newTarget).html())) { //is there a piece at (newX,newY)?
    movePiece(newTarget,origin);
   $(target).children().remove(); 
  }
  else return false;
}
var isAdjacent = function(t_x,t_y,o_x,o_y,color) {   //can you even move there?
  if((t_x == (o_x + 1)) || (t_x == (o_x - 1))) {
    switch(color) {
      case "blue":
        if((t_y == (parseInt(o_y)) - 1))
          return true;
        else return false; 
      case "red":
        if((t_y == (parseInt(o_y)) + 1))
          return true;
        else return false;
    }
  } else return false;  
}
var movePiece = function(target,origin) { //given clicked squares ID, move selected piece to it
  target.html(origin);
  isSelected = false;
  $(origin).removeClass("clicked");
}
}
$(document).ready(main);
