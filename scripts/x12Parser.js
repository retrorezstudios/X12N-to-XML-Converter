(function(window) {
  'use strict';
//App object is equal to current window App object. if it doesnt exist, then create one.
  var App = window.App || {};

  //create object to start parsing X12 data
  var X12Parser = {
    //function to split data in separate segments at the designated separator
    splitIntoSegments: function(x12Input) {
      return x12Input.split("~");
    },

    //function to split segments into separate elements at the designated separator
    splitIntoElements: function(x12Input) {
      return x12Input.split("*");
    },

    //initial function called to start translation
    addToXML: function(x12Input) {

      //variables set for segment skip parameters
      var segmentCodeNM1 = "NM1";
      var skipServiceProvideCode = "1P";

      //split the data into segments here
      var x12Segments = this.splitIntoSegments(x12Input);

      //call XML writer to start creating XML array and open up XML writing format functions
      var XML = new XMLWriter();

      //starts XML file with neccessary batch tags
      XML.BeginBatchNode();

      //Outer loop that iterates over individual segments
      var i, j;
      for (i = 0; i < x12Segments.length; i++) {

        //create element array out of each segment provided
        var currentElementArray = this.splitIntoElements(x12Segments[i]);

        //check to see if NM1 = Service Provider as skip parameters
        if (currentElementArray[0] === segmentCodeNM1 && currentElementArray[1] === skipServiceProvideCode) {
          continue;
        }

        //write XML-formatted segment node with first element of segment array
        XML.BeginSegmentNode(currentElementArray[0]);

        //inner loop to iterate over individual elements of segment array
        for (j = 1; j < currentElementArray.length; j++) {

          //write XML-formatted element node with each remaining element in segment array
          XML.CreateElementNode(currentElementArray[j], j);
        }
        //create XML-formatted Segment closing tag
        XML.EndSegmentNode();
      }
      //create XML-formatted Batch closing tag
      XML.EndBatchNode();

      //send String version of XML array back to main.js
      return XML.ToString();
    }
  };

//add XML Parser to App Namespace
  App.X12Parser = X12Parser;
//add App to window Namespace
  window.App = App;

})(window);
