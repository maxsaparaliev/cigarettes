import Head from "next/head"
import React, {FC} from "react";

type Props = {
  title?: string,
  social_title?: string;
  social_image?: string;
  social_description?: string;
  description?: string;

}
const MetaHead: FC<Props> = ({
                               title = "American Cigarettes",
                               social_title,
                               social_image,
                               social_description
                             }) => {
  return (
    <Head>
      {/*//basic metadata*/}
      <title>{title}</title>

      {/*//social links metadata*/}
      <meta name="description" content="Магазин зарубежных сигарет и табака" key="desc"/>
      <meta property="og:type" content="website" />
      <meta property="og:title" content={`${social_title ? social_title : "American cigarettes"}`}/>
      <meta
        property="og:description"
        content={`${social_description ? social_description : "Магазин зарубежных сигарет и табака"}`}
      />
      <meta
        property="og:image"
        content={`${social_image ? social_image : "https://static01.nyt.com/images/2015/08/28/business/28TABACCO/28TABACCO-superJumbo.jpg"}`}
      />
      <meta property="og:url" content="https://americancigarettes.ru"/>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1"
      />
    </Head>
  )
}

export default MetaHead
