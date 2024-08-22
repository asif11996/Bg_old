import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {scanResponse, waitForScanning} from '../store/action/scannerResponse';

function handleBarCodeScanner(scanDataState) {
  const dispatch = useDispatch();
  useEffect(() => {
    const handleBarCodeScanned = async scanDataState => {
      let scanData = scanDataState.data;
      if (
        // !isNaN(scanData) &&
        scanDataState.type === 'QR_CODE' ||
        scanDataState.type === 'org.iso.QRCode'
      ) {
        console.log('scan data is >>>>>>>>>.', scanData);

        let userData = new FormData();
        userData.append('public_code', scanData);

        console.log('public data is ....', scanData, userData);

        await dispatch(scanResponse(scanData));
      } else {
        dispatch(waitForScanning());
      }
    };
    scanDataState && handleBarCodeScanned(scanDataState);
  }, [scanDataState]);
}

export default handleBarCodeScanner;
