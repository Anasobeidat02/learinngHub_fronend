import { useEffect } from "react";

export default function AdComponent() {
  useEffect(() => {
    try {
      (window.adsbygoogle = window.adsbygoogle || []).push({});
    } catch (e) {
      console.error("AdSense error:", e);
    }
  }, []);

  return (
    <ins
      className="adsbygoogle"
      style={{ display: "block" }}
      data-ad-client="ca-pub-7225960129909814"
      data-ad-slot="8427588655" // ← هذا رقم slot الخاص بك
      data-ad-format="auto"
      data-full-width-responsive="true"
    ></ins>
  );
}
