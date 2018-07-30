/**
 * @name TurboSidebar
 * @class TurboSidebar
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'
 * @see https://github.com/Turbo87/sidebar-v2
 */
function TurboSidebar(id, options) {
  this.options = options || {};
  this.options.position = this.options.position || 'left';

  var i, child;

  this._sidebar = document.getElementById(id);

  // Attach .sidebar-left/right class
  $(this._sidebar).addClass('sidebar-' + this.options.position);

  // Find sidebar > div.sidebar-content
  for (i = this._sidebar.children.length - 1; i >= 0; i--) {
    child = this._sidebar.children[i];
    if (child.tagName == 'DIV' && $(child).hasClass('sidebar-content')) {
      this._container = child;
    }
  }

  // Find sidebar ul.sidebar-tabs > li, sidebar .sidebar-tabs > ul > li
  this._tabitems = this._sidebar.querySelectorAll('ul.sidebar-tabs > li, .sidebar-tabs > ul > li');
  for (i = this._tabitems.length - 1; i >= 0; i--) {
    this._tabitems[i]._sidebar = this;
  }

  // Find sidebar > div.sidebar-content > div.sidebar-pane
  this._panes = [];
  this._closeButtons = [];
  for (i = this._container.children.length - 1; i >= 0; i--) {
    child = this._container.children[i];
    if (child.tagName == 'DIV' && $(child).hasClass('sidebar-pane')) {
      this._panes.push(child);

      var closeButtons = child.querySelectorAll('.sidebar-close');
      for (var j = 0, len = closeButtons.length; j < len; j++) {
        this._closeButtons.push(closeButtons[j]);
      }
    }
  }

  this.onInit()
}

/**
 * Add this sidebar to the specified map.
 *
 * @param {L.Map} map
 * @returns {Sidebar}
 */
TurboSidebar.prototype.onInit = function () {
  var i, child;

  for (i = this._tabitems.length - 1; i >= 0; i--) {
    child = this._tabitems[i];
    var sub = child.querySelector('a');
    if (sub.hasAttribute('href') && sub.getAttribute('href').slice(0,1) == '#') {
      $(child).click(function( event ) {
        event.preventDefault();
        var targetTab = $(event.target).parent();//.parent();
        targetTab = targetTab[0].hash ? $(targetTab).parent() : targetTab;
        this._onClick(targetTab);//, child
      }.bind(this));
    }
  }
      
  for (i = this._closeButtons.length - 1; i >= 0; i--) {
    child = this._closeButtons[i];
    $(child).click(function( event ) {
      this._onCloseClick();
    }.bind(this));
  }

  return this;
}


/**
 * Open sidebar (if necessary) and show the specified tab.
 *
 * @param {string} id - The id of the tab to show (without the # character)
 */
TurboSidebar.prototype.open = function(id) {
  var i, child;

  // hide old active contents and show new content
  for (i = this._panes.length - 1; i >= 0; i--) {
      child = this._panes[i];
      if (child.id == id) {
        $(child).addClass('active');
      }
      else if ($(child).hasClass('active')) {
        $(child).removeClass('active');
      }
  }

  // remove old active highlights and set new highlight
  for (i = this._tabitems.length - 1; i >= 0; i--) {
      child = this._tabitems[i];
      if (child.querySelector('a').hash == '#' + id) { 
        $(child).addClass('active');
      }
      else if ($(child).hasClass('active')) {
        $(child).removeClass('active');
      }
  }

  // TODO: dynamic content?
  //this.fire('content', { id: id });

  // open sidebar (if necessary)
  if ($(this._sidebar).hasClass('collapsed')) {
    $(this._sidebar).removeClass('collapsed');
  }

  return this;
}

/**
 * Close the sidebar (if necessary).
 */
TurboSidebar.prototype.close = function() {
  // remove old active highlights
  for (var i = this._tabitems.length - 1; i >= 0; i--) {
    var child = this._tabitems[i];
    if ($(child).hasClass('active')) {
      $(child).removeClass('active');
    }
  }

  // close sidebar
  if (!$(this._sidebar).hasClass('collapsed')) {
    $(this._sidebar).addClass('collapsed');
  }

  return this;
}

/**
 * Click event (on tab icons)
 */
TurboSidebar.prototype._onClick = function(target) {
  if ($(target).hasClass('active')) {
    this.close();
  }
  else if (!$(target).hasClass('disabled')) {
    this.open(target[0].querySelector('a').hash.slice(1));
  }
}

/**
 * Click event (on close arrows)
 */
TurboSidebar.prototype._onCloseClick = function () {
  this.close();
}

/**
 * Creates a new sidebar.
 *
 * @example
 * var sidebar = turboSidebar('sidebar');
 *
 * @param {string} id - The id of the sidebar element (without the # character)
 * @param {Object} [options] - Optional options object
 * @param {string} [options.position=left] - Position of the sidebar: 'left' or 'right'. Default: left.
 * @returns {Sidebar} A new sidebar instance
 */
turboSidebar = function (id, options) {
    return new TurboSidebar(id, options);
};
