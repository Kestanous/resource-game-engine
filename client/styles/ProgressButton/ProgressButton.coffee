###*
# progressButton.js v1.0.0
# http://www.codrops.com
#
# Licensed under the MIT license.
# http://www.opensource.org/licenses/mit-license.php
# 
# Copyright 2013, Codrops
# http://www.codrops.com
###

# https://gist.github.com/edankwan/4389601
Modernizr.addTest 'csstransformspreserve3d', ->
  prop = Modernizr.prefixed('transformStyle')
  val = 'preserve-3d'
  computedStyle = undefined
  if !prop
    return false
  prop = prop.replace(/([A-Z])/g, (str, m1) ->
    '-' + m1.toLowerCase()
  ).replace(/^ms-/, '-ms-')
  Modernizr.testStyles '#modernizr{' + prop + ':' + val + ';}', (el, rule) ->
    computedStyle = if window.getComputedStyle then getComputedStyle(el, null).getPropertyValue(prop) else ''
    return
  computedStyle == val

# support
support = 
  transitions: Modernizr.csstransitions
  transforms3d: Modernizr.csstransforms3d and Modernizr.csstransformspreserve3d
transEndEventNames = 
  'WebkitTransition': 'webkitTransitionEnd'
  'MozTransition': 'transitionend'
  'OTransition': 'oTransitionEnd'
  'msTransition': 'MSTransitionEnd'
  'transition': 'transitionend'
transEndEventName = transEndEventNames[Modernizr.prefixed('transition')]

class @ProgressButton 
  constructor: (el, @options) ->
    @button = el
    @options ?= statusTime: 1500
    @_validate()
    # create structure
    @_create()
    # init events
    @_initEvents()

ProgressButton::_validate = ->
  # we will consider the fill/horizontal as default
  if @button.getAttribute('data-style') == null
    @button.setAttribute 'data-style', 'fill'
  if @button.getAttribute('data-vertical') == null and @button.getAttribute('data-horizontal') == null
    @button.setAttribute 'data-horizontal', ''
  if !support.transforms3d and @button.getAttribute('data-perspective') != null
    @button.removeAttribute 'data-perspective'
    @button.setAttribute 'data-style', 'fill'
    @button.removeAttribute 'data-vertical'
    @button.setAttribute 'data-horizontal', ''
  return

ProgressButton::_create = ->
  textEl = document.createElement('span')
  textEl.className = 'content'
  textEl.innerHTML = @button.innerHTML
  progressEl = document.createElement('span')
  progressEl.className = 'progress'
  progressInnerEl = document.createElement('span')
  progressInnerEl.className = 'progress-inner'
  progressEl.appendChild progressInnerEl
  # clear content
  @button.innerHTML = ''
  if @button.getAttribute('data-perspective') != null
    progressWrapEl = document.createElement('span')
    progressWrapEl.className = 'progress-wrap'
    progressWrapEl.appendChild textEl
    progressWrapEl.appendChild progressEl
    @button.appendChild progressWrapEl
  else
    @button.appendChild textEl
    @button.appendChild progressEl
  # the element that serves as the progress bar
  @progress = progressInnerEl
  # property to change on the progress element
  if @button.getAttribute('data-horizontal') != null
    @progressProp = 'width'
  else if @button.getAttribute('data-vertical') != null
    @progressProp = 'height'
  @_enable()
  return

ProgressButton::_setProgress = (val) ->
  @progress.style[@progressProp] = 100 * val + '%'
  return

ProgressButton::_initEvents = ->
  self = this
  @button.addEventListener 'click', ->
    # disable the button
    self.button.setAttribute 'disabled', ''
    # add class state-loading to the button (applies a specific transform to the button depending which data-style is defined - defined in the stylesheets)
    classie.remove self.progress, 'notransition'
    classie.add this, 'state-loading'
    setTimeout (->
      if typeof self.options.callback == 'function'
        self.options.callback self
      else
        self._setProgress 1

        onEndTransFn = (ev) ->
          if support.transitions and ev.propertyName != self.progressProp
            return
          @removeEventListener transEndEventName, onEndTransFn
          self._stop()
          return

        if support.transitions
          self.progress.addEventListener transEndEventName, onEndTransFn
        else
          onEndTransFn.call()
      return
    ), if self.button.getAttribute('data-style') == 'fill' or self.button.getAttribute('data-style') == 'top-line' or self.button.getAttribute('data-style') == 'lateral-lines' then 0 else 200
    # TODO: change timeout to transitionend event callback
    return
  return

ProgressButton::_stop = (status) ->
  self = this
  setTimeout (->
    # fade out progress bar
    self.progress.style.opacity = 0

    onEndTransFn = (ev) ->
      if support.transitions and ev.propertyName != 'opacity'
        return
      @removeEventListener transEndEventName, onEndTransFn
      classie.add self.progress, 'notransition'
      self.progress.style[self.progressProp] = '0%'
      self.progress.style.opacity = 1
      return

    if support.transitions
      self.progress.addEventListener transEndEventName, onEndTransFn
    else
      onEndTransFn.call()
    # add class state-success to the button
    if typeof status == 'number'
      statusClass = if status >= 0 then 'state-success' else 'state-error'
      classie.add self.button, statusClass
      # after options.statusTime remove status
      setTimeout (->
        classie.remove self.button, statusClass
        self._enable()
        return
      ), self.options.statusTime
    else
      self._enable()
    # remove class state-loading from the button
    classie.remove self.button, 'state-loading'
    return
  ), 100
  return

# enable button

ProgressButton::_enable = ->
  @button.removeAttribute 'disabled'
  return


Template.ProgressButton.onRendered ->
  @data ?= {}
  @data.unitOfProgress ?= 0.01
  @data.duration ?= 200
  new ProgressButton @$('.progress-button')[0], callback: (instance) =>
    progress = 0
    unitOfProgress = 0.01
    interval = Meteor.setInterval((=>
      progress = Math.min(progress + @data.unitOfProgress, 1)
      instance._setProgress progress
      if progress == 1
        instance._stop 1
        Meteor.clearInterval interval
      return
    ), @data.duration)
   