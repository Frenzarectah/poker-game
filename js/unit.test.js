const funct = require('./script1');


test("function which creates the 52 card deck",()=>{
    array1 = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    array2 = ["C","D","S","H"];
    expect(funct.createDeck()).toContain('1C');
});

test("function which creates a 5-card-hand from a complete deck",()=>{
//array =["1C", "2C", "3C", "4C", "5C", "6C","9C", "10C", "11C", "12C"];
array =["1C", "2C", "3C", "4C", "5C", "6C", "", "", "9C", "10C", "11C", "12C", "13C", "1D", "2D", "3D", "4D", "5D", "6D", "7D", "8D", "9D", "10D", "11D", "12D", "13D", "", "2S", "3S", "4S", "5S", "6S", "7S", "8S", "9S", "10S", "11S", "12S", "13S", "1H", "2H", "3H", "4H", "5H", "6H", "7H", "", "9H", "10H", "", "12H", "13H"];
expect(funct.createHand(array)).toHaveLength(5);
});