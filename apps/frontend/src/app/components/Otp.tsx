/* eslint-disable @typescript-eslint/ban-ts-comment */
'use client';
import { useState } from 'react';

// @ts-expect-error

const OtpInput = ({ length = 6, onChange }) => {
  const [otp, setOtp] = useState(Array(length).fill(''));

  // @ts-expect-error
  const handleChange = (element, index) => {
    const value = element.value.replace(/\D/g, '');
    if (value.length > 1) {
      return;
    }

    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    onChange(newOtp.join(''));

    // Move to next input
    if (value && index < length - 1) {
      element.nextSibling.focus();
    }
  };

  // @ts-expect-error

  const handleKeyDown = (element, index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      element.previousSibling.focus();
    }
  };

  return (
    <div className="flex space-x-2">
      {otp.map((_, index) => (
        <input
          key={index}
          type="text"
          inputMode="numeric"
          maxLength={1}
          className="w-[64px] h-[64px] text-center placeholder:text-[#C3C8EC] text-[#C3C8EC] text-2xl rounded-md border-2 border-[#BBC8FC] focus:outline-none focus:ring-0 focus:border-[#BBC8FC]"
          placeholder="-"
          value={otp[index]}
          onChange={(e) => handleChange(e.target, index)}
          onKeyDown={(e) => handleKeyDown(e.target, index, e)}
        />
      ))}
    </div>
  );
};

export default OtpInput;
