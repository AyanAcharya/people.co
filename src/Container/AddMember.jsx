import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import reload from "../assets/reload.png";
import remove from "../assets/delete.png";
import dropdown from "../assets/dropdown.png";

// Define your validation schema
const schema = z.object({
  name: z.string().nonempty("Name is required"),
  email: z.string().email("Invalid email address"),
  role: z.string().nonempty("Role is required"),
  status: z.enum(["Active", "Inactive"]),
  dob: z.string().nonempty("Date of Birth is required"),
  gender: z.string().nonempty("Gender is required"),
  nationality: z.string().nonempty("Nationality is required"),
  contact: z.string().nonempty("Contact is required"),
  workEmail: z.string().email("Invalid work email address"),
  researchTitle: z.string().nonempty("Research Title is required"),
  researchLink: z.string().url("Invalid URL for Research Link"),
  subject: z.string().nonempty("Subject is required"),
  year: z
    .number()
    .min(1900, "Invalid year")
    .max(new Date().getFullYear(), "Year cannot be in the future"),
  description: z.string().optional(),
});

const AddMember = ({ onClose }) => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      role: "",
      status: "Active",
      dob: "",
      gender: "",
      nationality: "",
      contact: "",
      workEmail: "",
      researchTitle: "",
      researchLink: "",
      subject: "",
      year: new Date().getFullYear(),
      description: "",
    },
  });

  const [image, setImage] = useState("");
  const [selectedTeams, setSelectedTeams] = useState([]);
  const [showNote, setShowNote] = useState(false);

  // Generate years from 1900 to the current year
  const currentYear = new Date().getFullYear();
  const years = Array.from(
    { length: currentYear - 1900 + 1 },
    (_, i) => 1900 + i
  );

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleRemovePhoto = () => {
    setImage("");
  };

  const handleTeamsChange = (e) => {
    const selectedValue = e.target.value;
    if (!selectedTeams.includes(selectedValue)) {
      setSelectedTeams([...selectedTeams, selectedValue]);
    }
  };

  const handleRemoveTeam = (team) => {
    setSelectedTeams(selectedTeams.filter((t) => t !== team));
  };

  const onSubmit = (data) => {
    console.log(data);
    setShowNote(true);
  };

  return (
    <div className="font-inter fixed inset-0 flex justify-center items-center bg-black bg-opacity-10 shadow-2xl z-50 ">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2 max-h-[80%] overflow-y-auto">
        <h2 className="text-2xl font-semibold mb-4 text-left">Add Member</h2>

        <div className="flex flex-col items-center mb-6">
          <img
            src={image || "https://via.placeholder.com/40"}
            alt="New Member"
            className="w-40 h-40 rounded-full mb-2"
          />
          <div className="flex space-x-4">
            <input
              type="file"
              id="imageUpload"
              className="hidden"
              onChange={handleImageChange}
            />
            <label
              htmlFor="imageUpload"
              className="rounded-md bg-gray-50 border p-2 cursor-pointer font-inter-bold flex space-x-2 align-items-center"
            >
              <img src={reload} alt="change" className="w-5 h-5" />
              <p>SELECT PHOTO</p>
            </label>
            <button
              onClick={handleRemovePhoto}
              className="rounded-md bg-gray-50 border p-2 cursor-pointer font-inter-bold flex space-x-2 align-items-center"
            >
              <img src={remove} alt="remove" className="w-5 h-5" />
              <p>REMOVE PHOTO</p>
            </button>
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="grid grid-cols-2 gap-4 mb-4">
            <Controller
              name="name"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Name
                  </label>
                  <input
                    type="text"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                    placeholder="Enter name"
                  />
                  {errors.name && (
                    <p className="text-red-500 text-sm">
                      {errors.name.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="email"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Email
                  </label>
                  <input
                    type="email"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                    placeholder="Enter email"
                  />
                  {errors.email && (
                    <p className="text-red-500 text-sm">
                      {errors.email.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Controller
              name="role"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Role
                  </label>
                  <input
                    type="text"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                    placeholder="Enter role"
                  />
                  {errors.role && (
                    <p className="text-red-500 text-sm">
                      {errors.role.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="status"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Status
                  </label>
                  <select
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                  >
                    <option value="Active">Active</option>
                    <option value="Inactive">Inactive</option>
                  </select>
                  {errors.status && (
                    <p className="text-red-500 text-sm">
                      {errors.status.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div>
            <label className="block text-sm font-inter-bold mb-2">Teams</label>
            <div className="relative">
              <select
                className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                onChange={handleTeamsChange}
              >
                <option value="Engineering">Engineering</option>
                <option value="Design">Design</option>
                <option value="Marketing">Marketing</option>
              </select>
              <div className="flex flex-wrap space-x-2 mt-2">
                {selectedTeams.map((team, idx) => (
                  <div
                    key={idx}
                    className="px-2 py-1 bg-gray-100 rounded-full text-xs flex items-center space-x-2"
                  >
                    <span>{team}</span>
                    <button
                      onClick={() => handleRemoveTeam(team)}
                      className="text-red-500"
                    >
                      &times;
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4 mt-4">
            <Controller
              name="dob"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Date of Birth
                  </label>
                  <input
                    type="date"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                  />
                  {errors.dob && (
                    <p className="text-red-500 text-sm">{errors.dob.message}</p>
                  )}
                </div>
              )}
            />
            <Controller
              name="gender"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Gender
                  </label>
                  <select
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                  >
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                  {errors.gender && (
                    <p className="text-red-500 text-sm">
                      {errors.gender.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Controller
              name="nationality"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Nationality
                  </label>
                  <input
                    type="text"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                    placeholder="Enter nationality"
                  />
                  {errors.nationality && (
                    <p className="text-red-500 text-sm">
                      {errors.nationality.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="contact"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Contact
                  </label>
                  <input
                    type="text"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                    placeholder="Enter contact"
                  />
                  {errors.contact && (
                    <p className="text-red-500 text-sm">
                      {errors.contact.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Controller
              name="workEmail"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Work Email
                  </label>
                  <input
                    type="email"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                    placeholder="Enter work email"
                  />
                  {errors.workEmail && (
                    <p className="text-red-500 text-sm">
                      {errors.workEmail.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="researchTitle"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Research Title
                  </label>
                  <input
                    type="text"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                    placeholder="Enter research title"
                  />
                  {errors.researchTitle && (
                    <p className="text-red-500 text-sm">
                      {errors.researchTitle.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <Controller
              name="researchLink"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Research Link
                  </label>
                  <input
                    type="url"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                    placeholder="Enter research link"
                  />
                  {errors.researchLink && (
                    <p className="text-red-500 text-sm">
                      {errors.researchLink.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="subject"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Subject
                  </label>
                  <input
                    type="text"
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                    placeholder="Enter subject"
                  />
                  {errors.subject && (
                    <p className="text-red-500 text-sm">
                      {errors.subject.message}
                    </p>
                  )}
                </div>
              )}
            />
            <Controller
              name="year"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Year
                  </label>
                  <select
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                  >
                    {years.map((year) => (
                      <option key={year} value={year}>
                        {year}
                      </option>
                    ))}
                  </select>
                  {errors.year && (
                    <p className="text-red-500 text-sm">
                      {errors.year.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="mb-4">
            <Controller
              name="description"
              control={control}
              render={({ field }) => (
                <div>
                  <label className="block text-sm font-inter-bold mb-2">
                    Description
                  </label>
                  <textarea
                    className="w-full border h-12 border-b-2 border-b-gray-400 px-3 py-2 rounded-md"
                    {...field}
                    placeholder="Enter description"
                  />
                  {errors.description && (
                    <p className="text-red-500 text-sm">
                      {errors.description.message}
                    </p>
                  )}
                </div>
              )}
            />
          </div>

          <div className="flex justify-end space-x-4 border-gray-200 pt-4">
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
            <div className="text-red-500 my-4">
              <p>
                It's offline.....static data.....press Cancel....please hire
                "Ayan kumar Acharya" for make it live!!
              </p>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default AddMember;
