$(document).ready(function(){
 var colors = ['red', 'orange', 'yellow', 'blue', 'green', 'violet', 'indigo', 'brown', 'black'];
 var generatedColors = [];
 var shuffledColors = shuffle(colors);
 var answer = '';
 var pickNum;
 var pickColor;
 var timeoutID;
 var selectedBlock;
 generateBlocks(shuffledColors);
 rightBlock(generatedColors);

  $('#instructions').on('click', function(){
    $(this).closest('button').remove();
    alertPick(generatedColors);

    $('#colorBlocks').on('click', function pickSteps(event) {
    //isolates the selected block's color
    selectedBlock = $(event.target).attr('class').split(' ')[1];
    console.log(selectedBlock);
      if((selectedBlock != answer && selectedBlock != pickColor) || (selectedBlock === answer && selectedBlock != pickColor)){
        alert('Can you please select the ' + pickColor + ' colored block?')
      }

      else if(selectedBlock != answer && selectedBlock === pickColor){
        alertPickAfter(generatedColors);
        $('.' + selectedBlock).css('background-color', 'white');
      }

      else if(selectedBlock === answer){
        timeoutID = window.setTimeout(winner(), 2000);
      }
    })
    });

  //randomly generates which colors to use from an array of colors
  function generateBlocks(array){
    var numColors = randomNumber(5, array.length);

    for(var i=0; i < (numColors - 1); i++){
      $('#colorBlocks').append('<div class = "block ' + array[i] +  '\"></div>');
      $('.' + array[i]).css('background-color', array[i]);
      generatedColors.push(array[i]);
    }
   }

  //randomly determines the correct block
  function rightBlock(array){
    var selectNum = randomNumber(1, array.length) - 1;
    answer = array[selectNum];
    console.log(answer);
  }

  //1st alert message that generates a pick color and instruction message
  function alertPick (array){
    pickNum = randomNumber(1, array.length) - 1;
    pickColor = array[pickNum];
    array.splice(array.indexOf(pickColor),1);
    alert('Please select the ' + pickColor + ' colored block.');
  }

  //2nd alert that generates a new pick color and instruction message
  function alertPickAfter (array){
    pickNum = randomNumber(1, array.length) - 1;
    pickColor = array[pickNum];
    array.splice(array.indexOf(pickColor),1);
    alert('I am sorry that was incorrect. Please select the ' + pickColor + ' colored block.');
  }

  //alert that appears when the correct block is chosen
  function winner() {
    $('.' + selectedBlock).css('background-color', 'gray');
    alert('Great Job! You got the right block. Lucky you. Why not play again?');
    location.reload();
   }

   //creates a random number
   function randomNumber(min, max){
    return Math.floor(Math.random() * (1 + max - min) + min);
   }

   //shuffles an array, source: http://jsfromhell.com/array/shuffle
   function shuffle(v){
    for(var j, x, i = v.length; i; j = parseInt(Math.random() * i), x = v[--i], v[i] = v[j], v[j] = x);
    return v;
   }
})
