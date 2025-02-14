import { AsyncStorage } from 'react-native';

export const storageKeys = {
    AUTH_TOKEN: 'AUTH_TOKEN',
    SPEAKERS: 'SPEAKERS',
    EVENT_DATA: 'EVENT_DATA',
    SPEAKERS_UPDATED_AT: 'SPEAKERS_UPDATED_AT',
    EVENT_DATA_UPDATED_AT: 'EVENT_DATA_UPDATED_AT',
    NOTES: 'NOTES',
    FAVORITES: 'FAVORITES'
};

const defaultReturn = {
    AUTH_TOKEN: '',
    SPEAKERS: [],
    EVENT_DATA: {},
    NOTES: {},
    FAVORITES: {}
};

export function isValidKey(key) {
    return !!Object.keys(storageKeys).find(name => storageKeys[name] === key);
}

export async function getItem(key) {
    if (!key) {
        throw new Error('key is required');
    }
    if (!isValidKey(key)) {
        throw new Error(`${key} is not a valid storageKey`);
    }

    let val = defaultReturn[key];
    try {
        val = await AsyncStorage.getItem(key);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
    return val;
}

export async function setItem(key, val) {
    if (!key) {
        throw new Error('key is required');
    }
    if (!isValidKey(key)) {
        throw new Error(`${key} is not a valid storageKey`);
    }

    try {
        await AsyncStorage.setItem(key, val);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}

export async function removeItem(key) {
    if (!key) {
        throw new Error('key is required');
    }
    if (!isValidKey(key)) {
        throw new Error(`${key} is not a valid storageKey`);
    }

    try {
        await AsyncStorage.removeItem(key);
    } catch (error) {
        console.error('AsyncStorage error: ' + error.message);
    }
}
