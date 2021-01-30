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
    var ricesHtml = "snippets/ricesIndex.html";
    var ricesUrl = "json/rices.json";
    var singleRiceHtml = "snippets/singleRice.html";
    var dessertsHtml = "snippets/dessertsIndex.html";
    var dessertsUrl = "json/desserts.json";
    var singleDessertHtml = "snippets/singleDessert.html";

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
	r.loadCurry = function (cuID) {
        // showLoading("#main-content");
        curryID = cuID;
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
                var html = singleCurryHtml;
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
    
    // Load Rices Index
	r.loadRicesIndex = function () {
		// showLoading("#main-content");
		$ajaxUtils.sendGetRequest(ricesUrl,buildAndShowCurryRicesHTML);
    };

    // Builds HTML for the Rices Index page based on the data from the server
	function buildAndShowRicesHTML(rices) {
		// Retrive Rices Index Snippet
		$ajaxUtils.sendGetRequest(
          ricesHtml,
          function (ricesHtml) {
            var ricesViewHtml = buildRicesViewHtml(rices,ricesHtml);
            insertHtml("#main-content", ricesViewHtml);
          },
          false);
    }
    
    // Using rices data and snippets html build rices view HTML to be inserted into page
	function buildRicesViewHtml(rices,ricesHtml) {
        var finalHTML = "";
        finalHTML += "<h2>Rices</h2>";
        

		// Loop over rices
		for (var i = 0; i < rices.length; i++) {
			// insert rices values
			var html = ricesHtml;
			var rice_id = rices[i].rice_id;
            var rice_title = rices[i].rice_title;
            var rice_desc = rices[i].rice_desc;
			html = insertProperty(html,"rice_id",rice_id);
            html = insertProperty(html, "rice_title",rice_title);
            html = insertProperty(html,"rice_desc",rice_desc);
			finalHTML += html;
		}
		return finalHTML;
    }
    
    // Load rice Recipie
	r.loadRice = function (rID) {
        // showLoading("#main-content");
        riceID = rID;
		$ajaxUtils.sendGetRequest(ricesUrl,buildAndShowSingleRiceHTML);
    };

    // Builds HTML for the single Rice page based on the data from the server
	function buildAndShowSingleRiceHTML (rices) {
		// Retrive Articles Index Snippet
		$ajaxUtils.sendGetRequest(
          singleRiceHtml,
          function (singleRiceHtml) {
            var singleRiceViewHtml = buildSingleRiceViewHtml(rices,singleRiceHtml);
            insertHtml("#main-content", singleRiceViewHtml);
          },
          false);
    }
    
    // Using single Rice data and snippets html build Rices view HTML to be inserted into page
	function buildSingleRiceViewHtml(rices,singleRiceHtml) {
        var finalHTML = "";
        
		// Loop over Rices
		for (var i = 0; i < rices.length; i++) {
            if(rices[i].rice_id==riceID){
                // insert rice values
                var html = singleRiceHtml;
                var rice_id = rices[i].rice_id;
                var rice_title = rices[i].rice_title;
                var rice_desc = rices[i].rice_desc;
                var rice_ingredients = rices[i].rice_ingredients;
                var rice_recipe = rices[i].rice_recipe;
                html = insertProperty(html,"rice_id",rice_id);
                html = insertProperty(html, "rice_title",rice_title);
                html = insertProperty(html,"rice_desc",rice_desc);
                html = insertProperty(html,"rice_ingredients",rice_ingredients);
                html = insertProperty(html,"rice_recipe",rice_recipe);
                finalHTML += html;
            }
		}
		return finalHTML;
    }
    
    // Load Desserts Index
	r.loadDessertsIndex = function () {
		// showLoading("#main-content");
		$ajaxUtils.sendGetRequest(dessertsUrl,buildAndShowDessertsHTML);
    };

    // Builds HTML for the Dessertss Index page based on the data from the server
	function buildAndShowDessertsHTML(desserts) {
		// Retrive Desserts Index Snippet
		$ajaxUtils.sendGetRequest(
          dessertsHtml,
          function (dessertsHtml) {
            var dessertsViewHtml = buildDessertsViewHtml(desserts,dessertsHtml);
            insertHtml("#main-content", dessertsViewHtml);
          },
          false);
    }
    
    // Using desserts data and snippets html build desserts view HTML to be inserted into page
	function buildDessertsViewHtml(desserts,dessertsHtml) {
        var finalHTML = "";
        finalHTML += "<h2>Desserts</h2>";
        

		// Loop over desserts
		for (var i = 0; i < desserts.length; i++) {
			// insert desserts values
			var html = dessertsHtml;
			var dessert_id = desserts[i].dessert_id;
            var dessert_title = desserts[i].dessert_title;
            var dessert_desc = desserts[i].dessert_desc;
			html = insertProperty(html,"dessert_id",dessert_id);
            html = insertProperty(html, "dessert_title",dessert_title);
            html = insertProperty(html,"dessert_desc",dessert_desc);
			finalHTML += html;
		}
		return finalHTML;
    }
    
    // Load Dessert Recipie
	r.loadDessert = function (dID) {
        // showLoading("#main-content");
        dessertID = dID;
		$ajaxUtils.sendGetRequest(dessertsUrl,buildAndShowSingleDessertHTML);
    };

    // Builds HTML for the single Dessert page based on the data from the server
	function buildAndShowSingleDessertHTML (Desserts) {
		// Retrive Articles Index Snippet
		$ajaxUtils.sendGetRequest(
          singleDessertHtml,
          function (singleDessertHtml) {
            var singleDessertViewHtml = buildSingleDessertViewHtml(desserts,singleDessertHtml);
            insertHtml("#main-content", singleDessertViewHtml);
          },
          false);
    }
    
    // Using single Dessert data and snippets html build Desserts view HTML to be inserted into page
	function buildSingleDessertViewHtml(desserts,singleDessertHtml) {
        var finalHTML = "";
        
		// Loop over Desserts
		for (var i = 0; i < desserts.length; i++) {
            if(desserts[i].dessert_id==dessertID){
                // insert dessert values
                var html = singleDessertHtml;
                var dessert_id = desserts[i].dessert_id;
                var dessert_title = desserts[i].dessert_title;
                var dessert_desc = desserts[i].dessert_desc;
                var dessert_ingredients = desserts[i].dessert_ingredients;
                var dessert_recipe = desserts[i].dessert_recipe;
                html = insertProperty(html,"dessert_id",dessert_id);
                html = insertProperty(html, "dessert_title",dessert_title);
                html = insertProperty(html,"dessert_desc",dessert_desc);
                html = insertProperty(html,"dessert_ingredients",dessert_ingredients);
                html = insertProperty(html,"dessert_recipe",dessert_recipe);
                finalHTML += html;
            }
		}
		return finalHTML;
	}
    
    global.$r = r;


})(window);