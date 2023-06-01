-- phpMyAdmin SQL Dump
-- version 5.2.0
-- https://www.phpmyadmin.net/
--
-- Host: localhost
-- Generation Time: Jun 01, 2023 at 02:55 PM
-- Server version: 10.4.27-MariaDB
-- PHP Version: 8.0.25

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
(1, 1, 'w8h9y19a7iupsi99agktdx5ebtbpktvo8msretdcbxibjlb128u619oepuachl2h', 'A', '0', 1, 0, '2023-05-20 16:27:09', '2023-06-01 12:25:57'),
(2, 2, '32si71cnkch48i3rlk85cpg94k34zhq9cb1ntzszdux0teqmvipmeu1am0hiii0y', 'A', '0', 1, 0, '2023-05-20 16:47:44', '2023-06-01 12:25:11'),
(3, 3, '63ca9kxww3g7kyb67vdbi7szo49ke6msmuwxrbwl9svw7vljdsy6dqi14f3pcr5u', 'A', '0', 1, 0, '2023-05-20 16:48:12', '2023-06-01 12:26:17'),
(4, 4, '11jlc356y2vei6qr27uaj6q01g2lo8gdsbtmps6yz35hhqqgoxiufp1czyppjkob', 'A', '0', 1, 0, '2023-05-20 16:48:26', '2023-06-01 12:24:33'),
(5, 5, 'pszwd57qi99mhhjnx03ox97dwx23oyd28s0z2phj8vbysr5imccczj68g5i581vv', 'A', '0', 1, 0, '2023-05-20 17:19:43', '2023-06-01 12:50:27'),
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
(7, 4, 'image-1685558731553.jpeg', '', 1, 0, '2023-05-31 18:45:31', '2023-05-31 18:45:31'),
(8, 4, 'image-1685559621461.jpg', '', 1, 0, '2023-05-31 19:00:21', '2023-05-31 19:00:21'),
(9, 4, 'image-1685594438603.jpeg', '', 1, 0, '2023-06-01 04:40:38', '2023-06-01 04:40:38');

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
(17, 8, 4, 1, '2023-05-31 19:05:36'),
(18, 8, 5, 1, '2023-06-01 04:38:55'),
(19, 7, 5, 1, '2023-06-01 04:39:08'),
(20, 9, 4, 1, '2023-06-01 04:40:40'),
(21, 9, 2, 1, '2023-06-01 04:41:55'),
(22, 9, 3, 0, '2023-06-01 12:47:52'),
(23, 9, 5, 1, '2023-06-01 12:48:34');

-- --------------------------------------------------------

--
-- Table structure for table `tbl_request`
--

CREATE TABLE `tbl_request` (
  `id` int(11) NOT NULL,
  `user_id` int(11) NOT NULL,
  `follow_id` int(11) NOT NULL,
  `status` enum('Pending','Accepted','Rejected') NOT NULL,
  `is_active` tinyint(1) NOT NULL DEFAULT 1,
  `is_delete` tinyint(1) NOT NULL DEFAULT 0,
  `created_at` timestamp NOT NULL DEFAULT current_timestamp(),
  `updated_at` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8 COLLATE=utf8_unicode_ci;

--
-- Dumping data for table `tbl_request`
--

INSERT INTO `tbl_request` (`id`, `user_id`, `follow_id`, `status`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(2, 5, 3, 'Accepted', 1, 0, '2023-06-01 05:38:59', '2023-06-01 12:12:03'),
(3, 2, 3, 'Rejected', 1, 0, '2023-06-01 05:38:59', '2023-06-01 12:21:21'),
(4, 4, 3, 'Accepted', 1, 0, '2023-06-01 05:38:59', '2023-06-01 12:12:19'),
(7, 3, 2, 'Accepted', 1, 0, '2023-06-01 05:38:59', '2023-06-01 12:31:27');

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
  `is_verified` tinyint(1) NOT NULL DEFAULT 0,
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

INSERT INTO `tbl_user` (`id`, `profile`, `username`, `first_name`, `last_name`, `mobile`, `email`, `password`, `role`, `is_verified`, `login_status`, `logged_in_time`, `is_forgot`, `forgot_time`, `is_active`, `is_delete`, `created_at`, `updated_at`) VALUES
(1, 'profile-1684600029614.jpg', 'divya@123', 'divyadarshan', 'soni', '9558597250', 'divyasoniworld@gmail.com', 'wrr9NTAXpiv4ICtc0v7vdQ==', 'admin', 0, 'online', '2023-06-01 17:55:57', 0, NULL, 1, 0, '2023-05-20 16:27:09', '2023-06-01 12:25:57'),
(2, 'profile-1684601264128.jpg', 'piyush_r', 'Piyush', 'Ramanuj', '+1 (389) 148-3521', 'piyush@gmail.com', 'wrr9NTAXpiv4ICtc0v7vdQ==', 'user', 0, 'online', '2023-06-01 17:55:11', 0, NULL, 1, 0, '2023-05-20 16:47:44', '2023-06-01 12:25:11'),
(3, 'ashokraj.jpg', 'ashok_420', 'Ashok', 'Raj', '+1 (481) 907-7777', 'ashok@gmail.com', 'wrr9NTAXpiv4ICtc0v7vdQ==', 'user', 1, 'online', '2023-06-01 17:56:17', 0, NULL, 1, 0, '2023-05-20 16:48:12', '2023-06-01 12:26:17'),
(4, 'profile-1684601306409.jpg', 'nisarg_09', 'Nisarg', 'Mandaliya', '+1 (485) 791-3312', 'nisarg@gmail.com', 'wrr9NTAXpiv4ICtc0v7vdQ==', 'user', 0, 'online', '2023-06-01 17:54:33', 0, NULL, 1, 0, '2023-05-20 16:48:26', '2023-06-01 12:24:33'),
(5, 'amarjeet.jpg', 'amarjeet_m', 'Amarjeet', 'Kumar', '7648586898', 'amarjeet@gmail.com', 'wrr9NTAXpiv4ICtc0v7vdQ==', 'user', 0, 'online', '2023-06-01 18:20:27', 0, NULL, 1, 0, '2023-05-20 17:19:43', '2023-06-01 12:50:27');

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
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT for table `tbl_post_like`
--
ALTER TABLE `tbl_post_like`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=24;

--
-- AUTO_INCREMENT for table `tbl_request`
--
ALTER TABLE `tbl_request`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `tbl_user`
--
ALTER TABLE `tbl_user`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
