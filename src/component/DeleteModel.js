import React, {useEffect} from 'react';
import {View, Modal, Text, Pressable, StyleSheet} from 'react-native';
import {MyColors} from '../style/MyColors';
// import {Icon} from 'react-native-elements';
import {wp} from '../style/Dimensions';
import {clearScanState} from '../store/action/scannerResponse';
import {useDispatch} from 'react-redux';
import Icon from 'react-native-vector-icons/FontAwesome5';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const DeleteModel = ({
  visible,
  closeModal,
  onOkPress,
  onCancelPress,
  message,
  error,
  cancel,
  heading,
}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    return () => {
      dispatch(clearScanState());
    };
  }, []);

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={visible}
      onRequestClose={closeModal}>
      <View style={styles.modalContainer}>
        <View style={styles.modalMessageContainer}>
          {heading === null ? (
            <View style={{paddingTop: 20}}>
              <Icon
                name="times"
                size={40}
                color="#d9103a"
                style={{alignSelf: 'center'}}
              />
            </View>
          ) : (
            <View style={{paddingTop: 20}}>
              <MaterialCommunityIcons
                name="update"
                size={40}
                color={MyColors.primary}
                style={{alignSelf: 'center'}}
              />
            </View>
          )}

          {/* <Icon type="FontAwesome" name="user" size={40} color={'green'} /> */}

          {/* <Text style={{color: 'grey', marginTop: 10}}> */}

          {heading === null ? (
            <View>
              <Text
                style={{
                  fontSize: 15,
                  // marginBottom: 20,
                  textAlign: 'center',
                  marginTop: 20,
                  color: '#316c88',
                  fontWeight: '600',
                }}>
                {'Are you sure ?'}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  // marginBottom: 20,
                  textAlign: 'center',
                  //   marginTop: 20,
                  color: '#316c88',
                  fontWeight: '600',
                }}>
                {'This cannot be undone.'}
              </Text>
            </View>
          ) : (
            <View>
              <Text
                style={{
                  fontSize: 18,
                  // marginBottom: 20,
                  textAlign: 'center',
                  marginTop: 20,
                  color: '#316c88',
                  fontWeight: '600',
                }}>
                {'Update Status'}
              </Text>
              <Text
                style={{
                  fontSize: 15,
                  // marginBottom: 20,
                  textAlign: 'center',
                  //   marginTop: 20,
                  color: '#316c88',
                  fontWeight: '600',
                }}>
                {'You want to update Status?'}
              </Text>
            </View>
          )}

          {/* <Text style={styles.modalMessage}>{message}</Text> */}
          {/* </Text> */}
          <View style={styles.buttonContainer}>
            <Pressable
              style={{
                marginLeft: 10,
                paddingVertical: 7,
                width: 100,

                // paddingHorizontal: 20,
                borderRadius: 5,
                marginTop: 10,
                backgroundColor: '#00a5cf',
                justifyContent: 'center',
                alignItems: 'center',
                // alignSelf: 'flex-end'}}
              }}
              onPress={onCancelPress}>
              {heading === null ? (
                <Text style={styles.buttonText}>Cancel</Text>
              ) : (
                <Text style={styles.buttonText}>Ignore</Text>
              )}
            </Pressable>

            {heading === null ? (
              <Pressable
                style={{
                  marginLeft: 10,
                  paddingVertical: 7,
                  width: 100,

                  // paddingHorizontal: 20,
                  borderRadius: 5,
                  marginTop: 10,
                  borderWidth: 1,
                  borderColor: '#d9103a',

                  // backgroundColor: '#00a5cf',

                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={onOkPress}>
                <Text style={{color: '#d9103a', fontWeight: 'bold'}}>
                  {'yes,delete'}
                </Text>
              </Pressable>
            ) : (
              <Pressable
                style={{
                  marginLeft: 10,
                  paddingVertical: 7,
                  width: 100,

                  // paddingHorizontal: 20,
                  borderRadius: 5,
                  marginTop: 10,
                  backgroundColor: '#f9727b',
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={onOkPress}>
                <Text style={styles.buttonText}>
                  {heading === 'InActive' ? 'Active' : 'InActive'}
                </Text>
              </Pressable>
            )}

            {/* <Pressable
              style={{
                marginLeft: 10,
                paddingVertical: 7,
                width: 100,

                // paddingHorizontal: 20,
                borderRadius: 5,
                marginTop: 10,
                borderWidth: 1,
                borderColor: '#d9103a',

                // backgroundColor: '#00a5cf',

                justifyContent: 'center',
                alignItems: 'center',
              }}
              onPress={onOkPress}>
              <Text style={{color: '#d9103a', fontWeight: 'bold'}}>
                {'yes,delete'}
              </Text>
            </Pressable> */}
          </View>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
  },
  modalMessage: {
    fontSize: 15,
    // marginBottom: 20,
    textAlign: 'center',
  },
  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: 20,
    // justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 10,
    paddingVertical: 7,
    width: wp(20),

    // paddingHorizontal: 20,
    borderRadius: 5,
    marginTop: 10,
    // alignSelf: 'flex-end',
  },
  buttonOk: {
    backgroundColor: MyColors.secondary,
    justifyContents: 'center',
    alignItems: 'center', // Green color
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
  },
  modalMessageContainer: {
    margin: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 35,
    // alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
});

export default DeleteModel;
