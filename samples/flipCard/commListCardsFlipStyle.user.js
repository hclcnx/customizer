/// ==UserScript==
// @copyright    Copyright IBM Corp. 2016

// @name         commListCardsFlipStyle
// @version      0.9
// @description  *** PROTOTYPE CODE *** displays community list as cards with flip action for additional info
//
// @namespace  http://ibm.com
//
// @author       Tony Estrada
//
// @include      *://*connections*.ibm.com/communities/service/html/mycommunities
// @include      *://*connections*.ibm.com/communities/service/html/ownedcommunities
// @include      *://*connections*.ibm.com/communities/service/html/followedcommunities
// @include      *://*connections*.ibm.com/communities/service/html/communityinvites
// @include      *://*connections*.ibm.com/communities/service/html/allcommunities
// @include      *://*connections*.ibm.com/communities/service/html/trashedcommunities
//
// @include      *://apps.*.collabserv.com/communities/service/html/mycommunities
// @include      *://apps.*.collabserv.com/communities/service/html/ownedcommunities
// @include      *://apps.*.collabserv.com/communities/service/html/followedcommunities
// @include      *://apps.*.collabserv.com/communities/service/html/communityinvites
// @include      *://apps.*.collabserv.com/communities/service/html/allcommunities
// @include      *://apps.*.collabserv.com/communities/service/html/trashedcommunities
//
// @include      *://w3alpha*.toronto.ca.ibm.com/*
//
// @exclude
//
// @run-at       document-end
//    
// ==/UserScript==

if(typeof(dojo) != "undefined") {
    
    var waitFor = function(callback, elXpath, maxInter, waitTime) {
        if(!maxInter) var maxInter = 20;  // number of intervals before expiring
        if(!waitTime) var waitTime = 100;  // 1000=1 second
        if(!elXpath) return;
        
        var waitInter = 0;  // current interval
        var intId = setInterval(function(){
            if (++waitInter<maxInter && !dojo.query(elXpath).length) return;
            clearInterval(intId);
            callback();
        }, waitTime);
    };
    
    waitFor(
        function(){
            
            showTable=function(){
                dojo.cookie("commTiles", "0", { expires: -1 });                
                dojo.replaceClass("viewControlTable", "lotusDetailsOn", "lotusDetailsOff");
                dojo.replaceClass("viewControlTiles", "lotusTileOff", "lotusTileOn");
                
                dojo.addClass("commTiles", "lotusHidden");
                dojo.removeClass(dojo.query("#lconn_communities_catalog_widgets_ResultsDisplayWidget_0 table")[0], "lotusHidden");
            };
            
            showTiles=function(){
                dojo.cookie("commTiles", "1", { expires: 1000 });                
                
                dojo.replaceClass("viewControlTiles", "lotusTileOn", "lotusTileOff");
                dojo.replaceClass("viewControlTable", "lotusDetailsOff", "lotusDetailsOn");

                createCommTiles();
                
                dojo.addClass(dojo.query("#lconn_communities_catalog_widgets_ResultsDisplayWidget_0 table")[0], "lotusHidden");
                dojo.removeClass("commTiles", "lotusHidden");
            };
            
            createCommTiles=function(){

	            commTiles=dojo.byId("commTiles");
                if( !commTiles){
	                out=
                  	'<style>'+
                    	'.cTile{width:200px;height:200px;background-color:rgb(250,250,250);cursor:pointer;position:relative;margin:5px 15px 15px 0;white-space:normal;}'+

                        '.cTileTextContainter{padding:5px;width:200px;height:200px;overflow:hidden;}'+

    	                '.cTileImg {background:linear-gradient(white,black);border-radius:.5em;}'+
        	            '.cTileImg img{width:200px;height:200px;opacity:0.80;border-radius:.5em;}'+
                    
            	        '.cTileTitle a,cTileTitle a:visited{font-family:Roboto,arial;sans-serif;font-weight:bold;font-size:12px;color:#333 }'+
                	    '.cTileTitle a:visited{color:#000 }'+
                    	'.cTileSmallTextDiv{font-size:smaller;margin-top:2px;}'+
   	     	            '.cTileType{position:absolute;right:4px;top:280px;font-size:0px;}'+
    	                '.cTileTrash{position:absolute;left:3px;top:280px;}'+
                    '</style>'+

                    "<style>"+
                          ".flip-container { perspective:1000; -webkit-perspective:1000; }"+
                          ".flip-container:hover .flipper, .flip-container.hover .flipper { transform: rotateY(180deg); }"+
                          ".flip-container, .front, .back { width: 200px; height: 200px; }"+
                          ".flipper { transition: 0.35s; transform-style: preserve-3d; position: relative; }"+
                          
                          ".front, .back { backface-visibility:hidden; position: absolute; top:0; left:0; border-radius:.5em; border:1px solid #aaa; box-shadow:5px 5px 15px #DDD;}"+
                          ".front { z-index: 2; }"+
                          ".front:hover { opacity: .15; }"+
                          
                    	  ".back { transform: rotateY(180deg); background-color:pink; color:#505050; text-align:left; boder:1px solid black; overflow:hidden;  }"+
                    "</style>";
                
                    dojo.place(out, dojo.query("#lconn_communities_catalog_widgets_ResultsDisplayWidget_0 table")[0], "before");
                }

                if( commTiles) dojo.destroy( commTiles); // destroy current tiles
                
                // create tiles
                var tiles = "";
                dojo.query("#lconn_communities_catalog_widgets_ResultsDisplayWidget_0 table tr").forEach(function(n,i){
                    img=dojo.clone(dojo.query("td.lotusFirstCell img",n)[0] );
                    commAnchor=dojo.query("td a[dojoattachpoint='placeTitleLink']",n)[0];
                    members=dojo.query("td span[dojoattachpoint='numOfMembersPlaceHolder']",n)[0];
                    updatedBy=dojo.query("td span[dojoattachpoint='personPlaceHolder']",n)[0];
                    updatedOn=dojo.query("td span[dojoattachpoint='lastUpdateNode']",n)[0];
                    typeMod=dojo.query("td span[dojoattachpoint='moderatedIconNode']",n)[0];
                    typeRest=dojo.query("td span[dojoattachpoint='restrictedIconNode']",n)[0];
                    trashed=dojo.query("td span[dojoattachpoint='trashedIconNode']",n)[0];
                    src=dojo.query("td span[dojoattachpoint='sourceTypePlaceHolder']",n)[0];
                    tags=dojo.query("td span[dojoattachpoint='tagsSection']",n)[0];
                    
                    tiles +=
						'<div class="lotusLeft cTile" onclick="location.href=\''+commAnchor.href+'\'">'+
                        	'<div class="flip-container" ontouchstart="this.classList.toggle(\'hover\');">'+
								'<div class="flipper">'+
									'<div id="cardFront" class="front">'+
            		        		    '<div class="cTileImg">'+img.outerHTML+'</div>'+
                    		    	'</div>'+
									'<div id="cardBack" class="back">'+
			                        	'<div class="cTileTextContainter">'+
 					                       	'<div class="cTileTitle">'+ commAnchor.outerHTML +'</div>'+
    			    		                '<div class="cTileSmallTextDiv">'+members.outerHTML+'</div>'+
        			        		        '<div class="cTileSmallTextDiv">'+updatedBy.outerHTML+' | '+updatedOn.outerHTML+'</div>'+
            			            		'<div class="cTileSmallTextDiv">'+tags.outerHTML+'</div>'+
                    				        '<div class="cTileType">'+typeRest.outerHTML+typeMod.outerHTML+'</div>'+
                        		    		'<div class="cTileTrash">'+trashed.outerHTML+'</div>'+
    		        	        	    '</div>'+
                        			'</div>'+
                        		'</div>'+
                 		    '</div>'+
                   		'</div>';
                });
                
                dojo.place( '<div id="commTiles" '+(dojo.hasClass("viewControlTiles","lotusTileOn")?'':'class="lotusHidden"')+'>'+tiles+'</div>', dojo.query("#lconn_communities_catalog_widgets_ResultsDisplayWidget_0 table")[0], "before");  
            };

            // connect sort buttons to recreate the tiles
            // dojo.query("ul li a","lconn_communities_catalog_widgets_SortWidget_0").connect("click", createCommTiles);
            // connect table content changes to recreate the tiles
            dojo.subscribe(lconn.communities.catalog.DISPLAY_RESULTS_TOPIC, function(){ createCommTiles(); });
            
            // grid vs list selector
            dojo.place('<div id="viewControl" class="lotusViewControl lotusRight">'+
              	    	   '<a id="viewControlTable" class="lotusSprite lotusView lotusDetailsOn" href="javascript:;" onclick="showTable();"><span class="lotusAltText ">Customizable</span></a>'+
                	       '<a id="viewControlTiles" class="lotusSprite lotusView lotusTileOff"  href="javascript:;" onclick="showTiles();"><span class="lotusAltText lotusBold">List</span></a>'+
                       '</div>',
                       dojo.query("#mainContentDiv div.lotusActionBar.lotusBtnContainer")[0],
                       "append");
            
            createCommTiles();
            if(dojo.cookie("commTiles") == "1") showTiles();
            
        }, "td a[dojoattachpoint='placeTitleLink']");
}
