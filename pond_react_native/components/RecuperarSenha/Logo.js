import React from 'react';
import { Image } from 'react-native';

const Logo = () => (
  <Image
    source={require('../../assets/logo.png')}
    style={{ width: 120, height: 120, alignSelf: 'center', marginBottom: 40 }}
    resizeMode="contain"
  />
);

export default Logo;