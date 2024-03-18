

import './App.css'
import {RouterProvider,createBrowserRouter} from "react-router-dom"
import Home from './Components/Home';
import Sports from './Components/Sports';
import Outdoor from './Components/Outdoor';


function App() {
 
  const router=createBrowserRouter([
    {
      path:'/',
      element:<Home/>, 
      children:[
        {
          path:'/sports',
          element:<Sports/>,
        },
        {
          path:'/outdoors',
          element:<Outdoor/>,
        }

      ]
    },
    ]
    )
  
  return (
    <>
      <RouterProvider router={router}/>
    </>
  )
}

export default App
