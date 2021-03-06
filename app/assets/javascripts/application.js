// This is a manifest file that'll be compiled into application.js, which will include all the files
// listed below.
//
// Any JavaScript/Coffee file within this directory, lib/assets/javascripts, vendor/assets/javascripts,
// or vendor/assets/javascripts of plugins, if any, can be referenced here using a relative path.
//
// It's not advisable to add code directly here, but if you do, it'll appear at the bottom of the
// compiled file.
//
// Read Sprockets README (https://github.com/rails/sprockets#sprockets-directives) for details
// about supported directives.
//
//= require jquery
//= require jquery_ujs
//= require_tree .

$(function(){
  // hamburger menu action
  $(document).ready(function() {
    $(".navbar-burger").click(function() {
      $(".navbar-burger").toggleClass("is-active");
      $(".navbar-menu").toggleClass("is-active");
    });
  });

  // file input field change action
  $('#user_avatar').on('change', function(){
    var file = this.files[0];
    var mine_type = file.type;
    if(file != null && mine_type.match('image.*')) {
      $('#file_input_name').text(file.name);
      convertBase64(file).then(function (base64data) {
        base64Resize(base64data, 200, 200).then(function (resizedata) {
          updatePreviewIcon(resizedata);
        });
      });
    }
  });

  var base64Resize = function (imgB64_src, width, height) {
    return new Promise(function (resolve, reject) {
      var img_type = imgB64_src.substring(5, imgB64_src.indexOf(";"));
      var img = new Image();
      img.onload = function() {
        var canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        var ctx = canvas.getContext('2d');
        ctx.drawImage(img, 0, 0, width, height);
        return resolve(canvas.toDataURL(img_type));
      }
      img.onerror = function (error) { return reject(error) }
      img.src = imgB64_src;
    });
  }

  var convertBase64 = function (file) {
    return new Promise(function (resolve, reject) {
      var reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = function () { return resolve(reader.result) }
      reader.onerror = function (error) { return reject(error) }
    });
  }

  var updatePreviewIcon = function (base64data) {
    $('#preview_icon').empty();
    $('#preview_icon').prepend(
      '<div class="image is-128x128">' +
        '<img class="" src="' + base64data + '">' +
      '</div>'
    );
  }
});