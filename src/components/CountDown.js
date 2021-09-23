import React, {useState, useRef, useEffect} from 'react';
import {Text, View, StyleSheet} from 'react-native';
import {colors} from '../utils/colors';
import {fontSizes} from '../utils/sizes';
import {RoundedButton} from './RoundedButton';
import {spacingSizes} from '../utils/sizes';

const minToMils = minutes => {
  return minutes * 60 * 1000;
};

export const CountDown = ({minutes = 0.1, isPaused, onProgress, onEnd}) => {
  const interval = useRef(null);
  const [millis, setMillis] = useState(minToMils(minutes));
  const [isEnd, setIsEnd] = useState(false);
  const countFunction = () => {
    setMillis(time => {
      console.log('tick');
      if (time === 0) {
        clearInterval(interval);
        setIsEnd(true);
        return time;
      } else {
        const timeLeft = time - 1000;
        return timeLeft;
      }
    });
  };
  useEffect(() => {
    setMillis(minToMils(minutes));
    setIsEnd(false);
  }, [minutes]);

  useEffect(() => {
    if (isEnd === true) onEnd();
  }, [isEnd]);

  useEffect(() => {
    if (isPaused) {
      if (interval.current) clearInterval(interval.current);
      return;
    }
    interval.current = setInterval(countFunction, 1000);
    onProgress(millis / minToMils(minutes));
    return () => clearInterval(interval.current);
  }, [isPaused, millis]);

  const mins = Math.floor(millis / (1000 * 60));
  const seconds = Math.floor((millis / 1000) % 60);

  const formatTime = timeItem => {
    if (timeItem < 10) return `0${timeItem}`;
    else return timeItem;
  };
  return (
    <View>
      <View style={styles.textContainer}>
        <Text style={styles.text}>
          {formatTime(mins)}:{formatTime(seconds)}
        </Text>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: colors.sexyBlue,
    // borderColor: 'white',
    // borderWidth: spacingSizes.xsm,
  },
  text: {
    fontSize: fontSizes.xxxxl,
    color: 'white',
  },
  button: {},
});
