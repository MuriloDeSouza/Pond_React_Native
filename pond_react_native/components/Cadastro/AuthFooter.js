import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const AuthFooter = ({ navigation, mainText, linkText, onLinkPress }) => {
  return (
    <View style={styles.footerContainer}>
      <View style={styles.signupContainer}>
        <Text style={styles.signupText}>{mainText}</Text>
        <TouchableOpacity onPress={onLinkPress}>
          <Text style={styles.signupLink}> {linkText}</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  footerContainer: {
    width: '100%',
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 16,
  },
  signupText: {
    color: '#666',
  },
  signupLink: {
    color: '#3498db',
    fontWeight: '500',
  },
});

export default AuthFooter;