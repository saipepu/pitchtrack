import { useState, useEffect } from 'react';
import QRCode from 'qrcode';
import Image from 'next/image';

const QRGenerator = ({ data }: any) => {
  const [qrCode, setQrCode] = useState('');

  useEffect(() => {
    // Generate QR code when the component mounts or when data changes
    QRCode.toDataURL(data, { width: 300, errorCorrectionLevel: 'H' })
      .then((url) => {
        setQrCode(url);
      })
      .catch((err) => {
        console.error(err);
      });
  }, [data]);

  return (
    <div className='w-full h-fit flex justify-center items-center'>
      {qrCode ? (
        <Image src={qrCode} alt="QR Code" width={200} height={200} />
      ) : (
        <p>Generating QR code...</p>
      )}
    </div>
  );
};

export default QRGenerator;