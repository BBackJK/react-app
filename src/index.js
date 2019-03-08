import React from 'react';
import ReactDOM from 'react-dom';

//Router
import { Route , Switch , BrowserRouter } from 'react-router-dom';

//containers
import { Back , 
         FindAccount ,
         Front ,
         Home , 
         Login , 
         App , 
         SignUp , 
         Write ,
         MyPage ,
         Common ,
         Post } from './containers';

//components
import { NotPage } from './components';

//Redux
import { Provider } from 'react-redux';
import { createStore , applyMiddleware } from 'redux';
import reducers from './reducers/index';
import thunk from 'redux-thunk';

import * as serviceWorker from './serviceWorker';

const store = createStore(reducers, applyMiddleware(thunk));
const rootElement = document.getElementById('root');

ReactDOM.render(
    <Provider store={store}>
        <BrowserRouter>
        <Switch>
            <Route exact path="/" component={App}/>
            <Route path="/home" component={Home}/>
            <Route path="/login" component={Login}/>
            <Route path="/front" component={Front}/>
            <Route path="/back" component={Back}/>
            <Route path="/common" component={Common}/>
            <Route path="/findAccount" component={FindAccount}/>
            <Route path="/signUp" component={SignUp}/>
            <Route path="/write/:board" component={Write}/>
            <Route path="/post/:seq/:mode" component={Post}/>
            <Route path="/my-page" component={MyPage}/>
            <Route component={NotPage}/>
        </Switch>
        </BrowserRouter>
    </Provider>
    , rootElement);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: http://bit.ly/CRA-PWA
serviceWorker.unregister();
