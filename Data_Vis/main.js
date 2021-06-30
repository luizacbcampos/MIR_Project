/* global d3 */
//import debounce from 'lodash.debounce';
//import isMobile from './utils/is-mobile';
import graphic from './graphic.js';
//import footer from './footer';

import loadDatav5 from './load-data.js'


//const $body = d3.select('body');
//let previousWidth = 0;

function resize() {
  // only do resize on width changes, not height
  // (remove the conditional if you want to trigger on height change)
  const width = $body.node().offsetWidth;
  if (previousWidth !== width) {
    previousWidth = width;
    graphic.resize();
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
  // kick off graphic code
  loadDatav5().then(result => {
    graphic.init(result)
  }).catch(console.error)


  // load footer stories
  // footer.init();
}

init();