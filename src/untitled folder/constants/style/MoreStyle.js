import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Tools/DimensionsTool';
import {COLORS, hp, SIZES, wp} from '../theme';

const MoreStyle = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: 10,
    marginVertical: SIZES.padding,
  },
  headerTitle: {
    fontSize: 32,
  },
  title: {
    fontSize: 18,
    color: 'white',
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
  },
  circle: {
    width: 34.4,
    height: 34.4,
    borderRadius: 34.4 / 2,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    margin: 10,
  },
  circleText: {
    color: '#5587E7',
    fontSize: 13,
  },
  square: {
    // width: 140,
    // height: 140,
    width: widthPercentageToDP('37.3%'),
    height: heightPercentageToDP('20.3%'),
    backgroundColor: 'gray',
    padding: 20,
    marginHorizontal: 15,
    marginVertical: 10,
    borderRadius: 20,
    alignItems: 'flex-start',
    justifyContent: 'flex-end',
  },
  rectangle: {
    // width: 325,
    // height: 75,
    width: widthPercentageToDP('86.7%'),
    height: heightPercentageToDP('10.2%'),
    backgroundColor: 'gray',
    padding: 10,
    margin: 10,
    borderRadius: 20,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
  },
  body: {
    alignContent: 'center',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
  },
});
export {MoreStyle};
