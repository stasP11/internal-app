import { CircularProgress } from "@mui/material";

export default function CircularProgressMUI({ isLoaded }: any) {
  return (
    <>
      {isLoaded ? (
        <CircularProgress
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
          }}
        />
      ) : null}
    </>
  );
}
