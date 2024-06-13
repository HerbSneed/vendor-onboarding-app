import { createRoot } from "react-dom/client";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from "react-router-dom";
import App from "./App";
import Landing from "./pages/landing";
import Disclaimer from "./components/disclaimer";
import BusinessInfo from "./components/businessInfo";
import BankInfo from "./components/bankInfo";
import VendorInfoReviewForm from "./components/vendorInfoReviewForm";
import VendorSubmitted from "./components/submitted";
import BasicInfo from "./components/basicInfo";
import rootReducer from "../src/utils/redux/rootReducer";
import { createStore } from "redux";
import { Provider } from "react-redux";

const store = createStore(rootReducer);

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<Landing />} />
      <Route path="/vendor/new-vendor" element={<BasicInfo />} />
      <Route path="/vendor/disclaimer" element={<Disclaimer />} />
      <Route path="/vendor/business-info" element={<BusinessInfo />} />
      <Route path="/vendor/bank-info" element={<BankInfo />} />
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
