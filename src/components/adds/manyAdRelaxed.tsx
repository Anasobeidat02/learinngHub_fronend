import { useEffect } from "react";

const AdRelaxed = () => {
  useEffect(() => {
    try {
      (window as any).adsbygoogle = (window as any).adsbygoogle || [];
      (window as any).adsbygoogle.push({});
    } catch (e) {
      console.error("Adsense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-7225960129909814"
      data-ad-slot="3865527117"
      data-ad-format="autorelaxed"
    ></ins>
  );
};

export default AdRelaxed;
