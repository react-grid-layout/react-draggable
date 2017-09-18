import {findInArray, isFunction, int} from './shims'
import {getPrefix, browserPrefixToStyle} from './getPrefix'

let matchesSelectorFunc = ''
export function matchesSelector(el: Node, selector: string) {
  if (!matchesSelectorFunc) {
    matchesSelectorFunc = findInArray([
      'matches',
      'webkitMatchesSelector',
      'mozMatchesSelector',
      'msMatchesSelector',
      'oMatchesSelector'
    ], function(method){
      return isFunction(el[method])
    })
  }

  return el[matchesSelectorFunc].call(el, selector)
}

// Works up the tree to the draggable itself attempting to match selector.
export function matchesSelectorAndParentsTo(el: Node, selector: string, baseNode: Node) {
  let node = el
  do {
    if (matchesSelector(node, selector)) {return true}
    if (node === baseNode) {return false}
    node = node.parentNode
  } while (node)

  return false
}

export function addEvent(el: ?Node, event: string, handler: Function): void {
  if (!el) { return }
  if (el.attachEvent) {
    el.attachEvent('on' + event, handler)
  } else if (el.addEventListener) {
    el.addEventListener(event, handler, true)
  } else {
    el['on' + event] = handler
  }
}

export function removeEvent(el: ?Node, event: string, handler: Function): void {
  if (!el) { return }
  if (el.detachEvent) {
    el.detachEvent('on' + event, handler)
  } else if (el.removeEventListener) {
    el.removeEventListener(event, handler, true)
  } else {
    el['on' + event] = null
  }
}

export function outerHeight(node: HTMLElement) {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetTop which is including margin. See getBoundPosition
  let height = node.clientHeight
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node)
  height += int(computedStyle.borderTopWidth)
  height += int(computedStyle.borderBottomWidth)
  return height
}

export function outerWidth(node: HTMLElement) {
  // This is deliberately excluding margin for our calculations, since we are using
  // offsetLeft which is including margin. See getBoundPosition
  let width = node.clientWidth
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node)
  width += int(computedStyle.borderLeftWidth)
  width += int(computedStyle.borderRightWidth)
  return width
}
export function innerHeight(node: HTMLElement) {
  let height = node.clientHeight
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node)
  height -= int(computedStyle.paddingTop)
  height -= int(computedStyle.paddingBottom)
  return height
}

export function innerWidth(node: HTMLElement) {
  let width = node.clientWidth
  const computedStyle = node.ownerDocument.defaultView.getComputedStyle(node)
  width -= int(computedStyle.paddingLeft)
  width -= int(computedStyle.paddingRight)
  return width
}

// Get from offsetParent
export function offsetXYFromParent(evt, offsetParent){
  const isBody = offsetParent === offsetParent.ownerDocument.body
  const offsetParentRect = isBody ? {left: 0, top: 0} : offsetParent.getBoundingClientRect()

  const x = evt.clientX + offsetParent.scrollLeft - offsetParentRect.left
  const y = evt.clientY + offsetParent.scrollTop - offsetParentRect.top

  return {x, y}
}

export function createCSSTransform({x, y}) {
  // Replace unitless items with px
    return {left: x, top: y}
}

export function createSVGTransform({x, y}){
  return 'translate(' + x + ',' + y + ')'
}

export function getTouch(e, identifier) {
  return (e.targetTouches && findInArray(e.targetTouches, t => identifier === t.identifier)) ||
         (e.changedTouches && findInArray(e.changedTouches, t => identifier === t.identifier))
}

export function getTouchIdentifier(e) {
  if (e.targetTouches && e.targetTouches[0]) {return e.targetTouches[0].identifier}
  if (e.changedTouches && e.changedTouches[0]) {return e.changedTouches[0].identifier}
}

// User-select Hacks:
//
// Useful for preventing blue highlights all over everything when dragging.
const userSelectPrefix = getPrefix('user-select')
const userSelect = browserPrefixToStyle('user-select', userSelectPrefix)
const userSelectStyle = `;${userSelect}: none;`
const userSelectReplaceRegExp = new RegExp(`;?${userSelect}: none;`) // leading ; not present on IE

// Note we're passing `document` b/c we could be iframed
export function addUserSelectStyles(body: HTMLElement) {
  const style = body.getAttribute('style') || ''
  if (userSelectReplaceRegExp.test(style)) {return} // don't add twice
  body.setAttribute('style', style + userSelectStyle)
}

export function removeUserSelectStyles(body: HTMLElement) {
  const style = body.getAttribute('style') || ''
  body.setAttribute('style', style.replace(userSelectReplaceRegExp, ''))
}

export function styleHacks(childStyle = {}) {
  // Workaround IE pointer events; see #51
  // https://github.com/mzabriskie/react-draggable/issues/51#issuecomment-103488278
  return {
    touchAction: 'none',
    ...childStyle
  }
}
