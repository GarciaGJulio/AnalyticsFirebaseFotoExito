import React, { useEffect } from 'react';
import { authorize, refresh, revoke } from 'react-native-app-auth';
import { AuthConfig } from './AuthConfig';
import { encode } from 'base-64';
import AsyncStorage from '@react-native-async-storage/async-storage';

const authConfig = {
  clientId: AuthConfig.appId,
  redirectUrl: 'graph-modernaaudit://react-native-auth/',
  scopes: ['openid', 'profile', 'offline_access', 'Files.ReadWrite'], // Ámbitos necesarios para acceder a OneDrive
  serviceConfiguration: {
    authorizationEndpoint: 'https://login.microsoftonline.com/d7060bcc-bb26-4708-a91d-88362a86ae35/oauth2/v2.0/authorize',
    tokenEndpoint: 'https://login.microsoftonline.com/d7060bcc-bb26-4708-a91d-88362a86ae35/oauth2/v2.0/token',
    revocationEndpoint: 'https://login.microsoftonline.com/d7060bcc-bb26-4708-a91d-88362a86ae35/oauth2/v2.0/logout',
  },
};

const PKCE_CODE_VERIFIER_LENGTH = 64;

const generateRandomString = (length) => {
  let text = '';
  const possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < length; i++) {
    text += possible.charAt(Math.floor(Math.random() * possible.length));
  }

  return text;
};

const computeChallenge = (codeVerifier) => {
  const base64UrlEncoded = base64UrlEncode(codeVerifier);
  return base64UrlEncoded.replace(/=/g, '');
};

const base64UrlEncode = (text) => {
  let base64 = encode(text);
  base64 = base64.replace(/\+/g, '-').replace(/\//g, '_');
  return base64;
};

export const authenticate = async () => {
  try {
    const codeVerifier = generateRandomString(PKCE_CODE_VERIFIER_LENGTH);
    const codeChallenge = computeChallenge(codeVerifier);

    const configWithExtraParams = {
      ...authConfig,
      additionalParameters: {
        code_challenge: codeChallenge,
        code_challenge_method: 'S256',
      },
    };



    const result = await authorize(authConfig, configWithExtraParams);
    console.log('Token de acceso:', result.accessToken);
    await  AsyncStorage.setItem('userToken2', result.accessToken);
    console.log('Código de verificación:', codeVerifier);
    
    console.log('usertoken',await AsyncStorage.getItem('userToken'))
    console.log('usertoken2',await AsyncStorage.getItem('userToken2'))

  } catch (error) {
    console.log('Error de autenticación:', error);
  }
};

export const refreshToken = async (refreshToken) => {
  try {
    const result = await refresh(authConfig, { refreshToken });
    console.log('Nuevo token de acceso:', result.accessToken);
  } catch (error) {
    console.log('Error al refrescar el token:', error);
  }
};

export const revokeToken = async (accessToken) => {
  try {
    await revoke(authConfig, { tokenToRevoke: accessToken });
    console.log('Token revocado exitosamente');
  } catch (error) {
    console.log('Error al revocar el token:', error);
  }
};

