const path = require("path");
const fs = require("fs");
const wEmitter = new (require('events').EventEmitter);
var wCredentials = require("../../credentials/cred.js");

var OAUTH2_CLIENT_ID = wCredentials.webBrowser;
var sockServerAddr = wCredentials.socketIOServer;
var port = wCredentials.socketIOPort;

var viewFiles = {
	path: path.resolve( __dirname ),
	active: false,
	photoWall: "photoWall.html",
	fullScreenYT: "fullScreenYoutube.html",
	error: "error.html"
};



$(document).ready( function() {

	$("#vAPP").hide();

	var messages = [];

	var socket = io.connect( sockServerAddr + ":" + port.toString() );
	console.log(socket.id);

	socket.on('message', function (data) {
		console.log(data.message);
		$("#wPlaceHolder").hide();
		wEmitter.emit( "sMain" );
	});
	
});




function addChildView(viewName) {

	var wName = viewName || viewFiles.fullScreenYT;

	if ( viewFiles.active ) { closeChildView(); }

	$("#vAPP").append("<div id=wChild></div>");
	$("#wChild").load( viewFiles.path + "/" + wName );
	viewFiles.active = true;
}

function closeChildView() {
	
	if ( viewFiles.active ) {
		$("#wChild").remove();
		viewFiles.active = false;
	}

}

function wMain() {
	
	$("#vAPP").show();
	
}



wEmitter.on( "sMain" , wMain );
wEmitter.on( "closeChildView" , closeChildView );
wEmitter.on( "youtubeReady" , addChildView );

