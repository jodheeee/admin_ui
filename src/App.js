import Gate from './components/browser/Gate';
import {BrowserView, MobileView} from "react-device-detect";
import { ToastContainer } from 'react-toastify';

import './App.css';

function App() {
  return (
      <div className="App">
          <BrowserView>
              <Gate/>
          </BrowserView>
          <MobileView>
              <h3>관리자 페이지는 웹 브라우저 환경에서만 지원합니다.</h3>
          </MobileView>
          <ToastContainer/>
      </div>
  );
}

export default App;
