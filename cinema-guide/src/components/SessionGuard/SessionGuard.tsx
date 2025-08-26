import { useDispatch } from "react-redux";
import { setLoggedIn, setLoggedOut } from "../../store/userSlice";
import { useEffect } from "react";
import { useUserSession } from "../../shared/hooks/useUserSession";

export const SessionGuard = () => {
  const dispatch = useDispatch();
  const { getUserSession } = useUserSession();

  useEffect(() => {
    const session = getUserSession();
    console.log(session)

    if (session) {
      console.log("user is logged in");
      dispatch(setLoggedIn()); // Dispatch the action to update the state
    } else {
      dispatch(setLoggedOut());
      console.log("user is not logged in");
    }
  }, []); // Ensure this only runs when the component is mounted

  return null; 
};
