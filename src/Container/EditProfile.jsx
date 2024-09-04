import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import reload from "../assets/reload.png";
import remove from "../assets/delete.png";
import dropdown from "../assets/dropdown.png";

const schema = z.object({
  image: z.string().optional(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().min(1, "Role is required"),
  status: z.enum(["Active", "Inactive"]),
  selectedTeams: z
    .array(z.string())
    .min(1, "At least one team must be selected"),
});

const EditProfile = ({ user, onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      image: user.details.image,
      name: user.details.name,
      email: user.details.email,
      role: user.role,
      status: user.status,
      selectedTeams: user.teams,
    },
  });

  const [showNote, setShowNote] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const onSubmit = (data) => {
    setShowNote(true);
    console.log(data);
  };

  const handleImageChange = (e, field) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        field.onChange(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="font-inter fixed inset-0 flex justify-center items-center bg-black bg-opacity-10  z-50">
      <div className="bg-white p-6 rounded-lg shadow-2xl w-1/2">
        <h2 className="text-2xl font-inter-bold mb-4 text-left">
          Edit Profile
        </h2>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex flex-col items-center mb-6">
            <Controller
              name="image"
              control={control}
              render={({ field }) => (
                <>
                  <img
                    src={field.value || "https://via.placeholder.com/40"}
                    alt="Profile"
                    className="w-32 h-32 rounded-full mb-8"
                  />
                  <div className="flex space-x-4">
                    <input
                      type="file"
                      id="imageUpload"
                      className="hidden"
                      onChange={(e) => handleImageChange(e, field)}
                    />
                    <label
                      htmlFor="imageUpload"
                      className="rounded-md bg-gray-50 border p-2 cursor-pointer font-inter-bold flex space-x-2 align-items-center"
                    >
                      <img src={reload} alt="change" className="w-5 h-5" />
                      <p>CHANGE PHOTO</p>
                    </label>
                    <button
                      type="button"
                      onClick={() => field.onChange(null)}
                      className="rounded-md bg-gray-50 border p-2 cursor-pointer font-inter-bold flex space-x-2 align-items-center"
                    >
                      <img src={remove} alt="remove" className="w-5 h-5" />
                      <p>REMOVE PHOTO</p>
                    </button>
                  </div>
                </>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-inter-bold mb-2">Name</label>
              <Controller
                name="name"
                control={control}
                render={({ field }) => (
                  <input
                    type="text"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                  />
                )}
              />
              {errors.name && (
                <span className="text-red-500 text-sm">
                  {errors.name.message}
                </span>
              )}
            </div>

            <div>
              <label className="block text-sm font-inter-bold mb-2">
                Email
              </label>
              <Controller
                name="email"
                control={control}
                render={({ field }) => (
                  <input
                    type="email"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                  />
                )}
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <div>
              <label className="block text-sm font-inter-bold mb-2">Role</label>
              <Controller
                name="role"
                control={control}
                render={({ field }) => (
                  <select
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                  >
                    <option value="Product Designer">Product Designer</option>
                    <option value="Product Manager">Product Manager</option>
                    <option value="Backend Developer">Backend Developer</option>
                    <option value="UX Designer">UX Designer</option>
                    <option value="UI Designer">UI Designer</option>
                    <option value="QA Engineer">QA Engineer</option>
                    <option value="Fullstack Developer">
                      Fullstack Developer
                    </option>
                    <option value="Frontend Developer">
                      Frontend Developer
                    </option>
                  </select>
                )}
              />
            </div>

            <div>
              <label className="block text-sm font-inter-bold mb-2">
                Status
              </label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <select
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                )}
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-inter-bold mb-2">Teams</label>
            <Controller
              name="selectedTeams"
              control={control}
              render={({ field }) => (
                <>
                  <div className="relative">
                    <div className="flex items-center border px-3 py-2 rounded border-b-2 border-b-gray-500 bg-white">
                      <div className="flex flex-wrap items-center h-8">
                        {field.value.map((team, idx) => (
                          <div
                            key={idx}
                            className="px-2 py-1 bg-gray-50 rounded-md text-xs flex items-center space-x-2 mr-2 mb-1 border h-8"
                          >
                            <span className="text-customPurple font-inter-medium text-sm">
                              {team}
                            </span>
                            <button
                              type="button"
                              onClick={() =>
                                field.onChange(
                                  field.value.filter((t) => t !== team)
                                )
                              }
                              className="text-gray-400 text-2xl font-inter-light"
                            >
                              &times;
                            </button>
                          </div>
                        ))}
                      </div>
                      <div className="ml-auto">
                        <button
                          type="button"
                          className="text-gray-500 focus:outline-none"
                          onClick={() => setDropdownOpen(!dropdownOpen)}
                        >
                          <img src={dropdown} alt="dropdown" />
                        </button>
                      </div>
                    </div>
                    {dropdownOpen && (
                      <select
                        className="absolute left-0 top-full mt-2 w-full border px-3 py-2 rounded bg-white z-10"
                        onChange={(e) => {
                          const selectedValue = e.target.value;
                          if (
                            selectedValue &&
                            !field.value.includes(selectedValue)
                          ) {
                            field.onChange([...field.value, selectedValue]);
                          }
                          setDropdownOpen(false);
                        }}
                      >
                        <option value="selectedTeams">Select a Team</option>
                        <option value="Engineering">Engineering</option>
                        <option value="Design">Design</option>
                        <option value="Marketing">Marketing</option>
                      </select>
                    )}
                  </div>
                  {errors.selectedTeams && (
                    <span className="text-red-500 text-sm">
                      {errors.selectedTeams.message}
                    </span>
                  )}
                </>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 rounded bg-gray-100 border font-inter-bold"
            >
              CANCEL
            </button>
            <button
              type="submit"
              className="px-4 py-2 rounded bg-customPurple text-white font-inter-bold"
            >
              SAVE
            </button>
          </div>
          {showNote && (
            <div className="mt-4 text-red-500 text-sm">
              It's offline.....static data.....press Cancel....please hire "Ayan kumar
              Acharya" for make it live!!
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default EditProfile;
