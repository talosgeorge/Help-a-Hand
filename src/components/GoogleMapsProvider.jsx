import { LoadScript } from "@react-google-maps/api";

export default function GoogleMapsProvider({ children }) {
  return (
    <LoadScript
      googleMapsApiKey="AIzaSyAi7_ddacsDqn_MpvepKbbJwPqKD4FwGJ4"
      libraries={['places']}
    >
      {children}
    </LoadScript>
  );
}
