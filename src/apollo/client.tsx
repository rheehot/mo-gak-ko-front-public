import ApolloClient from "apollo-boost";
import { defaults, resolvers } from "./localState";

export default new ApolloClient({
  uri:
    process.env.NODE_ENV === "production"
      ? process.env.REACT_APP_PROD_API_URL
      : process.env.REACT_APP_DEV_API_URL,
  clientState: {
    defaults,
    resolvers,
  },
  request: (operation) => {
    const token = localStorage.getItem("token");
    operation.setContext({
      headers: {
        authorization: token ? `Bearer ${token}` : "",
      },
    });
  },
});
