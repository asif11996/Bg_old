import {
  Text,
  View,
  EventFormStyleheet,
  TextInput,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import {useState} from 'react';
import {SelectList} from 'react-native-dropdown-select-list';

import EventFormStyle from '../../style/EventFormStyle';

const EventView = props => {
  const item = ({item}) => {
    return <></>;
  };

  const [Facility, setFacility] = useState('');
  const [selected, setSelected] = useState('');
  const [Periodicity, setPeriodicity] = useState('');
  const [Price, setPrice] = useState('');
  const [Charge, setCharge] = useState('');
  const [Status, setStatus] = useState('');
  const [display, setdisplay] = useState(false);

  const data = [{value: 'Oak'}, {value: 'Maple'}];

  // const Periodicitydata = [
  //     { key: '1', value: '1 days' },
  //     { key: '2', value: '2 days' },
  //     { key: '3', value: ' 3 days' },
  // ];
  const Periodicitydata = [
    {value: '1 days'},
    {value: '2 days'},
    {value: ' 3 days'},
  ];
  const Chargedata = [{value: 'Per Day'}, {value: 'Seasonly'}];
  const Statusdata = [{value: 'Active'}, {value: 'InActive'}];
  const placeholder = ' Facility';
  const pricehead = 'Price';
  const resetformdata = () => {
    setdisplay(false);
    setFacility('');
    setSelected('');
    setPeriodicity('');
    setPrice('');
    setCharge('');
    setStatus('');
  };
  return (
    <View style={EventFormStyle.container}>
      <ScrollView>
        <View style={EventFormStyle.footer}>
          <View style={EventFormStyle.footer}>
            <Text style={EventFormStyle.text_footer}>{placeholder}</Text>
            <View style={EventFormStyle.action}>
              <TextInput
                style={EventFormStyle.textinput}
                onChangeText={setFacility}
                value={Facility}
              />
            </View>
            {/* <FacilityInput setSelected={setFacility} /> */}
            <Text style={[EventFormStyle.text_footer]}>
              Accommmodation Edit{' '}
            </Text>
            <SelectList
              data={data}
              setSelected={setSelected}
              maxHeight={110}
              boxEventFormStyle={EventFormStyle.option}
              inputEventFormStyle={{color: '#074365'}}
              dropdownEventFormStyle={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'white',
              }}
              dropdownTextEventFormStyle={{color: '#074365'}}
              placeholder=" "
            />

            <Text style={EventFormStyle.text_footer}>{pricehead}</Text>
            <View style={EventFormStyle.action}>
              <TextInput
                style={EventFormStyle.textinput}
                onChangeText={text => setPrice(text)}
                value={Price}
              />
            </View>

            <Text style={EventFormStyle.text_footer}>Status</Text>
            <SelectList
              data={Statusdata}
              setSelected={setStatus}
              maxHeight={110}
              boxEventFormStyle={EventFormStyle.option}
              dropdownEventFormStyle={{
                backgroundColor: 'white',
                borderWidth: 1,
                borderColor: 'white',
              }}
              dropdownTextEventFormStyle={{color: '#074365'}}
              inputEventFormStyle={{color: '#074365'}}
              placeholder=" "
              containerStyle={{width: 150, height: 70}}
              // searchPlaceholder='red'
            />

            <View style={EventFormStyle.submitbtn}>
              <TouchableOpacity style={EventFormStyle.button}>
                <Text
                  style={EventFormStyle.textSubmit}
                  onPress={() => setdisplay(true)}>
                  Update
                </Text>
              </TouchableOpacity>
            </View>
            <View>
              {display ? (
                <View>
                  <Text>{Facility}</Text>
                  <Text>{selected}</Text>
                  <Text>{Periodicity}</Text>
                  <Text>{Price}</Text>
                  <Text>{Charge}</Text>
                  <Text>{Status}</Text>
                </View>
              ) : null}
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default EventView;
