function XMLWriter() {
  this.XML = [];
  this.State = "";

  this.BeginBatchNode = function() {
    this.XML.push("<Batch>\n");
    this.State = "open";
  }

  this.EndBatchNode = function() {
    this.XML.push("</Batch>\n")
    this.State = "closed";
  }

  this.BeginSegmentNode = function(Name) {
    Name = Name.replace(/ /g, "+");
    this.XML.push("<Segment name =\"" + Name + "\">\n");
  }

  this.EndSegmentNode = function() {
    this.XML.push("</Segment>\n");
  }

  this.CreateElementNode = function(ElementValue, index) {
    ElementValue = ElementValue.replace(/ /g, "+");
    this.XML.push("<Element name =\"" + index + "\">" + ElementValue + "</Element>\n");
  }

  this.ToString = function() {
    return this.XML.join("");
  }
}
