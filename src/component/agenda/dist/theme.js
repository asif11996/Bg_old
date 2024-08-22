"use strict";
exports.__esModule = true;
exports.getTheme = exports.lightThemeColor = exports.themeColor = void 0;
var react_native_1 = require("react-native");
exports.themeColor = '#00AAAF';
exports.lightThemeColor = '#f2f7f7';
function getTheme() {
    var disabledColor = 'grey';
    return {
        // arrows
        arrowColor: 'black',
        arrowStyle: { padding: 0 },
        // knob
        expandableKnobColor: exports.themeColor,
        // month
        monthTextColor: 'black',
        textMonthFontSize: 16,
        textMonthFontFamily: 'HelveticaNeue',
        textMonthFontWeight: 'bold',
        // day names
        textSectionTitleColor: 'black',
        textDayHeaderFontSize: 12,
        textDayHeaderFontFamily: 'HelveticaNeue',
        textDayHeaderFontWeight: 'normal',
        // dates
        dayTextColor: exports.themeColor,
        todayTextColor: '#af0078',
        textDayFontSize: 18,
        textDayFontFamily: 'HelveticaNeue',
        textDayFontWeight: '500',
        textDayStyle: { marginTop: react_native_1.Platform.OS === 'android' ? 2 : 4 },
        // selected date
        selectedDayBackgroundColor: exports.themeColor,
        selectedDayTextColor: 'white',
        // disabled date
        textDisabledColor: disabledColor,
        // dot (marked date)
        dotColor: exports.themeColor,
        selectedDotColor: 'white',
        disabledDotColor: disabledColor,
        dotStyle: { marginTop: -2 }
    };
}
exports.getTheme = getTheme;
