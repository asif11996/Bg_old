"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = require("react");

var _reactRedux = require("react-redux");

var _scannerResponse = require("../store/action/scannerResponse");

function handleBarCodeScanner(scanDataState) {
  var dispatch = (0, _reactRedux.useDispatch)();
  (0, _react.useEffect)(function () {
    var handleBarCodeScanned = function handleBarCodeScanned(scanDataState) {
      var scanData, userData;
      return regeneratorRuntime.async(function handleBarCodeScanned$(_context) {
        while (1) {
          switch (_context.prev = _context.next) {
            case 0:
              scanData = scanDataState.data;

              if (!( // !isNaN(scanData) &&
              scanDataState.type === 'QR_CODE' || scanDataState.type === 'org.iso.QRCode')) {
                _context.next = 10;
                break;
              }

              console.log('scan data is >>>>>>>>>.', scanData);
              userData = new FormData();
              userData.append('public_code', scanData);
              console.log('public data is ....', scanData, userData);
              _context.next = 8;
              return regeneratorRuntime.awrap(dispatch((0, _scannerResponse.scanResponse)(scanData)));

            case 8:
              _context.next = 11;
              break;

            case 10:
              dispatch((0, _scannerResponse.waitForScanning)());

            case 11:
            case "end":
              return _context.stop();
          }
        }
      });
    };

    scanDataState && handleBarCodeScanned(scanDataState);
  }, [scanDataState]);
}

var _default = handleBarCodeScanner;
exports["default"] = _default;