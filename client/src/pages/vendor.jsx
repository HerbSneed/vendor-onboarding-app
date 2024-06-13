import { useState } from "react";
import { lazy } from "react";

const BasicInfo = lazy(() => import("../components/bankInfo"))
const BuisnessInfo = lazy(() => import("../components/BuisnessInfo"));
const BankInfo = lazy(() => import("../components/BankInfo"));
const Disclaimer = lazy(() => import("../components/Disclaimer"));
const VendorInfoReviewForm = lazy(
  () => import("../components/VendorInfoReviewForm")
);


const Vendor = () => {
  const [isBasicComplete, setIsBasicComplete] = useState(false);
  const [isDisclaimerAgreement, setIsDisclaimerAgreement] = useState(false);
  const [isBuisnessComplete, setIsBuisnessComplete] = useState(false);
  const [isBankComplete, setIsBankComplete] = useState(false);

  return (
    <div className="bg-cubsBlue">
      {isBasicComplete ? (
        isDisclaimerAgreement ? (
          isBuisnessComplete ? (
            isBankComplete ? (
              <VendorInfoReviewForm />
            ) : (
              <BankInfo onComplete={() => setIsBankComplete(true)} />
            )
          ) : (
            <BuisnessInfo onComplete={() => setIsBuisnessComplete(true)} />
          )
        ) : (
          <Disclaimer onComplete={() => setIsDisclaimerAgreement(true)} />
        )
      ) : (
        <BasicInfo onComplete={() => setIsBasicComplete(true)} />
      )}
    </div>
  );
};

export default Vendor;
