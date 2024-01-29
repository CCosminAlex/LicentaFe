import classed from "classed-components";

const colors = {
  // class={
  none: "",
  white:
    "text-slate-500 bg-white hover:bg-slate-100 active:bg-slate-200 ring-slate-700/70",
  green:
    "bg-green-700 hover:bg-green-600 active:bg-green-700 text-white hover:text-green-100 active:text-green-200 ring-green-700/70",
  lime: "bg-lime-400 hover:bg-lime-500 active:bg-lime-600 text-white hover:text-slate-100 active:text-slate-200 ring-lime-700/70",
  blue: "bg-blue-600 hover:bg-blue-500 active:bg-lime-600 text-white hover:text-slate-100 active:text-slate-200 ring-lime-700/70",
  yellow:
    "bg-yellow-600 hover:bg-yellow-500 active:bg-yellow-600 text-white hover:text-slate-100 active:text-slate-200 ring-lime-700/70",
};

const sizes = {
  // class={
  none: "",
  xs: "px-5 py-3 text-xs uppercase tracking-wider",
  sm: "px-5.5 py-3.5 text-sm uppercase tracking-wider",
  base: "px-6 py-4 text-base",
  lg: "px-7 py-4.5 text-lg",
  xl: "px-8 py-5 text-xl",
};

export interface ButtonProps {
  color?: keyof typeof colors;
  size?: keyof typeof sizes;
}

const Button = classed.button<ButtonProps>((props) => [
  "font-semibold uppercase transition-colors rounded outline-none leading-none focus-visible:ring-4 cursor-pointer select-none disabled:cursor-default disabled:opacity-30 disabled:pointer-events-none",
  colors[props.color ?? "none"],
  sizes[props.size ?? "xs"],
]);

export default Button;
