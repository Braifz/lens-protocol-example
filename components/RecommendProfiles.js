import { useState, useEffect } from "react";
import CardProfile from "./CardProfile";
import { client, recommendProfiles } from "../api";

const RecommendedProfiles = () => {
  const [profiles, setProfiles] = useState([]);

  useEffect(() => {
    fetchProfiles();
  }, []);

  async function fetchProfiles() {
    try {
      const response = await client.query(recommendProfiles).toPromise();
      setProfiles(response.data.recommendedProfiles);
    } catch (e) {
      console.log({ e });
    }
  }
  console.log(profiles);
  return (
    <div>
      {profiles.map((profile) => (
        <CardProfile profile={profile} key={profile.id} />
      ))}
    </div>
  );
};

export default RecommendedProfiles;
