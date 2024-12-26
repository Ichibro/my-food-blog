import { useState, useEffect } from 'react';
import { Tab, TabGroup, TabList, TabPanel, TabPanels } from '@headlessui/react';
import { getPosts } from '@lib/firestore';
import '@/globals.css';

export async function getServerSideProps() {
  const posts = await getPosts();
  return {
    props: { posts },
  };
}

// Removed unused categories declaration

export default function Blog({
  posts,
}: {
  posts: { id: string; title: string; content: string; date: string; imageUrl?: string; commentCount: number; shareCount: number }[];
}) {
  const [darkMode, setDarkMode] = useState(false);

  // Example: Using the `posts` prop to populate the categories dynamically
  const categories = [
    {
      name: 'Recent',
      posts: posts.slice(0, 2), // Use the first two posts for "Recent"
    },
    {
      name: 'Popular',
      posts: posts.slice(2, 4), // Use the next two posts for "Popular"
    },
    {
      name: 'Trending',
      posts: posts.slice(4, 6), // Use the next two posts for "Trending"
    },
  ];

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
  }, [darkMode]);

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-800 dark:text-gray-100">
      {/* Navigation Bar */}
      <nav className="bg-white dark:bg-gray-800 shadow-md fixed top-0 left-0 w-full z-50">
        <div className="container mx-auto flex justify-between items-center p-4">
          <h1 className="text-2xl font-bold text-indigo-500 dark:text-indigo-400">
            Ichiro&apos;s Food Blog
          </h1>
          <div className="flex items-center space-x-4">
            <ul className="flex space-x-4">
              <li>
                <a href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400">
                  Posts
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-indigo-500 dark:hover:text-indigo-400">
                  About
                </a>
              </li>
            </ul>
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="p-2 rounded-full bg-gray-200 text-gray-800 hover:bg-gray-300 dark:bg-gray-700 dark:text-gray-100 dark:hover:bg-gray-600"
              aria-label="Toggle Dark Mode"
            >
              {darkMode ? '☀️' : '🌙'}
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <header className="relative h-96 bg-gradient-to-r from-indigo-400 to-purple-500 text-center flex flex-col justify-center items-center shadow-lg dark:from-indigo-600 dark:to-purple-700">
        <h1 className="text-5xl font-extrabold text-white drop-shadow-lg">
          Welcome to the Food Blog
        </h1>
        <p className="mt-4 text-lg text-white opacity-90">
          Explore delicious recipes and culinary adventures
        </p>
      </header>

{/* Combined Dynamic Section */}
<main className="container mx-auto px-4 mt-16">
  <h2 className="text-3xl font-bold text-center text-indigo-500 mb-8 dark:text-indigo-400">
    Explore Posts
  </h2>
  <TabGroup>
    <TabList className="flex justify-center gap-4 mb-6">
      {categories.map(({ name }) => (
        <Tab
          key={name}
          className={({ selected }) =>
            `rounded-full py-1 px-3 text-sm font-semibold ${
              selected
                ? 'bg-gray-200 text-gray-900 dark:bg-gray-700 dark:text-gray-100'
                : 'bg-transparent text-gray-500 hover:bg-gray-100 dark:hover:bg-gray-600'
            } focus:outline-none`
          }
        >
          {name}
        </Tab>
      ))}
    </TabList>
    <TabPanels>
      {categories.map(({ name, posts }) => (
        <TabPanel key={name}>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((post) => (
              <div
                key={post.id}
                className="relative bg-white rounded-lg shadow-md overflow-hidden border dark:bg-gray-800 dark:border-gray-700 group transition-transform hover:scale-105"
              >
                {post.imageUrl && (
                  <div className="overflow-hidden rounded-t-lg">
                    <img
                      src={post.imageUrl}
                      alt={post.title}
                      className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                )}
                <div className="p-4">
                  <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                    {post.title}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {post.content || post.date}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </TabPanel>
      ))}
    </TabPanels>
  </TabGroup>
</main>

{/* Footer */}
<footer className="bg-white dark:bg-gray-800 text-gray-500 dark:text-gray-300 text-center py-4 mt-12">
  © 2024 Food Blog. Built with ❤️ using Tailwind CSS.
</footer>

    </div>
  );
}
