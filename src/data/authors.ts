// Post authors, keyed by the `author` frontmatter value.
export const authors: Record<string, { role: string; bio: string; photo: string; linkedin: string }> = {
  'Lentin Joseph': {
    role: 'Co-founder and CEO, RUNTIME Robotics',
    bio: 'ROS developer and educator since 2010 and author of 11 books on ROS and robotics. Lentin leads RUNTIME Robotics’ work on ROS 2, NVIDIA Isaac and Physical AI.',
    photo: 'images/lentin.webp',
    linkedin: 'https://www.linkedin.com/in/lentinjoseph/'
  },
  'Aleena Johny': {
    role: 'Co-founder, RUNTIME Robotics',
    bio: 'ROS software developer, educator and co-author supporting robot-software delivery, training and modern ROS 2 development workflows.',
    photo: 'images/aleena.webp',
    linkedin: 'https://www.linkedin.com/in/aleena-johny-83a3161a5/'
  }
};
