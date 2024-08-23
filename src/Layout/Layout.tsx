// src\Layout\Layout.tsx

import { Outlet } from 'react-router-dom';
// import NavBar from '../NavBar/';
import style from './style.module.css';

const Layout = () => {

  return (
    <div className={style.appContainer}>
      {/* <NavBar /> */}
      <main className={style.mainContent}>
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
