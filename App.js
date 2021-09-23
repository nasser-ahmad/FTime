import React, {useState, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Focus} from './src/features/focus/Focus';
import {colors} from './src/utils/colors';
import {Timer} from './src/features/timer/Timer';
import {spacingSizes} from './src/utils/sizes';
import {FocusHistory} from './src/features/focus/FocusHistory';

const App = () => {
  const STATUSES = {
    COMPLETED: 1,
    CANCELED: 2,
  };
  const [focusSubject, setFocusSubject] = useState(null);
  const [focusSubjectHistory, setFocusSubjectHistory] = useState([]);

  const addSubjectWithStateToFocusHistory = (subject, status) => {
    setFocusSubjectHistory([
      ...focusSubjectHistory,
      {key: String(focusSubjectHistory.length + 1), subject, status},
    ]);
  };
  const onClear = () => {
    setFocusSubjectHistory([]);
  };

  const saveFocusHistory = async () => {
    try {
      await AsyncStorage.setItem(
        'focusHistory',
        JSON.stringify(focusSubjectHistory),
      );
    } catch (e) {
      console.log(e);
    }
  };

  const loadFocusHistory = async () => {
    try {
      const history = await AsyncStorage.getItem('focusHistory');

      if (history && JSON.parse(history).length) {
        setFocusSubjectHistory(JSON.parse(history));
      }
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    loadFocusHistory();
  }, []);
  useEffect(() => {
    saveFocusHistory();
  }, [focusSubjectHistory]);
  return (
    <View style={styles.container}>
      {focusSubject ? (
        <Timer
          focusSubject={focusSubject}
          onTimerEnd={() => {
            setFocusSubject(null);
            addSubjectWithStateToFocusHistory(focusSubject, STATUSES.COMPLETED);
          }}
          clearSubject={() => {
            setFocusSubject(null);
            addSubjectWithStateToFocusHistory(focusSubject, STATUSES.CANCELED);
          }}
        />
      ) : (
        <>
          <Focus addSubject={setFocusSubject} />
          <FocusHistory focusHistory={focusSubjectHistory} onClear={onClear} />
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.darkBlue,
    paddingTop: spacingSizes.md,
    // borderColor: 'white',
    // borderWidth: 2,
  },
});

export default App;
