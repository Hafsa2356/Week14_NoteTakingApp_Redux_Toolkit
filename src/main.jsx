 import { Provider } from "react-redux";
   import { store } from "./store";

   ReactDOM.createRoot(document.getElementById("root")).render(
     <React.StrictMode>
       <Provider store={store}>
         <App />
       </Provider>
     </React.StrictMode>
   );
   