// Setup initial game stats
var score = 0;
var lives = 2;
var powerpellet = 4;


// Define your ghosts here
var inky = {
  menu_option: '1',
  name: 'Inky',
  colour: 'Red',
  character: 'Shadow',
  edible: false
};

var blinky = {
  menu_option: '2',
  name: 'Blinky',
  colour: 'Cyan',
  character: 'Speedy',
  edible: false
};

var pinky = {
  menu_option: '3',
  name: 'Pinky',
  colour: 'Pink',
  character: 'Bashful',
  edible: false
};

var clyde = {
  menu_option: '4',
  name: 'Clyde',
  colour: 'Orange',
  character: 'Pokey',
  edible: false
};


var ghosts = [inky, blinky, pinky, clyde];

// Draw the screen functionality
function drawScreen() {
  clearScreen();
  setTimeout(function() {
    displayStats();
    displayMenu();
    displayPrompt();
  }, 10);
}

function clearScreen() {
  console.log('\x1Bc');
}

function displayStats() {
  console.log('Score: ' + score + '     Lives: ' + lives + '\nPower Pellets: ' + powerpellet);
}

function displayMenu() {
  console.log('\n\nSelect Option:\n');  // each \n creates a new line
  console.log('(d) Eat Dot');
    if (powerpellet === 0) {
      console.log("No Power Pellets left!");
    }
    else {
      console.log('(p) Eat Power Pellet');
    }
    if (inky["edible"] === true) {
      console.log('(1) Eat Inky (edible)');
    }
    else {
      console.log('(1) Eat Inky');
    }
    if (blinky["edible"] === true) {
      console.log('(2) Eat Blinky (edible)');
    }
    else {
      console.log('(2) Eat Blinky');
    }
    if (pinky["edible"] === true) {
      console.log('(3) Eat Pinky (edible)');
    }
    else {
      console.log('(3) Eat Pinky');
    }
    if (clyde["edible"] === true) {
      console.log('(4) Eat Clyde (edible)');
    }
    else {
      console.log('(4) Eat Clyde');
    }
  console.log('(q) Quit');

}

function displayPrompt() {
  // process.stdout.write is similar to console.log except it doesn't add a new line after the text
  process.stdout.write('\nWaka Waka :v '); // :v is the Pac-Man emoji.
}


// Menu Options
function eatDot() {
  console.log('\nChomp!');
  score += 10;
}

function eatGhost(ghost) {

  if (ghost["edible"] === false) {
    console.log('\n' + ghost.colour + " " + ghost.name + " killed Pac-Man!");
    lives -= 1;
    gameOver();
  }
  else if (ghost["edible"] === true) {
  console.log('\nGulp!' + " Pac-Man ate " + ghost.name);
  score += 200;
  ghost["edible"] = false;
  }
}

function eatPowerPellet() {
  console.log("\nGhosts turned blue!")
  score += 50;
  for (var i = 0; i < ghosts.length; i++) {
    ghosts[i].edible = true;
  }
  powerpellet -= 1;
}


// Process Player's Input
function processInput(key) {
  switch(key) {
    case '\u0003': // This makes it so CTRL-C will quit the program
    case 'q':
      process.exit();
      break;
    case 'd':
      eatDot();
      break;
    case 'p':
      if (powerpellet > 0) {
        eatPowerPellet();
      }
      else {
        console.log("\nYou can't do that anymore!")
      }
      break;
    case '1':
      eatGhost(ghosts[0]);
      break;
    case '2':
      eatGhost(ghosts[1]);
      break;
    case '3':
      eatGhost(ghosts[2]);
      break;
    case '4':
      eatGhost(ghosts[3]);
      break;
    default:
      console.log('\nInvalid Command!');
  }
}

function gameOver() {
  if (lives === 0) {
    process.exit();
  }
}

//
// YOU PROBABLY DON'T WANT TO CHANGE CODE BELOW THIS LINE
//

// Setup Input and Output to work nicely in our Terminal
var stdin = process.stdin;
stdin.setRawMode(true);
stdin.resume();
stdin.setEncoding('utf8');

// Draw screen when game first starts
drawScreen();

// Process input and draw screen each time player enters a key
stdin.on('data', function(key) {
  process.stdout.write(key);
  processInput(key);
  setTimeout(drawScreen, 800); // The command prompt will flash a message for 300 milliseoncds before it re-draws the screen. You can adjust the 300 number to increase this.
});

// Player Quits
process.on('exit', function() {
  console.log('\n\nGame Over!\n');
});
