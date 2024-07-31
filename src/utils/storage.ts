import AsyncStorage from "@react-native-async-storage/async-storage";

export enum STORAGE {
  LANGUAGE = "@app:language",
}

export const setStorageData = async (key: string, value: any) => {
  try {
    await AsyncStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(error);
  }
};

export const getStorageData = async (key: string) => {
  try {
    const data = await AsyncStorage.getItem(key);
    return JSON.parse(data);
  } catch (error) {
    console.error(error);
  }
};

export const removeStorageData = async (key: string) => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(error);
  }
};
