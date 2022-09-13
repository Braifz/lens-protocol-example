import { useState, useEffect } from "react";
import { client, recommendProfiles } from "../api";
import Link from "next/link";
import Image from "next/image";

export default function Home() {
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
  // console.log(profiles[0].picture.original.url);
  return (
    <div>
      {profiles.map((profile) => (
        <Link href={`/profile/${profile.id}`} key={profile.id}>
          <a>
            <div>
              <h4>{profile.handle}</h4>
              <p>{profile.name}</p>
              <p>{profile.bio}</p>
              <h3>{profile.ownedBy}</h3>
              {/* {profile.picture ? (
                <Image
                  src={profile.picture.original.url}
                  width="60px"
                  height="60px"
                  alt="img-profile"
                />
              ) : (
                <div
                  style={{
                    width: "60px",
                    height: "60px",
                    backgroundColor: "white",
                    borderRadius: "16px",
                  }}
                ></div>
              )} */}
            </div>
          </a>
        </Link>
      ))}
    </div>
  );
}
