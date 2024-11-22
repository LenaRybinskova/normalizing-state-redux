import { RotatingTriangles } from "react-loader-spinner";

export const Loader = () => {
  return (
    <RotatingTriangles
      visible={true}
      height="200"
      width="200"
      colors={[
        "var(--text-color)",
        "var(--text-color-hover)",
        "var(--background-post-color)"
      ]}
      ariaLabel="rotating-triangles-loading"
    />
  );
};
