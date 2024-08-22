import {Dimensions, StyleSheet} from 'react-native';
import {COLORS, hp, wp} from '../theme';
const {width} = Dimensions.get('screen');
const cardWidth = width / 1.8;

const HomeStyle = StyleSheet.create({
  card: {
    // backgroundColor: 'red',
    height: 280,
    width: cardWidth,
    // elevation: 15,
    marginRight: 20,
    borderRadius: 15,
    // backgroundColor: COLORS.white,
  },
  cardImage: {
    height: 200,
    width: '100%',
    borderTopLeftRadius: 15,
    borderTopRightRadius: 15,
  },
  priceTag: {
    height: 60,
    width: 80,
    backgroundColor: COLORS.primary,
    position: 'absolute',
    zIndex: 1,
    right: 0,
    borderTopRightRadius: 15,
    borderBottomLeftRadius: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardDetails: {
    height: 100,
    borderRadius: 15,
    backgroundColor: COLORS.white,
    position: 'absolute',
    bottom: 0,
    padding: 20,
    width: '100%',
  },
  cardOverLay: {
    height: 280,
    backgroundColor: COLORS.white,
    position: 'absolute',
    zIndex: 100,
    width: cardWidth,
    borderRadius: 15,
  },
});
export {HomeStyle};
