import {Dimensions, StyleSheet} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from '../../Tools/DimensionsTool';
import {COLORS, hp, SIZES, wp} from '../theme';

const Ticket_GuestStyle = StyleSheet.create({
  card: {
    // opacity: 15%, y-asix: 4, blur: 15
    flexDirection: 'row',
    marginBottom: 8,
    padding: 5,
    height: 93,
    width: wp(95),
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
  headertitleStyle: {
    flexDirection: 'column',
    margin: 8,
    padding: 8,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
  headertitle: {
    fontSize: 20,
    fontFamily: 'Avenir-Heavy',
    fontWeight: 'bold',
    color: '#042C5C',
  },

  title: {fontSize: 16, fontFamily: 'Avenir-Heavy', color: '#042C5C'},
  code: {fontSize: 13, fontFamily: 'Avenir-Heavy', color: '#77869E'},
  cardBody: {
    flexDirection: 'column',
    margin: 8,
    padding: 8,
    justifyContent: 'space-evenly',
    alignItems: 'flex-start',
  },
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
  circle: {
    position: 'absolute',
    right: 0,
    marginRight: 10,
    width: 30,
    height: 30,
    borderRadius: 30 / 2,
    elevation: 3,
    backgroundColor: 'blue',
    alignItems: 'center',
    justifyContent: 'center',
  },
  circleText: {
    color: 'white',
  },
});
export {Ticket_GuestStyle};
