//import all required modules - Jean's answer - 
const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');

//Instantiate variable
//can edit or create new variables if needed

const hat = '^'; //my hat
const hole = 'O';
const fieldCharacter = '░'; //grass patch 1m x 1m -> fill up the whole field (10 x 10)
const pathCharacter = '*'; //me
const row = 10;
const col = 10;
const probability = 0.2;

//if prefer to use functions, go ahead
// in this kick starter, we are using Class object

//1)Build the whole field out (10 row x10 col)
// create 2D Array 
// Construct the whole layout using empty Array 

class Field {
    field = [];

    constructor() {
        //the current location of the character *
        //character * can be always at teh default position (0,0)
        this.locationX = 0; //col
        this.locationY = 0; //row

            for (let a = 0; a < row; a++) {
                this.field[a] = [];
            }
            this.generateField(); //generate patches of grass in the plot
    }
//end of field class

generateField() {
    //Random number from 0 to 1
    //if the random number is greater than or equal 0.2, I will generate the patch of grass
    //if the random number is less than than 0.2, I will generate the hole
    for (let y = 0; y < row; y++) {
        for(let x = 0; x < col; x++) {
        //const prob = Math.random();
        //need to use the propability const create to generate either a patch of grass or a hole
        let getProb = Math.random();    //return a number between 0-1
        //e.g. 0.25, 0.86, 0.91, 0.12, 0.83

        //(0.25>0.2)?
        this.field[y][x] = getProb >= probability ? fieldCharacter : hole;
        }
    }

    let hatX ;
    let hatY ;
    do {
        //Set the "hat" location
        //Set the hat position as random (x,y)
        hatY = Math.floor(Math.random() * row);
        hatX = Math.floor(Math.random() * col);
        this.field[hatY][hatX] = hat;
    } while (hatX == 0 && hatY == 0);

    this.field[hatY][hatX] = hat;   //array needs a whole number - 0-9

    //set character position as [0][0]
    this.field[this.locationY][this.locationX] = pathCharacter;
}

runGame()
{       //keep asking user for inout if game is not end;
        //1) Char hits boundaries, 
        //2) Char gets the hat
        //3) Char drops into a hole
       let playing = true;
       while (playing)
       {
           this.field[this.locationY][this.locationX] = pathCharacter;
           this.print();
           this.askQuestion();

           if (!this.isInBoundary()) {
               console.log("Out of boundary - Game end")
               playing = false;
           }
           else if (this.field[this.locationY][this.locationX] == hat) {
               console.log("Congrats, you found your hat");
               playing = false; 
           }
           else if (this.field[this.locationY][this.locationX] == hole) {
            console.log("Sorry, you fell into hole");
            playing = false; 
           }
       }
}
isInBoundary() {
    return (this.locationX >= 0 && this.locationY >=0 && this.locationX < col && this.locationY < row)
}
print() {
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');  //newline / break
        console.log(displayString);
}

askQuestion()
{
        const answer = prompt('Which way? (u, d, l, r): ').toUpperCase();
       
        switch (answer) {
            case 'U':
                this.field[this.locationY][this.locationX] = fieldCharacter;//use this as original position to remain same
                this.locationY -= 1;    //row: update the path movement
                break;
            case 'D':
                this.field[this.locationY][this.locationX] = fieldCharacter;
                this.locationY += 1;    //row
                break;
            case 'L'://move to left
            this.field[this.locationY][this.locationX] = fieldCharacter;
            this.locationX -= 1;    //col
                break;
            case 'R': //move to right
            this.field[this.locationY][this.locationX] = fieldCharacter;
            this.locationX += 1;    //col
                break;
            default:
                console.log("Invalid key, enter u, d, l ,r");
                break;
            }
        }
}// end of field class

//create an instance object for the field
const myField = new Field();
myField.runGame();
