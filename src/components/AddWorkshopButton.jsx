import React from "react";
import { useNavigate } from "react-router-dom";

function AddWorkshopButton() {
  const navigate = useNavigate();

  return <button onClick={() => navigate("/newworkshop")}>Add Workshop</button>;
}

export default AddWorkshopButton;
