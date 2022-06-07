//import all required modules
const prompt = require('prompt-sync')({sigint: true});
const clear = require('clear-screen');
const _ = require('lodash');
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
    locationX = 0;
    locationY = 0;

    constructor()
    {
        //the current location of the character *
        //character * can be always at teh default position (0,0)    
        for(let a = 0; a < col; a++){
            this.field[a] = []
        }
        this.generateField(); //generate patches of grass in the plot
    }
//end of field class

generateField() 
{
    for (let x = 0; x < row; x++)
    {
        for(let y = 0; y < col; y++) 
        {
        //const prob = Math.random();
        this.field[x][y] = fieldCharacter;
        }
    }
    this.generateHole(); //generate many holes randomly
    this.generateHat(); //generate a hat randomly
 } //console.log(this.field);

 generateHole() 
 {
    for (let xx = 0; xx < row; xx++)
    {
        for(let yy = 0; yy < col; yy++) 
        {
        //const prob = Math.random();
        xx = Math.floor(Math.random() * row); // between 0-9
        yy = Math.floor(Math.random() * col); 
        this.field[xx][yy] = hole;
        }
    }
}
//console.log(table(this.field)); 

generateHat() 
{
    let xxx = 0, yyy = 0;
    if (this.field[xxx][yyy] != pathCharacter || this.field[xxx][yyy] != hole) 
    {
        xxx = Math.floor(Math.random() * row); // between 0-9
        yyy = Math.floor(Math.random() * col); 
        this.field[xxx][yyy] = hat;

    }
}

checkNewPosition(x, y) 
{
    if (this.field[x][y] == hole)
    {
        console.log("Sorry, you fell down a hole!");
        return false;
    }
    else if (this.field[x][y] == hat)
    {
        console.log("Congrats, you found your hat!");
        return false;
    }
    else if (x < 0 || x > row || y < 0 || y > col)
    {
        console.log("Out of bounds - Game End!");
        return false;
    }
    return true;
}

runGame()
{
        //Implement your codes        
        console.log("Current Character location is ", this.locationX, this.locationY);

        if (Key == "u")
        {
           const targetX = this.locationX - 1;
            if (this.checkNewPosition(targetX, this.locationY)){
                this.locationX = targetX;
            }
            else {
                return;
            }
        }
        
        else if (Key == "d")
        {
            const targetX = this.locationX + 1;
            if(this.checkNewPosition(targetX, this.locationY)){
                this.locationX = targetX;
            }
            else {
                return;
            }
        }
        else if (Key == "l" )
        {
            const targetY = this.locationY - 1;
            if(this.checkNewPosition(this.locationX, targetY)){
                this.locationY = targetY;
            }
            else {
                return;
            }
        }
        else if (Key == "r")
        {   
            const targetY = this.locationY + 1
            if(this.checkNewPosition(this.locationX, targetY)){
                this.locationY = targetY;
            }
            else {
                return;
            }
        }
        
        console.log("New Character location is ", this.locationX, this.locationY);

        this.print();
        this.askQuestion();
}

print() 
{       
        const fieldCopy = _.cloneDeep(this.field)
        fieldCopy[this.locationX][this.locationY] = pathCharacter;        
        //this.field[this.locationX][this.locationY] = pathCharacter;        

        const displayString = this.field.map(row => {
            return row.join('');
        }).join('\n');
        console.log(displayString);
}

askQuestion()
{
        const answer = prompt('Which way? (u, d, l, r)').toLowerCase();
        

        if (answer == 'u' || answer == 'd' || answer == 'l' || answer == 'r')        
        {
            Key = answer
            this.runGame();
        }
        else
        {
            console.log("Invalid key! Enter (u, d, l or r)");
        }
    }
}// end of field class

const myField = new Field();
myField.runGame();

