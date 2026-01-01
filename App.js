import store from './store/store';
import { Provider } from 'react-redux';
import Root from './components/Root';


export default function App() {


  return (
  <Provider store={store}>
     <Root></Root>
  </Provider>
  );
}