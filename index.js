
require("jsdom").env("", function(err, window) {
    if (err) {
        console.error(err);
        return;
    }

    var $ = require("jquery")(window);
	
		var artarr = [];
	var songarr = [];
	var currsong = "";
	var currartist = "";
	////////////////////
	
function finddupe(song){
	return songarr === song;
}
function loop(){

	$.ajax({
	type:"GET",
	url: "http://media.arn.com.au/XML-JSON.aspx?source=www.wsfm.com.au&feedUrl=xml/wsfm1017_now.xml",
	success: function(data){
		console.log("fetching")
		var artist = data.on_air.now_playing.audio.artist.value;
		var song = data.on_air.now_playing.audio.title.value;
		var played = {artist,song};
		var dupe = false;

		if(artist !="WS FM101.7" && song!="Sydney's Pure Gold"){
			
			if(currsong != song ){
								
				for(var i = 0; i < songarr.length; i++){
					if(songarr[i]== song){
						dupe = true;
						console.log("^^^^^^^^^^^^^^^^^^^^^");
						console.log(played.artist+" : "+ played.song);
						console.log("^^^^^^^^^^^^^^^^^^^^^")
						break;
					}
				}
				
				if(dupe == false){
					console.log(" ");
					console.log(played.artist+" : "+ played.song); //show what is on
					currsong = song; //set currentlly playing song with what is fetched
					songarr.push(song); //add new song to array
					console.log(songarr); // print array	
					console.log("");

				}


			}
			
		}
		
		setTimeout(
  function() 
  {
	return loop();
  }, 94000);

		
		
	},
	error: function(jqXHR, textStatus, error){
		console.log(error);
	}
});

}

	loop();
	

////////////////////////

});




