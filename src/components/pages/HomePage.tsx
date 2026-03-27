import React, { useEffect } from 'react';

export default function HomePage() {

  useEffect(() => {
    const script = document.createElement('script');
    script.src = "https://accounts.google.com/gsi/client";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    script.onload = () => {
      google.accounts.id.initialize({
        client_id: "948102948683-u0o9lg73rprka2t0pp0tr4ol96echnf4.apps.googleusercontent.com",
        callback: handleCredentialResponse
      });

      google.accounts.id.renderButton(
        document.getElementById("googleButton"),
        {
          theme: "outline",
          size: "large"
        }
      );
    };
  }, []);

  async function handleCredentialResponse(response) {
    try {
      const res = await fetch("https://comando-server.onrender.com/auth/google", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          token: response.credential
        })
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("authToken", data.token);
        localStorage.setItem("playerData", JSON.stringify(data.player));

        alert("Login realizado com sucesso!");

      } else {
        alert("Erro no login");
        console.error(data);
      }

    } catch (err) {
      console.error(err);
      alert("Erro ao conectar com servidor");
    }
  }

  return (
    <div style={{
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: "#0b0b0f",
      flexDirection: "column",
      color: "white"
    }}>
      <h1 style={{ marginBottom: 20 }}>Comando</h1>

      <div id="googleButton"></div>
    </div>
  );
}