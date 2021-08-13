/* global d3 */
//import lodash.debounce
import isMobile from './utils/is-mobile.js';
import graphic from './graphic.js';
import stack from './stacked-bar-plot.js';
//import lyrics from './load-lyrics.js';
//import footer from './footer';

import loadDatav5 from './load-data.js'


const $body = d3.select('body');
let previousWidth = $body.node().offsetWidth;

function resize() {
  // only do resize on width changes, not height
  const width = $body.node().offsetWidth;
  console.log("Width: " + width);
  if (previousWidth !== width) {
    previousWidth = width;
    console.log("resizing")
    stack.resize();
    graphic.resize();
    //lyrics.resize();
  }
}

function setupStickyHeader() {
  const $header = $body.select('header');
  if ($header.classed('is-sticky')) {
    const $menu = $body.select('.header__menu');
    const $toggle = $body.select('.header__toggle');
    $toggle.on('click', () => {
      const visible = $menu.classed('is-visible');
      $menu.classed('is-visible', !visible);
      $toggle.classed('is-visible', !visible);
    });
  }
}

function init() {
  //mobile
  $body.classed('is-mobile', isMobile.any())

  console.log("Available Screen Width: " + screen.availWidth);


  //resize part
  window.addEventListener('resize', _.debounce(resize, 250));
  
  // kick off graphic code
  //loadDatav5().then(result => {
    //graphic.init(result)
  //}).catch(console.error)


  // load footer stories
  // footer.init();
}

init();
