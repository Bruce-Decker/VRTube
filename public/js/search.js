// keep track of search results, for pagination
var page = 1;
var searchResults;
const resultsPerPage = 8;

$(document).ready(function() {
  var query = getParameterByName('q');

  $.ajax({
    type: 'POST',
    url: '/files/search',
    dataType: 'json',
    data: {
      search: query
    },
    success: function(res) {
      searchResults = res.result;
      //console.log(searchResults);
      if(searchResults.length === 0) {
        // no results
        $("#paginationControls").hide();
        $("#spanNoResults").show();
        $("#searchField").focus();
      } else {
        // setup the pagination controls
        var nextBtn = $("#nextBtn");
        if(searchResults.length <= 8) {
          nextBtn.prop("disabled", true);
        }
        var numPages = Math.ceil(searchResults.length / resultsPerPage);
        var li, a;
        for(var i=1; i<numPages; i++) {
          a = $("<a/>").addClass("page-link")
                       .attr("href", "javascript:void(0);")
                       .click(pageClickHandler(i+1))
                       .html(i+1);
          li = $("<li/>").addClass("page-item").html(a);
          nextBtn.before(li);
        }

        showResults(1);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });
});

// Show the correct results given the page number
function showResults(n) {
  if(n == "prev") {
    page--;
  } else if(n == "next") {
    page++;
  } else {
    page = n;
  }

  $("#paginationControls").children().removeClass("active").eq(page).addClass("active");
  if(page === 1) {
    $("#prevBtn").addClass("disabled");
  } else {
    $("#prevBtn").removeClass("disabled");
  }
  if(page === Math.ceil(searchResults.length / resultsPerPage)) {
    $("#nextBtn").addClass("disabled");
  } else {
    $("#nextBtn").removeClass("disabled");
  }

  var tbl = $("#vrtable").empty();
  var trimmedResults = searchResults.slice((page-1)*resultsPerPage,
    ((page-1)*resultsPerPage)+resultsPerPage);
  var row,tr,td,img;
  for(var i=0; i<trimmedResults.length; i++) {
    row = trimmedResults[i];
    if(i % 4 === 0) {
      if(i !== 0) {
        tr.appendTo(tbl);
      }
      tr = $("<tr/>");
    }
    td = $("<td/>");
    let ext = getExtension(row.filename);
    let src = (ext == "gltf") ? "assets/default.png" : row.filepath;
    let wth = (ext == "gltf") ? "200" : "300";
    img = $("<img/>");
    img.attr("src", src)
       .attr("alt", row.filename)
       .attr("height", "200")
       .attr("width", wth)
       .appendTo(td);
    $("<h4/>").html(row.filename).appendTo(td);
    $("<p/>").html("Uploaded by " + "<a href='/users?userid=" + row.owner + "'>" +
      row.owner + "</a> on " + row.timestamp.split("T")[0]).appendTo(td);
    $("<p/>").html(row.description).appendTo(td);
    td.click(vrClickHandler(row.id));
    td.appendTo(tr);
  }
  tbl.append(tr);
}

function pageClickHandler(n) {
  return function() {
    showResults(n);
  }
}

// Returns a click handler for a VR
function vrClickHandler(id) {
  return function() {
    window.location.href = "/vr?vrid=" + id;
  }
}

// Get a URL query parameter by name
function getParameterByName(name, url) {
    if (!url) url = window.location.href;
    name = name.replace(/[\[\]]/g, "\\$&");
    var regex = new RegExp("[?&]" + name + "(=([^&#]*)|&|#|$)"),
        results = regex.exec(url);
    if (!results) return null;
    if (!results[2]) return '';
    return decodeURIComponent(results[2].replace(/\+/g, " "));
}

// Gets the file extension
function getExtension(filename) {
  return filename.split('.').pop();
}

// Show the log out dialog
function showLogoutDialog() {
  $("#confirmLogout").dialog({
    resizable: false,
    height: "auto",
    width: 400,
    modal: true,
    buttons: {
      "Log Out": function() {
        $.ajax({
          type: 'GET',
          url: '/users/logout',
          success: function(res) {
            $("#confirmLogout").dialog("close");
            window.location.href = '/';
          }
        });
      },
      Cancel: function() {
        $(this).dialog("close");
      }
    }
  });
}



























