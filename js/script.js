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
		// Retrive Articles Index Snippet
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
			// var cake_image = cakes[i].cakes_image;
            var cake_alt = cakes[i].cake_alt;
            var cake_title = cakes[i].cake_title;
            var cake_desc = cakes[i].cake_desc;
			html = insertProperty(html,"cake_id",cake_id);
			// html = insertProperty(html,"cake_image",cake_image);
            html = insertProperty(html,"cake_alt",cake_alt);
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
		// Retrive Articles Index Snippet
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
                // insert cakes values
                var html = cakesHtml;
                var cake_id = cakes[i].cake_id;
                // var cake_image = cakes[i].cakes_image;
                var cake_alt = cakes[i].cake_alt;
                var cake_title = cakes[i].cake_title;
                var cake_desc = cakes[i].cake_desc;
                var cake_ingredients = cakes[i].cake_ingredients;
                var cake_recipe = cakes[i].cake_recipe;
                html = insertProperty(html,"cake_id",cake_id);
                // html = insertProperty(html,"cake_image",cake_image);
                html = insertProperty(html,"cake_alt",cake_alt);
                html = insertProperty(html, "cake_title",cake_title);
                html = insertProperty(html,"cake_desc",cake_desc);
                html = insertProperty(html,"cake_ingredients",cake_ingredients);
                html = insertProperty(html,"cake_recipe",cake_recipe);
                finalHTML += html;
            }
		}
		return finalHTML;
	}
    
    global.$r = r;


})(window);