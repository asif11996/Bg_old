import React, {memo} from 'react';
import {View, ActivityIndicator} from 'react-native';
import {MyColors} from '../style/MyColors';
import { normalize } from 'react-native-elements';
function ActivityIndicatorComponent() {
  return (
    <View style={{flex: 1, justifyContent: 'center', alignItems: 'center'}}>
      <ActivityIndicator size={normalize(30)} color={MyColors.primary} />
    </View>
  );
}

export default memo(ActivityIndicatorComponent);
