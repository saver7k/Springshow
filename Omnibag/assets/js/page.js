var pages = [];
var pagesHistory = [];
$(".page").each(function(){
	pages.push({
		id:"#"+$(this).attr("id"),
		el: $(this)
	});
});


// Add an event to trigger when a page is displayed:
$("#b").on("pageShow", function(event){
  console.log("Showing Page B");
});



// This var will hold a reference to the current view
var currentView;

$(".page").detach();

// Define some transitions 
  var offLeft = {left: "-100%"};
  var onHorizontal = {left: 0};
  var offRight = {left: "100%"};
  var offDown = {top: "100%"};
  var offUp = {top: "-100%"};
  var onVertical = {top: 0};
  
  // These combinations create transitions in four directions
  // Slide right: offRight, offLeft, onHorizontal
  // Slide left: offLeft, offRight, onHorizontal
  // Slide down: offDown, offUp, onVertical
  // Slide up: offUp, offDown, onVertical

// Some helper functions to create transitions in four directions
function pushRight(newView) {
  showView(newView, offRight, offLeft, onHorizontal)
}

function pushLeft(newView) {
  showView(newView, offLeft, offRight, onHorizontal)
}

function pushDown(newView) {
  showView(newView, offDown, offUp, onVertical);
}

function pushUp(newView) {
  showView(newView, offUp, offDown, onVertical);
}

function showView(newView, exit, start, enter) {
  // Hide Current View
  if (currentView) {
    currentView.animate(exit, 400, function() {
      $(this).detach();
    });
  }
  // Show New View


  currentView = newView;
  $("#container").append(currentView);
  currentView.css(start).animate(enter, 400, function() {
    $(this).trigger("pageShow");
  });
}


function pushView(newView) {
  pagesHistory.push(newView);
  pushLeft(newView);
}


function popView() {
  if (pagesHistory.length > 1) {
    pagesHistory.pop();
    pushRight(pagesHistory[pagesHistory.length-1]);
  }
}



function findPageWithId(id) {
  for (var i in pages) {
    if (pages[i].id === id) {
      return pages[i];
    }
  }
}





$("body").on("click", ".back", function(event){
  event.preventDefault();
  popView();
});


// Set up nav links
$("body").on("click", ".nav-link", function(event){
  event.preventDefault();
  pushView(findPageWithId($(this).attr("href")).el);
});

// Show the first page

pushView(pages[0].el);