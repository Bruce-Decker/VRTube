var currentVR;
var filename;

$(document).ready(function() {
  $.ajax({
    type: 'GET',
    url: '/vr/getVrInfo',
    dataType: 'json',
    success: function(res) {
      let hSize;
      if(iOS()) {
        hSize = "<h5>";
        $("#dtCol1").css("float","none").css("width","100%");
        $("#dtCol2").css("float","none").css("text-align","left").css("width","100%");
        $("#dtCol3").css("float","none").css("text-align","left").css("width","100%");
        $("#details").css("height","120px");
      } else {
        hSize = "<h3>";
      }
      currentVR = res;

      let ext = getExtension(res.filename);
      let scene = $("#scene");
      let assets = $("#assets");
      let asset, frame;
      if(ext == "gltf") {
        asset = $("<a-asset-item>").attr("id","sky").attr("src", res.filepath);
        frame = $("<a-gltf-model>").attr("src","#sky");
      } else {
        asset = $("<img>").attr("id","sky").attr("src", res.filepath);
        frame = $("<a-sky>").attr("src","#sky");
      }
      assets.append(asset);
      scene.append(frame);

      filename = res.filename;
      $("#dtCol1 h3").html(res.filename);
      $("#dtCol2 h3 span").html(res.likes);
      $("#dtCol3").html($(hSize).html("Uploaded by " +
        "<a href='/users?userid=" + res.owner + "'>" + res.owner + "</a> on " +
        res.timestamp.split('T')[0]));
      $("#description p").html(res.description);
      setTimeout(display_comments(), 2000)
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

      var tbl;
      if(iOS()) {
        tbl = $("#tblVRsMobile").empty();
        tbl.before("<h3>Recently Uploaded VRs</h3>");
        $("#col1").css("width","100%").css("padding-right","0px");
        $("#col2").hide();
      } else {
        tbl = $("#tblVRs").empty();
        tbl.before("<h3>Recently Uploaded VRs</h3>");
      }

      var row,tr,td,img,h5,p;
      for(var i=0; i<rows.length; i++) {
        row = rows[i];
        tr = $("<tr/>");
        td = $("<td/>");
        let ext = getExtension(row.filename);
        let src = (ext == "gltf") ? "assets/default.png" : row.filepath;
        let wth = (ext == "gltf") ? "160" : "240";
        img = $("<img/>");
        img.attr("src", src)
           .attr("alt", row.filename)
           .attr("height", "160")
           .attr("width", wth)
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

  function display_comments() {
    var $s = $('#tblComments');
    $.ajax({
      type: 'GET',
      url: '/vr/getComments',
      success: function(datas) {
        $.each(datas, function(i, data){
          console.log("username|filename: " + data.username + "|" + data.filename);
  
          if (filename == data.filename) {
            let tr = $('<tr>');
            let un = (data.username == null || data.username == undefined) ?
              "Anonymous" : "<a href='/users?userid=" + data.username + "'>" +
              data.username + "</a>";
            let td = $('<td>');
            let p1 = $('<p>').html(un + '&nbsp;&nbsp;&nbsp;' + data.time);
            let p2 = $('<p>').html(data.comment);
            td.append(p1).append(p2);
            tr.append(td);
            $s.append(tr);
          }        
        });
      },
      error: function() {
          alert('no')
      },
      async: false
    });
  }

  $("#dtCol2 h3").on("mouseenter", function() {
    $("#regThumb").css("display", "none");
    $("#sldThumb").css("display", "inline");
  });
  $("#dtCol2 h3").on("mouseleave", function() {
    $("#regThumb").css("display", "inline");
    $("#sldThumb").css("display", "none");
  });
});

// Gets the file extension
function getExtension(filename) {
  return filename.split('.').pop();
}

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

// Determine if device is iOS
function iOS() {
  console.log(navigator.userAgent);
  var iOS = /iPad|iPhone|iPod|Android/.test(navigator.userAgent) && !window.MSStream;
  return iOS;
}

























