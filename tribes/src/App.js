import './App.css';
import Admin from './Pages/Admin';
import Home from './Pages/Home';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import InsertData from './Pages/adminPages/insert';
import UpdateData from './Pages/adminPages/update';
import DeleteData from './Pages/adminPages/delete';
import DataTemplate from './Pages/data_template';
import Himalayas from './Components/himalayas';
import Northern from './Components/northern';
import Eastern from './Components/eastern';
import TablesList from './Components/tablesList';

function App() {
  return (
    <>
    <BrowserRouter>
    <Routes>
      <Route path='/' element={<Home/>}></Route>
      <Route path='/admin' element={<Admin/>}>

      </Route>
      <Route path='/admin/insert' element={<InsertData/>}>
          {/* <Route path='/admin/insert/tables' element={<TablesList/>}></Route> */}
          {/* <Route path='/admin/insert/form' element={<></>}></Route> */}
      </Route>
      <Route path='/admin/update' element={<UpdateData/>}>

      </Route>
      <Route path='/admin/delete' element={<DeleteData/>}>

      </Route>
      <Route path='/data' element={<DataTemplate/>}>
        <Route path='/data/himalayas' element={<Himalayas/>}></Route>
        <Route path='/data/north' element={<Northern/>}></Route>
        <Route path='/data/east' element={<Eastern/>}></Route>
      </Route>
    </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;
