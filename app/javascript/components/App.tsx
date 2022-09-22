import * as React from "react";
import { useEffect, useState } from 'react';
import {
  ApolloClient,
  ApolloProvider,
  HttpLink,
  InMemoryCache,
} from '@apollo/client';
import { AppProvider, EmptyState, Page } from '@shopify/polaris';
import { authenticatedFetch } from '@shopify/app-bridge-utils';
import enTranslations from '@shopify/polaris/locales/en.json';
import TestData from "./TestData";

export default function App() {
  const client = new ApolloClient({
    link: new HttpLink({
      credentials: 'same-origin',
      fetch: authenticatedFetch(window.app), // created in shopify_app.js
      uri: '/graphql'
    }),
    cache: new InMemoryCache()
  });

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const getProducts = async () => {
      const SessionToken = window["app-bridge"].actions.SessionToken
      const app = window.app;

      app.dispatch(
        SessionToken.request(),
      );

      // Save a session token for future requests
      window.sessionToken = await new Promise((resolve) => {
        app.subscribe(SessionToken.Action.RESPOND, (data) => {
          resolve(data.sessionToken || "");
        });
      });

      var fetchProducts = function () {
        var headers = new Headers({ "Authorization": "Bearer " + window.sessionToken });
        return fetch("/products", { headers })
          .then(response => response.json())
          .then(data => {
            console.log('data')
            setProducts(data.data)
          });
      }();
    }

    getProducts();
  }, [])

  return (
    <AppProvider i18n={enTranslations}>
      <ApolloProvider client={client}>
        <Page>
          <EmptyState image={""}>
            <TestData />
          </EmptyState>
        </Page>
      </ApolloProvider>
    </AppProvider>
  );
}
