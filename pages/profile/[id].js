import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client, getProfileId } from "../../api";
import Image from "next/image";

const Profile = () => {
  const [profile, setProfiles] = useState({});
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      fetchProfile();
    }
  }, [id]);

  const fetchProfile = async () => {
    try {
      const response = await client.query(getProfileId, { id }).toPromise();
      console.log(response);
      setProfiles(response.data.profile);
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
      <h2>{id}</h2>
      <h1>{profile.handle}</h1>
      <h3>{profile.bio}</h3>

      {/* <Image
        src={profile.picture.original.url}
        width="60px"
        height="60px"
        alt="img-profile"
      /> */}
    </div>
  );
};

export default Profile;
