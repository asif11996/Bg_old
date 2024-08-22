import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  EventListStyleheet,
  Dimensions,
  Button,
  StyleSheet,
} from 'react-native';
import Feather from 'react-native-vector-icons/Feather';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/FontAwesome6';
import {EventListStyle} from '../../style/EventListStyle';
import {hp, wp} from '../../style/Dimensions';
import BookingStyle from '../../style/BookingStyle';
import {MyColors} from '../../style/MyColors';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import HeaderComponent from '../../component/HeaderComponent';

const TimeSlot = props => {
  const [searchQuery, setSearchQuery] = useState('');
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      status: 'Active',
      title: 'Bogathaon',
      time: '9.00 AM',
      accomudation: 'Maple',
      price: '257',
      guest: '2',
      backgroundColor: 'white',
      titleColor: '#074365',
    },
    {
      id: 2,
      title: 'Bogathaon',
      time: '11.30 AM',

      accomudation: 'Oak',
      status: 'InActive',
      price: '817',
      guest: '1',
      backgroundColor: 'white',
      titleColor: '#074365',
    },
    {
      id: 3,
      title: 'Bogathaon',
      time: '02.30 PM',

      accomudation: 'Oak',
      status: 'Active',
      price: '500',
      guest: '4',

      backgroundColor: 'white',
      titleColor: '#074365',
    },

    // Add more appointments here
  ]);

  const searchFilter = item => {
    const query = searchQuery.toLowerCase();
    return item.title.toLowerCase().includes(query);
  };
  return (
    <View style={{flex: 1}}>
      <View
        style={{
          height: 210,
          width: 210,
          backgroundColor: MyColors.primary,
          borderRadius: 100,
          position: 'absolute',
          top: 0,
          left: -80,
          top: -80,
        }}></View>

      <HeaderComponent
        // title={'Scan QR Code'}
        onBackPress={() => props.navigation.goBack() && dispatch(clearState())}
        // onMenuPress={() => navigation.navigate('DetailScreen')}
      />
      {/* <View style={{}}> */}
      <View
        style={{
          flexDirection: 'column',
          margin: 6,
          padding: 6,
          justifyContent: 'space-evenly',
          // alignItems: 'center',
        }}>
        <Text style={BookingStyle.headertitle}>{'Time Slot '}</Text>
      </View>

      <TextInput
        style={{
          backgroundColor: 'white',
          // borderWidth: 1,
          borderRadius: 5,
          // borderColor:'#074365',
          // marginBottom: 10,
          padding: 10,
          // marginHorizontal: 5,
          width: wp(96),
          alignSelf: 'center',

          color: '#074365',
        }}
        placeholder="Search"
        placeholderTextColor={'#074365'}
        value={searchQuery}
        onChangeText={setSearchQuery}
      />

      <FlatList
        contentContainerStyle={{
          alignItems: 'center',
          padding: 10,
          paddingBottom: 30,
        }}
        data={appointments.filter(searchFilter)}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({item}) => (
          <View>
            <TouchableOpacity
              style={BookingStyle.card}
              activeOpacity={0.7}
              onPress={() => {}}>
              {/* <Image
                style={{width: 75, height: 75, borderRadius: 8}}
                source={require('../../Assets/product01.jpg')}
              /> */}

              <View
                style={{
                  flexDirection: 'column',
                  margin: 8,
                  padding: 8,
                  justifyContent: 'space-evenly',
                  alignItems: 'flex-start',
                }}>
                <Text style={BookingStyle.title}>{item.title}</Text>
                {/* <Text style={BookingStyle.code}>Pi# {item.price}</Text> */}
                <Text style={BookingStyle.code}> {item.time}</Text>
              </View>
              {/* <Text style={BookingStyle.price}>{item.price}</Text> */}
              <View style={styles.price}>
                <View>
                  <TouchableOpacity
                    onPressIn={() => {
                      // cardAction();
                    }}>
                    <Feather
                      style={{paddingHorizontal: 5}}
                      name="edit"
                      onPress={() => {}}
                      // onPress={() => {
                      //   navigation.navigate("IncidentReportForm", {
                      //     id: itemData.item.id,
                      //     site_id: itemData.item.site_id,
                      //     time: itemData.item.time,
                      //     description: itemData.item.description,
                      //     location_of_incident:
                      //       itemData.item.location_of_incident,
                      //     action: itemData.item.action,
                      //     result: itemData.item.result,
                      //     attachments: itemData.item.attachments,
                      //     update: true,
                      //   });
                      //   reportId(itemData.item.id);
                      // }}
                      color={MyColors.primary}
                      size={28}
                    />
                  </TouchableOpacity>
                </View>
                <View>
                  <TouchableOpacity>
                    <MaterialIcons
                      style={{paddingHorizontal: 5}}
                      name="delete"
                      //   onPress={onPresses}
                      color={MyColors.secondary}
                      size={28}
                    />
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          </View>
        )}
      />
      {/* <View style={BookingStyle.add}>
        <Text
          style={BookingStyle.addicon}
          onPress={() => props.navigation.navigate('EventView')}>
          <Ionicons name="circle-plus" size={40} />
        </Text>
      </View> */}
    </View>
  );
};
const styles = StyleSheet.create({
  price: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    end: 0,
    bottom: 0,
    padding: 10,
    margin: 8,
    // fontSize: 16,
  },
});
export default TimeSlot;
