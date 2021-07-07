/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./src/server/cart.js":
/*!****************************!*\
  !*** ./src/server/cart.js ***!
  \****************************/
/***/ ((module) => {

var add = function add(cart, req) {
  cart.contents.push(req.body);
  return JSON.stringify(cart, null, 4);
};

var change = function change(cart, req) {
  var find = cart.contents.find(function (el) {
    return el.id_product === +req.params.id;
  });
  find.quantity += req.body.quantity;
  return JSON.stringify(cart, null, 4);
};

var remove = function remove(cart, req) {
  var find = cart.contents.find(function (el) {
    return +el.id_product === req.body.id_product;
  });
  var cartContent = cart.contents;
  cartContent.splice(cartContent.indexOf(find), 1);
  return JSON.stringify(cart, null, 4);
};

module.exports = {
  add: add,
  change: change,
  remove: remove
};

/***/ }),

/***/ "./src/server/cartRouter.js":
/*!**********************************!*\
  !*** ./src/server/cartRouter.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var express = __webpack_require__(/*! express */ "express");

var fs = __webpack_require__(/*! fs */ "fs");

var handler = __webpack_require__(/*! ./handler */ "./src/server/handler.js");

var logHandler = __webpack_require__(/*! ./logHandler */ "./src/server/logHandler.js");

var router = express.Router();
router.get('/', function (req, res) {
  fs.readFile('dist/server/db/userCart.json', 'utf8', function (err, data) {
    if (err) {
      res.sendStatus(404, JSON.stringify({
        result: 0,
        text: err
      }));
    } else {
      res.send(data);
    }
  });
});
router.post("/:id/:name", function (req, res) {
  handler(req, res, 'add', "dist/server/db/userCart.json");
  logHandler(req, res, 'add', "dist/server/db/stats.json");
});
router.put("/:id/:name", function (req, res) {
  handler(req, res, 'change', "dist/server/db/userCart.json");
  logHandler(req, res, 'change', "dist/server/db/stats.json");
});
router["delete"]("/:id/:name", function (req, res) {
  handler(req, res, 'remove', "dist/server/db/userCart.json");
  logHandler(req, res, 'remove', "dist/server/db/stats.json");
});
module.exports = router;

/***/ }),

/***/ "./src/server/handler.js":
/*!*******************************!*\
  !*** ./src/server/handler.js ***!
  \*******************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fs = __webpack_require__(/*! fs */ "fs");

var cart = __webpack_require__(/*! ./cart */ "./src/server/cart.js");

var actions = {
  add: cart.add,
  change: cart.change,
  remove: cart.remove
};

var handler = function handler(req, res, action, file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      res.sendStatus(404, JSON.stringify({
        result: 0,
        text: err
      }));
    } else {
      var newCart = actions[action](JSON.parse(data), req);
      fs.writeFile(file, newCart, function (err) {
        if (err) {
          res.send(JSON.stringify({
            result: 0,
            text: err
          }));
        } else {
          res.send(JSON.stringify({
            result: 1,
            text: 'SUCCESS'
          }));
        }
      });
    }
  });
};

module.exports = handler;

/***/ }),

/***/ "./src/server/logHandler.js":
/*!**********************************!*\
  !*** ./src/server/logHandler.js ***!
  \**********************************/
/***/ ((module, __unused_webpack_exports, __webpack_require__) => {

var fs = __webpack_require__(/*! fs */ "fs");

var moment = __webpack_require__(/*! moment */ "moment");

var logs = {
  add: 'Added to cart',
  change: 'Changed data in cart',
  remove: 'Removed from cart'
};

var addLog = function addLog(log, cartLog) {
  log.push(cartLog);
  return JSON.stringify(log, null, 4);
};

var logHandler = function logHandler(req, res, action, file) {
  fs.readFile(file, 'utf8', function (err, data) {
    if (err) {
      res.sendStatus(404, JSON.stringify({
        result: 0,
        text: err
      }));
    } else {
      var cartLog = {
        Product_name: req.params.name,
        Action: logs[action],
        Time: "".concat(moment().format('MMMM Do YYYY, h:mm:ss a'))
      };
      var newLog = addLog(JSON.parse(data), cartLog);
      fs.writeFile(file, newLog, function (err) {
        if (err) {
          console.log('Error');
        } else {
          console.log('Success');
        }
      });
    }
  });
};

module.exports = logHandler;

/***/ }),

/***/ "express":
/*!**************************!*\
  !*** external "express" ***!
  \**************************/
/***/ ((module) => {

"use strict";
module.exports = require("express");

/***/ }),

/***/ "fs":
/*!*********************!*\
  !*** external "fs" ***!
  \*********************/
/***/ ((module) => {

"use strict";
module.exports = require("fs");

/***/ }),

/***/ "moment":
/*!*************************!*\
  !*** external "moment" ***!
  \*************************/
/***/ ((module) => {

"use strict";
module.exports = require("moment");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!******************************!*\
  !*** ./src/server/server.js ***!
  \******************************/
var express = __webpack_require__(/*! express */ "express");

var fs = __webpack_require__(/*! fs */ "fs");

var router = __webpack_require__(/*! ./cartRouter */ "./src/server/cartRouter.js");

var app = express();
app.use(express.json());
app.use('/', express["static"]('dist/public'));
app.use('/api/cart', router);
app.get('/api/products', function (req, res) {
  fs.readFile('dist/server/db/products.json', 'utf8', function (err, data) {
    if (err) {
      res.sendStatus(404, JSON.stringify({
        result: 0,
        text: err
      }));
    } else {
      res.send(data);
    }
  });
});
app.listen(3000, function () {
  return console.log('Listen on port 3000...');
});
})();

/******/ })()
;
//# sourceMappingURL=main.js.map