import React, {useState} from 'react';
import {Text, View, StyleSheet, Vibration, Platform} from 'react-native';
import {CountDown} from '../../components/CountDown';
import {fontSizes, spacingSizes} from '../../utils/sizes';
import {RoundedButton} from '../../components/RoundedButton';
import {ProgressBar} from 'react-native-paper';
import {colors} from '../../utils/colors';
import {Timing} from './Timing';

const DEFAULT_TIME = 0.1;

export const Timer = ({focusSubject, onTimerEnd, clearSubject}) => {
  const [mins, setMins] = useState(DEFAULT_TIME);
  const [pause, setPause] = useState(true);
  const [progress, setProgress] = useState(1);

  const onProgress = progress => {
    setProgress(progress);
  };
  const changeTime = minutes => {
    setMins(minutes);
    setPause(true);
    setProgress(1);
  };

  const onEnd = () => {
    setMins(DEFAULT_TIME);
    setPause(true);
    setProgress(1);
    viberate();
    onTimerEnd();
  };

  const viberate = () => {
    if (Platform.OS === 'android') {
      Vibration.vibrate(10000);
      console.log('Viberation!!!!');
    } else if (Platform.OS === 'ios') {
      const interval = setInterval(() => Vibration.vibrate(), 1000);
      setTimeout(() => clearInterval(interval), 10000);
    }
  };

  return (
    <View style={styles.container}>
      {/* Count Down */}
      <View style={styles.countDown}>
        <CountDown
          isPaused={pause}
          onProgress={onProgress}
          minutes={mins}
          onEnd={onEnd}
        />
      </View>
      {/* Task title and text */}
      <View style={{paddingTop: spacingSizes.xxl}}>
        <Text style={styles.title}>We are focusing on:</Text>
        <Text style={styles.task}>{focusSubject}</Text>
      </View>
      {/* Progress Bar */}
      <View style={{paddingTop: spacingSizes.sm}}>
        <ProgressBar color="#5E84E2" progress={progress} style={{height: 10}} />
      </View>
      {/* Preseting timer values */}
      <View style={styles.buttonContainer}>
        <Timing changeTime={changeTime} />
      </View>
      {/* Start and Stop buttons */}
      <View style={styles.buttonContainer}>
        {!pause ? (
          <RoundedButton title="pause" onPress={() => setPause(!pause)} />
        ) : (
          <RoundedButton title="start" onPress={() => setPause(!pause)} />
        )}
      </View>
      {/* Cancelation */}
      <View style={styles.cancelationButton}>
        <RoundedButton title="-" onPress={() => clearSubject()} size={75} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  title: {fontSize: fontSizes.lg, color: 'white', textAlign: 'center'},
  task: {
    fontSize: fontSizes.xxl,
    fontWeight: 'bold',
    color: 'white',
    textAlign: 'center',
  },
  countDown: {
    flex: 0.5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    // marginTop: spacingSizes.xxl,
    justifyContent: 'center',
    flex: 0.3,
    padding: 15,
    // borderColor: 'white',
    // borderWidth: spacingSizes.xsm,
  },
  cancelationButton: {
    paddingLeft: 15,
    paddingBottom: 15,
  },
});
