import Lottie from "lottie-react";
import walletAnimation from "./json/Wallet.json";

export default function WalletAnimation() {
  return (
    <div style={{ width: 300, height: 300 }}>
      <Lottie animationData={walletAnimation} loop={true} />
    </div>
  );
}
