import React, {useState} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {TextInput} from 'react-native-paper';
import {RoundedButton} from '../../components/RoundedButton';
import {fontSizes, spacingSizes} from '../../utils/sizes';
export const Focus = ({addSubject}) => {
  const [tmpItem, setTmpItem] = useState(null);
  return (
    <View style={styles.container}>
      <View style={styles.titleContainer}>
        <Text style={styles.title}>What would you like to focus on?</Text>
      </View>
      <View style={styles.inputContainer}>
        <TextInput
          style={{
            flex: 1,
            marginRight: spacingSizes.md,
            marginLeft: spacingSizes.sm,
          }}
          onSubmitEditing={({nativeEvent}) => {
            setTmpItem(nativeEvent.text);
          }}
        />
        <RoundedButton
          title="+"
          style={{marginRight: spacingSizes.sm}}
          size={50}
          onPress={() => {
            addSubject(tmpItem);
          }}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  titleContainer: {
    // flex: 0.5,
    marginTop: 100,
    padding: spacingSizes.md,
    justifyContent: 'center',
    // borderColor: 'white',
    // borderWidth: 2,
  },
  title: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: fontSizes.lg,
  },
  inputContainer: {
    paddingTop: spacingSizes.lg,
    paddingBottom: spacingSizes.lg,
    flexDirection: 'row',
    // borderColor: 'white',
    // borderWidth: 2,
    justifyContent: 'center',
    alignItems: 'center',
    alignContent: 'center',
  },
});
