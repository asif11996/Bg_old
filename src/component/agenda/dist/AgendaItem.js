"use strict";
exports.__esModule = true;
var react_1 = require("react");
var react_native_1 = require("react-native");
var AgendaItem = function (_a) {
    var item = _a.item;
    console.log("item isasdasdas ......", item);
    var buttonPressed = react_1.useCallback(function () {
        react_native_1.Alert.alert("Show me more");
    }, []);
    var itemPressed = react_1.useCallback(function () {
        react_native_1.Alert.alert(item.item.event_name);
    }, []);
    // if (isEmpty(item)) {
    //   return (
    //     <View style={styles.emptyItem}>
    //       <Text style={styles.emptyItemText}>No Events Planned Today</Text>
    //     </View>
    //   );
    // }
    // alert(item.hour);
    return (react_1["default"].createElement(react_native_1.TouchableOpacity, { onPress: itemPressed, style: styles.item },
        react_1["default"].createElement(react_native_1.View, null,
            react_1["default"].createElement(react_native_1.Text, { style: styles.itemHourText }, item.item.event_name),
            react_1["default"].createElement(react_native_1.Text, { style: styles.itemDurationText }, item.item.booker_name)),
        react_1["default"].createElement(react_native_1.Text, { style: styles.itemTitleText }, item.item.booking_time),
        react_1["default"].createElement(react_native_1.View, { style: styles.itemButtonContainer },
            react_1["default"].createElement(react_native_1.Button, { color: "grey", title: "Info", onPress: buttonPressed }))));
};
exports["default"] = react_1["default"].memo(AgendaItem);
var styles = react_native_1.StyleSheet.create({
    item: {
        padding: 20,
        backgroundColor: "white",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey",
        flexDirection: "row"
    },
    itemHourText: {
        color: "black"
    },
    itemDurationText: {
        color: "grey",
        fontSize: 12,
        marginTop: 4,
        marginLeft: 4
    },
    itemTitleText: {
        color: "black",
        marginLeft: 16,
        fontWeight: "bold",
        fontSize: 16
    },
    itemButtonContainer: {
        flex: 1,
        alignItems: "flex-end"
    },
    emptyItem: {
        paddingLeft: 20,
        height: 52,
        justifyContent: "center",
        borderBottomWidth: 1,
        borderBottomColor: "lightgrey"
    },
    emptyItemText: {
        color: "lightgrey",
        fontSize: 14
    }
});
