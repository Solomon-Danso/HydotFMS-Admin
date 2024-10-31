import React from 'react';
import { format } from 'date-fns';

const currentYear = format(new Date(), 'yyyy')

const Footer = () => (
 

  <div className="mt-24">
    <p className="dark:text-gray-200 text-gray-700 text-center m-20">
      © {currentYear} All rights reserved by Hydot Tech
    </p>
  </div>
);

export default Footer;
