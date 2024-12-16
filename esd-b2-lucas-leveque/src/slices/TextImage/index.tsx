import { Content } from "@prismicio/client";
import { PrismicNextImage } from "@prismicio/next";
import { PrismicRichText, SliceComponentProps } from "@prismicio/react";
import style from "./index.module.css";

/**
 * Props for `TextImage`.
 */
export type TextImageProps = SliceComponentProps<Content.TextImageSlice>;

/**
 * Component for "TextImage" Slices.
 */
const TextImage = ({ slice }: TextImageProps): JSX.Element => {
  const { text, image } = slice.primary;
  return (
    <section
      data-slice-type={slice.slice_type}
      data-slice-variation={slice.variation}
      className={style.main + " " + style[slice.variation]}
    >
      <div>
        {/*Overline */}
        {slice.variation === "default" && (
          <p className={"overline"}>{slice.primary.overline}</p>
        )}
      </div>
      <div>
        {/* Text */}
        <PrismicRichText field={text} />
      </div>
      <div>
        {/* Image */}
        <PrismicNextImage field={image} />
      </div>
    </section>
  );
};

export default TextImage;
