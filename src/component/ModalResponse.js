// import React, {useState} from 'react';
// import {View, Pressable, Modal, Text, StyleSheet} from 'react-native';
// import {Icon} from 'react-native-elements';
// import {hp, wp} from '../style/Dimensions';
// import {MyColors} from '../style/MyColors';
// function ModalResponse({
//   message,
//   error,
//   modalToggleState,
//   successed,
//   modalButton,
// }) {
//   const [modalVisible, setModalVisible] = useState(true);

//   console.log('moder user data is .....', message, error);
//   return (
//     <View style={{flex: 1, position: 'absolute', ...styles.flexCenter}}>
//       <Modal
//         animationType="fade"
//         transparent={true}
//         visible={modalVisible}
//         onRequestClose={() => {
//           setModalVisible(!modalVisible);
//         }}>
//         <View style={{flex: 1, ...styles.flexCenter}}>
//           <View style={styles.modalMessageContainer}>
//             <Icon
//               type="ionicon"
//               name="checkmark-circle-sharp"
//               size={25}
//               color={MyColors.primary}
//             />
//             <Text style={{color: MyColors.primary}}>
//               {message ? message : error}
//             </Text>
//             {modalButton && (
//               <Pressable
//                 style={[styles.modalButton, styles.modalButtonClose]}
//                 onPress={() => {
//                   setModalVisible(!modalVisible);
//                   modalToggleState();
//                 }}>
//                 <Text style={styles.modalTextStyle}>Ok</Text>
//               </Pressable>
//             )}
//           </View>
//         </View>
//       </Modal>
//     </View>
//   );
// }
// const styles = StyleSheet.create({
//   flexCenter: {
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
//   modalMessageContainer: {
//     margin: 20,
//     backgroundColor: '#f2f2f2',
//     borderRadius: 20,
//     padding: 35,
//     alignItems: 'center',
//     shadowColor: '#000',
//     shadowOffset: {
//       width: 10,
//       height: 2,
//     },
//     shadowOpacity: 0.25,
//     shadowRadius: 4,
//     elevation: 5,
//   },
//   modalButton: {
//     borderRadius: 10,
//     marginTop: 20,
//     paddingHorizontal: 30,
//     paddingVertical: 10,
//     elevation: 2,
//   },
//   modalButtonClose: {
//     backgroundColor: '#468097',
//   },
//   modalTextStyle: {
//     color: 'white',
//     fontWeight: 'bold',
//     textAlign: 'center',
//   },
// });

// export default ModalResponse;

import React, {useState} from 'react';
import {View, Pressable, Modal, Text, StyleSheet} from 'react-native';
import {Icon} from 'react-native-elements';
import {MyColors} from '../style/MyColors';

function ModalResponse({
  message,
  error,
  modalToggleState,
  success,
  modalButton,
}) {
  const [modalVisible, setModalVisible] = useState(true);

  return (
    <View style={{flex: 1, position: 'absolute', ...styles.flexCenter}}>
      <Modal
        animationType="fade"
        transparent={true}
        visible={modalVisible}
        onRequestClose={() => {
          setModalVisible(!modalVisible);
        }}>
        <View style={{flex: 1, ...styles.flexCenter}}>
          <View style={styles.modalMessageContainer}>
            <Icon
              type="ionicon"
              name="checkmark-circle-sharp"
              size={25}
              color={MyColors.primary}
            />
            <Text style={{color: MyColors.primary}}>
              {message || error || 'Default Message'}
            </Text>
            {modalButton && (
              <Pressable
                style={[styles.modalButton, styles.modalButtonClose]}
                onPress={() => {
                  setModalVisible(!modalVisible);
                  modalToggleState();
                }}>
                <Text style={styles.modalTextStyle}>Ok</Text>
              </Pressable>
            )}
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  flexCenter: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  modalMessageContainer: {
    margin: 20,
    backgroundColor: '#f2f2f2',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 10,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalButton: {
    borderRadius: 10,
    marginTop: 20,
    paddingHorizontal: 30,
    paddingVertical: 10,
    elevation: 2,
  },
  modalButtonClose: {
    backgroundColor: '#468097',
  },
  modalTextStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default ModalResponse;
