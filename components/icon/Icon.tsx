import clsx from "clsx";
import { ComponentProps } from "react";

export default function Icon(props: ComponentProps<"i">) {
  return (
    <div>
      <link
        rel="stylesheet"
        href="https://maxst.icons8.com/vue-static/landings/line-awesome/line-awesome/1.3.0/css/line-awesome.min.css"
      />
      <link />
      <i
        role="presentational"
        {...props}
        className={clsx("align-baseline leading-none", props.className)}
      />
    </div>
  );
}
