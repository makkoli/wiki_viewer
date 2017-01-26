$(document).ready(function() {
  // Begin search for new item
  $("#container").on('click', '.search', function() {
    getWikiPages();
  });
});

// Grabs the first 8 wikipedia titles and summaries using wikipedia api
// @term: term to search wikipedia for
function getWikiPages(term) {
  // Get the results from the search
  $.ajax({
    url: "https://en.wikipedia.org/w/api.php?action=opensearch&format=json&search=" + document.getElementById("query").value + "&namespace=0&limit=8&callback=?",
    dataType: 'json',
    type: 'POST',
    success: function(data) {
      console.log(data);
      var list = "";

      // Construct the results list
      for (var i = 1; i < data[1].length; i++) {
        list += '<a href="' + data[3][i] + '" target="_blank"><div class="result"><h4><u>' + data[1][i] + '</u></h4>';
        list += "<p>" + data[2][i] + "</p></div></a>";
      }

      // Update the results list
      $("#results").html(list);
    },
    error: function(jqXHR, status, error) {
      console.log("Status: " + status);
      console.log("Error: " + error);
    }
  });
}