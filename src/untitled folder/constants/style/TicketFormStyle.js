import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Tools/DimensionsTool';
import {COLORS, hp, SIZES, wp} from '../theme';

const TicketFormStyle = StyleSheet.create({
  constainer: {
    flex: 1,
    // alignItems: 'center',
    marginTop: hp(10),
    paddingHorizontal: SIZES.padding,
    backgroundColor: '#f2f2f2',
  },
  btn: {
    position: 'absolute',
    // backgroundColor: '#5144eb',
    width: '100%',
    bottom: 10,
    justifyContent: 'space-between',
    height: hp(6.5),
    flexDirection: 'row',
    flex: 1,
    alignSelf: 'center',

    // backgroundColor: '#FFF',
    paddingHorizontal: wp(2),
  },
});
export {TicketFormStyle};
