"use strict";
exports.__esModule = true;
exports.timelineEvents = exports.getDate = void 0;
var react_native_calendars_1 = require("react-native-calendars");
var EVENT_COLOR = '#e6add8';
var today = new Date();
exports.getDate = function (offset) {
    if (offset === void 0) { offset = 0; }
    return react_native_calendars_1.CalendarUtils.getCalendarDateString(new Date().setDate(today.getDate() + offset));
};
exports.timelineEvents = [
    {
        start: exports.getDate(-1) + " 09:20:00",
        end: exports.getDate(-1) + " 12:00:00",
        title: 'Merge Request to React Native Calendars',
        summary: 'Merge Timeline Calendar to React Native Calendars'
    },
    {
        start: exports.getDate() + " 01:15:00",
        end: exports.getDate() + " 02:30:00",
        title: 'Meeting A',
        summary: 'Summary for meeting A',
        color: EVENT_COLOR
    },
    {
        start: exports.getDate() + " 01:30:00",
        end: exports.getDate() + " 02:30:00",
        title: 'Meeting B',
        summary: 'Summary for meeting B',
        color: EVENT_COLOR
    },
    {
        start: exports.getDate() + " 01:45:00",
        end: exports.getDate() + " 02:45:00",
        title: 'Meeting C',
        summary: 'Summary for meeting C',
        color: EVENT_COLOR
    },
    {
        start: exports.getDate() + " 02:40:00",
        end: exports.getDate() + " 03:10:00",
        title: 'Meeting D',
        summary: 'Summary for meeting D',
        color: EVENT_COLOR
    },
    {
        start: exports.getDate() + " 02:50:00",
        end: exports.getDate() + " 03:20:00",
        title: 'Meeting E',
        summary: 'Summary for meeting E',
        color: EVENT_COLOR
    },
    {
        start: exports.getDate() + " 04:30:00",
        end: exports.getDate() + " 05:30:00",
        title: 'Meeting F',
        summary: 'Summary for meeting F',
        color: EVENT_COLOR
    },
    {
        start: exports.getDate(1) + " 00:30:00",
        end: exports.getDate(1) + " 01:30:00",
        title: 'Visit Grand Mother',
        summary: 'Visit Grand Mother and bring some fruits.',
        color: 'lightblue'
    },
    {
        start: exports.getDate(1) + " 02:30:00",
        end: exports.getDate(1) + " 03:20:00",
        title: 'Meeting with Prof. Behjet Zuhaira',
        summary: 'Meeting with Prof. Behjet at 130 in her office.',
        color: EVENT_COLOR
    },
    {
        start: exports.getDate(1) + " 04:10:00",
        end: exports.getDate(1) + " 04:40:00",
        title: 'Tea Time with Dr. Hasan',
        summary: 'Tea Time with Dr. Hasan, Talk about Project'
    },
    {
        start: exports.getDate(1) + " 01:05:00",
        end: exports.getDate(1) + " 01:35:00",
        title: 'Dr. Mariana Joseph',
        summary: '3412 Piedmont Rd NE, GA 3032'
    },
    {
        start: exports.getDate(1) + " 14:30:00",
        end: exports.getDate(1) + " 16:30:00",
        title: 'Meeting Some Friends in ARMED',
        summary: 'Arsalan, Hasnaat, Talha, Waleed, Bilal',
        color: 'pink'
    },
    {
        start: exports.getDate(2) + " 01:40:00",
        end: exports.getDate(2) + " 02:25:00",
        title: 'Meet Sir Khurram Iqbal',
        summary: 'Computer Science Dept. Comsats Islamabad',
        color: 'orange'
    },
    {
        start: exports.getDate(2) + " 04:10:00",
        end: exports.getDate(2) + " 04:40:00",
        title: 'Tea Time with Colleagues',
        summary: 'WeRplay'
    },
    {
        start: exports.getDate(2) + " 00:45:00",
        end: exports.getDate(2) + " 01:45:00",
        title: 'Lets Play Apex Legends',
        summary: 'with Boys at Work'
    },
    {
        start: exports.getDate(2) + " 11:30:00",
        end: exports.getDate(2) + " 12:30:00",
        title: 'Dr. Mariana Joseph',
        summary: '3412 Piedmont Rd NE, GA 3032'
    },
    {
        start: exports.getDate(4) + " 12:10:00",
        end: exports.getDate(4) + " 13:45:00",
        title: 'Merge Request to React Native Calendars',
        summary: 'Merge Timeline Calendar to React Native Calendars'
    }
];
