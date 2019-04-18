console.log("I'm here ;)");


// dots.eq(0).click(function(){$(this).css('background-color', 'blue')})

// var tds = $('td');  // original array of td for x|z text swapping
var dots = $('.dot');
var colors = ['green', 'orange'];
var colorCounter = 0;

$('#resetGame').fadeOut();

function fireColor(){
  colorCounter +=1;
  console.log("colorCounter: " + colorCounter);
  return colors[colorCounter % 2]
}

function getAddr(num) {
  return [num % 7, Math.floor(num / 7)]  // [x,y]
}

function checkRow(num) {

      // variant for .text value comparation
  // var winSign = dots.eq(num).text();
  // var thisRow = getAddr(num)[1];
  // var bar = 0;
  // console.log('Loking for sign ' + winSign + ' , row ' + thisRow + ', cell ' + num);
  //
  // for (var ix = 0; ix < 7; ix++) {
  //   // dots.eq(thisRow * 7 + ix).css('background-color', 'grey')
  //   if (dots.eq(thisRow * 7 + ix).text() === winSign) {
  //     bar += 1;
  //     // console.log('add some bar = '+bar);
  //     if (bar >= 4) {
  //       console.log('Sign ' + 'reached value 4 and wins');
  //       return true
  //     }
  //   } else {
  //     bar = 0;
  //     // console.log('bar resetted '+bar);
  //   }
  // }

    // variant for color comparaton

    var winSign = dots.eq(num).css('background-color');
    var thisRow = getAddr(num)[1];
    var bar = 0;
    console.log('checkRow: Loking for sign ' + winSign + ' , row ' + thisRow + ', cell ' + num);

    for (var ix = 0; ix < 7; ix++) {
      // dots.eq(thisRow * 7 + ix).css('background-color', 'grey')
      if (dots.eq(thisRow * 7 + ix).css('background-color') === winSign) {
        bar += 1;
        // console.log('add some bar = '+bar);
        if (bar >= 4) {
          console.log('Sign ' + 'reached value 4 and wins');
          return true
        }
      } else {
        bar = 0;
        // console.log('bar resetted '+bar);
      }
    }


  return false




}



function fillSigns(cellInd, sign){
  // $(this).css('background-color', 'silver');
  // $(this).text('x');
  // console.log(getAddr(dots.index(this)));

  var lastCell = 0;

  var xy = getAddr(cellInd);
  console.log(xy);
  var thisY = getAddr(cellInd)[1];
  var thisX = getAddr(cellInd)[0];
  console.log("cellInd" + cellInd + " X:" + thisX + " Y:"+thisY)

  // another way  : // $(dots.eq(y*7 + thisX)).css(colorize);  //
  var colorize = {
    'background-color': sign,
  };
  console.log(colorize);

  for (var y = 6; y >= 0; y--) {
    // array[i]
    // console.log(dots.text());
    // console.log('ku' + y);
    // console.log(dots.eq(thisX*7 + y).text());

    // dots.eq(y*7 + thisX).css('background-color', 'silver');  // this Ok
    console.log(y*7 + thisX + " : " + dots.eq(y*7 + thisX).text());  // this Ok
    if (dots.eq(y*7 + thisX).text() === "") {
      // $(dots.eq(y*7 + thisX)).text('x');
      $(dots.eq(y*7 + thisX)).text(sign);  // original array of td for x|z text swapping
      // $(dots.eq(y*7 + thisX)).css(colorize);  // 'background-color', 'red'

      $(dots).eq(y*7 + thisX).css('background-color', sign);  // this is OK for production
      // $(dots).eq(y*7 + thisX).animate(colorize, 500,);  // not working

      // console.log($(dots).eq(y*7 + thisX).attr('background-color'));
      // console.log($(dots).eq(y*7 + thisX).css());
      break;
    }
  }
  lastCell = y*7 + thisX;
  return y*7 + thisX
}
//
// dots.eq(0).click(function(){
//   $(this).css('background-color', 'red');
//   console.log('addr' + Math.floor(dots.index(this)/7) + ' ' + dots.index(this) % 7);
//   console.log(getAddr(dots.index(this)));
//   // console.log($(this).index(this));
// })

dots.on("click", function() {
  // $(this).css('background-color', 'silver');
  // $(this).text('x');
  // console.log(getAddr(dots.index(this)));

  var cellInd = dots.index(this);
  // console.log(cellInd);

  var currentColor = fireColor();


  // do {
  //   if (currentColor === colors[0]){
  //     currentColor = colors[1];
  //   } else {
  //     currentColor = colors[0];
  //   }
  //   var lastCell = fillSigns(cellInd, currentColor);
  //   console.log('Sign wins: ' + checkRow(lastCell));
  //
  // } while (! checkRow(lastCell) );


  var lastCell = fillSigns(cellInd, currentColor);
  var winCondition = checkRow(lastCell)
  console.log('Sign wins: ' + winCondition);

  // change gameHint
  if (winCondition) {
    $('#gameHint').text('Winner is ' + colors[colorCounter % 2]);
    $('#gameTable').fadeOut(); //
    $('#resetGame').fadeIn(); // show resetGame button

  }

})
