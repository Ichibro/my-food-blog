import { useState } from "react";
import { addPost } from "@lib/firestore"; // Firestore addPost function
import { CldUploadWidget } from "next-cloudinary";
import type { CloudinaryUploadWidgetResults } from "next-cloudinary";
import "@/globals.css";

export default function AddPost() {
  const [title, setTitle] = useState<string>("");
  const [content, setContent] = useState<string>("");
  const [imageUrl, setImageUrl] = useState<string>("");

  const handleUploadSuccess = (result: CloudinaryUploadWidgetResults) => {
    if (typeof result.info === "object" && result.info.secure_url) {
      setImageUrl(result.info.secure_url);
      console.log("Image uploaded:", result.info.secure_url);
    } else {
      console.error("Image upload failed.");
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation: Ensure all fields are filled
    if (!title.trim() || !content.trim() || !imageUrl) {
      alert("All fields, including the image, are required.");
      return;
    }

    try {
      // Store post data in Firestore
      await addPost({ title, content, imageUrl });

      // Reset the form fields
      setTitle("");
      setContent("");
      setImageUrl("");

      alert("Post added successfully!");
    } catch (error) {
      console.error("Error adding post:", error);
      alert("Failed to add the post. Please try again.");
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="min-h-screen bg-black text-white flex flex-col items-center p-6"
    >
      <div className="w-full max-w-3xl bg-gray-800 p-6 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6">Add a New Post</h1>
        <div className="mb-4">
          <label htmlFor="title" className="block text-lg font-medium">
            Title
          </label>
          <input
            type="text"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-600 rounded bg-gray-900 text-white focus:outline-none focus:ring focus:ring-indigo-500"
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="content" className="block text-lg font-medium">
            Content
          </label>
          <textarea
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            className="w-full mt-2 p-2 border border-gray-600 rounded bg-gray-900 text-white focus:outline-none focus:ring focus:ring-indigo-500"
            rows={5}
            required
          />
        </div>
        <div className="mb-4">
          <label htmlFor="image" className="block text-lg font-medium">
            Upload Image
          </label>
          <CldUploadWidget
            uploadPreset="foodupload" // Replace with your Cloudinary upload preset
            onSuccess={handleUploadSuccess}
          >
            {({ open }) => (
              <button
                type="button"
                onClick={(e) => {
                  e.preventDefault(); // Prevent form submission when clicking upload button
                  open();
                }}
                className="mt-2 bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
              >
                Upload Image
              </button>
            )}
          </CldUploadWidget>
          {imageUrl && (
            <p className="text-green-500 mt-2">
              Image uploaded successfully!{" "}
              <a
                href={imageUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                View
              </a>
            </p>
          )}
        </div>
        <button
          type="submit"
          className="w-full bg-indigo-600 text-white py-2 px-4 rounded hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-500"
        >
          Add Post
        </button>
      </div>
    </form>
  );
}
