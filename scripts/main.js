//Using IIFE standards for this file

(function(window) {
  'use strict';
//create a new namespace and set other neccessary javascript functions at same level
  var App = window.App;
  var X12Parser = App.X12Parser;

  //set variable to hold X12N input file format. Can be updated to take in stream of data.
  var x12nCode = "ISA*00*          *00*          *12*ABCCOM         *01*999999999      *120117*1719*U*00400*000006768*0*P*>~GS*HS*4405197800*999999999*20120117*1719*1421*X*004010VICS~ST*270*1234~BHT*0022*13*1*20010820*1330~HL*1**20*1~NM1*PR*2******PI*123456789~HL*2*1*21*1~NM1*1P*2******SV*987654321~HL*3*2*22*0~NM1*IL*1*DOE*JANE****MI*345678901~EQ*30**FAM~SE*10*1234~GE*1*1421~IEA*1*000006768";

  //Executes XML output function from X12 Parser with X12 input sent over.
  var XMLoutput = X12Parser.addToXML(x12nCode);

  //output nicely formatted array in Console. Can be output a variety of ways depending upon scenario
  console.log(XMLoutput);

//trigger IIFE
})(window);
