import React from 'react';

const Contact = () => {
  const linkedinUrl = 'https://www.linkedin.com/in/prashant-singh-one02/';
  const githubUrl = 'https://github.com/prashantsingh003';
  const portfolioUrl = 'https://leetcode.com/prashantsingh003/';
  const emailAddress = 'prashant02os@gmail.com';

  return (
	<>
		<div className="max-w-md mx-auto mt-8 p-6 bg-gray-100 rounded-md shadow-md">
      <div className="mb-6">
        <h2 className="text-4xl font-semibold mb-2">Contact Me</h2>
        <p className="text-gray-600">
          Feel free to reach out to me via LinkedIn, GitHub, or email for any inquiries!
        </p>
      </div>

      <div className="mb-6">
        <button
          onClick={() => window.open(linkedinUrl, '_blank')}
          className="block w-full bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-full mb-2"
        >
          LinkedIn
        </button>

        <button
          onClick={() => window.open(githubUrl, '_blank')}
          className="block w-full bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 px-6 rounded-full mb-2"
        >
          GitHub
        </button>

        <button
          onClick={() => window.open(portfolioUrl, '_blank')}
          className="block w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 px-6 rounded-full mb-2"
        >
          LeetCode
        </button>

        <button
          onClick={() => window.open(`mailto:${emailAddress}`)}
          className="block w-full bg-green-500 hover:bg-green-600 text-white font-bold py-3 px-6 rounded-full"
        >
          Email Me
        </button>
      </div>
		<div className="badge-base LI-profile-badge" data-locale="en_US" data-size="medium" data-theme="light" data-type="VERTICAL" data-vanity="prashant-singh-one02" data-version="v1"><a className="badge-base__link LI-simple-link" href="https://in.linkedin.com/in/prashant-singh-one02?trk=profile-badge">Prashant Singh</a></div>

    </div>
	</>
  );
};

export default Contact;