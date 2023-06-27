// Copyright (c) Microsoft.
// Licensed under the MIT license.

// <AuthManagerSnippet>
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authorize, refresh, AuthConfiguration } from 'react-native-app-auth';
import moment from 'moment';

import { AuthConfig } from './AuthConfig';

const config: AuthConfiguration = {
  clientId: AuthConfig.appId,
  redirectUrl: 'graph-modernaaudit://react-native-auth/',
  scopes: AuthConfig.appScopes,
  additionalParameters: { prompt: 'select_account' },
  serviceConfiguration: {
    authorizationEndpoint:
      'https://login.microsoftonline.com/d7060bcc-bb26-4708-a91d-88362a86ae35/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/d7060bcc-bb26-4708-a91d-88362a86ae35/oauth2/v2.0/token',
  },
};



export class AuthManager {
  static signInAsync = async () => {
    const result = await authorize(config);

    ////console.log(result.accessToken);

    // Store the access token, refresh token, and expiration time in storage
    await AsyncStorage.setItem('userToken', result.accessToken);
    await AsyncStorage.setItem('refreshToken', result.refreshToken);
    await AsyncStorage.setItem('expireTime', result.accessTokenExpirationDate);
  };

  static signOutAsync = async () => {
    // Clear storage
    await AsyncStorage.removeItem('userToken');
    await AsyncStorage.removeItem('refreshToken');
    await AsyncStorage.removeItem('expireTime');
    await AsyncStorage.removeItem('user');
  };

  static getAccessTokenAsync = async () => {
    try {
      const expireTime = await AsyncStorage.getItem('expireTime');

      if (expireTime !== null) {
        // Get expiration time - 5 minutes
        // If it's <= 5 minutes before expiration, then refresh
        const expire = moment(expireTime).subtract(5, 'minutes');
        const now = moment();

        if (now.isSameOrAfter(expire)) {
          // Expired, refresh
          ////console.log('Refreshing token');
          const refreshToken = await AsyncStorage.getItem('refreshToken');
          ////console.log(`Refresh token: ${refreshToken}`);
          const result = await refresh(config, {
            refreshToken: refreshToken || '',
          });

          // Store the new access token, refresh token, and expiration time in storage
          await AsyncStorage.setItem('userToken', result.accessToken);
          await AsyncStorage.setItem('refreshToken', result.refreshToken || '');
          await AsyncStorage.setItem(
            'expireTime',
            result.accessTokenExpirationDate,
          );

          return result.accessToken;
        }

        // Not expired, just return saved access token
        const accessToken = await AsyncStorage.getItem('userToken');
        return accessToken;
      }
    } catch (e) {
      return null;

    }

    return null;
  };
}





export const autenticacionSecundaria = () => {
  const clientId = AuthConfig.appId;
  // const clientSecret = 'TU_CLIENT_SECRET';
  // const tenantId = 'TU_TENANT_ID';
  const scope = 'https://graph.microsoft.com/.default';

  async function authenticateAndFetch() {
    const tokenEndpoint = `https://login.microsoftonline.com/d7060bcc-bb26-4708-a91d-88362a86ae35/oauth2/v2.0/token`;
    const requestBody = new URLSearchParams();
    requestBody.append('client_id', clientId);
    // requestBody.append('client_secret', clientSecret);
    requestBody.append('scope', scope);
    requestBody.append('grant_type', 'client_credentials');

    try {
      const response = await fetch(tokenEndpoint, {
        method: 'POST',
        body: requestBody.toString(),
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
      });

      if (response.ok) {
        const data = await response.json();
        const accessToken = data.access_token;

        // Utiliza el token de acceso en tus peticiones a Microsoft Graph API
        const graphApiEndpoint = 'https://graph.microsoft.com/v1.0/users';
        const graphApiResponse = await fetch(graphApiEndpoint, {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        });

        const graphApiData = await graphApiResponse.json();
        //console.log('Respuesta de Microsoft Graph API:', graphApiData);
      } else {
        console.error('Error al obtener el token de acceso:', response.statusText);
      }
    } catch (error) {
      console.error('Error en la petición:', error);
    }
  }

  authenticateAndFetch();
}
// </AuthManagerSnippet>
