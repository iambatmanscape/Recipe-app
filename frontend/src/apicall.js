/**
 * Fetches recipes from the API with pagination support
 * @param {number} skip - Number of items to skip (for pagination)
 * @param {number} limit - Maximum number of items to return
 * @param {string} baseUrl - Base URL of the API (optional)
 * @returns {Promise<Object>} The recipes data
 * @throws {Error} If the request fails
 */

const baseUrl = 'https://neglected-spider-7vpxxwx4qg562pxpp-8000.app.github.dev';

export async function fetchRecipes(skip = 0, limit = 10) {
    try {
        const url = `${baseUrl}/recipes?skip=${skip}&limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipes:', error);
        throw error;
    }
}

/**
 * Fetches a specific recipe by ID
 * @param {string} recipeId - The ID of the recipe to fetch
 * @param {string} baseUrl - Base URL of the API (optional)
 * @returns {Promise<Object>} The recipe data
 * @throws {Error} If the request fails
 */
export async function fetchRecipeById(recipeId) {
    try {
        const url = `${baseUrl}/recipes/getbyid/${recipeId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error;
    }
}

/**
 * Filters recipes by name
 * @param {string} recipe_query - The name of the recipe to fetch
 * @param {string} baseUrl - Base URL of the API (optional)
 * @returns {Promise<Object>} The recipe data
 * @throws {Error} If the request fails
 */
export async function fetchRecipeByName(recipe_query,skip,limit) {
    try {
        const url = `${baseUrl}/recipes/getbyname/${recipe_query}?skip=${skip}&limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json'
            }
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching recipe:', error);
        throw error;
    }
}

