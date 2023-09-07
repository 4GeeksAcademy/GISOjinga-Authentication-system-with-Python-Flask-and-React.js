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
                console.log("Fetching data...");
                const result = await axios.get(process.env.BACKEND_URL+'api/private', {
                    headers: {
                        Authorization: "Bearer " + localStorage.getItem("token"), // Replace with how you store the token
                    },
                });
                
                console.log("Data fetched:", result);
                if (result.data.msg === "This is a private dashboard") {
                    setData(result.data.msg); // Assuming server sends confidential data
                }
            } catch (error) {
                if (error.response && error.response.status === 401) {
                    setIsLoggedIn(false);
                    localStorage.removeItem("token");
                    navigate("/login");
                }
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
