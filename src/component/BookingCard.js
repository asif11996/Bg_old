import {
  View,
  Text,
  TextInput,
  FlatList,
  Dimensions,
  TouchableOpacity,
  BookingListStyleheet,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

import React from 'react';
import {BookingListStyle} from '../style/BookingListStyle';

const BookingCard = ({item}) => {
  const deviceHeight = Dimensions.get('window').height;
  const deviceWidth = Dimensions.get('screen').width;
  return (
    <View>
      <TouchableOpacity
        style={styles.card}
        activeOpacity={0.7}
        onPress={() => this.detail(this.state.obj.Orders[0]._id)}>
        <View
          style={{
            flexDirection: 'column',
            margin: 8,
            padding: 8,
            justifyContent: 'space-evenly',
            alignItems: 'flex-start',
          }}>
          <Text style={styles.title}>
            {item.products[0].product.productName}
          </Text>
          <Text style={styles.code}>{item.products[0].product.material}</Text>
        </View>
        <Text style={styles.price}>${item.products[0].product.itemNO}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default BookingCard;
