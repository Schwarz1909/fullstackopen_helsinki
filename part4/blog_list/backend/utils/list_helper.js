// Import the lodash library for utility functions
const _ = require('lodash');

// A dummy function that always returns 1
const dummy = () => 1;

// Function to calculate the total number of likes from an array of blogs
const totalLikes = (blogs) => {
  // Reducer function to sum the likes
  const reducer = (sum, item) => sum + item;

  // Extract the likes from each blog into an array
  const blogsLikes = blogs.map((blogs) => blogs.likes);

  // Reduce the array of likes to a total sum and return it
  return blogsLikes.reduce(reducer, 0);
};

// Function to find the blog with the highest number of likes
const favoriteBlog = (blogs) => {
  // Extract the likes from each blog into an array
  const blogsLikes = blogs.map((blogs) => blogs.likes);
  
  // Find the index of the blog with the maximum likes
  const largestIndex = blogsLikes.indexOf(Math.max(...blogsLikes));
  
  // Get the blog information corresponding to the largest index
  const largestinfo = blogs[largestIndex];

  // Return an object containing the title, author, and likes of the favorite blog
  return {
    title: largestinfo.title,
    author: largestinfo.author,
    likes: largestinfo.likes,
  };
};

// Function to determine the author with the most blogs
const mostBlogs = (blogs) => {
  // Extract the authors from each blog into an array
  const blogsAuthor = blogs.map((blogs) => blogs.author);

  // Use lodash to count occurrences of each author and find the one with the most blogs
  const mode = _.chain(blogsAuthor)
    .countBy() // Count the occurrences of each author
    .entries() // Convert the counts to an array of entries
    .maxBy(_.last) // Find the entry with the maximum count
    .thru(_.head) // Extract the author name from the entry
    .value(); // Retrieve the final value

  // Initialize a count variable to tally the number of blogs by the most prolific author
  let count = 0;

  // Count how many blogs the most prolific author has written
  blogsAuthor.forEach((element) => {
    if (element === mode) {
      count += 1;
    }
  });

  // Return an object containing the author's name and the number of blogs they wrote
  return {
    author: mode,
    blogs: count,
  };
};

// Function to find the author with the most total likes across their blogs
const mostLikes = (blogs) => {
  // Group blogs by author
  const groupedBlogs = _.groupBy(blogs, 'author');

  // Calculate the total likes for each author
  const countedAuthors = _.map(groupedBlogs, (arr) => ({
    author: arr[0].author,
    likes: _.sumBy(arr, 'likes'), // Sum the likes for each author's blogs
  }));

  // Find the author with the maximum total likes
  const maxLikesAuthor = _.maxBy(countedAuthors, (a) => a.likes);
  const authorName = _.head(_.values(maxLikesAuthor)); // Get the author's name

  // Return an object containing the author's name and their total likes
  return {
    author: authorName,
    likes: maxLikesAuthor.likes,
  };
};

// Export the functions to make them available for use in other modules
module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes,
};
