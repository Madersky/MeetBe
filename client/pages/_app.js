import buildClient from "../api/buildClient";

const AppComponent = ({ Component, pageProps, currentUser }) => {
  return (
    <div>
      <meta
        name="viewport"
        content="width=device-width, initial-scale=1, user-scalable=no"
      ></meta>
      <Component currentUser={currentUser} {...pageProps} />
    </div>
  );
};

AppComponent.getInitialProps = async (appContext) => {
  const client = buildClient(appContext.ctx);
  const { data } = await client.get("/api/users/currentuser");

  let pageProps = {};
  if (appContext.Component.getInitialProps) {
    pageProps = await appContext.Component.getInitialProps(
      appContext.ctx,
      client,
      data.currentUser
    );
  }

  return {
    pageProps,
    ...data,
  };
};

export default AppComponent;
