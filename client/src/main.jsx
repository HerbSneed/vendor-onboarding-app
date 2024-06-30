import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Disclaimer from "./components/disclaimer";
import VendorInfoReviewForm from "./components/vendorInfoReviewForm";
import VendorSubmitted from "./components/submitted";
import rootReducer from "../src/utils/redux/rootReducer";
import { createStore } from "redux";
import { Provider } from "react-redux";
import VendorSignup from "./components/vendor-signup";
import Welcome from "./components/welcome"


const store = createStore(rootReducer);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Welcome />} />
      <Route path="/vendor/new-vendor" element={<VendorSignup />} />
      <Route path="/vendor/disclaimer" element={<Disclaimer />} />
      <Route path="/vendor/review-info" element={<VendorInfoReviewForm />} />
      <Route path="/vendor/submitted" element={<VendorSubmitted />} />
    </Route>
  )
);

createRoot(document.getElementById("root")).render(
  <Provider store={store}>
    <RouterProvider router={router}>
      <App />
    </RouterProvider>
  </Provider>
);
