import { updateProfile } from "firebase/auth";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import { AuthContext } from "../../../Provider/AuthProvider";
import { uploadImage } from "../../../utils/uploadImage";

const Profile = () => {
  const { user } = useContext(AuthContext);

  const [name, setName] = useState(user?.displayName || "");
  const [imageFile, setImageFile] = useState(null);
  const [role, setRole] = useState("user");
  const [loading, setLoading] = useState(false);

  /* 🔹 Load role from DB with Better Error Handling */
  useEffect(() => {
    if (user?.email) {
      fetch(`https://export-server-alpha.vercel.app/users/role/${user.email}`)
        .then((res) => res.json())
        .then((data) => {
          console.log("Role Data form Server:", data); // 👀 কনসোলে চেক করুন কী আসছে
          if (data?.role) {
            setRole(data.role);
          }
        })
        .catch((err) => {
          console.error("Failed to fetch role:", err);
        });
    }
  }, [user]);

  const handleUpdate = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let photoURL = user.photoURL;

      // 🔼 Image upload
      if (imageFile) {
        photoURL = await uploadImage(imageFile);
      }

      // 🔄 Firebase update
      await updateProfile(user, {
        displayName: name,
        photoURL,
      });

      // 🔄 MongoDB update
      // ⚠️ সতর্কতা: সাধারণত প্রোফাইল পেজ থেকে 'role' আপডেট করা উচিত নয়।
      // যদি আপনি এখান থেকেই রোল আপডেট করতে চান, তাহলে নিচের body তে role যোগ করুন।

      const updateData = { name, photoURL };
      // if (role) updateData.role = role; // 👈 আন-কমেন্ট করুন যদি রোলও আপডেট করতে চান

      await fetch(
        `https://export-server-alpha.vercel.app/users/by-email/${user.email}`,
        {
          method: "PATCH",
          headers: { "content-type": "application/json" },
          body: JSON.stringify(updateData),
        }
      );

      toast.success("Profile updated successfully");

      // রোল বা ডাটা আপডেট হলে পেজ রিফ্রেশ ছাড়া নতুন ডাটা দেখানোর জন্য স্টেট আপডেট বা রিলোড দিতে পারেন
      // window.location.reload();
    } catch (error) {
      console.error(error);
      toast.error("Profile update failed");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto bg-base-100 p-6 rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

      {/* 🔹 Avatar */}
      <div className="flex flex-col items-center mb-6">
        <img
          src={user?.photoURL || "https://i.ibb.co/5GzXkwq/user.png"}
          alt="Profile"
          className="w-24 h-24 rounded-full object-cover ring ring-primary ring-offset-2"
        />

        {/* 🔹 Role Badge */}
        <span
          className={`mt-3 badge ${
            role === "admin" ? "badge-error" : "badge-primary"
          }`}
        >
          {role ? role.toUpperCase() : "USER"}
        </span>

        <p className="mt-2 text-sm text-base-content/70">{user?.email}</p>
      </div>

      {/* 🔹 Update Form */}
      <form onSubmit={handleUpdate} className="space-y-4">
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
          required
        />

        <button className="btn btn-primary w-full" disabled={loading}>
          {loading ? "Updating..." : "Update Profile"}
        </button>
      </form>
    </div>
  );
};

export default Profile;
