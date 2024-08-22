"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = void 0;

var _react = _interopRequireDefault(require("react"));

var _stripeReactNative = require("@stripe/stripe-react-native");

var _reactNative = require("react-native");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var CreatePaymentIntents = function CreatePaymentIntents(_ref) {
  var BookingDetails, cardInfo, paymentKey, totalAmount, _ref2, paymentMethod, error, paymentMethodId, paymentIntentResponse, paymentIntentData, confirmPaymentIntent;

  return regeneratorRuntime.async(function CreatePaymentIntents$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          BookingDetails = _ref.BookingDetails, cardInfo = _ref.cardInfo, paymentKey = _ref.paymentKey, totalAmount = _ref.totalAmount;
          console.log("Booking details is............", // cardInfo,
          paymentKey // totalAmount
          );

          _reactNative.Keyboard.dismiss();

          _context.prev = 3;
          _context.next = 6;
          return regeneratorRuntime.awrap((0, _stripeReactNative.createPaymentMethod)(_objectSpread({
            paymentMethodType: "Card"
          }, cardInfo)));

        case 6:
          _ref2 = _context.sent;
          paymentMethod = _ref2.paymentMethod;
          error = _ref2.error;

          _reactNative.Keyboard.dismiss();

          if (!error) {
            _context.next = 12;
            break;
          }

          throw new Error("Error creating payment method");

        case 12:
          paymentMethodId = paymentMethod.id;
          _context.next = 15;
          return regeneratorRuntime.awrap(fetch("https://api.stripe.com/v1/payment_intents", {
            method: "POST",
            headers: {
              Authorization: "Bearer ".concat(paymentKey.stripeSecretKey),
              "Content-Type": "application/x-www-form-urlencoded"
            },
            body: new URLSearchParams({
              amount: totalAmount * 100,
              currency: "EUR",
              "automatic_payment_methods[enabled]": "true",
              payment_method: paymentMethodId,
              description: "Payment from Bogathon for new Users.",
              "metadata[name]": BookingDetails.first_name + " " + BookingDetails.last_name,
              "metadata[phone]": BookingDetails.phone,
              "metadata[date]": BookingDetails.booking_date,
              "metadata[time_slot]": BookingDetails.time_slot,
              "metadata[num_participants]": BookingDetails.total_participants,
              "metadata[group_name]": BookingDetails.group_name
            }).toString()
          }));

        case 15:
          paymentIntentResponse = _context.sent;

          _reactNative.Keyboard.dismiss();

          _context.next = 19;
          return regeneratorRuntime.awrap(paymentIntentResponse.json());

        case 19:
          paymentIntentData = _context.sent;
          _context.next = 22;
          return regeneratorRuntime.awrap((0, _stripeReactNative.confirmPayment)(paymentIntentData.client_secret, {
            paymentMethodType: "Card"
          }));

        case 22:
          confirmPaymentIntent = _context.sent;

          if (paymentIntentResponse.ok) {
            _context.next = 25;
            break;
          }

          throw new Error("Failed to create payment intent: ".concat(paymentIntentResponse.statusText));

        case 25:
          _reactNative.Keyboard.dismiss();

          return _context.abrupt("return", {
            paymentIntentData: paymentIntentData,
            confirmPaymentIntent: confirmPaymentIntent
          });

        case 29:
          _context.prev = 29;
          _context.t0 = _context["catch"](3);
          return _context.abrupt("return", {
            error: _context.t0
          });

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, null, null, [[3, 29]]);
};

var _default = CreatePaymentIntents;
exports["default"] = _default;