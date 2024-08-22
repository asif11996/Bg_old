import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
  EventListStyleheet,
  Dimensions,
  // Button,
  StyleSheet,
  TouchableWithoutFeedback,
  ImageBackground,
  Alert,
  Hr,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import Ionicons from 'react-native-vector-icons/FontAwesome6';
import {EventListStyle} from '../../style/EventListStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import DashedLine from 'react-native-dashed-line';
import {
  Chip,
  Divider,
  CardActivityIndicatorComponent,
  Button,
  Card,
} from 'react-native-paper';
// import { Divider, Text } from 'react-native-paper';

import {hp, wp} from '../../style/Dimensions';
import BookingStyle from '../../style/BookingStyle';
import {MyColors} from '../../style/MyColors';
import HeaderComponent from '../../component/HeaderComponent';
import {useDispatch, useSelector} from 'react-redux';

import {
  delete_BlockDate,
  fetchBlockDate_List,
} from '../../store/action/blockDate';
import ActivityIndicatorComponent from '../../component/ActivityIndicatorComponent';
import SnackMessage from '../../component/SnackMessage';
import {Colors} from 'react-native/Libraries/NewAppScreen';
import BlockDateFormComponent from '../../component/BlockDateFormComponent';
import Icon from 'react-native-vector-icons/MaterialIcons'; // Adjust the import based on your icon library
import {white} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import SnackbarComponent from '../../component/SnackbarComponent';
import CustomModal from '../../component/CustomModel';
import DeleteModel from '../../component/DeleteModel';
import { SafeAreaView } from 'react-native-safe-area-context';
import { normalize } from 'react-native-elements';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;  // alert(itemId);

// import DeleteModel from '../../component/deleteModel';

const BlockDateList = ({props, navigation}) => {
  const dispatch = useDispatch();

  const {
    loading,

    deletesuccess,
    deleteError,

    blockDate,
    timeSlot,
  } = useSelector(state => state.blockDate);
  const [searchQuery, setSearchQuery] = useState('');
  const [snackbarVisible, setSnackbarVisible] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarError, setSnackbarError] = useState(null);
  const [visible, setVisible] = useState('');
  const [modalVisible, setModalVisible] = useState(false);

  const [selectedItem, setSelectedItem] = useState();

  const blockDateHandler = async () => {
    try {
      await dispatch(fetchBlockDate_List());
    } catch (err) {
      console.log('error is #####', err);
    }
  };
  useEffect(() => {
    if (deletesuccess) {
      setSnackbarMessage('Delete successful');
      setSnackbarVisible(true);
    } else if (deleteError !== '') {
      setSnackbarError('Error deleting');
      // setSnackbarMessage('Error deleting');
      setSnackbarVisible(true);
    }
  }, [deletesuccess, deleteError]);

  useEffect(() => {
    blockDateHandler();
    // cacheClear();
    // clearStateCache();
  }, []);
  useEffect(() => {
    return () => {
      setVisible(null);
    };
  }, []);

  // const Delete_Date = async id => {
  //   openModal();
  //   Alert.alert(
  //     'Are your sure?',
  //     'Are you sure you want to delete this date?',
  //     [
  //       {
  //         text: 'Yes',
  //         onPress: async () => {
  //           await dispatch(Delete_blockDate(id));
  //         },
  //       },
  //       {c
  //         text: 'No',
  //       },
  //     ],
  //   );
  // };

  // const Delete_blockDate = async id => {
  //   try {
  //     let formData = new FormData();
  //     formData.append('id', id);
  //     await dispatch(delete_BlockDate(id));
  //   } catch (err) {
  //     console.log('error is ##########', err);
  //   }
  // };
  const searchFilter = item => {
    const query = searchQuery.toLowerCase();
    return item.start_date.toLowerCase().includes(query);
  };

  const openModal = id => {
    setSelectedItem(id);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOkPress = async id => {
    // Handle OK button press
    try {
      let formData = new FormData();
      formData.append('id', id);
      await dispatch(delete_BlockDate(selectedItem));
    } catch (err) {
      console.log('error is ##########', err);
    }

    // await dispatch(Delete_blockDate(id));

    // console.log('OK Pressed');
    closeModal();
  };

  const handleCancelPress = () => {
    // Handle Cancel button press
    console.log('Cancel Pressed');
    closeModal();
  };

  _listEmptyComponent = () => {
    return (
      <View
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          // flex: 1,
          marginTop: hp(40),
        }}>
        <Text style={{fontWeight: 'bold', fontSize: 20}}>Empty</Text>
      </View>
    );
  };
normalize
  console.log('time slot is ...###################', timeSlot);
  // deletesuccess && openModal();

  return loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <>
      <SafeAreaView style={{flex: 1, backgroundColor: 'FBF8F8'}}>
        <ImageBackground
          resizeMode="cover"
          activeOpacity={0.2}
          source={require('./../../style/assets/img1.jpg')}
          style={{height: hp(30)}}>
          {/* Outer layer with reduced opacity for the image */}
          <View
            style={{
              flex: 1,
              backgroundColor: 'rgba(245, 0, 0, 0.5)',
              // justifyContent: 'center',
              // alignItems: 'center',
            }}>
            <HeaderComponent
              onBackPress={() => navigation.goBack() && dispatch(clearState())}
            />
            {/* Inner layer with full opacity for other components */}

            <View
              style={{
                marginTop: 0,
                // margin: 6,
                // width: wp(88),
                
                // alignItems: 'center',
                // alignSelf: 'center',

                marginHorizontal: 6,
                padding: 6,
                // backgroundColor: 'yellow',
                // justifyContent: 'space-evenly',
              }}>
              <Text style={BookingStyle.headertitle}>{'Block Dates'}</Text>
            </View>
            <TextInput
              style={{
                backgroundColor: 'white',
                borderRadius: 5,
                padding: 10,
                width: wp(95),
                height:windowHeight > 800 ? hp(5) :hp(7),

                alignSelf: 'center',
                color: '#074365',
              }}
              placeholder="Search"
              placeholderTextColor={'#074365'}
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>
        </ImageBackground>

        {/* <BlockDateFormComponent /> */}
        {/* <View
        style={{
          flexDirection: 'column',
          margin: 6,
          padding: 6,
          justifyContent: 'space-evenly',
          // alignItems: 'center',
        }}>
        <Text style={BookingStyle.headertitle}>{'Dates'}</Text>
      </View> */}
        <View style={{                top:windowHeight > 800 ? -hp(13) :-hp(8),
  flex:1}}>
          {/* <TextInput
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
        /> */}
          {/* {blockDate.length === 0 ? (
            <View
              style={{
                justifyContent: 'center',
                alignItems: 'center',
                // flex: 1,
                marginTop: hp(40),
              }}>
              <Text style={{fontWeight: 'bold', fontSize: 20}}>Empty</Text>
            </View>
          ) : ( */}
          <FlatList
            contentContainerStyle={{
              alignItems: 'center',
              // padding: 10,
            }}
            data={blockDate.filter(searchFilter)}
            ListEmptyComponent={_listEmptyComponent}
            numColumns={1}
            keyExtractor={(item, index) => index.toString()}
            renderItem={
              ({item}) => (
                //   <View style={{flex: 1}}>

                <View style={{flexDirection: 'column'}}>
                  <View>
                    <View
                      style={styles.card}
                      activeOpacity={0.7}
                      // onPress={onSelect}
                    >
                      <View
                        style={{
                          alignItems: 'center',
                          justifyContent: 'center',
                          // width: wp(95),
                          flex: 1,

                          // backgroundColor: 'red',
                        }}>
                        {/* <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                          }}> */}
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            // backgroundColor: 'red',
                            width: wp(85),
                            top: -10,
                          }}>
                          <Chip
                            type={'flat'}
                            // icon="clock"
                            onPress={() => console.log('Pressed')}
                            textStyle={{
                              color: 'black',
                              textShadowColor: 'black',
                              alignSelf:'center',

                              lineHeight:windowHeight > 800 ? normalize(17) :normalize(14),

                              fontSize:windowHeight > 800 ? normalize(13.5) :normalize(12),

                            }}
                            style={{
                              shadowColor: 'red',
                              padding:0,
                              // elevation: 4,
                              // height: 25,
                              // height: hp(4.2),
                              height:windowHeight > 800 ? hp(3.5) :hp(4.2),


                              width: wp(18),

                              paddingTop: 0,
                              paddingBottom: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: '#F1EFEF',
                              borderRadius: 50,
                              margin: 4,
                            }}>
                            {'Start'}
                          </Chip>

                          <Chip
                            type={'flat'}
                            // icon="clock"
                            onPress={() => console.log('Pressed')}
                            textStyle={{
                              color: 'black',
                              // textAlign: 'center',
                              // justifyContent: 'center',
                              // alignSelf: 'center',
                              // alignItems: 'center',

                              lineHeight:windowHeight > 800 ? normalize(17) :normalize(14),

                              fontSize:windowHeight > 800 ? normalize(13.5) :normalize(12),
                            }}
                            style={{
                              shadowColor: 'red',
                              // elevation: 4,
                              height:windowHeight > 800 ? hp(3.5) :hp(4.2),
                              width: 65,
                              paddingTop: 0,
                              paddingBottom: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: '#F1EFEF',
                              borderRadius: 50,
                              margin: 4,
                            }}>
                            {'End'}
                          </Chip>
                        </View>
                        {/* </View> */}

                        <View
                          style={{
                            flexDirection: 'row',
                            // backgroundColor: 'red',
                            // paddingTop: 5,
                            // marginTop: 300,

                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            // backgroundColor: 'red',
                            // paddingHorizontal: 30,
                            width: wp(85),
                            // marginTop: 50,
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={BookingStyle.title}>
                            {item.start_date}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              color: MyColors.primary,
                              paddingLeft: 8,
                            }}>{`\u29BF `}</Text>

                          <View
                            style={{
                              width: wp(17),
                              // paddingTop: 3,
                              alignItems: 'center',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              // backgroundColor: 'red',

                              // paddingHorizontal: wp(),
                            }}>
                            <View
                              style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                alignItems: 'center',
                                justifyContent: 'center',
                                alignSelf: 'center',
                                // backgroundColor: 'red',
                              }}>
                              <View
                                style={{
                                  flex: 1,
                                  height: 1,
                                  backgroundColor: 'black',
                                }}
                              />

                              <View
                                style={{
                                  flex: 1,
                                  height: 1,
                                  backgroundColor: 'black',
                                }}
                              />
                            </View>
                          </View>
                          <Text
                            style={{
                              fontSize: 12,
                              color: MyColors.primary,
                              // paddingRight: wp(0.5),
                            }}>{`\u29BF  `}</Text>

                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={BookingStyle.title}>
                            {item.end_date}
                          </Text>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'center',
                            // backgroundColor: 'red',
                            width: wp(80),
                          }}>
                          {JSON.parse(item?.time_slots).map((items, index) => (
                            <Text
                              style={{
                                fontSize: 10,
                                color: MyColors.shadow,
                                height:windowHeight > 800 ? hp(3) :hp(4),
                                justifyContent:'center',
                                alignItems:'center',
                                padding:0,
                                lineHeight:windowHeight > 800 ? 15 :13,


                                backgroundColor: '#F1EFEF',
                                marginHorizontal: 2,
                                padding: 5,
                                paddingHorizontal: 9,
                                borderRadius:windowHeight > 800 ? hp(2) :hp(1),

                                // borderRadius: 15,
                              }}>
                              {items}
                            </Text>
                          ))}
                          {/* <Text style={{fontSize: 10, color: MyColors.shadow}}>
                            {JSON.parse(item?.time_slots)}
                          </Text> */}
                          {/* <Chip
                type={'flat'}
                // icon="clock"
                onPress={() => console.log('Pressed')}
                textStyle={{
                  color: '#ffffff',

                  lineHeight: 14,
                  fontSize: 13,
                }}
                style={{
                  shadowColor: 'red',
                  // elevation: 4,
                  height: 25,
                  width: 65,

                  paddingTop: 0,
                  paddingBottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#F1EFEF',
                  borderRadius: 50,
                  margin: 4,
                }}>
                {'Start'}
              </Chip> */}
                          {/* <Chip
                type={'flat'}
                // icon="clock"
                onPress={() => console.log('Pressed')}
                textStyle={{
                  color: '#ffffff',

                  lineHeight: 14,
                  fontSize: 13,
                }}
                style={{
                  shadowColor: 'red',
                  // elevation: 4,
                  height: 25,
                  width: 65,
                  paddingTop: 0,
                  paddingBottom: 0,
                  justifyContent: 'center',
                  alignItems: 'center',
                  alignSelf: 'center',
                  backgroundColor: '#F1EFEF',
                  borderRadius: 50,
                  margin: 4,
                }}>
                {'End'}
              </Chip> */}
                        </View>

                        {/* <View
                          style={{
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            // backgroundColor: 'red',
                            width: wp(85),
                            top: -10,
                          }}>
                          <Chip
                            type={'flat'}
                            // icon="clock"
                            onPress={() => console.log('Pressed')}
                            textStyle={{
                              color: 'black',
                              textShadowColor: 'black',

                              lineHeight: 14,
                              fontSize: 13,
                            }}
                            style={{
                              shadowColor: 'red',
                              // elevation: 4,
                              height: 25,
                              width: 65,

                              paddingTop: 0,
                              paddingBottom: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: '#F1EFEF',
                              borderRadius: 50,
                              margin: 4,
                            }}>
                            {'Start'}
                          </Chip>

                          <Chip
                            type={'flat'}
                            // icon="clock"
                            onPress={() => console.log('Pressed')}
                            textStyle={{
                              color: 'black',
                              // textAlign: 'center',
                              // justifyContent: 'center',
                              // alignSelf: 'center',
                              // alignItems: 'center',

                              lineHeight: 14,
                              fontSize: 13,
                            }}
                            style={{
                              shadowColor: 'red',
                              // elevation: 4,
                              height: 25,
                              width: 65,
                              paddingTop: 0,
                              paddingBottom: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: '#F1EFEF',
                              borderRadius: 50,
                              margin: 4,
                            }}>
                            {'End'}
                          </Chip>
                        </View> */}
                        {/* <View style={{width: wp(80), marginTop: hp(0)}}>
                <DashedLine
                  dashLength={3}
                  dashThickness={3}
                  dashGap={3}
                  dashColor={MyColors.primary}
                  dashStyle={{borderRadius: 5}}
                />
              </View> */}

                        <View
                          style={{
                            ...styles.price,
                            alignSelf: 'flex-end',
                            // marginBottom: 5,
                            // backgroundColor: 'green',
                          }}>
                          <Chip
                            type={'flat'}
                            icon={() => (
                              <Feather
                                style={{paddingHorizontal: 5}}
                                name="edit"
                                // onPress={() =>
                                //   navigation.navigate('BlockDate_Form', {
                                //     item: item,
                                //     update: true,
                                //   })
                                // }
                                color={'#ffffff'}
                                // size={normalize(16)}
                                size={ windowHeight > 800 ? normalize(18) :normalize(16)}


                                // size={16}
                              />
                            )}
                            onPress={() =>
                              navigation.navigate('BlockDate_Form', {
                                item: item,
                                update: true,
                                timeSlot_list: timeSlot,
                              })
                            }
                            textStyle={{
                              color: '#ffffff',

                              lineHeight:windowHeight > 800 ? hp(3) :hp(2),

                              fontSize: windowHeight > 800 ? normalize(17) :normalize(12),
                               fontFamily: 'Avenir-Heavy',  
                            fontWeight:'bold'                          }}
                            style={{
                              shadowColor: 'red',
                              // elevation: 4,
                              // height: 30,
                              height:windowHeight > 800 ? hp(4) :hp(5),

                              width:windowHeight > 800 ? wp(23) :wp(25) ,
                              paddingTop: 0,
                              paddingBottom: 0,
                              justifyContent: 'center',
                              alignItems: 'center',
                              alignSelf: 'center',
                              backgroundColor: '#a4a6d5',
                              borderRadius: 50,
                              margin: 4,
                            }}>
                            {'Edit'}
                          </Chip>
                          {/* <TouchableOpacity
                  onPress={() => {}}
                  style={{padding: 0}}>
                  <Feather
                    style={{paddingHorizontal: 5}}
                    name="edit"
                    onPress={() =>
                      props.navigation.navigate('BlockDate_Form', {
                        item: item,
                        update: true,
                      })
                    }
                    color={MyColors.primary}
                    size={28}
                  />
                </TouchableOpacity> */}
                          <View>
                            {/* <TouchableOpacity
                    onPress={() => Delete_Date(item.id)}>
                    <MaterialIcons
                      style={{paddingHorizontal: 5}}
                      name="delete"
                      //   onPress={onPresses}
                      color={MyColors.secondary}
                      size={28}
                    />
                  </TouchableOpacity> */}
                            <Chip
                              type={'flat'}
                              icon={() => (
                                <MaterialIcons
                                  // style={{paddingHorizontal: 5}}
                                  name="delete"
                                  //   onPress={onPresses}
                                  color={MyColors.secondary}
                                  size={ windowHeight > 800 ? normalize(18) :normalize(16)}
                                  />
                              )}
                              onPress={() => openModal(item.id, null)}
                              textStyle={{
                                color: MyColors.secondary,
                                alignSelf: 'center',
                                lineHeight:windowHeight > 800 ? hp(3) :hp(2),

                                fontSize: windowHeight > 800 ? normalize(17) :normalize(12),
                                // lineHeight: 14,
                                // fontSize: 13,
                              }}
                              style={{
                                // elevation: 4,
                                // height: 30,
                                // width: 85,
                                height:windowHeight > 800 ? hp(4) :hp(5),

                                width:windowHeight > 800 ? wp(23) :wp(25) ,
                                padding: 0,
                                justifyContent: 'center',
                                alignItems: 'center',
                                alignSelf: 'center',
                                backgroundColor: '#fff1ef',
                                borderRadius: 50,
                                margin: 4,
                              }}>
                              {'Delete'}
                            </Chip>
                          </View>
                        </View>
                        {/* <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              <Chip
                type={'flat'}
                icon="clock"
                onPress={() => console.log('Pressed')}
                textStyle={{color: 'white'}}
                style={{
                  shadowColor: 'red',
                  elevation: 4,
                  backgroundColor: '#D5D9DB',
                  margin: 4,
                  borderRadius: 15,
                }}>
                {'9:00 AM'}
              </Chip> */}

                        {/* {item?.time_slots?.map(date => (
                <Chip
                  key={date}
                  icon="clock"
                  onPress={() => console.log('Pressed')}>
                  {date}
                </Chip>
              ))} */}
                        {/* </View> */}
                        <View>
                          <Divider style={{marginTop: 20}} />
                        </View>
                        {/* <Card> */}
                        {/* <Card.Actions>
              <Button
                textColor={'white'}
                style={{
                  width: 95,
                  height: 40,
                  paddingHorizontal: 0,
                  backgroundColor: MyColors.secondary,
                }}>
                Edit
              </Button>
              <Button
                textColor={'white'}
                style={{
                  width: 95,
                  height: 40,
                  paddingHorizontal: 0,
                  backgroundColor: MyColors.primary,
                }}>
                Delete
              </Button>
            </Card.Actions> */}
                        {/* </Card> */}
                      </View>

                      {/* <View
            style={{
              flexDirection: 'column',
              margin: 8,
              padding: 8,
              justifyContent: 'space-evenly',
              alignItems: 'flex-start',
            }}>
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={{
                  fontSize: 16,
                  fontFamily: 'Avenir-Heavy',
                  color: '#042C5C',
                  paddingRight: 10,
                }}>
                {'Start Date:'}
              </Text>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.title}>
                {item.start_date}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                // alignItems: 'center',
                // alignItems: 'baseline',
                justifyContent: 'space-between',
                width: wp(85),
                // backgroundColor: 'yellow',
              }}>
              <View
                style={{flexDirection: 'row', alignItems: 'center'}}>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={{
                    fontSize: 16,
                    fontFamily: 'Avenir-Heavy',
                    color: '#042C5C',
                    paddingRight: 10,
                  }}>
                  {'Last Date:'}
                </Text>
                <Text
                  numberOfLines={1}
                  ellipsizeMode="tail"
                  style={styles.title}>
                  {item.end_date}
                </Text>
              </View>

              <View
                style={{
                  ...styles.price,
                  alignSelf: 'flex-end',
                  // marginBottom: 5,
                  // backgroundColor: 'green',
                }}>
                <TouchableOpacity
                  onPress={() => {}}
                  style={{padding: 0}}>
                  <Feather
                    style={{paddingHorizontal: 5}}
                    name="edit"
                    onPress={() =>
                      props.navigation.navigate('BlockDate_Form', {
                        item: item,
                        update: true,
                      })
                    }
                    color={MyColors.primary}
                    size={28}
                  />
                </TouchableOpacity>
                <View>
                  <TouchableOpacity
                    onPress={() => Delete_Date(item.id)}>
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
            </View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                // backgroundColor: 'red',
              }}>
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                style={styles.code}>
                {'Time Slots:'}
              </Text>
              <Text style={styles.code}> {item.time_slots}</Text>
            </View>
          </View> */}
                    </View>
                  </View>
                </View>
              )

              //   </View>;
            }
          />
          {/* )} */}
        </View>
        <View
          style={{
            // bottom: 0,
            position: 'absolute',
            alignSelf: 'flex-end',
            right: 20,
            bottom: 60,
          }}>
          <Text
            style={BookingStyle.addicon}
            onPress={() =>
              navigation.navigate('BlockDate_Form', {
                item: null,
                update: false,
                timeSlot_list: timeSlot,
              })
            }>
            <Ionicons name="circle-plus" size={40} />
          </Text>
        </View>
        <DeleteModel
          visible={modalVisible}
          closeModal={closeModal}
          onOkPress={() => handleOkPress()}
          onCancelPress={handleCancelPress}
          message={'message'}
          error={'msg_error'}
          cancel={null}
          heading={null}
        />
        {/* <SnackbarComponent
        visible={snackbarVisible}
        message={snackbarMessage}
        onDismiss={() => setSnackbarVisible(false)}
      /> */}
      </SafeAreaView>
      {(snackbarMessage || snackbarError) && (
        <View style={{}}>
          <SnackMessage
            success={snackbarMessage}
            visible={true}
            error={snackbarError}
            setVisibleFunction={() => setVisible('')}
          />
        </View>
      )}
    </>
  );
};

export default BlockDateList;
const styles = StyleSheet.create({
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
  },
  card: {
    // opacity: 15%, y-asix: 4, blur: 15
    flexDirection: 'row',
    paddingTop: 40,
    marginBottom: 8,
    padding: 5,
    // height: hp(25),
    height:windowHeight > 800 ? hp(20) :hp(25),

    width: wp(95),

    backgroundColor: 'yellow',
    backgroundColor: 'white',
    // alignItems: 'center',
    borderRadius: 8,
    // shadowColor: '#000',
    // shadowColor: 'black',
    // shadowOffset: {width: 0, height: 4},
    // shadowOpacity: 0.15,
    // shadowRadius: 8,
    // elevation: 4,
    // zIndex: 5,
  },
  title: {
    fontSize: 16,
    fontFamily: 'Avenir-Heavy',
    color: '#042C5C',
    alignSelf: 'center',
    fontWeight: 'bold',
  },
  code: {fontSize: 13, fontFamily: 'Avenir-Heavy', color: '#77869E'},
  price: {
    // position: 'absolute',
    flexDirection: 'row',
    // justifyContent: 'space-around',

    end: 0,
    bottom: 0,
    // padding: 10,
    margin: 8,
    justifyContent: 'center',
    alignItems: 'center',
    // fontSize: 16,
  },
});
