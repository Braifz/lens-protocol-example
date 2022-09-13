import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client, getProfileId, getPublications } from "../../api";
import Image from "next/image";

const Profile = () => {
  const [profile, setProfiles] = useState({});
  const [pubs, setPubs] = useState([]);
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

      const publicationData = await client
        .query(getPublications, { id })
        .toPromise();
      setPubs(publicationData.data.publications.items);
      console.log({ publicationData });
    } catch (e) {
      console.log(e);
    }
  };

  console.log(pubs);
  if (!profile) return null;

  return (
    <div
      style={{
        border: "1px solid white",
        margin: "8px",
        padding: "16px",
        borderRadius: "8px",
      }}
    >
      <h1>{profile.handle}</h1>
      <h3>{profile.bio}</h3>
      {profile.picture ? (
        <Image
          style={{
            backgroundColor: "white",
            borderRadius: "16px",
          }}
          src={profile.picture.original.url}
          width="100px"
          height="100px"
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
      )}

      {/* <p>Followers: {profile.stats.totalFollowers}</p>
      <p>Following: {profile.stats.totalFollowing}</p> */}
      <h2>Publications</h2>
      {pubs.length > 0 &&
        pubs.map((pub, index) => (
          <div style={{ padding: "16px" }} key={index}>
            <h3>Content</h3>
            <p>{pub.metadata.content}</p>
            <h2>description</h2>
            <p>{pub.metadata.description}</p>
            <p>hello</p>
          </div>
        ))}
    </div>
  );
};

export default Profile;
