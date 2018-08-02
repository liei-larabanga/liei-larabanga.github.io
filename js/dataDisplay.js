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

  var elementDefinition = {
    title: {
      type: 'h4',
      class: 'row bold darkGrey'// data-title'
    },
    subtitle: {
      type: 'h6',
      class: 'row italic bold lightGrey uppercase'
    }
  };

  AppComponents.DataDisplay = function (container, map) {
    this.$container = $(container);
    this._map = map;

    setTimeout(function(){
      
      var spritePath = map.getStyle().sprite;
      var spriteJsonUrl = spritePath + '@2x.json';
      this._spriteImgUrl = spritePath + '@2x.png';
      loadJSON(spriteJsonUrl).done(function(spriteJson) {
        this._spriteJson = spriteJson;
      }.bind(this));

    }.bind(this),1000);

  }

  AppComponents.DataDisplay.prototype.update = function(feature, opts) {
    if (!feature) { return; }
    opts = opts || {};
    opts.contents = opts.contents || ['title', 'subtitle'];
    opts.appendList = opts.appendList || true;
    opts.hide = opts.hide || [];
    this.$container.html('');
    var cat, key, value, index;
    
    if (feature.properties) {
      var keys = Object.keys(feature.properties);
      var featureClass = feature.properties.class;
      
      this.$container.append(createElement('div', {
        id: 'data-header-row',
        class: 'row align-items-center'
      }, true));
      var $dataHeaderRow = $(this.$container.find('#data-header-row'));


      if (featureClass) {
        $dataHeaderRow.append(createElement('div', {
          id: 'data-icon-container',
          class: 'col-md-auto'
        }, true));
        var $iconContainer = $(this.$container.find('#data-icon-container'));

        var iconId = setParams(feature.layer.layout['icon-image'], {
          class: featureClass
        })
        var iconParams = this._spriteJson[iconId];
        
        $iconContainer.append(createElement('span', {
          id: 'data-icon',
          class: 'sprite'
        }, true));
        
        var $icon = $(this.$container.children().find('#data-icon'));
        $icon.css('background-image', 'url('+ this._spriteImgUrl +')');
        $icon.css('background-position', '-'+ iconParams.x +'px -'+ iconParams.y +'px');
        $icon.css('width', iconParams.width);
        $icon.css('height', iconParams.height);
      }


      $dataHeaderRow.append(createElement('div', {
        id: 'data-title-container',
        class: 'col'
      }, true));
      var $dataTitleContainer = $(this.$container.find('#data-title-container'));

      for (var i = 0; i < opts.contents.length; i++) {
        cat = opts.contents[i];
        if (opts[cat]) {
          key = opts[cat];
          value = feature.properties[key];
          
          if (value) {            
            var elementType = elementDefinition[cat].type;
            var elementClass = elementDefinition[cat].class;
            
            $dataTitleContainer.append(createElement(elementType, {
              class: elementClass,
              content: value
            }, true));
            
            index = keys.indexOf(key);
            keys.splice(index, 1);
          }
        }
      }


      if (opts.appendList) {

        this.$container.append(createElement('div', {
          id: 'data-list-row',
          class: 'row'
        }, true));
        var $dataListRow = $(this.$container.find('#data-list-row'));

        $dataListRow.append(createElement('div', {
          class: 'col-md-12 darkGrey',
          content: createElement('ul', {
            id: 'data-property-list'
          }, true)
        }, true));

        var $ul = $(this.$container.find('#data-property-list'));
        
        for (var i = 0; i < keys.length; i++) {
          key = keys[i];
          if (opts.hide.indexOf(key) == -1) {
            value = feature.properties[key];
            if (value) {
              var keySpan = createElement('span', {
                class: 'data-list-key',
                content: key
              }, true);
              var valueSpan = createElement('span', {
                class: 'data-list-value',
                content: value
              }, true);
              $ul.append(createElement('li', {
                content: keySpan + valueSpan
              }, true));
            }
          }
        }
        
      }
    }

  }


});