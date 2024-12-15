-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Host: 127.0.0.1
-- Generation Time: Dec 15, 2024 at 02:23 AM
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
-- Database: `dentalfinder`
--

-- --------------------------------------------------------

--
-- Table structure for table `appointments`
--

CREATE TABLE `appointments` (
  `appointment_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `appointment_date` date NOT NULL,
  `set_time` time NOT NULL,
  `status` enum('Pending','Accepted','Rejected','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `appointments`
--

INSERT INTO `appointments` (`appointment_id`, `patient_id`, `branch_id`, `service_id`, `appointment_date`, `set_time`, `status`) VALUES
(6, 8, 4, 1, '2024-12-12', '34:37:00', 'Pending');

-- --------------------------------------------------------

--
-- Table structure for table `branches`
--

CREATE TABLE `branches` (
  `branch_id` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `image` varchar(255) NOT NULL,
  `address` varchar(255) NOT NULL,
  `village_id` int(11) NOT NULL,
  `postcode` int(4) NOT NULL,
  `mobile_number` int(11) NOT NULL,
  `license` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `branches`
--

INSERT INTO `branches` (`branch_id`, `clinic_id`, `image`, `address`, `village_id`, `postcode`, `mobile_number`, `license`) VALUES
(1, 6, '0', '1231', 1, 1000, 312312, 'dasdas'),
(4, 5, '0', '', 1, 0, 0, 'dadas'),
(5, 5, '0', 'dgrtyjgh', 1, 8000, 764645, 'gsdffhfg'),
(6, 5, '0', 'dgrtyjgh', 1, 8000, 764645, 'gsdffhfg'),
(7, 5, '0', 'dgrtyjgh', 1, 8000, 764645, 'gsdffhfg'),
(8, 5, '0', 'dadas', 1, 3000, 543534, 'gdfsgsdf'),
(9, 5, '0', 'dadas', 1, 3000, 543534, 'gdfsgsdf'),
(10, 15, '32', 'dasdas', 3, 2300, 423423, 'dasdasda');

-- --------------------------------------------------------

--
-- Table structure for table `clinics`
--

CREATE TABLE `clinics` (
  `clinic_id` int(11) NOT NULL,
  `license` varchar(255) NOT NULL,
  `specialty_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL,
  `email` varchar(255) NOT NULL,
  `password` varchar(255) NOT NULL,
  `mobile_number` int(11) NOT NULL,
  `address` varchar(255) NOT NULL,
  `village_id` int(11) NOT NULL,
  `postcode` int(4) NOT NULL,
  `createdAt` timestamp NOT NULL DEFAULT current_timestamp() ON UPDATE current_timestamp()
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `clinics`
--

INSERT INTO `clinics` (`clinic_id`, `license`, `specialty_id`, `name`, `email`, `password`, `mobile_number`, `address`, `village_id`, `postcode`, `createdAt`) VALUES
(5, '', 1, 'dadasdasd', 'jgjgh', '12345678', 53453453, 'ytjghj', 2, 3000, '2024-12-11 03:41:19'),
(6, '', 1, 'dasdas', 'dasdas', '12345678', 12535, 'dasdas', 3, 1000, '2024-12-08 05:25:46'),
(8, 'fgfgf', 1, 'gagsf', 'gdfgdffsdfsd', 'gafsd', 124243, 'gfdsgds', 1, 3000, '2024-12-11 07:01:24'),
(9, 'fgfgf', 1, 'gagsf', 'gdfgdffsdfsd', 'gafsd', 124243, 'gfdsgds', 1, 3000, '2024-12-11 07:39:23'),
(10, 'fsfsd', 1, 'gsgdf', 'fsfasd', '12345678', 0, 'fgfgsdfgsdf', 1, 1000, '2024-12-11 08:30:01'),
(11, 'fsfsd', 1, 'gsgdf', 'fsfasd', '12345678', 0, 'fgfgsdfgsdf', 1, 1000, '2024-12-11 08:30:21'),
(12, 'fsfsd', 1, 'gsgdf', 'fsfasd', '12345678', 0, 'fgfgsdfgsdf', 1, 1000, '2024-12-11 08:30:47'),
(13, 'fsfsd', 1, 'gsgdf', 'fsfasd', '12345678', 0, 'fgfgsdfgsdf', 1, 1000, '2024-12-11 08:35:22'),
(15, 'clinic_requests.sql', 1, 'Yousef Al-mcmhirsds', 'wmsu.badua@gmail.comdasdas', '$2b$10$aOlq5ppEAcxVUith4aJWjuTQEEVAIvH5wNfAvtkmxX43VZ6eMFgtS', 635345534, 'gdfgsg', 2, 3000, '2024-12-11 12:23:39');

-- --------------------------------------------------------

--
-- Table structure for table `clinics_notifications`
--

CREATE TABLE `clinics_notifications` (
  `notification_id` int(11) NOT NULL,
  `clinic_id` int(11) NOT NULL,
  `message` text NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `clinics_services`
--

CREATE TABLE `clinics_services` (
  `clinic_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `price` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `patients`
--

CREATE TABLE `patients` (
  `patient_id` int(11) NOT NULL,
  `is_registered` tinyint(1) NOT NULL,
  `first_name` varchar(255) NOT NULL,
  `middle_name` varchar(255) NOT NULL,
  `last_name` varchar(255) NOT NULL,
  `email` varchar(25) NOT NULL,
  `hashed_password` varchar(255) NOT NULL,
  `mobile_number` int(11) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `patients`
--

INSERT INTO `patients` (`patient_id`, `is_registered`, `first_name`, `middle_name`, `last_name`, `email`, `hashed_password`, `mobile_number`) VALUES
(8, 0, 'dasdas', 'dasdadas', 'dasdas', 'dadasdas', '12345678', 1234235);

-- --------------------------------------------------------

--
-- Table structure for table `services`
--

CREATE TABLE `services` (
  `service_id` int(11) NOT NULL,
  `specialty_id` int(11) NOT NULL,
  `name` varchar(33) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `services`
--

INSERT INTO `services` (`service_id`, `specialty_id`, `name`) VALUES
(1, 1, 'Braces');

-- --------------------------------------------------------

--
-- Table structure for table `specialties`
--

CREATE TABLE `specialties` (
  `specialty_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `specialties`
--

INSERT INTO `specialties` (`specialty_id`, `name`) VALUES
(1, 'Orthodontics');

-- --------------------------------------------------------

--
-- Table structure for table `transactions`
--

CREATE TABLE `transactions` (
  `payment_id` int(11) NOT NULL,
  `patient_id` int(11) NOT NULL,
  `service_id` int(11) NOT NULL,
  `branch_id` int(11) NOT NULL,
  `amount` int(11) NOT NULL,
  `method` enum('GCash','PayPal','','') NOT NULL,
  `date` date NOT NULL,
  `status` enum('Pending','Paid','','') NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

-- --------------------------------------------------------

--
-- Table structure for table `villages`
--

CREATE TABLE `villages` (
  `village_id` int(11) NOT NULL,
  `name` varchar(255) NOT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Dumping data for table `villages`
--

INSERT INTO `villages` (`village_id`, `name`) VALUES
(1, 'Tumaga'),
(2, 'Cabaluay'),
(3, 'Putik');

--
-- Indexes for dumped tables
--

--
-- Indexes for table `appointments`
--
ALTER TABLE `appointments`
  ADD PRIMARY KEY (`appointment_id`),
  ADD KEY `fk1_a_patient_id` (`patient_id`),
  ADD KEY `fk2_a_service_id` (`service_id`),
  ADD KEY `fk3_a_branch_id` (`branch_id`);

--
-- Indexes for table `branches`
--
ALTER TABLE `branches`
  ADD PRIMARY KEY (`branch_id`),
  ADD KEY `fk1_b_clinic_id` (`clinic_id`),
  ADD KEY `fk2_b_village_id` (`village_id`);

--
-- Indexes for table `clinics`
--
ALTER TABLE `clinics`
  ADD PRIMARY KEY (`clinic_id`),
  ADD KEY `fk1_c_specialty_id` (`specialty_id`),
  ADD KEY `fk2_c_village_id` (`village_id`);

--
-- Indexes for table `clinics_notifications`
--
ALTER TABLE `clinics_notifications`
  ADD PRIMARY KEY (`notification_id`),
  ADD KEY `fk1_cn_clinic_id` (`clinic_id`);

--
-- Indexes for table `clinics_services`
--
ALTER TABLE `clinics_services`
  ADD KEY `fk1_cs_clinic_id` (`clinic_id`),
  ADD KEY `fk2_cs_service_id` (`service_id`);

--
-- Indexes for table `patients`
--
ALTER TABLE `patients`
  ADD PRIMARY KEY (`patient_id`);

--
-- Indexes for table `services`
--
ALTER TABLE `services`
  ADD PRIMARY KEY (`service_id`),
  ADD KEY `fk1_s_specialty_id` (`specialty_id`);

--
-- Indexes for table `specialties`
--
ALTER TABLE `specialties`
  ADD PRIMARY KEY (`specialty_id`);

--
-- Indexes for table `transactions`
--
ALTER TABLE `transactions`
  ADD PRIMARY KEY (`payment_id`),
  ADD KEY `fk1_pp_patient_id` (`patient_id`),
  ADD KEY `fk2_pp_service_id` (`service_id`),
  ADD KEY `fk3_pp_branch_id` (`branch_id`);

--
-- Indexes for table `villages`
--
ALTER TABLE `villages`
  ADD PRIMARY KEY (`village_id`);

--
-- AUTO_INCREMENT for dumped tables
--

--
-- AUTO_INCREMENT for table `appointments`
--
ALTER TABLE `appointments`
  MODIFY `appointment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- AUTO_INCREMENT for table `branches`
--
ALTER TABLE `branches`
  MODIFY `branch_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT for table `clinics`
--
ALTER TABLE `clinics`
  MODIFY `clinic_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT for table `clinics_notifications`
--
ALTER TABLE `clinics_notifications`
  MODIFY `notification_id` int(11) NOT NULL AUTO_INCREMENT;

--
-- AUTO_INCREMENT for table `patients`
--
ALTER TABLE `patients`
  MODIFY `patient_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=9;

--
-- AUTO_INCREMENT for table `services`
--
ALTER TABLE `services`
  MODIFY `service_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `specialties`
--
ALTER TABLE `specialties`
  MODIFY `specialty_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT for table `transactions`
--
ALTER TABLE `transactions`
  MODIFY `payment_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT for table `villages`
--
ALTER TABLE `villages`
  MODIFY `village_id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- Constraints for dumped tables
--

--
-- Constraints for table `appointments`
--
ALTER TABLE `appointments`
  ADD CONSTRAINT `fk1_a_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2_a_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk3_a_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `branches`
--
ALTER TABLE `branches`
  ADD CONSTRAINT `fk1_b_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`clinic_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2_b_village_id` FOREIGN KEY (`village_id`) REFERENCES `villages` (`village_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `clinics`
--
ALTER TABLE `clinics`
  ADD CONSTRAINT `fk1_c_specialty_id` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`specialty_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2_c_village_id` FOREIGN KEY (`village_id`) REFERENCES `villages` (`village_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `clinics_notifications`
--
ALTER TABLE `clinics_notifications`
  ADD CONSTRAINT `fk1_cn_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`clinic_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `clinics_services`
--
ALTER TABLE `clinics_services`
  ADD CONSTRAINT `fk1_cs_clinic_id` FOREIGN KEY (`clinic_id`) REFERENCES `clinics` (`clinic_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2_cs_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `services`
--
ALTER TABLE `services`
  ADD CONSTRAINT `fk1_s_specialty_id` FOREIGN KEY (`specialty_id`) REFERENCES `specialties` (`specialty_id`) ON DELETE CASCADE ON UPDATE CASCADE;

--
-- Constraints for table `transactions`
--
ALTER TABLE `transactions`
  ADD CONSTRAINT `fk1_pp_patient_id` FOREIGN KEY (`patient_id`) REFERENCES `patients` (`patient_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk2_pp_service_id` FOREIGN KEY (`service_id`) REFERENCES `services` (`service_id`) ON DELETE CASCADE ON UPDATE CASCADE,
  ADD CONSTRAINT `fk3_pp_branch_id` FOREIGN KEY (`branch_id`) REFERENCES `branches` (`branch_id`) ON DELETE CASCADE ON UPDATE CASCADE;
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
