import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Tools/DimensionsTool';
import {COLORS, hp, SIZES, wp} from '../theme';

const GuestListStyle = StyleSheet.create({
  card: {
    // opacity: 15%, y-asix: 4, blur: 15
    flexDirection: 'row',
    marginBottom: 8,
    padding: 5,
    height: 93,
    width: '100%',
    backgroundColor: 'white',
    alignItems: 'center',
    borderRadius: 8,
    shadowColor: '#000',
    shadowColor: 'black',
    shadowOffset: {width: 0, height: 4},
    shadowOpacity: 0.5,
    shadowRadius: 8,
    elevation: 4,
    zIndex: 5,
  },
  //   headertitle: {
  //     fontSize: 20,
  //     fontFamily: 'Avenir-Heavy',
  //     fontWeight: 'bold',
  //     color: '#042C5C',
  //   },

  title: {fontSize: 16, fontFamily: 'Avenir-Heavy', color: '#042C5C'},
  code: {fontSize: 13, fontFamily: 'Avenir-Heavy', color: '#77869E'},
  price: {
    position: 'absolute',
    end: 0,
    bottom: 0,
    padding: 10,
    margin: 8,
    fontSize: 16,
    fontFamily: 'Avenir-Heavy',
    color: '#EE5A55',
  },
});
export {GuestListStyle};
