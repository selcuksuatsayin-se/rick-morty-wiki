const BASE_URL = 'https://rickandmortyapi.com/api';

// Generic fetch function with error handling
export const fetchData = async (endpoint) => {
  try {
    const response = await fetch(`${BASE_URL}${endpoint}`);
    if (!response.ok) {
      throw new Error('Failed to fetch data');
    }
    return await response.json();
  } catch (error) {
    console.error('API Error:', error);
    throw error;
  }
};

// ============================================
// CHARACTERS
// ============================================

// Get all characters with pagination
export const getCharacters = (page = 1) => {
  return fetchData(`/character?page=${page}`);
};

// Get a single character by ID
export const getCharacterById = (id) => {
  return fetchData(`/character/${id}`);
};

// Search characters by name
export const searchCharacters = (name) => {
  return fetchData(`/character?name=${name}`);
};

// Filter characters with multiple parameters
// params can include: name, status, species, type, gender, page
export const filterCharacters = (params) => {
  const queryString = new URLSearchParams(params).toString();
  return fetchData(`/character?${queryString}`);
};

// ============================================
// EPISODES
// ============================================

// Get all episodes with pagination
export const getEpisodes = (page = 1) => {
  return fetchData(`/episode?page=${page}`);
};

// Get a single episode by ID
export const getEpisodeById = (id) => {
  return fetchData(`/episode/${id}`);
};

// Search episodes by name
export const searchEpisodes = (name) => {
  return fetchData(`/episode?name=${name}`);
};

// Filter episodes with multiple parameters
// params can include: name, episode, page
export const filterEpisodes = (params) => {
  const queryString = new URLSearchParams(params).toString();
  return fetchData(`/episode?${queryString}`);
};

// ============================================
// LOCATIONS
// ============================================

// Get all locations with pagination
export const getLocations = (page = 1) => {
  return fetchData(`/location?page=${page}`);
};

// Get a single location by ID
export const getLocationById = (id) => {
  return fetchData(`/location/${id}`);
};

// Search locations by name
export const searchLocations = (name) => {
  return fetchData(`/location?name=${name}`);
};

// Filter locations with multiple parameters
// params can include: name, type, dimension, page
export const filterLocations = (params) => {
  const queryString = new URLSearchParams(params).toString();
  return fetchData(`/location?${queryString}`);
};