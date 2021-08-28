import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
// import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Home } from './pages/Home'
import { Dashboard } from './pages/Dashboard'
import { AddBook } from './pages/AddBook'
import { ReadingLog } from './pages/ReadingLog'
import { MyStudents } from './pages/MyStudents'
import { Profile } from './pages/Profile'


// const client = new ApolloClient({
//   uri: '/graphql',
//   cache: new InMemoryCache(),
// });

function App() {
  return (
    // <ApolloProvider client={client}>
      <Router>
        <>
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/dashboard' component={Dashboard} />
            <Route exact path='/addbook' component={AddBook} />
            <Route exact path='/readinglog' component={ReadingLog} />
            <Route exact path='/mystudents' component={MyStudents} />
            <Route exact path='/profile' component={Profile} />
          </Switch>
        </>
      </Router>
    // </ApolloProvider>
  );
}

export default App;
