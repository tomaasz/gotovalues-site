import clsx from "clsx";
import { ReactNode, ElementType } from "react";

type SectionHeadingProps = {
  eyebrow: string;
  heading: ReactNode;
  children?: ReactNode;
  className?: string;
  inline?: boolean;
  as?: ElementType;
  level?: "h1" | "h2" | "h3";
};

export function SectionHeading({
  eyebrow,
  heading,
  children,
  className,
  inline = false,
  as: Component = "div",
  level: HeadingTag = "h2",
}: SectionHeadingProps) {
  const content = (
    <>
      <p className="eyebrow">{eyebrow}</p>
      <HeadingTag>{heading}</HeadingTag>
    </>
  );

  return (
    <Component className={clsx("section-heading", inline && "section-heading-inline", className)}>
      {inline ? (
        <>
          <div>{content}</div>
          {children}
        </>
      ) : (
        <>
          {content}
          {children}
        </>
      )}
    </Component>
  );
}
