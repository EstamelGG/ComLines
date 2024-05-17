import React, { useState } from 'react';

const isValidBase64 = (str: string): boolean => {
  const isValidChars = /^[A-Za-z0-9+/=]*$/.test(str);
  const isMultipleOfFour = str.length % 4 === 0;
  return isMultipleOfFour && isValidChars;
};

export default isValidBase64;