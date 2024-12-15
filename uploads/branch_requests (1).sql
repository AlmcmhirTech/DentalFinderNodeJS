-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 08, 2024 at 05:15 AM
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
-- Database: `database_bridge`
--

-- --------------------------------------------------------

--
-- Table structure for table `branch_requests`
--

CREATE TABLE `branch_requests` (
  `request_id` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `village` enum('Tumaga','Cabaluay','Putik','') NOT NULL,
  `postcode` int(4) NOT NULL,
  `mobile_number` int(11) NOT NULL,
  `license` varchar(255) NOT NULL,
  `statement` text NOT NULL,
  `date` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branch_requests`
--

INSERT INTO `branch_requests` (`request_id`, `clinic_id`, `address`, `village`, `postcode`, `mobile_number`, `license`, `statement`, `date`) VALUES
(3, 5, '', 'Tumaga', 0, 0, 'dadas', 'dasdas', '2024-12-08 04:09:47');

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
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `branch_requests`
--
ALTER TABLE `branch_requests`
  MODIFY `request_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `branch_requests`
--
ALTER TABLE `branch_requests`
  ADD CONSTRAINT `fk1_br_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`clinic_id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
