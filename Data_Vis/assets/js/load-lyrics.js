/* global d3 */
//import lodash.debounce
import isMobile from './utils/is-mobile.js';
import graphic from './graphic.js';
//import footer from './footer';


const $body = d3.select('body');

function resize() {}

function playLyrics(currentId){

  var yScale = d3.scaleLinear().domain([1,10]).range([20,80])
  var scale = d3.scaleLinear().domain([1,10]).range([1.1,1.5])

  var lyricsJonas = [ ["you",0,5], ["yeah",1.3,4], ["any road",2.2,6], ["you",3,7], ["take",3.2,7], ["you",3.6,5],
          ["know",3.8,5], ["that",4,5], ["youll",4.1,4], ["find",4.3,5], ["me",4.7,7], ["I'm a sucker for",5.7,5],
          ["all the",6.9,10], ["subliminal",7.8,7], ["things",8.4,7], ["no",9.2,7], ["one",9.4,8], ["knows",9.7,7],
          ["about",10,6], ["you",10.6,5], ["about",10.9,4], ["you",11.4,5], ["about",11.9,4], ["you",12.3,5],
          ["about",12.8,4], ["you",13.1,5], ["and",13.4,6], ["you",13.6,6], ["makin",13.7,10], ["the",14.5,10],
          ["typical",14.8,6], ["me",15.4,7], ["break",16,8], ["my",16.2,7], ["typical",16.5,6], ["rules",17.4,5],
          ["it's",18.5,5], ["true",19.1,6], ["I'm a",19.5,7], ["sucker",19.7,6], ["for",20.34,5], ["you",20.9,6],
          ["yeah",22.5,4]  ];

  
  lyrics = lyricsJonas;

  lyricsContainer = d3.select("#"+currentId).select(".lyric")
  lyricsContainer.select("p").style("pointer-events","none").text(function(d){
    return ""});

  lyricsContainer.node().addEventListener('touchstart', function(e){
    e.preventDefault();},
    {passive: false});

  lyricsContainer.select("p").node().addEventListener('touchstart', function(e){
    e.preventDefault();},
    {passive: false});

  lyricsContainer.select(".arrow-up").node().addEventListener('touchstart', function(e){
    e.preventDefault();},
    {passive: false});

  lyricsContainer.select(".arrow-up").select("svg").node().addEventListener('touchstart', function(e){
    e.preventDefault();},
    {passive: false});

  lyricsContainer.select(".arrow-down").node().addEventListener('touchstart', function(e){
    e.preventDefault();},
    {passive: false});

  lyricsContainer.select(".arrow-down").select("svg").node().addEventListener('touchstart', function(e){
    e.preventDefault();},
    {passive: false});

  lyricsStamps = lyrics.map(function(d){return d[1]});

}

function changeWord(){
  var scale = d3.scaleLinear().domain([3,10]).range([1,3]).clamp(true)
  var yScale = d3.scaleLinear().domain([1,10]).range([30,80])

  lyricsContainer
    .style("bottom",yScale(lyrics[lyricsCount][2])+"%")
    .select("p")
    .text(lyrics[lyricsCount][0])
    .style("transform","scale("+scale(lyrics[lyricsCount][2])+")")
    .style("color",d3.interpolateCool(lyrics[lyricsCount][2]/10))
    ;

  if(lyricsCount > 0 && lyrics[lyricsCount][2] > lyrics[lyricsCount - 1][2]){
    d3.select("#"+currentId).select(".lyric").select(".arrow-down").style("display","none")
    d3.select("#"+currentId).select(".lyric").select(".arrow-up").style("display","block")
  }
  else if (lyricsCount > 0 && lyrics[lyricsCount][2] < lyrics[lyricsCount - 1][2]){
    d3.select("#"+currentId).select(".lyric").select(".arrow-down").style("display","block")
    d3.select("#"+currentId).select(".lyric").select(".arrow-up").style("display","none")
  }
  // else if(lyricsCount > 0 && lyrics[lyricsCount][2] == lyrics[lyricsCount - 1][2]){
  //   d3.select("#jonas").select(".lyrics").select(".lyric").select(".arrow-down").style("display","none")
  //   d3.select("#jonas").select(".lyrics").select(".lyric").select(".arrow-up").style("display","none")
  // }
}

function stopLastAudio(){
  
  console.log("stop audio");
  if (noiseArray.length > 0) {
    for (var noise in noiseArray){
      noiseArray[noise].stop();
    }
  }
}


function playSound(){
  
  console.log("playing sound");

  const newSound = new Howl({
    src: ["https://p.scdn.co/mp3-preview/8b304ee721be5f4235a67722670be137c785de1e.mp3"],
    volume:.8,
    // html5: true,
    loop:false
    })

	newSound.volume(0.1);

    stopLastAudio()
    newSound.play();
    noiseArray.push(newSound);

    if (true){
      lastAudio = newSound;
    }

  //});
}

function playSong(currentId){

  playSound();
  var interval = null;

  if(currentId == "jonas"){

    playLyrics(currentId);

    if(interval){
      clearInterval(interval);
    }
    
    lyricsCount = 0;

    interval = window.setInterval(function(d){
      if(noiseArray.length > 0){
        var value = lastAudio.seek();
        if(value > lyricsStamps[lyricsCount + 1]){
          lyricsCount = lyricsCount + 1;
          changeWord(currentId);
        }
      }
    },100)

    //stopLastAudio()
  }
}
var lyrics = null;
var lyricsContainer = null;
var lyricsStamps = null;
var lyricsVals = [0];
var lyricsCount = 0;
var lyricsTwo = null;
var currentId = "jonas"
var noiseArray = [];
var lastAudio = null;

function init(){

  playSong(currentId)

}

//init();

export default { init, resize };
