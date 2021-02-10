// Custom Script for adding functionalities

$(document).ready(function(){
    $('.sidenav').sidenav();
});

(function (global) {
    var r = {};

    var categoryHtml = "snippets/category.html";
    var categoryUrl = "json/categories.json";
    var breakfastsHtml = "snippets/breakfastsIndex.html";
    var breakfastsUrl = "json/breakfasts.json";
    var singleBreakfastHtml = "snippets/singleBreakfast.html";
    var currysHtml = "snippets/currysIndex.html";
    var currysUrl = "json/currys.json";
    var singleCurryHtml = "snippets/singleCurry.html";
    var upperisHtml = "snippets/upperisIndex.html";
    var upperisUrl = "json/upperis.json";
    var singleUpperiHtml = "snippets/singleUpperi.html";
    var saucesHtml = "snippets/saucesIndex.html";
    var saucesUrl = "json/sauces.json";
    var singleSauceHtml = "snippets/singleSauce.html";
    var picklesHtml = "snippets/picklesIndex.html";
    var picklesUrl = "json/pickles.json";
    var singlePickleHtml = "snippets/singlePickle.html";
    var sweetsHtml = "snippets/sweetsIndex.html";
    var sweetsUrl = "json/sweets.json";
    var singleSweetHtml = "snippets/singleSweet.html";

    // Convenience function for inserting innerHTML for 'select'
  	var insertHtml = function (selector, html) {
        var targetElem = document.querySelector(selector);
        targetElem.innerHTML = html;
    };

    // Show loading icon inside element identified by 'selector'.
  	var showLoading = function (selector) {
	    var html = "<div class='container center-align'>";
	    html += "<img src='images/ajax-loader.gif'></div>";
	    insertHtml(selector, html);
    };
      
    // Return substitute of '{{propName}}'
  	// with propValue in given 'string'
  	var insertProperty = function (string, propName, propValue) {
    	var propToReplace = "{{" + propName + "}}";
    	string = string.replace(new RegExp(propToReplace, "g"), propValue);
    	return string;
    }
      
    // On page load (before images or CSS)
	document.addEventListener("DOMContentLoaded", function (event) {

		// On first load, show category view
    // Load Category Page
    showLoading("#main-content");
    $ajaxUtils.sendGetRequest(categoryUrl,buildAndShowCategoryHTML);


    // Builds HTML for the Category page based on the data from the server
	function buildAndShowCategoryHTML(categories) {
		// Retrive Category Snippet
		$ajaxUtils.sendGetRequest(
          categoryHtml,
          function (categoryHtml) {
            var categoryViewHtml = buildCategoryViewHtml(categories,categoryHtml);
            insertHtml("#main-content", categoryViewHtml);
          },
          false);
    }
    
    // Using category data and snippets html build homme view HTML to be inserted into page
	function buildCategoryViewHtml(categories,categoryHtml) {
        var finalHTML = "";
        finalHTML += "<h2>Categories</h2>";
        

		// Loop over categories
		for (var i = 0; i < categories.length; i++) {
			// insert categories values
			var html = categoryHtml;
			var category_id = categories[i].category_id;
            var category_title = categories[i].category_title;
            var category_desc = categories[i].category_desc;
			html = insertProperty(html,"category_id",category_id);
            html = insertProperty(html, "category_title",category_title);
            html = insertProperty(html,"category_desc",category_desc);
			finalHTML += html;
		}
		return finalHTML;
    }
  });

  // Load Category
  r.loadCategory = function(catID) {
    // showLoading("#main-content");
    switch (catID) {
      case '1':
        console.log("in case 1");
        $r.loadBreakfastsIndex();
        break;
      case '2':
        $r.loadCurrysIndex();
        break;
      case '3':
        $r.loadUpperisIndex();
        break;
      case '4':
        $r.loadSaucesIndex();
        break;
      case '5':
        $r.loadPicklesIndex();
        break;
      case '6':
        $r.loadSweetsIndex();
        break;
      default:
        break;
    }
  };
    
    // Load Breakfasts Index
	r.loadBreakfastsIndex = function () {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(breakfastsUrl,buildAndShowBreakfastsHTML);
    };

    // Builds HTML for the Breakfasts Index page based on the data from the server
	function buildAndShowBreakfastsHTML(breakfasts) {
		// Retrive Breakfasts Index Snippet
		$ajaxUtils.sendGetRequest(
          breakfastsHtml,
          function (breakfastsHtml) {
            var breakfastsViewHtml = buildBreakfastsViewHtml(breakfasts,breakfastsHtml);
            insertHtml("#main-content", breakfastsViewHtml);
          },
          false);
    }
    
    // Using breakfasts data and snippets html build breakfasts view HTML to be inserted into page
	function buildBreakfastsViewHtml(breakfasts,breakfastsHtml) {
        var finalHTML = "";
        finalHTML += "<h2>Breakfasts</h2>";
        

		// Loop over breakfasts
		for (var i = 0; i < breakfasts.length; i++) {
			// insert breakfasts values
			var html = breakfastsHtml;
			var breakfast_id = breakfasts[i].breakfast_id;
            var breakfast_title = breakfasts[i].breakfast_title;
            var breakfast_desc = breakfasts[i].breakfast_desc;
			html = insertProperty(html,"breakfast_id",breakfast_id);
            html = insertProperty(html, "breakfast_title",breakfast_title);
            html = insertProperty(html,"breakfast_desc",breakfast_desc);
			finalHTML += html;
		}
		return finalHTML;
    }
    
    // Load Breakfast Recipie
	r.loadBreakfast = function (bID) {
        showLoading("#main-content");
        breakfastID = bID;
		$ajaxUtils.sendGetRequest(breakfastsUrl,buildAndShowSingleBreakfastHTML);
    };

    // Builds HTML for the single Breakfast page based on the data from the server
	function buildAndShowSingleBreakfastHTML (breakfasts) {
		// Retrive Single breakfast Snippet
		$ajaxUtils.sendGetRequest(
          singleBreakfastHtml,
          function (singleBreakfastHtml) {
            var singleBreakfastViewHtml = buildSingleBreakfastViewHtml(breakfasts,singleBreakfastHtml);
            insertHtml("#main-content", singleBreakfastViewHtml);
          },
          false);
    }
    
    // Using single breakfast data and snippets html build breakfasts view HTML to be inserted into page
	function buildSingleBreakfastViewHtml(breakfasts,singleBreakfastHtml) {
        var finalHTML = "";
        
		// Loop over breakfasts
		for (var i = 0; i < breakfasts.length; i++) {
            if(breakfasts[i].breakfast_id==breakfastID){
                // insert breakfast values
                var html = singleBreakfastHtml;
                var breakfast_id = breakfasts[i].breakfast_id;
                var breakfast_title = breakfasts[i].breakfast_title;
                var breakfast_desc = breakfasts[i].breakfast_desc;
                var breakfast_ingredients = breakfasts[i].breakfast_ingredients;
                var breakfast_recipe = breakfasts[i].breakfast_recipe;
                html = insertProperty(html,"breakfast_id",breakfast_id);
                html = insertProperty(html, "breakfast_title",breakfast_title);
                html = insertProperty(html,"breakfast_desc",breakfast_desc);
                html = insertProperty(html,"breakfast_ingredients",breakfast_ingredients);
                html = insertProperty(html,"breakfast_recipe",breakfast_recipe);
                finalHTML += html;
            }
		}
		return finalHTML;
    }
    
    // Load Currys Index
	r.loadCurrysIndex = function () {
		showLoading("#main-content");
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
        showLoading("#main-content");
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
    
    // Load Upperis Index
	r.loadUpperisIndex = function () {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(upperisUrl,buildAndShowUpperisHTML);
    };

    // Builds HTML for the Upperis Index page based on the data from the server
	function buildAndShowUpperisHTML(upperis) {
		// Retrive Upperis Index Snippet
		$ajaxUtils.sendGetRequest(
          upperisHtml,
          function (upperisHtml) {
            var upperisViewHtml = buildUpperisViewHtml(upperis,upperisHtml);
            insertHtml("#main-content", upperisViewHtml);
          },
          false);
    }
    
    // Using upperis data and snippets html build upperis view HTML to be inserted into page
	function buildUpperisViewHtml(upperis,upperisHtml) {
        var finalHTML = "";
        finalHTML += "<h2>Upperis</h2>";
        

		// Loop over upperis
		for (var i = 0; i < upperis.length; i++) {
			// insert upperis values
			var html = upperisHtml;
			var upperi_id = upperis[i].upperi_id;
            var upperi_title = upperis[i].upperi_title;
            var upperi_desc = upperis[i].upperi_desc;
			html = insertProperty(html,"upperi_id",upperi_id);
            html = insertProperty(html, "upperi_title",upperi_title);
            html = insertProperty(html,"upperi_desc",upperi_desc);
			finalHTML += html;
		}
		return finalHTML;
    }
    
    // Load upperi Recipie
	r.loadUpperi = function (uID) {
        showLoading("#main-content");
        upperiID = uID;
		$ajaxUtils.sendGetRequest(upperisUrl,buildAndShowSingleUpperiHTML);
    };

    // Builds HTML for the single Upperi page based on the data from the server
	function buildAndShowSingleUpperiHTML (upperis) {
		// Retrive Articles Index Snippet
		$ajaxUtils.sendGetRequest(
          singleUpperiHtml,
          function (singleUpperiHtml) {
            var singleUpperiViewHtml = buildSingleUpperiViewHtml(upperis,singleUpperiHtml);
            insertHtml("#main-content", singleUpperiViewHtml);
          },
          false);
    }
    
    // Using single Upperi data and snippets html build Upperis view HTML to be inserted into page
	function buildSingleUpperiViewHtml(upperis,singleUpperiHtml) {
        var finalHTML = "";
        
		// Loop over Upperis
		for (var i = 0; i < upperis.length; i++) {
            if(upperis[i].upperi_id==upperiID){
                // insert upperi values
                var html = singleUpperiHtml;
                var upperi_id = upperis[i].upperi_id;
                var upperi_title = upperis[i].upperi_title;
                var upperi_desc = upperis[i].upperi_desc;
                var upperi_ingredients = upperis[i].upperi_ingredients;
                var upperi_recipe = upperis[i].upperi_recipe;
                html = insertProperty(html,"upperi_id",upperi_id);
                html = insertProperty(html, "upperi_title",upperi_title);
                html = insertProperty(html,"upperi_desc",upperi_desc);
                html = insertProperty(html,"upperi_ingredients",upperi_ingredients);
                html = insertProperty(html,"upperi_recipe",upperi_recipe);
                finalHTML += html;
            }
		}
		return finalHTML;
    }
    

   // Load Sauces Index
	r.loadSaucesIndex = function () {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(saucesUrl,buildAndShowSaucesHTML);
    };

    // Builds HTML for the Sauces Index page based on the data from the server
	function buildAndShowSaucesHTML(sauces) {
		// Retrive Sauces Index Snippet
		$ajaxUtils.sendGetRequest(
          saucesHtml,
          function (saucesHtml) {
            var saucesViewHtml = buildSaucesViewHtml(sauces,saucesHtml);
            insertHtml("#main-content", saucesViewHtml);
          },
          false);
    }
    
    // Using sauces data and snippets html build sauces view HTML to be inserted into page
	function buildSaucesViewHtml(sauces,saucesHtml) {
        var finalHTML = "";
        finalHTML += "<h2>Sauces</h2>";
        

		// Loop over sauces
		for (var i = 0; i < sauces.length; i++) {
			// insert sauces values
			var html = saucesHtml;
			var sauce_id = sauces[i].sauce_id;
            var sauce_title = sauces[i].sauce_title;
            var sauce_desc = sauces[i].sauce_desc;
			html = insertProperty(html,"sauce_id",sauce_id);
            html = insertProperty(html, "sauce_title",sauce_title);
            html = insertProperty(html,"sauce_desc",sauce_desc);
			finalHTML += html;
		}
		return finalHTML;
    }
    
    // Load Sauce Recipie
	r.loadSauce = function (saID) {
        showLoading("#main-content");
        sauceID = saID;
		$ajaxUtils.sendGetRequest(saucesUrl,buildAndShowSingleSauceHTML);
    };

    // Builds HTML for the single Sauce page based on the data from the server
	function buildAndShowSingleSauceHTML (sauces) {
		// Retrive Single sauce Snippet
		$ajaxUtils.sendGetRequest(
          singleSauceHtml,
          function (singleSauceHtml) {
            var singleSauceViewHtml = buildSingleSauceViewHtml(sauces,singleSauceHtml);
            insertHtml("#main-content", singleSauceViewHtml);
          },
          false);
    }
    
    // Using single sauce data and snippets html build sauces view HTML to be inserted into page
	function buildSingleSauceViewHtml(sauces,singleSauceHtml) {
        var finalHTML = "";
        
		// Loop over sauces
		for (var i = 0; i < sauces.length; i++) {
            if(sauces[i].sauce_id==sauceID){
                // insert sauce values
                var html = singleSauceHtml;
                var sauce_id = sauces[i].sauce_id;
                var sauce_title = sauces[i].sauce_title;
                var sauce_desc = sauces[i].sauce_desc;
                var sauce_ingredients = sauces[i].sauce_ingredients;
                var sauce_recipe = sauces[i].sauce_recipe;
                html = insertProperty(html,"sauce_id",sauce_id);
                html = insertProperty(html, "sauce_title",sauce_title);
                html = insertProperty(html,"sauce_desc",sauce_desc);
                html = insertProperty(html,"sauce_ingredients",sauce_ingredients);
                html = insertProperty(html,"sauce_recipe",sauce_recipe);
                finalHTML += html;
            }
		}
		return finalHTML;
    }


 // Load Pickles Index
 r.loadPicklesIndex = function () {
  showLoading("#main-content");
  $ajaxUtils.sendGetRequest(picklesUrl,buildAndShowPicklesHTML);
  };

  // Builds HTML for the Pickles Index page based on the data from the server
function buildAndShowPicklesHTML(pickles) {
  // Retrive Pickles Index Snippet
  $ajaxUtils.sendGetRequest(
        picklesHtml,
        function (picklesHtml) {
          var picklesViewHtml = buildPicklesViewHtml(pickles,picklesHtml);
          insertHtml("#main-content", picklesViewHtml);
        },
        false);
  }
  
  // Using pickles data and snippets html build pickles view HTML to be inserted into page
function buildPicklesViewHtml(pickles,picklesHtml) {
      var finalHTML = "";
      finalHTML += "<h2>Pickles</h2>";
      

  // Loop over pickles
  for (var i = 0; i < pickles.length; i++) {
    // insert pickles values
    var html = picklesHtml;
    var pickle_id = pickles[i].pickle_id;
          var pickle_title = pickles[i].pickle_title;
          var pickle_desc = pickles[i].pickle_desc;
    html = insertProperty(html,"pickle_id",pickle_id);
          html = insertProperty(html, "pickle_title",pickle_title);
          html = insertProperty(html,"pickle_desc",pickle_desc);
    finalHTML += html;
  }
  return finalHTML;
  }
  
  // Load Pickle Recipie
r.loadPickle = function (pID) {
      showLoading("#main-content");
      pickleID = pID;
  $ajaxUtils.sendGetRequest(picklesUrl,buildAndShowSinglePickleHTML);
  };

  // Builds HTML for the single Pickle page based on the data from the server
function buildAndShowSinglePickleHTML (pickles) {
  // Retrive Single pickle Snippet
  $ajaxUtils.sendGetRequest(
        singlePickleHtml,
        function (singlePickleHtml) {
          var singlePickleViewHtml = buildSinglePickleViewHtml(pickles,singlePickleHtml);
          insertHtml("#main-content", singlePickleViewHtml);
        },
        false);
  }
  
  // Using single pickle data and snippets html build pickles view HTML to be inserted into page
function buildSinglePickleViewHtml(pickles,singlePickleHtml) {
      var finalHTML = "";
      
  // Loop over pickles
  for (var i = 0; i < pickles.length; i++) {
          if(pickles[i].pickle_id==pickleID){
              // insert pickle values
              var html = singlePickleHtml;
              var pickle_id = pickles[i].pickle_id;
              var pickle_title = pickles[i].pickle_title;
              var pickle_desc = pickles[i].pickle_desc;
              var pickle_ingredients = pickles[i].pickle_ingredients;
              var pickle_recipe = pickles[i].pickle_recipe;
              html = insertProperty(html,"pickle_id",pickle_id);
              html = insertProperty(html, "pickle_title",pickle_title);
              html = insertProperty(html,"pickle_desc",pickle_desc);
              html = insertProperty(html,"pickle_ingredients",pickle_ingredients);
              html = insertProperty(html,"pickle_recipe",pickle_recipe);
              finalHTML += html;
          }
  }
  return finalHTML;
  }


    // Load Sweets Index
	r.loadSweetsIndex = function () {
		showLoading("#main-content");
		$ajaxUtils.sendGetRequest(sweetsUrl,buildAndShowSweetsHTML);
    };

    // Builds HTML for the Sweets Index page based on the data from the server
	function buildAndShowSweetsHTML(sweets) {
		// Retrive Sweets Index Snippet
		$ajaxUtils.sendGetRequest(
          sweetsHtml,
          function (sweetsHtml) {
            var sweetsViewHtml = buildSweetsViewHtml(sweets,sweetsHtml);
            insertHtml("#main-content", sweetsViewHtml);
          },
          false);
    }
    
    // Using sweets data and snippets html build sweets view HTML to be inserted into page
	function buildSweetsViewHtml(sweets,sweetsHtml) {
        var finalHTML = "";
        finalHTML += "<h2>Sweets</h2>";
        

		// Loop over sweets
		for (var i = 0; i < sweets.length; i++) {
			// insert sweets values
			var html = sweetsHtml;
			var sweet_id = sweets[i].sweet_id;
            var sweet_title = sweets[i].sweet_title;
            var sweet_desc = sweets[i].sweet_desc;
			html = insertProperty(html,"sweet_id",sweet_id);
            html = insertProperty(html, "sweet_title",sweet_title);
            html = insertProperty(html,"sweet_desc",sweet_desc);
			finalHTML += html;
		}
		return finalHTML;
    }
    
    // Load Sweet Recipie
	r.loadSweet = function (sID) {
        showLoading("#main-content");
        sweetID = sID;
		$ajaxUtils.sendGetRequest(sweetsUrl,buildAndShowSingleSweetHTML);
    };

    // Builds HTML for the single Sweet page based on the data from the server
	function buildAndShowSingleSweetHTML (sweets) {
		// Retrive Articles Index Snippet
		$ajaxUtils.sendGetRequest(
          singleSweetHtml,
          function (singleSweetHtml) {
            var singleSweetViewHtml = buildSingleSweetViewHtml(sweets,singleSweetHtml);
            insertHtml("#main-content", singleSweetViewHtml);
          },
          false);
    }
    
    // Using single Sweet data and snippets html build Sweets view HTML to be inserted into page
	function buildSingleSweetViewHtml(sweets,singleSweetHtml) {
        var finalHTML = "";
        
		// Loop over Sweets
		for (var i = 0; i < sweets.length; i++) {
            if(sweets[i].sweet_id==sweetID){
                // insert sweet values
                var html = singleSweetHtml;
                var sweet_id = sweets[i].sweet_id;
                var sweet_title = sweets[i].sweet_title;
                var sweet_desc = sweets[i].sweet_desc;
                var sweet_ingredients = sweets[i].sweet_ingredients;
                var sweet_recipe = sweets[i].sweet_recipe;
                html = insertProperty(html,"sweet_id",sweet_id);
                html = insertProperty(html, "sweet_title",sweet_title);
                html = insertProperty(html,"sweet_desc",sweet_desc);
                html = insertProperty(html,"sweet_ingredients",sweet_ingredients);
                html = insertProperty(html,"sweet_recipe",sweet_recipe);
                finalHTML += html;
            }
		}
		return finalHTML;
	}
    
    global.$r = r;


})(window);