function loadIcons(map) {
  var promise = $.Deferred();
  var remaining;
  var iconCache = {};

  for (var key in iconIndex) {
    var icon = iconIndex[key];
    
    if (!iconCache[key]) {
      remaining++;
      loadImage(icon.src).done(function(k, i) {
        return function(img) {
          remaining--;
          iconCache[k] = {
            image: img,
            size: i.size
          };

          map.addImage(k, img);

          if (!remaining) { promise.resolve(iconCache); }
        }
      }(key, icon));
    }
  }
  
  return promise;
}

function loadImage(src) {
  var promise = $.Deferred();
  var img = new Image();
  if (src === undefined) {
    promise.resolve(img); // should be reject() but listeners should not have to deal with missing images
  } else {
    img.onload = function() {
      promise.resolve(img);
    };
    img.onerror = function() {
      promise.resolve(img); // should be reject() but listeners should not have to deal with missing images
    };
    img.src = src;
  }
  return promise;
}