import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext"; // Assuming AuthContext is in 'context' directory

const Validation = () => {
    const [data, setData] = useState(null);
    const { setIsLoggedIn } = useAuth(); // Use the Auth context
    const navigate = useNavigate();

    useEffect(() => {
        // Function to fetch data from the /private route
        const fetchData = async () => {
            try {
                const result = await axios.get("/private", {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), // Replace with how you store the token
                    },
                });
                
                if (result.data.success) {
                    setData(result.data.data); // Assuming server sends confidential data
                }
            } catch (error) {
                // If an error occurs (e.g., token invalid, server error), log the user out
                setIsLoggedIn(false);
                localStorage.removeItem("token");
                navigate("/login");
            }
        };

        fetchData();
    }, [setIsLoggedIn, navigate]);

    return (
        <div>
            {data ? (
                <>
                    <h1>Validation Successful</h1>
                    <p>Your confidential data: {data}</p>
                </>
            ) : (
                <h1>Validating...</h1>
            )}
        </div>
    );
};

export default Validation;
