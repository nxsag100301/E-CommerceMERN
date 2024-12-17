import './App.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import { routes } from './routes';
import DefaultComponent from './components/DefaultComponent/DefaultComponent';
import { Fragment } from 'react';
import axios from 'axios';
import { useQuery } from '@tanstack/react-query';

function App() {

  // useEffect(()=> {
  //   fetchApi()
  // },[])

  const fetchApi = async () => {
    const res = await axios.get(`${process.env.REACT_APP_URL_BACKEND}/product`)
      return res?.data
  }

  useQuery({ queryKey: ['allProduct'], queryFn: fetchApi })


  return (
    <div>
      <Router>
        <Routes>
          {routes.map(item => {
            const Page = item.page
            const Layout = item.isShowHeader ? DefaultComponent : Fragment
            return (
              <Route key={item.path} path={item.path} element={
                <Layout>
                  <Page />
                </Layout>
              } />
            )
          })}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
