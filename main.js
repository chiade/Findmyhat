//import all required modules
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
let Key = "";

//if prefer to use functions, go ahead
// in this kick starter, we are using Class object

//1)Build the whole field out (10 row x10 col)
// create 2D Array 
// Construct the whole layout using empty Array 

class Field 
{
    field = [];

    constructor()
    {
        //the current location of the character *
        //character * can be always at teh default position (0,0)
        this.locationX = 0;
        this.locationY = 0;

            for (let a = 0; a < row; a++)
            {
                this.field[a] = [];
            }

            this.generateField(); //generate patches of grass in the plot
    }
//end of field class

generateField() 
{
    for (let y = 0; y < row; y++)
    {
        for(let x = 0; x < col; x++) 
        {
        //const prob = Math.random();
        this.field[y][x] = fieldCharacter;
        }
    }
    this.generateHole(); //generate many holes randomly
    this.generatePath(); //generate a my path from origin
    this.generateHat(); //generate a hat randomly
 } //console.log(this.field);

 generateHole() 
 {
    for (let yy = 0; yy < row; yy++)
    {
        for(let xx = 0; xx < col; xx++) 
        {
        //const prob = Math.random();
        yy = Math.floor(Math.random() * row); // between 0-9
        xx = Math.floor(Math.random() * col); 
        this.field[yy][xx] = hole;
        }
    }
}
//console.log(table(this.field)); 

generateHat() 
{
    let yyyy = 0, xxxx = 0;
    if (this.field[yyyy][xxxx] != pathCharacter || this.field[yyyy][xxxx] != hole) 
    {
    //for (let yyyy = 0; yyyy < row; yyyy++)
    //{
        //for(let xxxx = 0; xxxx < col; xxxx++) 
        {
        //const prob = Math.random();
        yyyy = Math.floor(Math.random() * row); // between 0-9
        xxxx = Math.floor(Math.random() * col); 
        this.field[yyyy][xxxx] = hat;
        }
    }
}

generatePath() 
{
 
   this.field[this.locationY][this.locationX] = pathCharacter;

   //this.runGame();
}

differentScenario() 
{
    if (this.field[this.locationY][this.locationX] == hole)
    {
        console.log("Sorry, you fell down a hole!");
    }
    else if (this.field[this.locationY][this.locationX] == hat)
    {
        console.log("Congrats, you found your hat!");
    }
    else if (this.locationY < 0 || this.locationY > row || this.locationX < 0 || this.locationX > col)
    {
        console.log("Out of bounds - Game End!");
    }
}

runGame()
{
        //Implement your codes
        
        if (Key == "u" && this.field[this.locationY][this.locationX] != hat && this.field[this.locationY][this.locationX] != hole)
        {
            this.field[this.locationY+1][this.locationX] = pathCharacter;
            {
                this.differentScenario();
            }
        }
        
        else if (Key == "d" && this.field[this.locationY][this.locationX] != hat && this.field[this.locationY][this.locationX] != hole)
        {
            this.field[this.locationY-1][this.locationX] = pathCharacter;
            {
                this.differentScenario();
            }
        }
        else if (Key == "l" && this.field[this.locationY][this.locationX] != hat && this.field[this.locationY][this.locationX] != hole)
        {
            this.field[this.locationY][this.locationX-1] = pathCharacter;
            {
                this.differentScenario();
            }
        }
        else if (Key == "r" && this.field[this.locationY][this.locationX] != hat && this.field[this.locationY][this.locationX] != hole)
        {
            this.field[this.locationY][this.locationX+1] = pathCharacter;
            {
                this.differentScenario();
            }
        }
        else
        {
            console.log("Invalid key. Enter again (u, d, l or r)");
        }
        //this.differentScenario();
        this.print();
        this.askQuestion();
}

print() 
{
        clear();
        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
}

askQuestion()
{
        const answer = prompt('Which way? (u, d, l, r)').toUpperCase();
       
        if (answer == 'u' || answer == 'd' || answer == 'l' || answer == 'r')
        {
            this.runGame();
        }
        else
        {
            console.log("Invalid key! Enter (u, d, l or r)");
        }
    }
}// end of field class

//create an instance object for the field
const myField = new Field();
myField.runGame();

