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
      console.log({ response });
      setProfiles(response.data.recommendedProfiles);
    } catch (e) {
      console.log({ e });
    }
  }
  console.log(profiles);
  // console.log(profiles[0].picture.original.url);
  return (
    <div>
      {profiles.length > 0 &&
        profiles.map((profile) => (
          <Link href={`/profile/${profile.id}`} key={profile.id}>
            <a>
              <div
                style={{
                  border: "1px solid white",
                  margin: "8px",
                  padding: "16px",
                  borderRadius: "8px",
                }}
              >
                {/* {profile.picture ? (
                  <Image
                    src={profile.picture.original.url}
                    width="60px"
                    height="60px"
                    alt="picture-profile"
                  />
                ) : (
                  <div
                    style={{
                      width: "60px",
                      height: "60px",
                      backgroundColor: "white",
                    }}
                  ></div>
                )} */}
                <h4>{profile.handle}</h4>
                <p>{profile.name}</p>
                <p>{profile.bio}</p>
              </div>
            </a>
          </Link>
        ))}
    </div>
  );
}
