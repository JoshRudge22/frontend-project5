import jwtDecode from "jwt-decode";

// Function to set the token timestamp
export const setTokenTimestamp = (data) => {
    if (!data || !data.refresh_token) {
        console.error("Invalid data provided for setting token timestamp.");
        return;
    }

    try {
        const refreshTokenTimestamp = jwtDecode(data.refresh_token).exp;
        localStorage.setItem("refreshTokenTimestamp", refreshTokenTimestamp);
    } catch (error) {
        console.error("Failed to decode refresh token:", error);
    }
};

// Function to check if the token should be refreshed
export const shouldRefreshToken = () => {
    const refreshTokenTimestamp = localStorage.getItem("refreshTokenTimestamp");
    if (!refreshTokenTimestamp) {
        return false;
    }
    
    // Check if the token is expired
    const currentTime = Math.floor(Date.now() / 1000); // Current time in seconds
    return refreshTokenTimestamp > currentTime;
};

// Function to remove the token timestamp
export const removeTokenTimestamp = () => {
    localStorage.removeItem("refreshTokenTimestamp");
};

// Example usage
const tokenData = { refresh_token: "your.jwt.refresh.token" };

// Set the token timestamp
setTokenTimestamp(tokenData);

// Check if the token should be refreshed
if (shouldRefreshToken()) {
    console.log("Token should be refreshed.");
} else {
    console.log("Token is valid or has expired.");
}

// Remove the token timestamp if needed
removeTokenTimestamp();
