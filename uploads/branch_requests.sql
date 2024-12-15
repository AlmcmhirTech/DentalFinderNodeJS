-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2024 at 01:47 AM
-- Server version: 10.4.32-MariaDB
-- PHP Version: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Database: `admin_dentalfinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch_requests`
--

CREATE TABLE `branch_requests` (
  `request_id` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `license` varchar(255) NOT NULL,
  `statement` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch_requests`
--

INSERT INTO `branch_requests` (`request_id`, `clinic_id`, `license`, `statement`, `date`) VALUES
(1, 1, 'dasdas', 'dasdas', '2024-12-07 12:08:50'),
(2, 1, 'dadasdasdsadadas', 'dasdasdsa', '2024-12-07 12:17:17');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch_requests`
--
ALTER TABLE `branch_requests`
  ADD PRIMARY KEY (`request_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch_requests`
--
ALTER TABLE `branch_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
