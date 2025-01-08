const API_BASE_URL = '/api';

export const fetchProperties = async () => {
    const response = await fetch(`${API_BASE_URL}/properties`);
    if (!response.ok) {
        throw new Error('Failed to fetch properties');
    }
    return response.json();
};

export const createProperty = async (propertyData) => {
    const response = await fetch(`${API_BASE_URL}/properties`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(propertyData),
    });
    if (!response.ok) {
        throw new Error('Failed to create property');
    }
    return response.json();
};

// ...additional API methods...
