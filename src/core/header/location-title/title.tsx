import CN from "classnames";
import React from "react";

type TitleProps = {
  text: string,
  color?: string
}

/**
 * 
 * color variable, found in type TitleProps, must align with Tailwinds color definition
 * @param TitleProps (type/interface)
 * @returns HTML Component
 */
export default function Title({ text, color = "text-slate-900" }: TitleProps) {
  const titleClassName = CN("text-xl md:text-2xl font-extrabold text-left uppercase my-4 md:", color)
  
  return (
    <h1 data-component="Header Location Title Component" 
      className={titleClassName}>
      {text}
    </h1>
  )
}