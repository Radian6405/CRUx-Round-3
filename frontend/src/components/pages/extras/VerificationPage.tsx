import axios, { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate, useSearchParams } from "react-router-dom";

function Verification() {
  const [cookie] = useCookies(["token"]);
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const [message, setMessage] = useState("Verifying...");

  async function verifyUser() {
    try {
      const response = await axios.post(
        "http://localhost:8000/api/verify/email",
        { token: searchParams.get("token") },
        { withCredentials: true, headers: { Authorization: cookie.token } }
      );

      if (response.status === 201) {
        setMessage("Sucessfully verified, redirecting shortly");
        setTimeout(() => navigate("/"), 10000);
      }
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response?.status === 404) return navigate("/notfound");
        else console.log(error);
      }
    }
  }
  useEffect(() => {
    verifyUser();
  }, []);
  return (
    <>
      <div>{message}</div>
    </>
  );
}

export default Verification;
