'use strict';

function Navbar() {
  console.log('navbar directive');

  let directive = {};
  directive.restrict = 'E';
  directive.replace = true;
  directive.templateUrl = './templates/navbar.html'

  return directive;
}

module.exports = Navbar;
