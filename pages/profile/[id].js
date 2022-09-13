import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client, getProfileId, getPublications } from "../../api";
import Image from "next/image";
import { ethers } from "ethers";

import abi from "../../abi.json";

const address = "0xDb46d1Dc155634FbC732f92E853b10B288AD5a1d";

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

  const connect = async () => {
    const accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    console.log({ accounts });
  };

  const followUser = async () => {
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner();

    const contract = new ethers.Contract({
      address,
      abi,
      signer,
    });
    try {
      const tx = await contract.follow([id], [0x0]);
      await tx.wait();
      console.log("followed user succefully...!");
    } catch (err) {
      console.log({ err });
    }
  };

  console.log(pubs);
  if (!profile) return null;

  return (
    <div>
      <button onClick={connect}>Connect</button>
      <h1>{profile.handle}</h1>
      <h3>{profile.bio}</h3>
      {profile.picture ? (
        <Image
          src={profile.picture.original.url}
          width="150px"
          height="100px"
          alt="img-profile"
        />
      ) : (
        <div></div>
      )}

      {/* <p>Followers: {profile.stats.totalFollowers}</p>
      <p>Following: {profile.stats.totalFollowing}</p> */}
      <button onClick={followUser}>Follow</button>
      <h2>Publications</h2>
      {pubs.length > 0 &&
        pubs.map((pub, index) => (
          <div key={index}>
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
