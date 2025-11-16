/**
 * Fetches recipes from the API with pagination support
 * @param {number} skip - Number of items to skip (for pagination)
 * @param {number} limit - Maximum number of items to return
 * @param {string} baseUrl - Base URL of the API (optional)
 * @returns {Promise<Object>} The recipes data
 * @throws {Error} If the request fails
 */


export async function fetchRecipes(baseUrl, skip = 0, limit = 10) {
    try {
        if (baseUrl.length === 0) {
            baseUrl = 'http://localhost:8000';
        }
        const url = `${baseUrl}/recipes?skip=${skip}&limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'ngrok-skip-browser-warning': 'true',  // Skip ngrok browser warning
                'Content-Type': 'application/json'
            },
            cache: 'no-store'  // Prevents caching issues with ngrok
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
export async function fetchRecipeById(baseUrl, recipeId) {
    try {
        if (baseUrl.length === 0) {
            baseUrl = 'http://localhost:8000';
        }
        const url = `${baseUrl}/recipes/getbyid/${recipeId}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'ngrok-skip-browser-warning': 'true',  // Skip ngrok browser warning
                'Content-Type': 'application/json'
            },
            cache: 'no-store'  // Prevents caching issues with ngrok
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
 * @param {string} baseUrl - Base URL of the API (optional)
 * @param {string} recipe_query - The name of the recipe to fetch
 * @param {number} skip - Number of items to skip (for pagination)
 * @param {number} limit - Maximum number of items to return
 * @returns {Promise<Object>} The recipe data
 * @throws {Error} If the request fails
 */
export async function fetchRecipeByName(baseUrl, recipe_query, skip = 0, limit = 10) {
    try {
        if (baseUrl.length === 0) {
            baseUrl = 'http://localhost:8000';
        }
        const url = `${baseUrl}/recipes/getbyname/${recipe_query}?skip=${skip}&limit=${limit}`;
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'accept': 'application/json',
                'ngrok-skip-browser-warning': 'true',  // Skip ngrok browser warning
                'Content-Type': 'application/json'
            },
            cache: 'no-store'  // Prevents caching issues with ngrok
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