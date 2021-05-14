const funct = require('./script');

test("function which check if the field name isn't empty",()=>{
    array = ["",4];
    expect(funct.checkData(array)).toBeFalsy();
    array = ["nome",4];
    expect(funct.checkData(array)).toBeTruthy();
});

test("function which creates the 52 card deck",()=>{
    array1 = [1,2,3,4,5,6,7,8,9,10,11,12,13];
    array2 = ["C","D","S","H"];
    expect(funct.createDeck(array1,array2)).toContain('1C');
});

test("function which extrapolate a single random card from the complete deck",()=>{
var array = ["1A","1B","1C","1D","1F","1A","1A","1A","1B","1C","1D","1F","1A"];
expect(funct.createCard(array)).toBeDefined();
});