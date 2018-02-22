// ==UserScript==
// @copyright    Copyright IBM Corp. 2017
//
// @name         footerContactUsLink
// @version      0.1
// @description  *** PROTOTYPE CODE *** demonstrates simple script to customize the Contact Us link for the Homepage footer
//
// @namespace  http://ibm.com
//
// @author       Contact Us (aka anyone!)
//
// @include      *://apps.collabserv.com/homepage/*
//
// @exclude
//
// @run-at       document-end
//
// ==/UserScript==

if(typeof(dojo) != "undefined") {
	require(["dojo/domReady!"], function(){
        try {
            // utility function to let us wait for a specific element of the page to load...
            var waitFor = function(callback, elXpath, elXpathRoot, maxInter, waitTime) {
                if(!elXpathRoot) var elXpathRoot = dojo.body();
                if(!maxInter) var maxInter = 10000;  // number of intervals before expiring
                if(!waitTime) var waitTime = 1;  // 1000=1 second
                if(!elXpath) return;
                var waitInter = 0;  // current interval
                var intId = setInterval( function(){
                    if( ++waitInter<maxInter && !dojo.query(elXpath,elXpathRoot).length) return;

                    clearInterval(intId);
                    if( waitInter >= maxInter) { 
                        console.log("**** WAITFOR ["+elXpath+"] WATCH EXPIRED!!! interval "+waitInter+" (max:"+maxInter+")");
                    } else {
                        console.log("**** WAITFOR ["+elXpath+"] WATCH TRIPPED AT interval "+waitInter+" (max:"+maxInter+")");
                        callback();
                    }
                }, waitTime);
            };

            // here we use waitFor to wait on the .lotusStreamTopLoading div.loaderMain.lotusHidden element
            // before we proceed to customize the page...
            waitFor( function(){
			// wait until the "loading..." node has been hidden
			// indicating that we have loaded content.
   			dojo.query("div.lotusFooter:nth-child(1) > ul:nth-child(1) > li:nth-child(2) > a:nth-child(1)[href='mailto:tuser3@l2support.notes.lotuslive.com']");
       	          },
		  ".lotusStreamTopLoading div.loaderMain.lotusHidden");
      } catch(e) {
          alert("Exception occurred in footerContactUsLink: " + e);
      }
   });
}
