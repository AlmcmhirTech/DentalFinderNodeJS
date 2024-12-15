-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2024 at 02:24 AM
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
-- Database: `admin`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch_requests`
--

CREATE TABLE `branch_requests` (
  `request_id` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `village_id` int(11) NOT NULL,
  `postcode` int(4) NOT NULL,
  `mobile_number` int(11) NOT NULL,
  `license` varchar(255) NOT NULL,
  `statement` text NOT NULL,
  `status` enum('Pending','Accepted','','') NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clinics`
--

CREATE TABLE `clinics` (
  `clinic_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(11) NOT NULL,
  `mobile_number` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `village` enum('Tumaga','Cabaluay','Putik','') NOT NULL,
  `postcode` int(4) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clinics`
--

INSERT INTO `clinics` (`clinic_id`, `name`, `email`, `password`, `mobile_number`, `address`, `village`, `postcode`, `createdAt`) VALUES
(6, 'dasdas', 'dasdas', '12345678', 123456789, 'dadasdsa', 'Cabaluay', 1000, '2024-12-11 09:43:04');

-- --------------------------------------------------------

--
-- Table structure for table `clinic_requests`
--

CREATE TABLE `clinic_requests` (
  `request_id` int(11) NOT NULL,
  `license` varchar(255) NOT NULL,
  `specialty_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile_number` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `village_id` int(11) NOT NULL,
  `postcode` int(4) NOT NULL,
  `statement` text NOT NULL,
  `status` enum('Pending','Accepted','','') NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clinic_requests`
--

INSERT INTO `clinic_requests` (`request_id`, `license`, `specialty_id`, `name`, `email`, `password`, `mobile_number`, `address`, `village_id`, `postcode`, `statement`, `status`, `date`) VALUES
(14, 'fsfsd', 1, 'gsgdf', 'fsfasd', '12345678', 0, 'fgfgsdfgsdf', 1, 1000, 'gdfgsdf', 'Accepted', '2024-12-11 08:30:01'),
(16, 'fsfsd', 1, 'gsgdf', 'fsfasd', '12345678', 0, 'fgfgsdfgsdf', 1, 1000, 'gdfgsdf', 'Accepted', '2024-12-11 08:30:21'),
(18, 'clinic_requests.sql', 1, 'Yousef Al-mcmhir', 'wmsu.badua@gmail.com', '12345678', 2147483647, 'gdfgsg', 1, 3000, '', 'Pending', '2024-12-11 12:00:41'),
(19, 'clinic_requests.sql', 1, 'Yousef Al-mcmhirsds', 'wmsu.badua@gmail.comdasdas', '$2b$10$aOlq5ppEAcxVUith4aJWjuTQEEVAIvH5wNfAvtkmxX43VZ6eMFgtS', 635345534, 'gdfgsg', 2, 3000, '', 'Accepted', '2024-12-11 12:22:29');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `branch_requests`
--
ALTER TABLE `branch_requests`
  ADD PRIMARY KEY (`request_id`),
  ADD KEY `fk1_br_clinic_id` (`clinic_id`);

--
-- Indexes for table `clinics`
--
ALTER TABLE `clinics`
  ADD PRIMARY KEY (`clinic_id`);

--
-- Indexes for table `clinic_requests`
--
ALTER TABLE `clinic_requests`
  ADD PRIMARY KEY (`request_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch_requests`
--
ALTER TABLE `branch_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `clinics`
--
ALTER TABLE `clinics`
  MODIFY `clinic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=8;

--
-- AUTO_INCREMENT for table `clinic_requests`
--
ALTER TABLE `clinic_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=20;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branch_requests`
--
ALTER TABLE `branch_requests`
  ADD CONSTRAINT `fk1_br_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`clinic_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
