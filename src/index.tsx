import React, { Suspense, lazy } from 'react';
import ReactDOM from 'react-dom';
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import './index.scss';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';
// Critial items must be placed above.
// Components
import App from './App';
import Navi from './shared/components/navigation/navi';
import { Provider } from 'react-redux';
import { store } from './core/redux-store/store';
import { ProvinceRedirect } from './shared/components/discovery/province/province';

// Lazy loaded components
const Discovery = lazy(() => import('./shared/components/discovery/discovery'));
const Map = lazy(() => import('./shared/components/map/map'));
const Province = lazy(() => import('./shared/components/discovery/province/province'));
const Events = lazy(() => import('./shared/components/discovery/discover-events/events'));

ReactDOM.render(
  <React.StrictMode>
    <BrowserRouter>
      <Provider store={store}>
        <Navi />

        <Suspense fallback={<div className='flex justifty-center items-center'>Loading...</div>}>
          <Routes>
            <Route path="/" element={<App />} />
            <Route path="/discovery">
              <Route path="" element={<Discovery />} />
              {/* redirction. React Router v6 Doc: https://reactrouter.com/docs/en/v6 */}
              <Route path="*" element={<ProvinceRedirect />} />
              <Route path="province/:id">
                <Route path="" element={<Province />} />
                <Route path="city/:id" element={<Events />} />
              </Route>
              {/* <Route path=":id" element={<UserProfile />} /> */}
            </Route>
            <Route path="/map" element={<Map />} />
          </Routes>
        </Suspense>

      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://cra.link/PWA
serviceWorkerRegistration.unregister();

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
