CREATE DATABASE database_links;
CREATE TABLE `links` (
  `id` int(11) NOT NULL,
  `title` varchar(150) NOT NULL,
  `url` varchar(255) NOT NULL,
  `description` text,
  `user_id` int(11) DEFAULT NULL,
  `create_at` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP
) ENGINE=InnoDB DEFAULT CHARSET=latin1;

CREATE TABLE `users` (
  `id` int(11) NOT NULL,
  `username` varchar(16) NOT NULL,
  `password` varchar(60) NOT NULL,
  `fullname` varchar(100) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=latin1;
