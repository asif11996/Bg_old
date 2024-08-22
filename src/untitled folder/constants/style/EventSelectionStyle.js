import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Tools/DimensionsTool';
import {COLORS, hp, SIZES, wp} from '../theme';

const EventSelectionStyle = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    paddingHorizontal: 5,
    paddingTop: 10,
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    backgroundColor: '#f2f2f2',
    width: wp(100),
    //   position: 'absolute',
    top: hp(-5),
    //   flex: 1,
  },
  imgStyle: {
    height: hp(35),
    width: wp(100),
  },
  btnStyle: {
    margin: 10,
    fontSize: 15,
    color: '#042C5C',
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
  },
});
export {EventSelectionStyle};
