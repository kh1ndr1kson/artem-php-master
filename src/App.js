import {ThemeProvider} from "react-bootstrap";
import {Provider} from "react-redux";
import Layout from "./containers/Layout";
import {store} from "./store";
import 'bootstrap/dist/css/bootstrap.min.css';

export default function App() {
  return (
    <ThemeProvider>
      <Provider store={store}>
        <Layout />
      </Provider>
    </ThemeProvider>
  );
}
