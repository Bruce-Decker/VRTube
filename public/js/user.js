function init() {
  var username = getParameterByName('userid');
  $("#usernameInput").val(username);

  // get current user information
  $.ajax({
    type: 'GET',
    url: '/users/getUserInfo',
    data: {
      username: username
    },
    success: function(res) {
      var json = JSON.parse(res);

      if(json.loginInfo.loggedIn) {
        $("#liLogin").hide();
        $("#liLogout").show();
      } else {
        $("#liLogout").hide();
        $("#liLogin").show();
      }

      if(json.loginInfo.loggedIn && json.loginInfo.username == username) {
        console.log('good');
        console.log(json);
      } else {
        console.log('different user');
        console.log(json);
      }
    }
  });

  // setup upload
  var uploadForm = $("#fileForm");
  uploadForm.submit(function(e) {
    var formData = new FormData(this);
    e.preventDefault();
    $.ajax({
      type: 'POST',
      url: '/files/upload',
      processData: false,
      contentType: false,
      data: formData,
      error: function(err) {
        console.log("file upload error...");
      },
      success: function(res) {
        console.log("file upload success!!!")
      }
    });
  });
}

// Switch to a tab on the user profile
function openTab(evt, tabName) {
  var i, tabcontent, tablinks;
  tabcontent = document.getElementsByClassName("tabcontent");
  for (i = 0; i < tabcontent.length; i++) {
    tabcontent[i].style.display = "none";
  }
  tablinks = document.getElementsByClassName("tablinks");
  for (i = 0; i < tablinks.length; i++) {
    tablinks[i].className = tablinks[i].className.replace(" active", "");
  }
  document.getElementById(tabName).style.display = "block";
  evt.currentTarget.className += " active";
}

// Enable submit file
function enableSubmit() {
  //$("#fileButton").prop("disabled", false);
  $("#fileSubmit").prop("disabled", false);
}

// Upload the file
/*
function uploadFile() {
  var uploadForm = $("#fileForm");
  var formData = new FormData(uploadForm);
  $.ajax({
    type: 'POST',
    url: '/files/upload',
    processData: false,
    contentType: false,
    data: formData,
    error: function(err) {
      console.log("file upload error...");
    },
    success: function(res) {
      console.log("file upload success!!!")
    }
  });
}*/

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