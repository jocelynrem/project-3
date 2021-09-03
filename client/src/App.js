import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';
import { Home } from './pages/Home'
import Dashboard from './pages/DashboardContainer'
import Navigation from './components/Navigation'
import Footer from './components/footer';

const client = new ApolloClient({
  uri: '/graphql',
  cache: new InMemoryCache(),
});


function App() {
  return (
    <ApolloProvider client={client}>
    <Router>
      <div className="min-h-screen flex-col flex">
        <header>
          <Navigation />
        </header>
        <main className="flex-grow">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route exact path='/dashboard' component={Dashboard} />
          </Switch>
        </main>
        <Footer year={new Date().getFullYear()} />
      </div>
    </Router>
    </ApolloProvider>
  );
}

export default App;