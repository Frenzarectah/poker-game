const funct = require('./script');

test("function which check if the field name isn't empty",()=>{
    array = ["",4];
    expect(funct.checkData(array)).toBeFalsy();
    array = ["nome",4];
    expect(funct.checkData(array)).toBeTruthy();
});