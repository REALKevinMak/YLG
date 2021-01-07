var http = require('http');
const url = require('url');
const ytdl = require('ytdl-core');
const port = process.env.PORT || 4060;

http.createServer(function (req, res) {
    
    res.setHeader('Access-Control-Allow-Origin', '*');
	  res.setHeader('Access-Control-Request-Method', '*');
	  res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET');
	  res.setHeader('Access-Control-Allow-Headers', '*');
    res.writeHead(200, {'Content-Type': 'text/html'});
    
    const queryObject = url.parse(req.url,true).query;
    console.log(queryObject.id);
    // YouTube video ID
    var videoID = queryObject.id;

    ytdl.getInfo('www.youtube.com/watch?v='+videoID).then(
      response2 => {
        HighestBitrate = -1;
        response2.formats.forEach(Music =>{
          if(Music.audioBitrate > HighestBitrate){
            if(Music.hasVideo == false){
            HighestBitrate = Music.audioBitrate;
            console.log(Music.audioBitrate + " -> " + Music.hasVideo);
            }
          }
        });
        response2.formats.forEach(Music =>{
          if(Music.audioBitrate == HighestBitrate){
            res.end(Music.url);
            return;
          }
        });
      }
    );
    console.log("server started!");
}).listen(port);

function parse_str(str) {
  return str.split('&').reduce(function(params, param) {
    var paramSplit = param.split('=').map(function(value) {
      return decodeURIComponent(value.replace('+', ' '));
    });
    params[paramSplit[0]] = paramSplit[1];
    return params;
  }, {});
}
