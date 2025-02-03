import { useNavigate } from "react-router-dom";

function AddWorkshopButton() {
  const navigate = useNavigate();

  return <button className="font-light font-accent tracking-wider text-xl lg:text-2xl border-[1px] border-orange-dark/70 p-2 rounded shadow-sm shadow-orange-dark/80 bg-orange-light/50" onClick={() => navigate("/newworkshop")}>Add Workshop</button>;
}

export default AddWorkshopButton;
