import * as Linking from 'expo-linking';
import { openAuthSessionAsync } from 'expo-web-browser';
import {
  Account,
  Avatars,
  Client,
  Databases,
  OAuthProvider,
  Query,
  Storage,
} from 'react-native-appwrite';

export const config = {
  platform: 'com.thuohuynh.restate',
  endpoint: process.env.EXPO_PUBLIC_APPWRITE_ENDPOINT,
  projectId: process.env.EXPO_PUBLIC_APPWRITE_PROJECT_ID,
  databaseId: process.env.EXPO_PUBLIC_APPWRITE_DATABASE_ID,
  galleriesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_GALLERIES_COLLECTION_ID,
  reviewsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_REVIEWS_COLLECTION_ID,
  agentsCollectionId: process.env.EXPO_PUBLIC_APPWRITE_AGENTS_COLLECTION_ID,
  propertiesCollectionId: process.env.EXPO_PUBLIC_APPWRITE_PROPERTIES_COLLECTION_ID,
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

export async function getLatestProperties() {
  try {
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      [Query.orderAsc('$createdAt'), Query.limit(5)],
    );
    return result.documents;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getProperties({
  filter,
  query,
  limit,
}: {
  filter: string;
  query: string;
  limit?: number;
}) {
  try {
    const buildQuery = [Query.orderAsc('$createdAt')];
    if (filter && filter !== 'All') {
      buildQuery.push(Query.equal('type', filter));
    }
    if (query)
      buildQuery.push(
        Query.or([
          Query.search('name', query),
          Query.search('address', query),
          Query.search('type', query),
        ]),
      );
    if (limit) buildQuery.push(Query.limit(limit));
    const result = await databases.listDocuments(
      config.databaseId!,
      config.propertiesCollectionId!,
      buildQuery,
    );

    return result.documents;
  } catch (error) {
    console.error(error);
    return [];
  }
}

export async function getPropertyById({ id }: { id: string }) {
  try {
    const result = await databases.getDocument(
      config.databaseId!,
      config.propertiesCollectionId!,
      id,
    );
    return result;
  } catch (error) {
    console.error(error);
    return null;
  }
}
