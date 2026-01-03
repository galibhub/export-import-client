import { useContext, useState } from "react";
import { AuthContext } from "../../../Provider/AuthProvider";
import { updateProfile } from "firebase/auth";
import { uploadImage } from "../../../utils/uploadImage";
import { toast } from "react-toastify";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [imageFile, setImageFile] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoURL = user.photoURL;

      // 🔼 Image upload (optional)
      if (imageFile) {
        photoURL = await uploadImage(imageFile);
      }

      // 🔄 Firebase update
      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      // 🔄 MongoDB update
      await fetch(`http://localhost:3000/users/by-email/${user.email}`, {
        method: "PATCH",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ name, photoURL }),
      });

      toast.success("Profile updated successfully");
    } catch (err) {
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6">My Profile</h2>

      <form onSubmit={handleUpdate} className="space-y-4">
        <div className="flex justify-center">
          <img
            src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
            className="w-24 h-24 rounded-full object-cover"
          />
        </div>

        <input
          type="file"
          accept="image/*"
          className="file-input file-input-bordered w-full"
          onChange={(e) => setImageFile(e.target.files[0])}
        />

        <input
          type="text"
          className="input input-bordered w-full"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Your name"
        />

        <button
          className="btn btn-primary w-full"
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
