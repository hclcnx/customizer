// ==UserScript==
// @copyright    Copyright IBM Corp. 2016
// @name         newsRiverSectioned
// @version      0.10
// @description  *** PROTOTYPE CODE *** displays river of news items as separate card styled sections
//
// @namespace  http://ibm.com
//
// @author       Tony Estrada
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

if(typeof(dojo) != "undefined") {
	
   require(["dojo/domReady!"], function(){
         //---------------------------------------------
         // HELPER FUNCTIONS
         var waitFor = function(callback, elXpath, maxInter, waitTime) {
            if(!maxInter) var maxInter = 100;  // number of intervals before expiring
            if(!waitTime) var waitTime = 10;  // 1000=1 second
            if(!elXpath) return;
            
            var waitInter = 0;  // current interval
            var intId = setInterval( function(){
               if (++waitInter<maxInter && !dojo.query(elXpath).length) return;
               clearInterval(intId);
               callback();
            }, waitTime);
         };

         // activity stream cards
        dojo.place(
        "<style>"+
            "#activityStream ul.lotusStream { background-color:rgba(240, 192, 203, "+(location.href.indexOf("/profiles/")>0?"0":"1")+"); border:0px; padding:5px 0px 5px 0px; }"+
            "#activityStream ul.lotusStream > li { background-color:white; margin:25px 15px 25px 3px; box-shadow:5px 5px 15px #aaaaaa; border-radius:5px; }"+
            "#activityStream ul.lotusStream > li:after { height:0px; }"+
            ".lotusui30 .lotusBoard .lotusStream .lotusPostHover, .lotusui30 .lotusBoard .lotusStream .lotusPostSelected { border-radius: inherit; /* -webkit-transform: translate(3px,3px); -webkit-transition: width 2s, height 2s, -webkit-transform 0.25s;*/ }"+
            ".lotusui30 .lotusStream .filterArea { border-radius:0 0 5px 5px; border-width:0 1px 1px }"+
            ".lotusui30 .lotusStream .filterAreaInner { border: 0px }"+
        "</style>",
        dojo.body(),"first");   
   });
}
