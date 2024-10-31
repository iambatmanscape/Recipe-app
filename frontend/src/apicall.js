/**
 * Fetches recipes from the API with pagination support
 * @param {number} skip - Number of items to skip (for pagination)
 * @param {number} limit - Maximum number of items to return
 * @param {string} baseUrl - Base URL of the API (optional)
 * @returns {Promise<Object>} The recipes data
 * @throws {Error} If the request fails
 */

const baseUrl = 'https://recipe-app-vhll.onrender.com';

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
export async function fetchRecipe(recipeId) {
    try {
        const url = `${baseUrl}/recipes/${recipeId}`;
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

