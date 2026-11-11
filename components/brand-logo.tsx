// Canonical artwork lives in public/brand. Keep the supplied PNGs unchanged.
export function BrandLogo() {
  return (
    <span className="brand-logo" aria-hidden="true">
      <svg
        className="brand-logo-full"
        viewBox="175 217 1822 226"
        focusable="false"
      >
        <image
          href="/brand/schicane-gold-wordmark.png"
          width="2172"
          height="724"
        />
      </svg>
      <svg
        className="brand-logo-compact"
        viewBox="25 24 492 202"
        focusable="false"
      >
        <image
          href="/brand/schicane-gold-symbol.png"
          width="557"
          height="262"
        />
      </svg>
    </span>
  );
}
