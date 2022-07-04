import { ApolloProvider } from "@apollo/client"

import { apolloClient } from "./lib/apollo";
import { BrowserRouter } from "react-router-dom";
import { Router } from "./Router";

function App() {
  return (
    <ApolloProvider client={apolloClient}>
      <BrowserRouter>
        <Router />
      </BrowserRouter>
    </ApolloProvider>
  )
}

export default App
