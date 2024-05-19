import React from 'react';
import { FaTiktok, FaAmazon, FaCcJcb, FaCcVisa, FaCcApplePay, FaCcMastercard, FaPaypal } from 'react-icons/fa';
import { SvgIcon, SvgIconProps } from '@mui/material';

const createIconComponent = (Icon: React.ComponentType) => (props: SvgIconProps) => (
  <SvgIcon {...props}>
    <Icon />
  </SvgIcon>
);

export const TikTokIcon = createIconComponent(FaTiktok);
export const AmazonIcon = createIconComponent(FaAmazon);
export const JcbIcon = createIconComponent(FaCcJcb);
export const VisaIcon = createIconComponent(FaCcVisa);
export const ApplePayIcon = createIconComponent(FaCcApplePay);
export const MasterCardIcon = createIconComponent(FaCcMastercard);
export const PayPalIcon = createIconComponent(FaPaypal);