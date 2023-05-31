-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: May 31, 2023 at 09:07 PM
-- Server version: 10.4.28-MariaDB
-- PHP Version: 8.2.4

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `db_login_system`
--

-- --------------------------------------------------------

--
-- Table structure for table `tbl_device_info`
--

CREATE TABLE `tbl_device_info` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `token` varchar(256) NOT NULL,
  `device_type` enum('A','I','W','') DEFAULT 'A' COMMENT 'A--> Android\r\nI--> Iphone\r\nW--> Browser',
  `device_token` text DEFAULT '\'0\'',
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

--
-- Dumping data for table `tbl_device_info`
--

INSERT INTO `tbl_device_info` (`id`, `user_id`, `token`, `device_type`, `device_token`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 1, 'abcd', 'A', '0', 1, 0, '2023-05-20 16:27:09', '2023-05-22 18:50:12'),
(2, 2, 'eugpm0cntdmlwlzbkt0thtn9n8tmecxipas38qa24vvzhcgef8uqkpwy0gdgm6fy', 'A', '0', 1, 0, '2023-05-20 16:47:44', '2023-05-31 18:08:51'),
(3, 3, 'm0wu9ndmwfvpzd00y0jqc5gs7hnajvmhow25yrmszw5rt7v3y814mlf7mrvif9qb', 'A', '0', 1, 0, '2023-05-20 16:48:12', '2023-05-31 18:24:46'),
(4, 4, 'iyme0r3j0hbm2856davkkuro790aqkcj7wbjw860yochwq16l07i3xurcu82xvss', 'A', '0', 1, 0, '2023-05-20 16:48:26', '2023-05-31 18:44:52'),
(5, 5, '7ejwex90ayo8f9301qlao6nqz5szm5oe4nsg0idd8fil7jpb6ch6p8ecv6577ijj', 'A', '0', 1, 0, '2023-05-20 17:19:43', '2023-05-31 18:08:28'),
(6, 6, 'xw8gd0npllsz3txg31cgobm9zfcmpn8h8uej7exklgqlsd2gywnol20sqbngt8f7', 'A', '0', 1, 0, '2023-05-27 17:03:58', '2023-05-28 06:52:16');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_post`
--

CREATE TABLE `tbl_post` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `image` varchar(64) NOT NULL,
  `description` text NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_post`
--

INSERT INTO `tbl_post` (`id`, `user_id`, `image`, `description`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(2, 2, 'image-1685555130151.jpg', '', 1, 0, '2023-05-31 17:45:30', '2023-05-31 17:45:30'),
(3, 5, 'image-1685555909920.jpg', '', 1, 0, '2023-05-31 17:58:30', '2023-05-31 17:58:30'),
(4, 5, 'image-1685556414661.jpg', '', 1, 0, '2023-05-31 18:06:54', '2023-05-31 18:06:54'),
(5, 2, 'image-1685556489247.jpg', '', 1, 0, '2023-05-31 18:08:09', '2023-05-31 18:08:09'),
(6, 3, 'image-1685558347075.jpg', '', 1, 0, '2023-05-31 18:39:07', '2023-05-31 18:39:07'),
(7, 4, 'image-1685558731553.jpeg', '', 1, 0, '2023-05-31 18:45:31', '2023-05-31 18:45:31'),
(8, 4, 'image-1685559621461.jpg', '', 1, 0, '2023-05-31 19:00:21', '2023-05-31 19:00:21');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_post_like`
--

CREATE TABLE `tbl_post_like` (
  `id` int(11) NOT NULL,
  `post_id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `is_like` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_post_like`
--

INSERT INTO `tbl_post_like` (`id`, `post_id`, `user_id`, `is_like`, `created_at`) VALUES
(2, 2, 2, 0, '2023-05-31 17:46:09'),
(3, 2, 5, 1, '2023-05-31 17:57:31'),
(4, 3, 5, 1, '2023-05-31 17:58:36'),
(5, 4, 5, 1, '2023-05-31 18:06:58'),
(6, 3, 2, 0, '2023-05-31 18:07:20'),
(7, 4, 2, 0, '2023-05-31 18:07:22'),
(8, 5, 5, 1, '2023-05-31 18:08:36'),
(9, 5, 2, 0, '2023-05-31 18:08:59'),
(10, 6, 3, 1, '2023-05-31 18:43:20'),
(11, 6, 4, 1, '2023-05-31 18:44:56'),
(12, 7, 4, 1, '2023-05-31 18:45:36'),
(13, 2, 4, 1, '2023-05-31 18:46:18'),
(14, 4, 4, 1, '2023-05-31 18:47:50'),
(15, 5, 4, 1, '2023-05-31 18:56:12'),
(16, 3, 4, 1, '2023-05-31 18:56:15'),
(17, 8, 4, 1, '2023-05-31 19:05:36');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_request`
--

CREATE TABLE `tbl_request` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `follow_id` int(11) NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_request`
--

INSERT INTO `tbl_request` (`id`, `user_id`, `follow_id`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 3, 2, 1, 0, '2023-05-28 14:16:17', '2023-05-28 14:17:27'),
(2, 4, 2, 1, 0, '2023-05-28 14:16:17', '2023-05-28 14:17:28'),
(3, 5, 2, 1, 0, '2023-05-28 14:16:17', '2023-05-28 14:17:28'),
(4, 6, 2, 1, 0, '2023-05-28 14:16:17', '2023-05-28 14:17:28');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_user`
--

CREATE TABLE `tbl_user` (
  `id` int(11) NOT NULL,
  `profile` varchar(128) NOT NULL,
  `username` varchar(24) NOT NULL,
  `first_name` varchar(32) NOT NULL,
  `last_name` varchar(32) NOT NULL,
  `mobile` varchar(24) NOT NULL,
  `email` varchar(128) NOT NULL,
  `password` varchar(128) NOT NULL,
  `role` enum('admin','user') NOT NULL,
  `login_status` enum('offline','online') NOT NULL,
  `logged_in_time` datetime DEFAULT NULL,
  `is_forgot` tinyint(1) NOT NULL DEFAULT 0,
  `forgot_time` datetime DEFAULT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_user`
--

INSERT INTO `tbl_user` (`id`, `profile`, `username`, `first_name`, `last_name`, `mobile`, `email`, `password`, `role`, `login_status`, `logged_in_time`, `is_forgot`, `forgot_time`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'profile-1684600029614.jpg', 'divya@123', 'divyadarshan', 'soni', '9558597250', 'divyasoniworld@gmail.com', 'wrr9NTAXpiv4ICtc0v7vdQ==', 'admin', 'online', '2023-05-22 21:12:58', 0, NULL, 1, 0, '2023-05-20 16:27:09', '2023-05-31 18:17:40'),
(2, 'profile-1684601264128.jpg', 'piyush_r', 'Piyush', 'Ramanuj', '+1 (389) 148-3521', 'piyush@gmail.com', 'wrr9NTAXpiv4ICtc0v7vdQ==', 'user', 'online', '2023-05-31 23:38:51', 0, NULL, 1, 0, '2023-05-20 16:47:44', '2023-05-31 18:19:42'),
(3, 'ashokraj.jpg', 'ashok_raj_420', 'Ashok', 'Raj', '+1 (481) 907-7777', 'ashok@gmail.com', 'wrr9NTAXpiv4ICtc0v7vdQ==', 'user', 'online', '2023-05-31 23:54:46', 0, NULL, 1, 0, '2023-05-20 16:48:12', '2023-05-31 18:38:10'),
(4, 'profile-1684601306409.jpg', 'nisarg_09', 'Nisarg', 'Mandaliya', '+1 (485) 791-3312', 'nisarg@gmail.com', 'wrr9NTAXpiv4ICtc0v7vdQ==', 'user', 'online', '2023-06-01 00:14:52', 0, NULL, 1, 0, '2023-05-20 16:48:26', '2023-05-31 18:44:52'),
(5, 'amarjeet.jpg', 'amarjeet_m', 'Amarjeet', 'Kumar', '7648586898', 'amarjeet@gmail.com', 'wrr9NTAXpiv4ICtc0v7vdQ==', 'user', 'online', '2023-05-31 23:38:28', 0, NULL, 1, 0, '2023-05-20 17:19:43', '2023-05-31 18:37:47');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `tbl_device_info`
--
ALTER TABLE `tbl_device_info`
  ADD PRIMARY KEY (`id`),
  ADD KEY `user_id` (`user_id`);

--
-- Indexes for table `tbl_post`
--
ALTER TABLE `tbl_post`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_post_like`
--
ALTER TABLE `tbl_post_like`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_request`
--
ALTER TABLE `tbl_request`
  ADD PRIMARY KEY (`id`);

--
-- Indexes for table `tbl_user`
--
ALTER TABLE `tbl_user`
  ADD PRIMARY KEY (`id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `tbl_device_info`
--
ALTER TABLE `tbl_device_info`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `tbl_post`
--
ALTER TABLE `tbl_post`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `tbl_post_like`
--
ALTER TABLE `tbl_post_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=18;

--
-- AUTO_INCREMENT for table `tbl_request`
--
ALTER TABLE `tbl_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
