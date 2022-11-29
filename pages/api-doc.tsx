import { Meta } from "components/meta";
import { server } from "configs/server";
import { GetStaticProps, InferGetStaticPropsType } from "next";
import { createSwaggerSpec } from "next-swagger-doc";
import dynamic from "next/dynamic";
import "swagger-ui-react/swagger-ui.css";

const SwaggerUI = dynamic<{ spec: Record<string, any> }>(
  // @ts-ignore
  import("swagger-ui-react"),
  { ssr: false }
);

const ApiDoc = ({ spec }: InferGetStaticPropsType<typeof getStaticProps>) => {
  return (
    <>
      <Meta title="NetComic Api" description="A api comic crawled from website Nhat Truyen" />
      <div className="pt-4 bg-bglight dark:bg-bglight">
        <SwaggerUI spec={spec} />;
      </div>
    </>
  );
};

export const getStaticProps: GetStaticProps = async () => {
  const spec: Record<string, any> = createSwaggerSpec({
    apiFolder: "pages/api",
    definition: {
      openapi: "3.0.0",
      servers: [{ url: `${server}/api` }, { url: "http://localhost:3000/api" }],
      info: {
        title: "NetComic Api",
        version: "1.0.0",
        description: "A api comic crawled from website Nhat Truyen"
      }
    }
  });
  return {
    props: {
      spec
    }
  };
};

export default ApiDoc;
