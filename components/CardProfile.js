import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";

const CardProfile = ({ profile }) => {
  console.log(profile);
  return (
    <Link href={`/profile/${profile.id}`} key={profile.id}>
      <a>
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="border-green-300 rounded-lg border-2 m-5 p-5 max-w-screen-sm"
        >
          <h3 className="text-2xl font-semibold ">{profile.name}</h3>
          <h2>{profile.handle}</h2>
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
        </motion.div>
      </a>
    </Link>
  );
};

export default CardProfile;
