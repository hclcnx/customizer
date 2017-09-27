// ==UserScript==
// @copyright    Copyright IBM Corp. 2017
// @name         newsRiverSectionedColour
// @version      0.10
// @description  *** PROTOTYPE CODE *** displays river of news items as separate card styled sections
//                                      and changes the background colour based on has event
//
// @namespace  http://ibm.com
//
// @author       Tony Estrada - Padraic Edwards - Brian Gleeson
//
// @include      *://*connections*.ibm.com/homepage/*
// @include      *://apps.*.collabserv.com/homepage/*
// @include      *://apps.*.collabserv.com/homepage/*
// @include      *://icstage.swg.usma.ibm.com/homepage/*
// @include      *://w3alpha*.toronto.ca.ibm.com/homepage/*
// @include      *://lcauto*.swg.usma.ibm.com/homepage/*
//
// @include      *://*connections*.ibm.com/profiles/*
// @include      *://apps.*.collabserv.com/profiles/*
// @include      *://apps.*.collabserv.com/profiles/*
// @include      *://icstage.swg.usma.ibm.com/profiles/*
// @include      *://w3alpha*.toronto.ca.ibm.com/profiles/*
// @include      *://lcauto*.swg.usma.ibm.com/profiles/*
//
// @exclude
//
// @run-at       document-end
//
// ==/UserScript==

if (typeof(dojo) != "undefined") {
   require(["dojo/domReady!"], function() {

    function handleHashChangeEvent() {
      // Get the current hashValue
      var hashValue = window.location.hash;

      if (hashValue == "#myStream/imFollowing/all") {
        changeNewsRiverColour(240, 158, 231);
      }
      if (hashValue == "#atMentions/atMentions") {
        changeNewsRiverColour(110, 158, 122);
      }
      if (hashValue == "#myNotifications/forme/all") {
        changeNewsRiverColour(90, 111, 134);
      }
      if (hashValue == "#actionRequired/actionRequired/all") {
        changeNewsRiverColour(20, 101, 234);
      }
      if (hashValue == "#saved/saved/all"){
        changeNewsRiverColour(230, 2, 155);
      }
    }

    function changeNewsRiverColour(rgb1, rgb2, rgb3) {
      // Remove old style
      var newsRiverStyle = dojo.byId("newsRiverStyle");
      if (newsRiverStyle) {
        dojo.destroy(newsRiverStyle); // destroy current style
      }

      // Add new style for activity stream cards colour
      dojo.place("<style id='newsRiverStyle'>"+
          "#activityStream ul.lotusStream { background-color:rgba(" + rgb1 + "," + rgb2 + "," + rgb3 + ", " + (location.href.indexOf("/profiles/") > 0 ? "0" : "1") + "); border:0px; padding:5px 0px 5px 0px; }" +
          "#activityStream ul.lotusStream > li { background-color:white; margin:25px 15px 25px 3px; box-shadow:5px 5px 15px #aaaaaa; border-radius:5px; }" +
          "#activityStream ul.lotusStream > li:after { height:0px; }" +
          ".lotusui30 .lotusBoard .lotusStream .lotusPostHover, .lotusui30 .lotusBoard .lotusStream .lotusPostSelected { border-radius: inherit; /* -webkit-transform: translate(3px,3px); -webkit-transition: width 2s, height 2s, -webkit-transform 0.25s;*/ }" +
          ".lotusui30 .lotusStream .filterArea { border-radius:0 0 5px 5px; border-width:0 1px 1px }" +
          ".lotusui30 .lotusStream .filterAreaInner { border: 0px }" +
        "</style>",
        dojo.body(),"append");
    }

    //listen for onHashChange event
    window.onhashchange = handleHashChangeEvent;

    //set initial background colour of news river
    handleHashChangeEvent();
   });
}
