import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export function Box({ name, ending, route }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [className, setClassName] = useState("");  
  const [message, setMessage] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async () => {
    try {

      const requestData = {
        username,
        password,
        ...(route === "signup" && { class:className }),  
      };

      const response = await axios.post(`http://localhost:3000/${route}`, requestData);
      const token = response.data.token;

      if (response.data.msg) {
        setMessage(response.data.msg);
      } if (token) {
        localStorage.setItem("token", token);
        setMessage(`${route} Successful`);
        console.log("Redirecting to Dashboard...");
        navigate("/dashboard"); 
      }
    } catch (error) {
      setMessage("❌ Error: " + (error.response?.data?.msg || error.message));
    }
  };

  return (
    <div>
      <div className="bg-white rounded-2xl h-90 p-6 flex flex-col items-center justify-center space-y-4 w-80">
        <div className="text-center font-semibold text-lg">{name}</div>

        <input
          type="text"
          placeholder="Username"
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
          onChange={(e) => setPassword(e.target.value)}
        />
        
        {route === "signup" && (
          <input
            type="text"
            placeholder="Year-Branch"
            className="border border-gray-300 rounded px-4 py-2 w-full max-w-xs"
            onChange={(e) => setClassName(e.target.value)}
          />
        )}

        <button
          className="bg-orange-500 text-white px-6 py-2 rounded w-full max-w-xs cursor-pointer"
          onClick={handleSubmit}
        >
          {ending}
        </button>
        {message && <p className="text-red-500 mt-4">{message}</p>}
      </div>
    </div>
  );
}
