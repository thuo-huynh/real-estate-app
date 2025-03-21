import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import { Account, Avatars, Client, Databases, OAuthProvider, Storage } from 'react-native-appwrite';

export const config = {
  platform: 'com.thuohuynh.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
};

export const client = new Client();
client.setEndpoint(config.endpoint!).setProject(config.projectId!).setPlatform(config.platform!);

export const avatar = new Avatars(client);
export const accounts = new Account(client);
export const databases = new Databases(client);
export const storage = new Storage(client);

export async function login() {
  try {
    const redirectUri = Linking.createURL('/');
    const response = await accounts.createOAuth2Token(OAuthProvider.Google, redirectUri);
    if (!response) {
      throw new Error('Failed to create OAuth2 token');
    }

    const browserResult = await openAuthSessionAsync(response.toString(), redirectUri);
    if (browserResult.type !== 'success') throw new Error('Failed to open browser');

    const url = new URL(browserResult.url);
    const secret = url.searchParams.get('secret')?.toString();
    const userId = url.searchParams.get('userId')?.toString();
    if (!secret || !userId) throw new Error('Fail to get secret or userId from redirect url');

    const session = await accounts.createSession(userId, secret);
    if (!session) throw new Error('Failed to create session');

    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function logout() {
  try {
    const result = await accounts.deleteSession('current');
    return result;
  } catch (error) {
    console.error(error);
    return false;
  }
}

export async function getCurrentUser() {
  try {
    const user = await accounts.get();
    if (user.$id) {
      const userAvatar = avatar.getInitials(user.name);
      return {
        ...user,
        avatar: userAvatar.toString(),
      };
    }
    return user;
  } catch (error) {
    console.log(error);
    return null;
  }
}
