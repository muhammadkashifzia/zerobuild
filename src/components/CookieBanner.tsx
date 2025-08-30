'use client';

import { useEffect, useState } from 'react';
import Cookies from 'js-cookie'
import clsx from 'clsx';

const COOKIE_NAME = 'cookieConsent';

const CookieBanner = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = Cookies.get(COOKIE_NAME);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    Cookies.set(COOKIE_NAME, 'true', { expires: 365 });
    setVisible(false);
    // Optional: fire tracking scripts after consent
  };

  const handleReject = () => {
    Cookies.set(COOKIE_NAME, 'false', { expires: 365 });
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed  bottom-[16px] left-[16px] right-0 z-50 bg-white text-black p-4 shadow-md max-w-[420px] rounded-[12px]">
      <div className="max-w-4xl mx-auto flex flex-col  items-start justify-between gap-4">
        <p className="text-sm">
          We use cookies to improve your experience. By using our site, you agree to our use of cookies.
        </p>
        <div className="flex gap-[10px]">
          <button
            onClick={handleReject}
            className="px-4 py-2 text-sm text-white bg-gray-700 rounded hover:bg-gray-700 transition shadow-md"
          >
            Reject
          </button>
          <button
            onClick={handleAccept}
            className="px-4 py-2 text-sm text-white bg-[#484AB7] rounded hover:bg-[#484AB7] transition shadow-md"
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
};

export default CookieBanner;
