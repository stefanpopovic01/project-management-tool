import { useState } from "react";
import "./EditProfile.css";
import { editUser } from "../../api/services/userServices";

function EditProfile({ user, onClose }) {
  const [form, setForm] = useState({
    username: user.username || "",
    email: user.email || "",
    name: user.name || "",
    description: user.description || "",
    location: user.location || "",
    avatar: user.avatar
  });

  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
        const res = await editUser(user.id, form);

        setSuccess(true);
        setError("");
        onClose(); 

    } catch (err) {
        setError(err.response?.data?.message || "Something went wrong...");
        setSuccess(false);
    }
  };

  return (
    <div className="edit-overlay" onClick={onClose}>
      <div className="edit-modal" onClick={(e) => e.stopPropagation()}>
        <h2>Edit Profile</h2>

        <form className="edit-profile-form" onSubmit={handleSubmit}>

          <label>Name</label>
          <input name="name" value={form.name} onChange={handleChange} />

          <label>Email</label>
          <input type="email" name="email" value={form.email} onChange={handleChange} />

          <label>Bio</label>
          <textarea name="description" rows="3" value={form.description} onChange={handleChange} />

          <label>Location</label>
          <input type="text" name="location" value={form.location} onChange={handleChange} />

          <label>Avatar</label>
          <input type="text" name="avatar" value={form.avatar} onChange={handleChange} />

          <button className="save-btn" type="submit">Save changes</button>
          <button className="cancel-btn" type="button" onClick={onClose}>Cancel</button>

        {success && <p className="success-msg">Successfully edited.</p>}
        {error && <p className="error-msg">{error}</p>}

        </form>
      </div>
    </div>
  );
}

export default EditProfile;
