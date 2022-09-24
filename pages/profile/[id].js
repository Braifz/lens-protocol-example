import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { client, getProfileId, getPublications } from "../../api";
import Image from "next/image";
import { ethers } from "ethers";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, scale: 0.5 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5 }}
      className="border-green-300 rounded-lg border-2 m-5 p-5 max-w-screen-sm"
    >
      <button
        onClick={connect}
        className="rounded-lg bg-green-300 p-2 text-black"
      >
        Connect
      </button>
      <h1>{profile.handle}</h1>
      <h3>{profile.bio}</h3>
      {profile.picture ? (
        <Image
          src={profile.picture.original.url}
          width="150px"
          height="150px"
          alt="img-profile"
          className="rounded-full"
        />
      ) : (
        <div></div>
      )}

      {/* <p>Followers: {profile.stats.totalFollowers}</p>
      <p>Following: {profile.stats.totalFollowing}</p> */}
      <button
        onClick={followUser}
        className="rounded-lg bg-green-300 p-2 text-black"
      >
        Follow
      </button>
      <h2>Publications</h2>
      {pubs.length > 0 &&
        pubs.map((pub, index) => (
          <div
            key={index}
            className="border-green-300 rounded-lg border-2 m-5 p-5 max-w-screen-sm"
          >
            <h3>Content</h3>
            <p>{pub.metadata.content}</p>
            <h2>description</h2>
            <p>{pub.metadata.description}</p>
            <p>hello</p>
          </div>
        ))}
    </motion.div>
  );
};

export default Profile;
