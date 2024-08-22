"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _reactNative = require("react-native");

var _react = require("react");

var _Dimensions = require("../style/Dimensions");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance"); }

function _iterableToArrayLimit(arr, i) { if (!(Symbol.iterator in Object(arr) || Object.prototype.toString.call(arr) === "[object Arguments]")) { return; } var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

var useOrientation = function useOrientation() {
  var _useState = (0, _react.useState)({
    width: _reactNative.Dimensions.get("window").width,
    height: _reactNative.Dimensions.get("window").height,
    orientation: _reactNative.Dimensions.get("window").width > _reactNative.Dimensions.get("window").height ? "landscape" : "portrait"
  }),
      _useState2 = _slicedToArray(_useState, 2),
      dimensions = _useState2[0],
      setDimensions = _useState2[1];

  (0, _react.useEffect)(function () {
    var updateOrientation = function updateOrientation() {
      var _Dimensions$get = _reactNative.Dimensions.get("window"),
          width = _Dimensions$get.width,
          height = _Dimensions$get.height;

      setDimensions({
        width: width,
        height: height,
        orientation: width > height ? "landscape" : "portrait"
      });
    };

    updateOrientation();

    _reactNative.Dimensions.addEventListener("change", updateOrientation);

    return function () {
      return function () {
        // Ensure the remove function is called on the event listener
        dimensionChangeListener.remove();
      };

      _reactNative.Dimensions.removeEventListener("change", updateOrientation);
    };
  }, []);
  return dimensions;
};

var _default = useOrientation;
exports["default"] = _default;