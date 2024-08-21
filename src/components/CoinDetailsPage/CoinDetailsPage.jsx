import { Typography } from "@mui/material";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
const CoinDetailsPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  return (
    <>
      <div className="mt-20 text-white"> Coin : {id} </div>
      <div className="mt-2 text-white font-lg"> Oops, Coin Gekko made the APIs private </div>
      <Button type="submit" variant="contained" onClick={() => { navigate('/') }}>
        <Typography variant="h5">Back Home</Typography>
      </Button>
    </>
  );
};

export default CoinDetailsPage;