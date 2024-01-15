import { createStore } from 'redux';
import styles from './App.module.css';
import { Header } from './Header/Header';
import { Main } from './Main/Main';
import { Provider } from 'react-redux';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { composeWithDevTools } from 'redux-devtools-extension';
import { rootReducer } from './store';
import { Statistic } from './Statistic/Statistic';
import { useEffect } from 'react';
import { requestNotification } from './utilits/requestNotification';

const store = createStore(rootReducer, composeWithDevTools());

function App() {
  useEffect(() => {
    requestNotification();
  }, []);
  return (
    <BrowserRouter>
      <Provider store={store}>
        <div className={styles.app}>
          <Header />
          <Routes>
            <Route path='/' element={<Main />} />
            <Route path='/statistic' element={<Statistic />} />
          </Routes>
        </div>
      </Provider>
    </BrowserRouter>
  );
}

export default App;
