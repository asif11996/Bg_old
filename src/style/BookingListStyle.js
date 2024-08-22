import {Dimensions, StyleSheet} from 'react-native';
import {hp, wp} from './Dimensions';

const BookingListStyle = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 5,
    paddingTop: 30,
    backgroundColor: '#E5E4E2',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
  },
  listContainer: {
    paddingHorizontal: 2,
    paddingVertical: 15,
  },
  title: {
    marginTop: -16,
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    color: '#074365',
    marginHorizontal: 10,
  },
  searchInput: {
    height: 40,
    backgroundColor: 'white',
    // borderWidth: 1,
    borderRadius: 15,
    // borderColor:'#074365',
    marginBottom: 10,
    padding: 10,
    marginHorizontal: 5,
    color: '#074365',
  },
  card: {
    marginBottom: 20,
    padding: 10,
    borderRadius: 15,
  },
  cardTitle: {
    fontSize: 15,
    fontWeight: 'bold',
    paddingVertical: 0,
  },
  accomudationtitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: '5',
    // paddingVertical: 5,
    color: '#074365',
  },
  cardDates: {
    flexDirection: 'row',
    paddingVertical: 0,
  },
  cardDate: {
    color: '#074365',
  },
  cardContent: {
    justifyContent: 'space-between',
    paddingTop: 10,
  },
  attendeesContainer: {
    flexDirection: 'row',
    paddingHorizontal: 10,
  },
  attendeeImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
    marginLeft: -10,
    borderWidth: 0.5,
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  actionButton: {
    marginTop: -10,
    backgroundColor: 'white',
    paddingVertical: 10,
    paddingHorizontal: 8,
    borderRadius: 15,
  },
  btnacomm: {
    marginTop: 0,
    backgroundColor: 'white',
    paddingVertical: 5,
    paddingHorizontal: 8,
    borderRadius: 15,
    marginRight: 10,
  },
  editButton: {
    marginTop: 2,
    backgroundColor: '#074365',
    paddingVertical: 2,
    paddingHorizontal: 5,
    borderRadius: 10,
    marginRight: 20,
    paddingTop: 3,
  },
  editprice: {
    marginTop: 6,
    // backgroundColor: '#DCDCDC',
    paddingVertical: 1,
    paddingHorizontal: 10,
    borderRadius: 10,
    marginRight: 15,
  },
  buttonText: {
    color: 'green',
    fontSize: 15,
    height: 20,
    paddingHorizontal: 4,
  },
  statustext: {
    color: '#074365',
    fontSize: 15,
    fontWeight: 'bold',
  },
  priceicon: {
    color: '#074365',
    marginLeft: 200,
  },
  edittxt: {
    color: 'white',
  },
  addicon: {
    color: '#074365',
    alignSelf: 'flex-end',
    // paddingHorizontal:10,
    // paddingVertical:550,
  },
  add: {
    marginBottom: 0,
    position: 'absolute',
    alignSelf: 'flex-end',
    right: 20,
    bottom: 30,
  },
  statusicon: {
    position: 'absolute',
    left: 2,
  },
  accomleft: {
    marginTop: -18,
    marginLeft: 17,
    color: '#074365',
    fontSize: 15,
  },
  accomright: {
    marginTop: -18,
    marginLeft: 15,
    color: '#074365',
    fontSize: 15,
  },
});
export {BookingListStyle};
