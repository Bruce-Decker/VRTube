var currentVR;

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: '/vr/getVrInfo',
    dataType: 'json',
    success: function(res) {
      currentVR = res;
      $("#sky").attr("src", res.filepath);
      $("#dtCol1 h3").html(res.filename);
      $("#dtCol2 h3 span").html(res.likes);
      $("#dtCol3").html($("<h3>").html("Uploaded by " +
        "<a href='/users?userid=" + res.owner + "'>" + res.owner + "</a> on " +
        res.timestamp.split('T')[0]));
      $("#description p").html(res.description);
    },
    error: function(err) {
      console.log(err);
    }
  });

  $.ajax({
    type: 'GET',
    url: '/vr/getOtherVrs',
    dataType: 'json',
    success: function(res) {
      var rows = res.arr;

      var tbl = $("#tblVRs").empty();
      var row,tr,td,img,h5,p;
      for(var i=0; i<rows.length; i++) {
        row = rows[i];
        tr = $("<tr/>");
        td = $("<td/>");
        img = $("<img/>");
        img.attr("src", row.filepath)
           .attr("alt", row.filename)
           .attr("height", "160")
           .attr("width", "240")
           .appendTo(td);
        h5 = $("<h5/>").html(row.filename + "&nbsp;&nbsp;&nbsp;" + row.likes +
          " <i class='far fa-thumbs-up'></i>").appendTo(td);
        p = $("<p/>").html("Uploaded by " +
          "<a href='/users?userid=" + row.owner + "'>" + row.owner + "</a> on " +
          row.timestamp.split('T')[0]).appendTo(td);
        td.click(vrClickHandler(row.id));
        td.appendTo(tr);
        tbl.append(tr);
      }
    },
    error: function(err) {
      console.log(err);
    }
  });

  $("#dtCol2 h3").on("mouseenter", function() {
    $("#regThumb").css("display", "none");
    $("#sldThumb").css("display", "inline");
  });
  $("#dtCol2 h3").on("mouseleave", function() {
    $("#regThumb").css("display", "inline");
    $("#sldThumb").css("display", "none");
  });
});

// Returns a click handler for a VR
function vrClickHandler(id) {
  return function() {
    window.location.href = "/vr?vrid=" + id;
  }
}

// Increases the number of likes for the featured VR
function addLike() {
  var span = $("#likeh3").children().first();
  var likes = parseInt(span.html());
  console.log(likes);
  span.html(likes+1);
  $.ajax({
    type: 'POST',
    url: '/files/like',
    dataType: 'json',
    data: {
      filename: currentVR.filename,
      owner: currentVR.owner
    },
    success: function(res) {
      ;//
    },
    error: function(err) {
      console.log(err);
    }
  });
}



























