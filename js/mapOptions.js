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
    li:   '<li class="{class}" name="{name}">{content}</li>',
    h1:   '<h1 class="{class}">{content}</h1>',
    h2:   '<h2 class="{class}">{content}</h2>',
    h3:   '<h3 class="{class}">{content}</h3>',
    h4:   '<h4 class="{class}">{content}</h4>',
    h5:   '<h5 class="{class}">{content}</h5>',
    h6:   '<h6 class="{class}">{content}</h6>',
    p:    '<p class="{class}">{content}</p>',
    fa:   '<i id="{id}" class="{class}" name="{name}"></i>'
  }

  AppComponents.MapOptions = function (container, map) {
    this.$container = $(container);
    this._map = map;
  }

  AppComponents.MapOptions.prototype.update = function(layers, opts) {
    opts = opts || {};
    opts.hide = opts.hide || [];

    var keys = {};
    for (var i=0; i<layers.length; i++) {
      //keys.push([layers[i].id, i]);
      keys[layers[i].id] = i;
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

    //for (var i = 0; i < keys.length; i++) {
    for (var key in keys) {
      //var key = keys[i][0];
      var index = keys[key];
      if (opts.hide.indexOf(key) == -1) {
        value = key;//feature.properties[key];
        if (value && value != '' && value != 'null') {
          
          var iconImageSrc = iconIndex[layers[index].layout['icon-image']].src;
          
          var layerIcon = createElement('span', {
            id: 'layer-icon-'+ key,
            class: 'layer-list-icon'
          }, true);

          var hideIcon = createElement('fa', {
            name: key,
            class: 'far fa-eye-slash layer-toggle',
          }, true);

          
          $ul.append(createElement('li', {
            //name: key,
            class: 'layer-list-item',
            content: layerIcon + capInitial(Dictionary[key] || key) + hideIcon//keySpan// + valueSpan
          }, true));

          var $icon = $(this.$container.children().find('#layer-icon-'+ key));
          $icon.css('background-image', 'url('+ iconImageSrc +')');
          $icon.css('width', '20px');
          $icon.css('height', '20px');

        }

      }
    }
    
    //$(this.$container.children().find('.layer-list-item')).click(function(e) {
    $(this.$container.children().find('.layer-toggle')).click(function(e) {
      var layer = $(e.target).attr('name');
      var index = map.geojsonLayers.indexOf(layer);

      if (index > -1) { //if layer is on the map --> hide
        map.removeLayer(layer);
        map.geojsonLayers.splice(index, 1);
        
        $(e.target)//.find('.layer-toggle')
          .removeClass('fa-eye-slash')
          .addClass('fa-eye');
      }
      else { //--> show layer
        map.addLayer(layerStyles[keys[layer]]);
        map.geojsonLayers.push(layer);
        $(e.target)//.find('.layer-toggle')
         .removeClass('fa-eye')
         .addClass('fa-eye-slash');
      }

    })

  }


});