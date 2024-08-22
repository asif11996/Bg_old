import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from './Dimensions';

const BookingDetailStyle = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#E5E4E2',
  },

  // header: {
  //     flex: 1,
  //     justifyContent: 'flex-end',
  //     paddingHorizontal: 20,
  //     paddingBottom: 50
  // },
  footer: {
    flex: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
    marginTop: 20,
  },

  text_footer: {
    color: '#05375a',
    fontSize: 15,
    paddingVertical: -70,
    marginTop: 5,
    marginBottom: 2,
  },
  textinput: {
    flex: 1,
    paddingLeft: 10,
    color: '#074365',
    height: 45,
  },
  action: {
    flexDirection: 'row',
    marginTop: 0,
    borderWidth: 1,
    borderColor: '#074365',
    borderRadius: 10,
  },
  actions: {
    marginTop: -5,
    borderWidth: 1,
    borderColor: '#074365',
    borderRadius: 10,
    width: 164,
    padding: 0,
    height: 45,
  },
  childactions: {
    marginLeft: 10,
    marginTop: -5,
    borderWidth: 1,
    borderColor: '#074365',
    borderRadius: 10,
    width: 164,
    padding: 0,
    height: 45,
  },
  button: {
    alignItems: 'center',
    marginTop: 20,
    alignItems: 'center',
    // backgroundColor: '#009387',
    backgroundColor: '#074365',
    padding: 10,
    borderRadius: 10,
    // width:150
  },
  btnreset: {
    alignItems: 'center',
    marginTop: 20,
    alignItems: 'center',
    // backgroundColor: '#009387',
    // backgroundColor: '#074365',
    padding: 10,
    borderWidth: 2,
    borderColor: '#074365',
    borderRadius: 10,
    // width:150,
  },
  signIn: {
    width: '100%',
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
  },
  textSubmit: {
    fontSize: 15,
    width: 70,
    color: 'white',
    textAlign: 'center',
  },
  textreset: {
    fontSize: 15,
    width: 70,
    color: '#074365',
    textAlign: 'center',
    // alignItems:'center',
    marginTop: -4,
  },
  submitbtn: {
    height: 60,
    marginTop: 100,
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginLeft: 10,
    marginRight: 10,
    marginBottom: 40,
  },
  option: {
    flexDirection: 'row',
    // height:40,
    marginVertical: 5,
    color: 'black',
    borderWidth: 1,
    //  borderBottomWidth: 1,
    borderColor: '#074365',
  },
  facilidata: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  rowinput: {
    flexDirection: 'row',
  },
  textareaContainer: {
    height: 8,
    padding: 5,
    // backgroundColor: 'lightblue',
  },
  textarea: {
    textAlignVertical: 'top',
    height: 100,
    fontSize: 14,
    color: '#074365',
    borderWidth: 1,
    borderColor: '#074365',
    borderRadius: 10,
  },
  arrowback: {
    color: '#074365',
    marginHorizontal: '100',
    padding: 10,
  },
});
export {BookingDetailStyle};
