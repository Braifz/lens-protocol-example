import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client, getProfileId } from "../../api";

const Profile = () => {
  const [profile, setProfiles] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const response = await client.query(getProfileId(id)).toPromise();
      console.log({ response });
      setProfiles({ response });
    } catch (e) {
      console.log(e);
    }
  };

  return (
    <div
      style={{
        border: "1px solid white",
        margin: "8px",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      {id}
    </div>
  );
};

export default Profile;
