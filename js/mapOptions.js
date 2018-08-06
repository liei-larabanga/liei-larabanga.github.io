var AppComponents = AppComponents || {};

$(function() {

  function setParams(str, params, clean) {
    return str.replace(/\{([^\{\}]+)\}/g, function(tag, key) {
      return params[key] || (clean ? '' : tag);
    });
  }
  function createElement(type, params, clean) {
    params = params || {};
    return setParams(elements[type], params, clean);
  }
  function capInitial(string) {
    return string.charAt(0).toUpperCase() + string.slice(1).toLowerCase();
  }

  var elements = {
    //img: '<img src="{src}" alt="" class="{class}" "/>',
    img:  '<img class="{class}" height="{height}" width="{width} src="{src}" alt="" >',
    div:  '<div id="{id}" class="{class}">{content}</div>',
    span: '<span id="{id}" class="{class}">{content}</span>',
    ul:   '<ul id="{id}" class="{class}"></ul>',
    li:   '<li>{content}</li>',
    h1:   '<h1 class="{class}">{content}</h1>',
    h2:   '<h2 class="{class}">{content}</h2>',
    h3:   '<h3 class="{class}">{content}</h3>',
    h4:   '<h4 class="{class}">{content}</h4>',
    h5:   '<h5 class="{class}">{content}</h5>',
    h6:   '<h6 class="{class}">{content}</h6>',
    p:    '<p class="{class}">{content}</p>'
  }

  AppComponents.MapOptions = function (container, map) {
    this.$container = $(container);
    this._map = map;
  }

  AppComponents.MapOptions.prototype.update = function(layers, opts) {
    opts = opts || {};
    opts.hide = opts.hide || [];

    var keys = [];
    for (var i=0; i<layers.length; i++) {
      keys.push([layers[i].id, i]);
    }

    this.$container.append(createElement('div', {
      id: 'layer-list-row',
      class: 'row'
    }, true));
    var $layerListRow = $(this.$container.find('#layer-list-row'));

    $layerListRow.append(createElement('div', {
      class: 'col-md-12 darkGrey',
      content: createElement('ul', {
        id: 'layer-legend-list'
      }, true)
    }, true));

    var $ul = $(this.$container.find('#layer-legend-list'));

    for (var i = 0; i < keys.length; i++) {
      var key = keys[i][0];
      var index = keys[i][1];
      if (opts.hide.indexOf(key) == -1) {
        value = key;//feature.properties[key];
        if (value && value != '' && value != 'null') {
          
          //TODO: add icons
          var iconImageSrc = iconIndex[layers[index].layout['icon-image']].src;
          
          
          
          
          
          var layerIcon = createElement('img', {
            class: 'layer-list-icon',
            height: '20px',
            width: '20px',
            //src: iconImageSrc
          }, true);
          
          var keySpan = createElement('span', {
            class: 'layer-list-key',
            content: capInitial(Dictionary[key] || key)
          }, true);
          
          /*var valueSpan = createElement('span', {
            class: 'layer-list-value',
            content: capInitial(Dictionary[value] || value)
          }, true);*/
          $ul.append(createElement('li', {
            content: layerIcon + '   ' + keySpan// + valueSpan
          }, true));
        }
      }
    }
  }


});