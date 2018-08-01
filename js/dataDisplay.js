var AppComponents = AppComponents || {};

$(function() {

  function setParams(str, params) {
    return str.replace(/\{([^\{\}]+)\}/g, function(tag, key) {
      return params[key] || tag;
    });
  }
  function createElement(type, params) {
    params = params || {};
    return setParams(elements[type], params);
  }

  var elements = {
    ul: '<ul id={id} class={class}></ul>',
    li: '<li>{text}</li>'
  }

  AppComponents.DataDisplay = function (container) {
    this.$container = $(container);
  }

  AppComponents.DataDisplay.prototype.update = function(feature, opts) {
    if (!feature) { return; }
    opts = opts || {};
    this.$container.html('');

    if (feature.properties) {
      this.$container.append(createElement('ul'));
      var $ul = $(this.$container.filter(':last'));

      for (var key in feature.properties) {
        var value = feature.properties[key];
        if (value) {
          $ul.append(createElement('li', {
            text: key + ': ' + value
          }));
        }
      }
      
    }

  }


});