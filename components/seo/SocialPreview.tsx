type SocialPreviewProps = {
  backgroundSrc: string;
  logoSrc?: string;
  eyebrow?: string;
  title?: string;
  features?: readonly string[];
};

export function SocialPreview({
  backgroundSrc,
  logoSrc,
  eyebrow = "ENGINEERING FIRM",
  title = "Systems engineered for production.",
  features = ["Intelligent platforms", "Workflow orchestration", "Production software"],
}: SocialPreviewProps) {
  return (
    <div
      style={{
        position: "relative",
        display: "flex",
        width: "100%",
        height: "100%",
        overflow: "hidden",
        background: "#07111f",
        color: "#fff8eb",
      }}
    >
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={backgroundSrc}
        alt=""
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
        }}
      />
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          background:
            "linear-gradient(90deg, rgba(4,12,23,.98) 0%, rgba(4,12,23,.94) 37%, rgba(4,12,23,.35) 64%, rgba(4,12,23,.08) 100%)",
        }}
      />
      <div
        style={{
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          width: "660px",
          padding: "58px 0 54px 64px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "14px" }}>
          {logoSrc ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={logoSrc} alt="" width={48} height={48} style={{ objectFit: "contain" }} />
          ) : null}
          <div
            style={{
              display: "flex",
              fontSize: "26px",
              fontWeight: 700,
              letterSpacing: "-0.4px",
            }}
          >
            SNAB Innovations
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: "20px" }}>
          <div
            style={{
              display: "flex",
              color: "#f3a03a",
              fontSize: "16px",
              fontWeight: 700,
              letterSpacing: "2.1px",
            }}
          >
            {eyebrow}
          </div>
          <div
            style={{
              display: "flex",
              maxWidth: "610px",
              fontSize: "58px",
              fontWeight: 750,
              lineHeight: 1.02,
              letterSpacing: "-2.5px",
            }}
          >
            {title}
          </div>
        </div>

        <div style={{ display: "flex", gap: "20px", alignItems: "center" }}>
          {features.map((feature, index) => (
            <div
              key={feature}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "20px",
                color: "#c7d0dc",
                fontSize: "17px",
              }}
            >
              {index > 0 ? (
                <span style={{ color: "#f05b2b", fontSize: "18px" }}>•</span>
              ) : null}
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
