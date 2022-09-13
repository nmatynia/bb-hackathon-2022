import { ChakraProvider } from '@chakra-ui/react'
import { BrowserRouter as Router, Route, Switch, Redirect } from 'react-router-dom'
import { LoginPage }  from './components/LoginPage/LoginPage'
import { MainPage } from './components/MainPage/MainPage';
import React from 'react'

const App = () => {
  const [loggedIn, setLoggedIn] = React.useState<boolean>(false);

  return (
    <ChakraProvider>
      <Router>
        <Switch>
        {/* If loggedIn  show LoginPage if not MainPage*/}
            <Route path='/login'>
              <LoginPage setLoggedIn={setLoggedIn}/>
            </Route>
            <Route exact path='/'>
              {/* !loggedIn here */}
              {loggedIn ? <Redirect to ="/login"/>:<MainPage/>}
            </Route>
        </Switch>
      </Router>
    </ChakraProvider>
  );
}

export default App;

