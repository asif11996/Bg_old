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
  Button,
  StyleSheet,
  TouchableWithoutFeedback,
  Alert,

} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import Feather from 'react-native-vector-icons/Feather';
import {EventListStyle} from '../../style/EventListStyle';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import FontAwesome6 from 'react-native-vector-icons/FontAwesome6';
import {hp, wp} from '../../style/Dimensions';
import { normalize } from 'react-native-elements';

import BookingStyle from '../../style/BookingStyle';
import {MyColors} from '../../style/MyColors';
import HeaderComponent from '../../component/HeaderComponent';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import {Chip} from 'react-native-paper';
import {
  delete_User,
  fetchUser_List,
  updateUser_Status,
} from '../../store/action/userAction';
import {useDispatch, useSelector} from 'react-redux';
import ActivityIndicatorComponent from '../../component/ActivityIndicatorComponent';
import SnackMessage from '../../component/SnackMessage';
import CustomModal from '../../component/CustomModel';
import DeleteModel from '../../component/DeleteModel';
import { SafeAreaView } from 'react-native-safe-area-context';
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

const UserList = props => {
  const {user, userList, success, error, loading, deletesuccess, deleteError} =
    useSelector(state => state.user);
  const [visible, setVisible] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedItem, setSelectedItem] = useState();
  const [selectedStatus, setSelectedStatus] = useState();

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarError, setSnackbarError] = useState('');

  const dispatch = useDispatch();

  useEffect(() => {
    if (deletesuccess || success) {
      setSnackbarMessage(deletesuccess || success);
      setSnackbarVisible(true);
    } else if (deleteError !== '') {
      setSnackbarError(deleteError || error);
      // setSnackbarMessage('Error deleting');
      setSnackbarVisible(true);
    }
  }, [deletesuccess, deleteError, success, error]);

  console.log(
    'delete msg is ..........................',
    deletesuccess,
    deleteError,
  );
  // alert(deletesuccess);
  // console.log('user list is .....', userList);

  const UserListHandler = async () => {
    try {
      await dispatch(fetchUser_List());

      // DevSettings.reload();
    } catch (err) {
      // DevSettings.reload();
      // setError(err.message);
    }
  };

  // const cacheClear = async () => {
  //   try {
  //     await dispatch(userData);
  //   } catch (err) {
  //     // setError(err.message);
  //     // setIsLoading(false);
  //   }
  // };

  // useEffect(() => {
  //   setuserData(data);
  // }, [data]);
  useEffect(() => {
    // setSuccessmsg(success);
    return () => {
      // setSuccessmsg('');
      setVisible('');
    };
  }, [deletesuccess]);
  useEffect(() => {
    UserListHandler();
    // cacheClear();
    // clearStateCache();
  }, []);
  console.log('update status', success);

  const UpdateStatus = async (id, status) => {
    // alert(id, status);
    try {
      console.log('update status', status, id);
      let formData = new FormData();
      let update_status = status === 'InActive' ? 'Active' : 'InActive';
      // alert(update_status);
      formData.append('id', id);
      formData.append('status', update_status);
      await dispatch(updateUser_Status(formData));

      // DevSettings.reload();
    } catch (err) {
      // DevSettings.reload();
      // setError(err.message);
    }
  };

  const Delete_user = async id => {
    Alert.alert(
      'Are your sure?',
      'Are you sure you want to delete this user?',
      [
        {
          text: 'Yes',
          onPress: async () => {
            await dispatch(delete_User(id));
          },
        },
        {
          text: 'No',
        },
      ],
    );
  };

  // useEffect(() => {

  //   return () => {

  //   }
  // }, [third])

  // const Delete_user = async id => {
  //   try {
  //     console.log('delete user', id);
  //     let formData = new FormData();
  //     formData.append('id', id);
  //     // await dispatch(delete_User(formData));
  //     await dispatch(delete_User(id));

  //     // DevSettings.reload();
  //   } catch (err) {
  //     // DevSettings.reload();
  //     // setError(err.message);
  //   }
  // };

  const searchFilter = item => {
    const query = searchQuery.toLowerCase();
    return item?.name?.toLowerCase().includes(query);
  };

  const StateAlert = (id, status) => {
    Alert.alert('Update Status', 'Are you wanted to update the status ?', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {text: 'OK', onPress: () => UpdateStatus(id, status)},
    ]);
  };

  const setVisibleFunction = () => {
    setVisible('');
  };

  // const openModal = () => {
  //   setModalVisible(true);
  // };

  // const closeModal = () => {
  //   setModalVisible(false);
  // };

  // const handleOkPress = () => {
  //   // Handle OK button press
  //   navigation.navigate('HomeScreen');

  //   console.log('OK Pressed');
  //   closeModal();
  // };

  // const handleCancelPress = () => {
  //   // Handle Cancel button press
  //   console.log('Cancel Pressed');
  //   closeModal();
  // };

  const openModal = (id, status) => {
    setSelectedItem(id);
    setSelectedStatus(status);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
  };

  const handleOkPress = async id => {
    // Handle OK button press
    try {
      selectedStatus === null
        ? await dispatch(delete_User(selectedItem))
        : await UpdateStatus(selectedItem, selectedStatus);
    } catch (err) {}

    // await dispatch(Delete_blockDate(id));

    // console.log('OK Pressed');
    closeModal();
  };

  const handleCancelPress = () => {
    // Handle Cancel button press
    console.log('Cancel Pressed');
    closeModal();
  };
  return loading ? (
    <ActivityIndicatorComponent />
  ) : (
    <SafeAreaView style={{flex: 1}}>
      {/* <View style={{}}> */}
      <View
        style={{
          height: 250,
          width: 250,
          backgroundColor: MyColors.primary,
          borderRadius: 125,
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
      {/* {(!!deletesuccess || !!deleteError || !!visible) && (
        <View style={{marginTop: hp(3)}}>
          <SnackMessage
            success={deletesuccess}
            visible={visible}
            error={deleteError}
            setVisibleFunction={setVisibleFunction}
          />
        </View>
      )} */}

      <View
        style={{
          flexDirection: 'column',
          margin: 6,
          padding: 6,
          justifyContent: 'space-evenly',
          // alignItems: 'center',
        }}>
        <Text style={BookingStyle.headertitle}>{'Users'}</Text>
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

      <FlatList
        contentContainerStyle={{
          alignItems: 'center',
          padding: 10,
          paddingBottom: 30,
        }}
        data={userList?.filter(searchFilter)}
        numColumns={1}
        keyExtractor={(item, index) => index.toString()}
        renderItem={
          ({item}) => (
            //   <View style={{flex: 1}}>
            <View style={{flexDirection: 'column'}}>
              <View style={{alignItems: 'center'}}>
                <View
                  style={styles.card}
                  activeOpacity={0.7}
                  // onPress={onSelect}
                >
                  <View style={{flexDirection: 'row'}}>
                    {/* <View style={{justifyContent: 'flex-end'}}>
                      <Image
                        style={{
                          width: 50,
                          height: 50,
                          borderRadius: 25,
                          // shadowColor: '#000',
                          // backgroundColor: 'grey',
                          // shadowOffset: {
                          //   width: 0,
                          //   height: 2,
                          // },
                          // shadowOpacity: 0.25,
                          // shadowRadius: 3.84,

                          // elevation: 5,
                        }}
                        source={require('./../../style/assets/user.png')}
                      />
                    </View> */}

                    <View
                      style={{
                        flexDirection: 'column',
                        // margin: 8,
                        padding: 8,
                        justifyContent: 'space-evenly',
                        alignItems: 'flex-start',
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          display: 'flex',
                          // backgroundColor: 'red',
                          // flex: 1,
                          width: wp(85),
                        }}>
                        {/* <Ionicons
                        // style={BookingStyle.keftIcon}
                        style={{color: MyColors.secondary, paddingRight: 2}}
                        name="person-sharp"
                        size={20}
                      /> */}

                        <View
                          style={{
                            // backgroundColor: 'green',
                            // alignItems: 'flex-end',
                            justifyContent: 'flex-end',
                          }}>
                          <Text
                            numberOfLines={1}
                            ellipsizeMode="tail"
                            style={BookingStyle.title}>
                            {item.name}
                          </Text>
                          {/* <Text style={styles.code}> {item.email}</Text> */}
                        </View>

                        <View>
                          {!('admin@moebotech.com' === item.email) && (
                            <Chip
                              type={'flat'}
                              onPress={() => openModal(item.id, item.status)}
                              textStyle={{
                                // color: '#ffffff',
                                color:
                                  item.status == 'Active' ? '#ffffff' : 'grey',
                                // backgroundColor: 'red',
                                alignSelf: 'center',
                                paddingLeft: 0,
                                paddingRight: 0,

                                lineHeight:windowHeight > 800 ? hp(3) :hp(2),
                                fontSize: windowHeight > 800 ? normalize(13) :normalize(10),
                                fontWeight: '700',
                              }}
                              style={{
                                // shadowColor: 'red',
                                // elevation: 4,
                                height: windowHeight > 800 ? hp(4) :hp(5),
                                width: windowHeight > 800 ? wp(20) :wp(23),
                                

                                borderWidth: item.status == 'Active' ? 0 : 1,
                                paddingTop: 0,
                                paddingBottom: 0,
                                justifyContent: 'center',
                                paddingLeft: item.status == 'Active' ? 9 : 4,
                                paddingRight: 0,
                                // position: 'absolute',
                                // right: 80,
                                // alignItems: 'center',
                                // alignSelf: 'center',

                                backgroundColor:
                                  item.status == 'Active'
                                    ? MyColors.primary
                                    : '#ffffff',
                                borderRadius: 5,
                                margin: 4,
                              }}>
                              {item.status}
                            </Chip>
                            // <TouchableOpacity
                            //   onPress={() => StateAlert(item.id, item.status)}
                            //   style={{
                            //     height: 30,
                            //     width: 60,
                            //     backgroundColor: MyColors.secondary,
                            //     borderRadius: 5,
                            //     justifyContent: 'center',
                            //     alignItems: 'center',
                            //   }}>
                            //   <Text style={{color: 'white'}}>{item.status}</Text>
                            // </TouchableOpacity>
                          )}
                        </View>
                      </View>
                      <View style={{flexDirection: 'row'}}>
                        {/* <MaterialCommunityIcons
                          // style={BookingStyle.keftIcon}
                          style={{
                            color: MyColors.secondary,
                            paddingRight: 2,
                          }}
                          name="email"
                          size={20}
                        /> */}
                        <Text style={BookingStyle.code}> {item.email}</Text>
                      </View>
                    </View>
                  </View>

                  <View style={styles.price}>
                    <View>
                      {!('admin@moebotech.com' === item.email) && (
                        <Chip
                          type={'flat'}
                          icon={() => (
                            <MaterialIcons
                              // style={{paddingHorizontal: 5}}
                              name="delete"
                              //   onPress={onPresses}
                              color={MyColors.secondary}
                              size={ windowHeight > 800 ? normalize(18) :normalize(16)}
                              margin={0}
                            />
                          )}
                          onPress={() => openModal(item.id, null)}
                          textStyle={{
                            color: MyColors.secondary,
                            alignSelf: 'center',
                            // backgroundColor: 'green',
                            marginLeft: 2,

                            lineHeight:windowHeight > 800 ? hp(2.5) :hp(2.3),

                            fontSize: windowHeight > 800 ? normalize(17) :normalize(12),
                          }}
                          style={{
                            // elevation: 4,
                            height:windowHeight > 800 ? hp(4) :hp(5),

                            width:windowHeight > 800 ? wp(23) :wp(25) ,
                            padding: 0,
                            paddingTop: 2,

                            // justifyContent: 'center',
                            // alignItems: 'center',
                            // alignSelf: 'center',
                            backgroundColor: '#fff1ef',
                            borderRadius: 50,
                            margin: 4,
                          }}>
                          {'Delete'}
                        </Chip>
                        // <TouchableOpacity
                        //   onPressIn={() => {
                        //     // cardAction();
                        //   }}>
                        //   <Feather
                        //     style={{paddingLeft: 5}}
                        //     name="edit"
                        //     onPress={() =>
                        //       props.navigation.navigate('CreateUser', {
                        //         item: item,
                        //         update: true,
                        //       })
                        //     }
                        //     color={MyColors.secondary}
                        //     size={28}
                        //   />
                        // </TouchableOpacity>
                      )}
                    </View>
                    <View>
                      {!('admin@moebotech.com' === item.email) && (
                        // <TouchableOpacity onPress={() => Delete_user(item.id)}>
                        //   <MaterialIcons
                        //     style={{paddingLeft: 5}}
                        //     name="delete"
                        //     //   onPress={onPresses}
                        //     color={MyColors.secondary}
                        //     size={28}
                        //   />
                        // </TouchableOpacity>
                        <Chip
                          type={'flat'}
                          icon={() => (
                            <Feather
                              style={{paddingHorizontal: 5}}
                              name="edit"
                              onPress={() =>
                                props.navigation.navigate('BlockDate_Form', {
                                  item: item,
                                  update: true,
                                })
                              }
                              color={'#ffffff'}
                              size={ windowHeight > 800 ? normalize(18) :normalize(16)}
                              />
                          )}
                          onPress={() =>
                            props.navigation.navigate('CreateUser', {
                              item: item,
                              update: true,
                            })
                          }
                          textStyle={{
                            color: '#ffffff',

                            lineHeight:windowHeight > 800 ? hp(2.5) :hp(2.3),

                            fontSize: windowHeight > 800 ? normalize(17) :normalize(12),
                          }}
                          style={{
                            shadowColor: 'red',
                            // elevation: 4,
                                      // height: 30,
                                      height:windowHeight > 800 ? hp(4) :hp(5),

                                      width:windowHeight > 800 ? wp(23) :wp(25) ,
                            paddingTop: 2,
                            paddingBottom: 0,
                            justifyContent: 'center',
                            alignItems: 'center',
                            alignSelf: 'center',
                            backgroundColor: '#93c2da',
                            borderRadius: 50,
                            margin: 4,
                          }}>
                          {'Edit'}
                        </Chip>
                      )}

                      {/* {!('admin@moebotech.com' === item.email) && (
                        <TouchableOpacity onPress={() => alert(item.email)}>
                          <MaterialIcons
                            style={{paddingLeft: 5}}
                            name="delete"
                            color={MyColors.secondary}
                            size={28}
                          />
                        </TouchableOpacity>
                      )} */}
                    </View>
                  </View>
                </View>
              </View>
            </View>
          )

          //   </View>;
        }
        //   <View>
        //     <TouchableOpacity
        //       style={BookingStyle.card}
        //       activeOpacity={0.7}
        //       onPress={() => {}}>
        //       {/* <Image
        //         style={{width: 75, height: 75, borderRadius: 8}}
        //         source={require('../../Assets/product01.jpg')}
        //       /> */}

        //       <View
        //         style={{
        //           flexDirection: 'column',
        //           margin: 8,
        //           padding: 8,
        //           justifyContent: 'space-evenly',
        //           alignItems: 'flex-start',
        //         }}>
        //         <Text style={BookingStyle.title}>{item.title}</Text>
        //         <Text style={BookingStyle.code}>Pi# {item.price}</Text>
        //         <Text style={BookingStyle.code}>Po# {item.title}</Text>
        //       </View>
        //       <Text style={BookingStyle.price}>{item.price}</Text>
        //       <Text style={BookingStyle.price}>{'item.price'}</Text>
        //     </TouchableOpacity>
        //   </View>
      />
      <DeleteModel
        visible={modalVisible}
        closeModal={closeModal}
        onOkPress={() => handleOkPress()}
        onCancelPress={handleCancelPress}
        message={'message'}
        error={'msg_error'}
        cancel={null}
        heading={selectedStatus}
      />
      
      {/* {(!!deletesuccess || !!deleteError) && (
        <CustomModal
          visible={modalVisible}
          closeModal={closeModal}
          onOkPress={handleOkPress}
          onCancelPress={handleCancelPress}
          message={deletesuccess}
          error={deleteError}
          cancel={null}
        />
      )} */}
      {(snackbarMessage || snackbarError) && (
        <View style={{}}>
          <SnackMessage
            success={snackbarMessage}
            visible={true}
            error={snackbarError}
            setVisibleFunction={() => setVisible('')}
          />
        </View>
      )}<View style={{ marginBottom: 0,
        position: 'absolute',
        alignSelf: 'flex-end',
        right: wp(5),
        bottom: hp(8)}}>
      <TouchableOpacity
        style={{color: MyColors.primary, alignSelf: 'flex-start'}}
        onPress={() =>
          props.navigation.navigate('CreateUser', {
            update: false,
          })
        }>
        <FontAwesome6 name="circle-plus" size={normalize(40)} color={MyColors.primary} />
      </TouchableOpacity>
    </View>

    </SafeAreaView>
  );
};

export default UserList;
const styles = StyleSheet.create({
  name: {
    fontFamily: 'Verdana',
    fontSize: 18,
  },
  card: {
    // opacity: 15%, y-asix: 4, blur: 15
    // flexDirection: 'row',
    // paddingHorizontal: wp(3),

    marginBottom: 8,
    padding: 10,
    paddingHorizontal: wp(5),
    paddingVertical: wp(5),
    height: 150,
    width: wp(96),
    backgroundColor: 'white',
    // alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 5,
  },
  title: {
    fontSize: 14,
    // fontFamily: 'Avenir-Heavy',
    color: '#000000',
    fontWeight: '700',
  },
  code: {fontSize: 13, fontFamily: 'Avenir-Heavy', color: '#000000'},
  price: {
    position: 'absolute',
    flexDirection: 'row',
    justifyContent: 'space-around',
    end: 0,
    bottom: 0,
    padding: 10,
    // margin: 8,
    // fontSize: 16,
  },
});
