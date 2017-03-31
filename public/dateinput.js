var datefield=document.createElement("input")
 datefield.setAttribute("type", "date")
 if (datefield.type!="date"){ //if browser doesn't support input type="date", load files for jQuery UI Date Picker
     document.write('<link href="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/themes/base/jquery-ui.css" rel="stylesheet" type="text/css" />\n')
     document.write('<script src="http://ajax.googleapis.com/ajax/libs/jquery/1.4/jquery.min.js"><\/script>\n')
     document.write('<script src="http://ajax.googleapis.com/ajax/libs/jqueryui/1.8/jquery-ui.min.js"><\/script>\n')
 }
