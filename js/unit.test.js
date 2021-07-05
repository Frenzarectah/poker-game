const funct = require('./script1');

test ("function that returns the sumatory of a numeric array",()=>{
    array =["14","13","12","11","10"];
    expect(funct.sum(array)).toBe(60);
});

test("function which creates the 52 card deck",()=>{
    array1 = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    array2 = ["C","D","S","H"];
    expect(funct.createDeck()).toContain('2C');
});

test("function which creates a 5-card-hand from a complete deck",()=>{
//array =["1C", "2C", "3C", "4C", "5C", "6C","9C", "10C", "11C", "12C"];
array =["1C", "2C", "3C", "4C", "5C", "6C", "", "", "9C", "10C", "11C", "12C", "13C", "1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D", "12D", "13D", "", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "11S", "12S", "13S", "1H", "2H", "3H", "4H", "5H", "6H", "7H", "", "9H", "10H", "", "12H", "13H"];
expect(funct.createHand(array)).toHaveLength(5);
});

test("function that translate a score with his corrispective name",()=>{
    expect(funct.trad(15)).toBe("COPPIA");
    expect(funct.trad(12)).toBe("CARTA ALTA");
});

test("function that check if an array is made by consecutive numbers (after sorted)",()=>{
    array = [4,3,2,5,1];
    expect(funct.consec(array)).toBeTruthy();
    array1 = [5,2,3,4,5];
    expect(funct.consec(array1)).toBe(array1);
});
test("function that pushes the numeric score into the hand",()=>{
    array = ["12C","4B","11C","3H","5D"];
    var point = 18;
    expect(funct.merging(array,point)).toHaveLength(6);
});
test("function that calculates the score of a noflush hand",()=>{
    array = ["12C","11D","9H","10D","8S"]; //its a color flush equals to 18 score
    array1 = ["12C","11H","11C","12S","9H"]; //it's a double pair equals to 16 score
    value = [12,11,9,10,8];
    value1 = [12,11,11,12,9];
    seme = "C";
    expect(funct.checkNoflush(array,value,seme)).toHaveLength(6);
    expect(funct.checkNoflush(array,value,seme)).toContain(18);
    expect(funct.checkNoflush(array1,value1,seme)).toContain(16);
});

