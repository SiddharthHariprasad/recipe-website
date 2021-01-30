// Custom Script for adding functionalities

$(document).ready(function(){
    $('.sidenav').sidenav();
});

(function (global) {
    var r = {};

    var homeHtml = "snippets/home.html";
    var cakesHtml = "snippets/cakesIndex.html";
    var cakesUrl = "json/cakes.json";
    var singleCakeHtml = "snippets/singleCake.html";
    var currysHtml = "snippets/currysIndex.html";
    var currysUrl = "json/currys.json";
    var singleCurryHtml = "snippets/singleCurry.html";

    // Convenience function for inserting innerHTML for 'select'
  	var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
  	// var showLoading = function (selector) {
	//     var html = "<div class='text-center'>";
	//     html += "<img src='images/ajax-loader.gif'></div>";
	    // insertHtml(selector, html);
    // };
      
    // Return substitute of '{{propName}}'
  	// with propValue in given 'string'
  	var insertProperty = function (string, propName, propValue) {
    	var propToReplace = "{{" + propName + "}}";
    	string = string.replace(new RegExp(propToReplace, "g"), propValue);
    	return string;
    }
      
    // On page load (before images or CSS)
	document.addEventListener("DOMContentLoaded", function (event) {

		// // On first load, show home view
		// // showLoading("#main-content");
		$ajaxUtils.sendGetRequest(
			homeHtml, 
			function (responseText) {
				document.querySelector("#main-content").innerHTML = responseText;
			},
        false);
    });
    
    // Load Cakes Index
	r.loadCakesIndex = function () {
		// showLoading("#main-content");
		$ajaxUtils.sendGetRequest(cakesUrl,buildAndShowCakesHTML);
    };

    // Builds HTML for the Cakes Index page based on the data from the server
	function buildAndShowCakesHTML(cakes) {
		// Retrive Cakes Index Snippet
		$ajaxUtils.sendGetRequest(
          cakesHtml,
          function (cakesHtml) {
            var cakesViewHtml = buildCakesViewHtml(cakes,cakesHtml);
            insertHtml("#main-content", cakesViewHtml);
          },
          false);
    }
    
    // Using cakes data and snippets html build cakes view HTML to be inserted into page
	function buildCakesViewHtml(cakes,cakesHtml) {
        var finalHTML = "";
        finalHTML += "<h2>Cakes</h2>";
        

		// Loop over cakes
		for (var i = 0; i < cakes.length; i++) {
			// insert cakes values
			var html = cakesHtml;
			var cake_id = cakes[i].cake_id;
            var cake_title = cakes[i].cake_title;
            var cake_desc = cakes[i].cake_desc;
			html = insertProperty(html,"cake_id",cake_id);
            html = insertProperty(html, "cake_title",cake_title);
            html = insertProperty(html,"cake_desc",cake_desc);
			finalHTML += html;
		}
		return finalHTML;
    }
    
    // Load Cake Recipie
	r.loadCake = function (cID) {
        // showLoading("#main-content");
        cakeID = cID;
		$ajaxUtils.sendGetRequest(cakesUrl,buildAndShowSingleCakeHTML);
    };

    // Builds HTML for the single Cake page based on the data from the server
	function buildAndShowSingleCakeHTML (cakes) {
		// Retrive Single Cake Snippet
		$ajaxUtils.sendGetRequest(
          singleCakeHtml,
          function (singleCakeHtml) {
            var singleCakeViewHtml = buildSingleCakeViewHtml(cakes,singleCakeHtml);
            insertHtml("#main-content", singleCakeViewHtml);
          },
          false);
    }
    
    // Using single cake data and snippets html build cakes view HTML to be inserted into page
	function buildSingleCakeViewHtml(cakes,singleCakeHtml) {
        var finalHTML = "";
        
		// Loop over cakes
		for (var i = 0; i < cakes.length; i++) {
            if(cakes[i].cake_id==cakeID){
                // insert cake values
                var html = singleCakeHtml;
                var cake_id = cakes[i].cake_id;
                var cake_title = cakes[i].cake_title;
                var cake_desc = cakes[i].cake_desc;
                var cake_ingredients = cakes[i].cake_ingredients;
                var cake_recipe = cakes[i].cake_recipe;
                html = insertProperty(html,"cake_id",cake_id);
                html = insertProperty(html, "cake_title",cake_title);
                html = insertProperty(html,"cake_desc",cake_desc);
                html = insertProperty(html,"cake_ingredients",cake_ingredients);
                html = insertProperty(html,"cake_recipe",cake_recipe);
                finalHTML += html;
            }
		}
		return finalHTML;
    }
    
    // Load Currys Index
	r.loadCurrysIndex = function () {
		// showLoading("#main-content");
		$ajaxUtils.sendGetRequest(currysUrl,buildAndShowCurrysHTML);
    };

    // Builds HTML for the Currys Index page based on the data from the server
	function buildAndShowCurrysHTML(currys) {
		// Retrive Currys Index Snippet
		$ajaxUtils.sendGetRequest(
          currysHtml,
          function (currysHtml) {
            var currysViewHtml = buildCurrysViewHtml(currys,currysHtml);
            insertHtml("#main-content", currysViewHtml);
          },
          false);
    }
    
    // Using currys data and snippets html build currys view HTML to be inserted into page
	function buildCurrysViewHtml(currys,currysHtml) {
        var finalHTML = "";
        finalHTML += "<h2>Currys</h2>";
        

		// Loop over currys
		for (var i = 0; i < currys.length; i++) {
			// insert currys values
			var html = currysHtml;
			var curry_id = currys[i].curry_id;
            var curry_title = currys[i].curry_title;
            var curry_desc = currys[i].curry_desc;
			html = insertProperty(html,"curry_id",curry_id);
            html = insertProperty(html, "curry_title",curry_title);
            html = insertProperty(html,"curry_desc",curry_desc);
			finalHTML += html;
		}
		return finalHTML;
    }
    
    // Load curry Recipie
	r.loadcurry = function (cID) {
        // showLoading("#main-content");
        curryID = cID;
		$ajaxUtils.sendGetRequest(currysUrl,buildAndShowSingleCurryHTML);
    };

    // Builds HTML for the single Curry page based on the data from the server
	function buildAndShowSingleCurryHTML (currys) {
		// Retrive Articles Index Snippet
		$ajaxUtils.sendGetRequest(
          singleCurryHtml,
          function (singleCurryHtml) {
            var singleCurryViewHtml = buildSingleCurryViewHtml(currys,singleCurryHtml);
            insertHtml("#main-content", singleCurryViewHtml);
          },
          false);
    }
    
    // Using single Curry data and snippets html build Currys view HTML to be inserted into page
	function buildSingleCurryViewHtml(currys,singleCurryHtml) {
        var finalHTML = "";
        
		// Loop over Currys
		for (var i = 0; i < currys.length; i++) {
            if(currys[i].curry_id==curryID){
                // insert curry values
                var html = singlecurryHtml;
                var curry_id = currys[i].curry_id;
                var curry_title = currys[i].curry_title;
                var curry_desc = currys[i].curry_desc;
                var curry_ingredients = currys[i].curry_ingredients;
                var curry_recipe = currys[i].curry_recipe;
                html = insertProperty(html,"curry_id",curry_id);
                html = insertProperty(html, "curry_title",curry_title);
                html = insertProperty(html,"curry_desc",curry_desc);
                html = insertProperty(html,"curry_ingredients",curry_ingredients);
                html = insertProperty(html,"curry_recipe",curry_recipe);
                finalHTML += html;
            }
		}
		return finalHTML;
	}
    
    global.$r = r;


})(window);