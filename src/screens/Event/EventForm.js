import {
  Text,
  View,
  EventFormStyleheet,
  ScrollView,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
} from 'react-native';

import {SelectList} from 'react-native-dropdown-select-list';

import {useState} from 'react';
import EventFormStyle from '../../style/EventFormStyle';
import InputTexts from '../../component/InputTexts';
import HeaderComponent from '../../component/HeaderComponent';
import TextHeading from '../../component/TextHeading';
import {hp, wp} from '../../style/Dimensions';
import {MyColors} from '../../style/MyColors';
import Buttons from '../../component/Buttons';

const EventForm = props => {
  const [eventName, setEventName] = useState('');
  const [unitPrice, setUnitPrice] = useState('');
  const [participant, setParticipant] = useState('');
  const [description, setDescription] = useState('');

  return (
    <SafeAreaView style={styles.container}>
      <View
        style={{
          height: 200,
          width: 200,
          backgroundColor: MyColors.primary,
          borderRadius: 100,
          position: 'absolute',
          top: 0,
          left: -80,
          top: -80,
        }}></View>

      <HeaderComponent
        // title={'Scan QR Code'}
        onBackPress={() =>
          props.navigation.navigate('HomeScreen') && dispatch(clearState())
        }
        // onMenuPress={() => navigation.navigate('DetailScreen')}
      />
      {/* {(msg || error) && (
    <View style={{marginTop: hp(3)}}>
      <SnackMessage
        success={msg}
        visible={visible}
        error={error}
        setVisibleFunction={setVisibleFunction}
      />
    </View>
  )} */}

      <ScrollView>
        <View style={{paddingHorizontal: wp(2)}}>
          <View
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              paddingVertical: hp(8),
            }}>
            <Text
              style={{
                // color: '#000000',
                color: MyColors.primary,
                fontSize: 20,
                fontWeight: '800',
                paddingBottom: hp(1),
              }}>
              Create Event
            </Text>
          </View>

          <View style={{marginTop: hp(1)}}>
            <TextHeading title={'Event Name:'} />

            <InputTexts
              placeHolders={'Event Name'}
              keyboardTypes={'default'}
              values={eventName}
              onChangeTexts={action => setEventName(action)}
              secureTextEntries={false}
              editables={true}
              IconName={'create-outline'}
              IconType={'Ionicons'}
              size={hp(3)}
            />
          </View>
          <View style={{marginTop: hp(1)}}>
            <TextHeading title={'Event Unit Price:'} />

            <InputTexts
              placeHolders={'Event unit price'}
              keyboardTypes={'default'}
              values={unitPrice}
              onChangeTexts={action => setUnitPrice(action)}
              secureTextEntries={false}
              editables={true}
              IconName={'create-outline'}
              IconType={'Ionicons'}
              size={hp(3)}
            />
          </View>
          <View style={{marginTop: hp(1)}}>
            <TextHeading title={'Minimum Participent:'} />

            <InputTexts
              placeHolders={'Minimum Participent e.g 20'}
              keyboardTypes={'default'}
              values={participant}
              onChangeTexts={action => setParticipant(action)}
              secureTextEntries={false}
              editables={true}
              IconName={'create-outline'}
              IconType={'Ionicons'}
              size={hp(3)}
            />
          </View>
          <View style={{marginTop: hp(1)}}>
            <TextHeading title={'Description:'} />

            <InputTexts
              placeHolders={'Description'}
              keyboardTypes={'default'}
              values={description}
              onChangeTexts={action => setDescription(action)}
              secureTextEntries={false}
              editables={true}
              IconName={'create-outline'}
              IconType={'Ionicons'}
              size={hp(3)}
            />
          </View>

          <View
            style={{
              marginBottom: hp(1),
              //   justifyContent: 'center',
              //   alignItems: 'center',
              marginTop: 20,
              //   marginTop:
              // Platform.OS == 'ios' ? (screenHeight < 650 ? 39 : 15) : 5,
            }}>
            <Buttons
              bg={MyColors.primary}
              heights={hp(6)}
              widths={wp(25)}
              border={wp(1.5)}
              onPresses={() => {
                s;
              }}
              title={'Create Event'}
            />
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginBottom: hp(2),
    // backgroundColor: 'red',
    // padding: 16,
    // justifyContent: 'center',
  },
  textStyle: {
    height: hp(6),
    backgroundColor: '#ffffff',
    borderRadius: 10,
    justifyContent: 'center',
    paddingHorizontal: wp(3),
  },
});

export default EventForm;
