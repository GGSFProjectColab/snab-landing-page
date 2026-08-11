import GradualBlur from "@/components/ui/gradual-blur";

export function SiteGradualBlur() {
  return (
    <GradualBlur
      position="bottom"
      target="page"
      height="clamp(4rem, 9vh, 6.25rem)"
      strength={1.65}
      divCount={7}
      curve="bezier"
      exponential
      opacity={0.72}
      zIndex={50}
    />
  );
}
