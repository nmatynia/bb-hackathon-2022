import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { LoginPage }  from './components/LoginPage/LoginPage'
import { MainPage } from './components/LoginPage/MainPage/MainPage';

const App = () => {
  const loggedIn = false;

  return (
    <ChakraProvider>
      <Router>
        <Switch>
        {/* If loggedIn  show LoginPage if not MainPage*/}
            <Route path='/login'>
              <LoginPage/>
            </Route>
            <Route exact path='/'>
              {loggedIn ? <Redirect to ="/login"/>:<MainPage/>}
            </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;

